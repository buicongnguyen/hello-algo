import { readFile } from "node:fs/promises";
import path from "node:path";

export const sourceCodeLanguages = [
  { label: "Python", directory: "python", extension: "py", fence: "python", style: "snake" },
  { label: "C++", directory: "cpp", extension: "cpp", fence: "cpp", style: "camel" },
  { label: "Java", directory: "java", extension: "java", fence: "java", style: "camel" },
  { label: "C#", directory: "csharp", extension: "cs", fence: "csharp", style: "pascal" },
  { label: "Go", directory: "go", extension: "go", fence: "go", style: "camel" },
  { label: "Swift", directory: "swift", extension: "swift", fence: "swift", style: "camel" },
  { label: "JS", directory: "javascript", extension: "js", fence: "javascript", style: "camel" },
  { label: "TS", directory: "typescript", extension: "ts", fence: "typescript", style: "camel" },
  { label: "Dart", directory: "dart", extension: "dart", fence: "dart", style: "camel" },
  { label: "Rust", directory: "rust", extension: "rs", fence: "rust", style: "snake" },
  { label: "C", directory: "c", extension: "c", fence: "c", style: "camel" },
  { label: "Kotlin", directory: "kotlin", extension: "kt", fence: "kotlin", style: "camel" },
  { label: "Ruby", directory: "ruby", extension: "rb", fence: "ruby", style: "snake" }
];

const sourceFileCache = new Map();

const words = (identifier) => identifier.split("_").filter(Boolean);
const camelCase = (identifier) => words(identifier).map((word, index) => index ? word[0].toUpperCase() + word.slice(1) : word).join("");
const pascalCase = (identifier) => words(identifier).map((word) => word[0].toUpperCase() + word.slice(1)).join("");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function mixedCaseIdentifiers(identifier, firstWordStyle) {
  const parts = words(identifier);
  if (!parts.length) return [];
  const first = firstWordStyle === "pascal" ? parts[0][0].toUpperCase() + parts[0].slice(1) : parts[0];
  let variants = parts[0].length <= 4 ? [first, parts[0].toUpperCase()] : [first];
  for (const part of parts.slice(1)) {
    const title = part[0].toUpperCase() + part.slice(1);
    const choices = part.length <= 4 ? [title, part.toUpperCase()] : [title];
    variants = variants.flatMap((prefix) => choices.map((choice) => prefix + choice));
  }
  return variants;
}

function identifierCandidates(identifier, language, className = "", file = "") {
  const candidates = new Set([
    identifier,
    camelCase(identifier),
    pascalCase(identifier),
    ...mixedCaseIdentifiers(identifier, "camel"),
    ...mixedCaseIdentifiers(identifier, "pascal")
  ]);
  if (identifier === "__init__") {
    const classPascal = pascalCase(className);
    candidates.add("initialize");
    candidates.add("constructor");
    candidates.add("init");
    candidates.add("new");
    candidates.add(classPascal);
    candidates.add(`new${classPascal}`);
    candidates.add(`New${classPascal}`);
  }
  if (language.directory === "go") {
    for (const candidate of [...candidates]) {
      candidates.add(`space${candidate[0].toUpperCase()}${candidate.slice(1)}`);
      candidates.add(`${candidate}Node`);
      candidates.add(`${candidate}Item`);
    }
  }
  if (language.directory === "c" && identifier === "remove") candidates.add("removeItem");
  const romanSuffix = file.match(/_(i{1,3}|iv|v)(?:_|$)/i)?.[1]?.toUpperCase();
  if (romanSuffix) {
    for (const candidate of [...candidates]) candidates.add(`${candidate}${romanSuffix}`);
  }
  const preferred = language.style === "snake"
    ? identifier
    : language.style === "pascal" ? pascalCase(identifier) : camelCase(identifier);
  return [preferred, ...candidates].filter((value, index, all) => value && all.indexOf(value) === index);
}

function lineOffsets(source) {
  const offsets = [0];
  for (let index = 0; index < source.length; index += 1) {
    if (source[index] === "\n") offsets.push(index + 1);
  }
  return offsets;
}

function indentation(line) {
  return line.match(/^\s*/)?.[0].replaceAll("\t", "    ").length || 0;
}

function extractIndentedBlock(source, declarationPattern) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const start = lines.findIndex((line) => declarationPattern.test(line));
  if (start < 0) return null;
  const baseIndent = indentation(lines[start]);
  let end = start + 1;
  while (end < lines.length) {
    const line = lines[end];
    if (line.trim() && indentation(line) <= baseIndent) break;
    end += 1;
  }
  return lines.slice(start, end).join("\n").trimEnd();
}

