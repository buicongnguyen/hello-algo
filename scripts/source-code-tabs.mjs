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

const sourceCodeLabels = new Set(sourceCodeLanguages.map((language) => language.label));
const sourceCodeFences = new Set(sourceCodeLanguages.map((language) => language.fence));
const sourceDirectivePattern = /^```src\s*\n\[file\]\{([a-zA-Z0-9_-]+)\}-\[class\]\{([a-zA-Z0-9_-]*)\}-\[func\]\{([a-zA-Z0-9_-]*)\}\s*\n```$/;

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

function explicitTabGroup(lines, start) {
  const labels = [];
  let index = start;
  while (index < lines.length) {
    const tab = lines[index].match(/^===\s+"([^"]+)"/);
    if (!tab) break;
    labels.push(tab[1]);
    index += 1;
    while (index < lines.length && (!lines[index].trim() || /^\s{4}/.test(lines[index]))) index += 1;
  }
  return {
    end: index,
    labels,
    markdown: lines.slice(start, index).join("\n").trimEnd()
  };
}

function cleanHeading(value) {
  return value
    .replace(/\s+\{[^{}]+\}\s*$/, "")
    .replace(/[*_`]/g, "")
    .trim();
}

export async function sourceExampleGroups({ projectRoot, sourcePath, sourceMarkdown }) {
  const lines = sourceMarkdown.replaceAll("\r\n", "\n").split("\n");
  const groups = [];
  let nearestHeading = "";

  for (let index = 0; index < lines.length;) {
    const heading = lines[index].match(/^#{1,4}\s+(.+)$/);
    if (heading) nearestHeading = cleanHeading(heading[1]);

    if (/^===\s+"([^"]+)"/.test(lines[index])) {
      const group = explicitTabGroup(lines, index);
      if (group.labels.length > 1 && group.labels.every((label) => sourceCodeLabels.has(label))) {
        groups.push({
          kind: "tabs",
          title: nearestHeading || `Example ${groups.length + 1}`,
          markdown: group.markdown
        });
      }
      index = group.end;
      continue;
    }

    if (lines[index].trim() === "```src") {
      const directive = lines.slice(index, index + 3).join("\n").match(sourceDirectivePattern);
      if (!directive) throw new Error(`Invalid source-code directive in ${sourcePath} at line ${index + 1}`);
      const [, file, className, functionName] = directive;
      groups.push({
        kind: "src",
        title: `${file} · ${functionName || className}`,
        markdown: await sourceDirectiveTabs({ projectRoot, sourcePath, file, className, functionName })
      });
      index += 3;
      continue;
    }

    index += 1;
  }
  return groups;
}

function localizedDeferredCopy(locale) {
  const copy = {
    vi: {
      title: "Ví dụ chính thức đang chờ đặt vào bản dịch đầy đủ",
      introduction: "Bản nháp hiện chưa có đủ phần giải thích để đặt các ví dụ sau đúng vị trí như nguồn. Mã đa ngôn ngữ vẫn được cung cấp đầy đủ và sẽ được chuyển vào từng mục khi phần văn xuôi đạt tương đương cấu trúc.",
      example: "Ví dụ"
    },
    ko: {
      title: "전체 번역의 본문 배치를 기다리는 공식 예제",
      introduction: "현재 초안에는 아래 예제를 원문과 같은 위치에 둘 설명이 아직 충분하지 않습니다. 다국어 코드는 빠짐없이 제공하며, 본문이 구조적 동등성을 갖추면 해당 절로 이동합니다.",
      example: "예제"
    }
  }[locale];
  if (!copy) throw new Error(`Unsupported source-example locale: ${locale}`);
  return copy;
}

function replaceStandaloneCodeFences(targetMarkdown, groups) {
  const lines = targetMarkdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];
  let groupIndex = 0;

  for (let index = 0; index < lines.length;) {
    const fence = lines[index].match(/^```([^\s`]*)/);
    if (!fence || !sourceCodeFences.has(fence[1]) || groupIndex >= groups.length) {
      output.push(lines[index]);
      index += 1;
      continue;
    }

    const closing = lines.findIndex((line, candidate) => candidate > index && line.trimStart().startsWith("```"));
    if (closing < 0) throw new Error("Localized Markdown contains an unclosed programming-language code fence");
    output.push(groups[groupIndex].markdown);
    groupIndex += 1;
    index = closing + 1;
  }

  return { markdown: output.join("\n"), placed: groupIndex };
}

export async function localizeSourceExamples({ projectRoot, sourcePath, sourceMarkdown, targetMarkdown, locale }) {
  const groups = await sourceExampleGroups({ projectRoot, sourcePath, sourceMarkdown });
  if (!groups.length) return { markdown: targetMarkdown, sourceGroups: 0, inlineGroups: 0, deferredGroups: 0 };

  const merged = replaceStandaloneCodeFences(targetMarkdown, groups);
  const deferred = groups.slice(merged.placed);
  if (!deferred.length) {
    return {
      markdown: merged.markdown,
      sourceGroups: groups.length,
      inlineGroups: merged.placed,
      deferredGroups: 0
    };
  }

  const copy = localizedDeferredCopy(locale);
  const sections = deferred.map((group, index) =>
    `### ${copy.example} ${merged.placed + index + 1} · ${group.title}\n\n${group.markdown}`
  );
  return {
    markdown: `${merged.markdown.trimEnd()}\n\n## ${copy.title}\n\n${copy.introduction}\n\n${sections.join("\n\n")}`,
    sourceGroups: groups.length,
    inlineGroups: merged.placed,
    deferredGroups: deferred.length
  };
}