function extractRubyBlock(source, declarationPattern) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const start = lines.findIndex((line) => declarationPattern.test(line));
  if (start < 0) return null;
  const baseIndent = indentation(lines[start]);
  let end = start + 1;
  while (end < lines.length) {
    if (new RegExp(`^\\s{${baseIndent}}end\\b`).test(lines[end])) {
      end += 1;
      break;
    }
    end += 1;
  }
  return lines.slice(start, end).join("\n").trimEnd();
}

function dedentSnippet(value) {
  const lines = value.split("\n");
  const nonEmpty = lines.filter((line) => line.trim());
  const smallestIndent = nonEmpty.length ? Math.min(...nonEmpty.map(indentation)) : 0;
  return lines.map((line) => line.slice(Math.min(smallestIndent, line.length))).join("\n").trimEnd();
}

function matchingBraceEnd(source, openingBrace) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = openingBrace; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (character === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (character === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }
  return null;
}

function braceDeclaration(source, candidates, language) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const offsets = lineOffsets(source.replaceAll("\r\n", "\n"));
  for (const candidate of candidates) {
    const name = escapeRegExp(candidate);
    const languagePattern = {
      go: new RegExp(`^\\s*func\\s+(?:\\([^)]*\\)\\s*)?${name}\\s*\\(`),
      swift: new RegExp(`^\\s*(?:[\\w@]+\\s+)*func\\s+${name}\\s*\\(|^\\s*init\\s*\\(`),
      kotlin: new RegExp(`^\\s*(?:[\\w<>.?]+\\s+)*fun\\s+${name}\\s*\\(|^\\s*init\\s*\\{`),
      rust: new RegExp(`^\\s*(?:pub(?:\\([^)]*\\))?\\s+)?(?:async\\s+)?fn\\s+${name}\\s*(?:<[^>]+>)?\\s*\\(`),
      javascript: new RegExp(`^\\s*(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\(|^\\s*(?:async\\s+)?#?${name}\\s*\\(`),
      typescript: new RegExp(`^\\s*(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\(|^\\s*(?:public|private|protected|static|async|override|readonly|abstract|\\s)*#?${name}\\s*\\(`)
    }[language.directory];
    const genericPattern = new RegExp(`(?:#|_)*${name}\\s*(?:<[^;{}()]*>)?\\s*\\(`);
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex];
      const trimmed = line.trim();
      if (!trimmed || /^(?:\/\/|\/\*|\*)/.test(trimmed)) continue;
      if (languagePattern ? !languagePattern.test(line) : !genericPattern.test(line)) continue;
      if (/^(?:if|for|while|switch|return|throw|print|printf|assert)\b/.test(trimmed)) continue;
      let declarationEnd = lineIndex;
      let declaration = line;
      while (!declaration.includes("{") && !declaration.includes(";") && declarationEnd - lineIndex < 12) {
        declarationEnd += 1;
        declaration += `\n${lines[declarationEnd] || ""}`;
      }
      const relativeBrace = declaration.indexOf("{");
      const relativeSemicolon = declaration.indexOf(";");
      if (relativeBrace < 0 || (relativeSemicolon >= 0 && relativeSemicolon < relativeBrace)) continue;
      const start = offsets[lineIndex];
      const openingBrace = start + relativeBrace;
      const end = matchingBraceEnd(source.replaceAll("\r\n", "\n"), openingBrace);
      if (end) return { start, end };
    }
  }
  return null;
}

function exactClassBlock(source, className, language) {
  const normalized = source.replaceAll("\r\n", "\n");
  const candidates = identifierCandidates(className, language);
  if (language.directory === "python") {
    const pattern = new RegExp(`^\\s*class\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`);
    return extractIndentedBlock(normalized, pattern);
  }
  if (language.directory === "ruby") {
    const pattern = new RegExp(`^\\s*class\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`);
    return extractRubyBlock(normalized, pattern);
  }
  const declarationPattern = new RegExp(`^\\s*(?:(?:pub|public|private|internal|open|final|abstract|export)\\s+)*(?:class|struct|type)\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`, "m");
  const declaration = declarationPattern.exec(normalized);
  if (!declaration) return null;
  const openingBrace = normalized.indexOf("{", declaration.index);
  if (openingBrace < 0) return null;
  const end = matchingBraceEnd(normalized, openingBrace);
  return end ? normalized.slice(declaration.index, end) : null;
}

function classRegion(source, className, language) {
  const normalized = source.replaceAll("\r\n", "\n");
  const candidates = identifierCandidates(className, language);
  let start = -1;
  if (language.directory === "python") {
    const pattern = new RegExp(`^\\s*class\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`, "m");
    start = normalized.search(pattern);
  } else if (language.directory === "ruby") {
    const pattern = new RegExp(`^\\s*class\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`, "m");
    start = normalized.search(pattern);
  } else if (language.directory === "c") {
    const closing = new RegExp(`}\\s*(?:${candidates.map(escapeRegExp).join("|")})\\s*;`).exec(normalized);
    start = closing ? normalized.lastIndexOf("typedef struct", closing.index) : -1;
  } else {
    const declaration = new RegExp(`^\\s*(?:(?:pub|public|private|internal|open|final|abstract|export)\\s+)*(?:class|struct|type)\\s+(?:${candidates.map(escapeRegExp).join("|")})\\b`, "m");
    start = normalized.search(declaration);
  }
  if (start < 0) return null;
  const driver = normalized.slice(start).search(/^(?:\s*(?:\/\*+|\/\/|#|"{3})\s*)?Driver Code\b/im);
  const end = driver >= 0 ? start + driver : normalized.length;
  return normalized.slice(start, end).trimEnd();
}

export function extractSourceSnippet(source, { className, functionName, language, file = "" }) {
  const normalized = source.replaceAll("\r\n", "\n");
  if (!functionName) return classRegion(normalized, className, language);

  const candidates = identifierCandidates(functionName, language, className, file);
  const scopedLanguages = new Set(["python", "ruby", "cpp", "java", "csharp", "swift", "javascript", "typescript", "dart", "kotlin"]);
  const scopedSource = className && scopedLanguages.has(language.directory)
    ? exactClassBlock(normalized, className, language) || normalized
    : normalized;
  if (language.directory === "python") {
    const pattern = new RegExp(`^\\s*(?:async\\s+)?def\\s+(?:${candidates.map(escapeRegExp).join("|")})\\s*\\(`);
    const snippet = extractIndentedBlock(scopedSource, pattern);
    return snippet && dedentSnippet(snippet);
  }
  if (language.directory === "ruby") {
    const pattern = new RegExp(`^\\s*def\\s+(?:self\\.)?(?:${candidates.map(escapeRegExp).join("|")})\\b`);
    const snippet = extractRubyBlock(scopedSource, pattern);
    return snippet && dedentSnippet(snippet);
  }

  const declaration = braceDeclaration(scopedSource, candidates, language);
  return declaration ? dedentSnippet(scopedSource.slice(declaration.start, declaration.end)) : null;
}

async function sourceFile(projectRoot, chapter, file, language) {
  const filePath = path.join(projectRoot, "en", "codes", language.directory, chapter, `${file}.${language.extension}`);
  if (!sourceFileCache.has(filePath)) sourceFileCache.set(filePath, readFile(filePath, "utf8"));
  return { filePath, source: await sourceFileCache.get(filePath) };
}

function indentMarkdown(value) {
  return value.split("\n").map((line) => `    ${line}`).join("\n");
}

export async function sourceDirectiveTabs({ projectRoot, sourcePath, file, className, functionName }) {
  const chapter = path.posix.basename(path.posix.dirname(sourcePath));
  const tabs = [];
  for (const language of sourceCodeLanguages) {
    const codeFile = await sourceFile(projectRoot, chapter, file, language);
    const snippet = extractSourceSnippet(codeFile.source, { className, functionName, language, file });
    if (!snippet) {
      throw new Error(`Cannot extract ${className ? `${className}.` : ""}${functionName || "(class)"} from ${codeFile.filePath}`);
    }
    tabs.push(`=== "${language.label}"\n\n${indentMarkdown(`\`\`\`${language.fence}\n${snippet}\n\`\`\``)}`);
  }
  return tabs.join("\n\n");
}

export async function sourceCodeAppendix({ projectRoot, sourcePath, sourceMarkdown, locale }) {
  const directives = [...sourceMarkdown.matchAll(
    /```src\s*\n\[file\]\{([a-zA-Z0-9_-]+)\}-\[class\]\{([a-zA-Z0-9_-]*)\}-\[func\]\{([a-zA-Z0-9_-]*)\}\s*\n```/g
  )];
  if (!directives.length) return "";

  const localized = {
    vi: {
      title: "Các ví dụ mã nguồn chính thức",
      introduction: "Các ví dụ dưới đây khôi phục đầy đủ những đoạn mã đa ngôn ngữ theo thứ tự xuất hiện trong bản tiếng Anh chính thức."
    },
    ko: {
      title: "공식 소스 코드 예제",
      introduction: "아래 예제는 공식 영어판에 나오는 순서대로 다국어 코드 조각을 빠짐없이 복원합니다."
    }
  }[locale];
  if (!localized) throw new Error(`Unsupported source-code appendix locale: ${locale}`);

  const sections = [];
  for (const directive of directives) {
    const [, file, className, functionName] = directive;
    const symbol = functionName || className;
    const tabs = await sourceDirectiveTabs({ projectRoot, sourcePath, file, className, functionName });
    sections.push(`### \`${file}\` · \`${symbol}\`\n\n${tabs}`);
  }
  return `## ${localized.title}\n\n${localized.introduction}\n\n${sections.join("\n\n")}`;
}
