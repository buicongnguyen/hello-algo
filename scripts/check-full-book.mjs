import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { localizeSourceExamples } from "./source-code-tabs.mjs";
import { createTranslationParityReport } from "./translation-parity.mjs";
import { englishReaderCatalog, loadTranslationRegistry } from "./translation-registry.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const expectedSourceCommit = "69932aed1891a7b7f6a0de88cd116d3fe13e7032";
const expectedSourceDigest = "730fbd241bc773be5aa4514ad8981c2dd215702879c917ba2c3e738de9a9249d";
const sourceExceptions = [{
  path: "en/codes/javascript/chapter_searching/binary_search_insertion.js",
  sha256: "c7fd7c24121a0fbd2f44dab5a996afb27d954165cff8ea7edd2defd329e07146",
  reason: "Repairs two invalid quoted console messages so the official JavaScript example parses and runs."
}];
const expectedCorpusTotals = {
  documents: 119,
  headings: 552,
  images: 502,
  callouts: 168,
  tables: 29,
  displayMath: 47,
  inlineMath: 1939,
  sourceCodeGroups: 165
};
const placeholderPattern = /\b(?:TODO|TBD|FIXME|translation pending|translate later|coming soon)\b|번역 예정|추가 예정|dịch sau|đang dịch|nội dung sẽ được bổ sung/i;
const vietnameseLetterPattern = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const koreanLetterPattern = /[가-힣]/;
const koreanInVietnamesePattern = /[가-힣]/;
const vietnameseInKoreanPattern = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const localizedMathLiteralEquivalents = new Map([
  ["ko/docs/chapter_divide_and_conquer/hanota_problem.md", new Map([["585", "5850"]])]
]);
const binarySourceExtensions = new Set([".gif", ".jpg", ".jpeg", ".mp4", ".png", ".webp"]);

function normalizeNewlines(markdown) {
  return markdown.replaceAll("\r\n", "\n");
}

function stripFencedCode(markdown) {
  const output = [];
  let fence = null;
  for (const line of normalizeNewlines(markdown).split("\n")) {
    const marker = line.match(/^\s*(```+|~~~+)/)?.[1];
    if (marker) {
      if (fence === null) fence = marker[0];
      else if (marker[0] === fence) fence = null;
      continue;
    }
    if (fence === null) output.push(line);
  }
  return output.join("\n");
}

function normalizeMath(expression) {
  return expression
    .replace(/\\text\{[^{}]*\}/g, "\\text{}")
    .replace(/\s+/g, "")
    .trim();
}

function tableColumns(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").length;
}

function isTableSeparator(line) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = trimmed.split("|").map((cell) => cell.trim());
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function tableShapes(markdown) {
  const lines = markdown.split("\n");
  const shapes = [];
  for (let index = 1; index < lines.length; index += 1) {
    if (!isTableSeparator(lines[index])) continue;
    const rowWidths = [tableColumns(lines[index - 1]), tableColumns(lines[index])];
    let cursor = index + 1;
    while (cursor < lines.length && lines[cursor].includes("|") && lines[cursor].trim() !== "") {
      rowWidths.push(tableColumns(lines[cursor]));
      cursor += 1;
    }
    shapes.push(rowWidths.join("x"));
  }
  return shapes;
}

function structuralSignature(markdown) {
  const withoutCode = stripFencedCode(markdown);
  const displayMath = [];
  const withoutDisplayMath = withoutCode.replace(/^\$\$\s*$([\s\S]*?)^\$\$\s*$/gm, (_full, expression) => {
    displayMath.push(normalizeMath(expression));
    return "";
  });
  const inlineMath = [...withoutDisplayMath.matchAll(/(?<!\\)\$([^$\n]+)(?<!\\)\$/g)]
    .map((match) => normalizeMath(match[1]));
  const mathLiterals = [...new Set([...displayMath, ...inlineMath]
    .flatMap((expression) => [...expression.matchAll(/\d+(?:\.\d+)?/g)].map((match) => match[0]))
    .filter((literal) => literal.length >= 3 || literal.includes(".")))]
    .sort();
  return {
    headingLevels: [...withoutCode.matchAll(/^(#{1,6})\s+/gm)].map((match) => match[1].length),
    images: [...withoutCode.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)]
      .map((match) => path.posix.basename(match[1].split(/[?#]/, 1)[0])),
    calloutTypes: [...withoutCode.matchAll(/^(?:!!!|\?\?\?)\s+([a-zA-Z0-9_-]+)/gm)].map((match) => match[1]),
    tableShapes: tableShapes(withoutCode),
    displayMath,
    inlineMath,
    mathLiterals
  };
}

function normalizedParagraphs(markdown) {
  return stripFencedCode(markdown)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\$\$\s*$[\s\S]*?^\$\$\s*$/gm, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph
      .replace(/!\[[^\]]*]\([^)]+\)/g, "")
      .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/^(?:#{1,6}|!!!|\?\?\?|>|[-*+]|\d+\.)\s*/gm, "")
      .replace(/[*_`|$]/g, "")
      .replace(/\s+/g, " ")
      .trim())
    .filter(Boolean);
}

function longUntranslatedParagraphs(sourceMarkdown, targetMarkdown) {
  const targetParagraphs = new Set(normalizedParagraphs(targetMarkdown));
  return normalizedParagraphs(sourceMarkdown).filter((paragraph) =>
    paragraph.length >= 120 &&
    /^[\x00-\x7F]+$/.test(paragraph) &&
    !/\\begin|\\frac|\\times|\[[A-Z]\]\.|doi\.org/i.test(paragraph) &&
    targetParagraphs.has(paragraph)
  );
}

function sameArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function compareSignature(source, target, targetPath) {
  const failures = [];
  for (const field of ["headingLevels", "images", "calloutTypes", "tableShapes"]) {
    if (!sameArray(source[field], target[field])) {
      failures.push(`${field} ${JSON.stringify(target[field])}/${JSON.stringify(source[field])}`);
    }
  }
  if (source.displayMath.length !== target.displayMath.length) {
    failures.push(`displayMath count ${target.displayMath.length}/${source.displayMath.length}`);
  }
  if (source.inlineMath.length !== target.inlineMath.length) {
    failures.push(`inlineMath count ${target.inlineMath.length}/${source.inlineMath.length}`);
  }
  const literalEquivalents = localizedMathLiteralEquivalents.get(targetPath) || new Map();
  const missingMathLiterals = source.mathLiterals.filter((literal) =>
    !target.mathLiterals.includes(literal) &&
    !target.mathLiterals.includes(literalEquivalents.get(literal))
  );
  if (missingMathLiterals.length) failures.push(`missing mathematical literals ${missingMathLiterals.join(", ")}`);
  return failures;
}

async function collectFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(candidate));
    else if (entry.isFile()) files.push(candidate);
  }
  return files;
}

async function sourceDigest() {
  const digest = createHash("sha256");
  digest.update(`${expectedSourceCommit}\0`);
  const files = (await collectFiles(path.join(projectRoot, "en")))
    .map((file) => ({ file, relativePath: path.relative(projectRoot, file).replaceAll("\\", "/") }))
    .sort((left, right) => left.relativePath < right.relativePath ? -1 : left.relativePath > right.relativePath ? 1 : 0);
  let bytes = 0;
  for (const { file, relativePath } of files) {
    const rawContent = await readFile(file);
    const content = binarySourceExtensions.has(path.extname(file).toLowerCase())
      ? rawContent
      : Buffer.from(rawContent.toString("utf8").replaceAll("\r\n", "\n"), "utf8");
    digest.update(`${relativePath}\0`);
    digest.update(content);
    digest.update("\0");
    bytes += content.length;
  }
  return { digest: digest.digest("hex"), files: files.length, bytes };
}

export async function auditFullBook() {
  const failures = [];
  const registry = await loadTranslationRegistry(projectRoot);
  const sourceTree = await sourceDigest();
  if (registry.sourceCommit !== expectedSourceCommit) {
    failures.push(`translation manifests use ${registry.sourceCommit}, expected ${expectedSourceCommit}`);
  }
  if (sourceTree.digest !== expectedSourceDigest) {
    failures.push(`locked English source digest is ${sourceTree.digest}, expected ${expectedSourceDigest}`);
  }
  for (const exception of sourceExceptions) {
    const rawContent = await readFile(path.join(projectRoot, exception.path));
    const content = Buffer.from(rawContent.toString("utf8").replaceAll("\r\n", "\n"), "utf8");
    const digest = createHash("sha256").update(content).digest("hex");
    if (digest !== exception.sha256) failures.push(`${exception.path}: audited source exception digest changed`);
  }

  const sourceTotals = {
    documents: englishReaderCatalog.length,
    files: sourceTree.files,
    bytes: sourceTree.bytes,
    headings: 0,
    images: 0,
    callouts: 0,
    tables: 0,
    displayMath: 0,
    inlineMath: 0,
    exceptions: sourceExceptions
  };
  const localizedTotals = {};

  for (const language of ["vi", "ko"]) {
    const manifest = registry.manifests[language];
    const parity = await createTranslationParityReport({ projectRoot, manifest });
    const totals = {
      documents: manifest.documents.length,
      structurallyReady: parity.summary.structurallyReady,
      sourceCodeGroups: 0,
      inlineCodeGroups: 0,
      deferredCodeGroups: 0
    };

    for (const document of manifest.documents) {
      const [sourceMarkdown, targetMarkdown] = await Promise.all([
        readFile(path.join(projectRoot, document.source), "utf8"),
        readFile(path.join(projectRoot, document.target), "utf8")
      ]);
      const localized = await localizeSourceExamples({
        projectRoot,
        sourcePath: document.source,
        sourceMarkdown,
        targetMarkdown,
        locale: language
      });
      const sourceSignature = structuralSignature(sourceMarkdown);
      const targetSignature = structuralSignature(localized.markdown);
      const signatureFailures = compareSignature(sourceSignature, targetSignature, document.target);
      for (const failure of signatureFailures) failures.push(`${document.target}: ${failure}`);

      const untranslated = longUntranslatedParagraphs(sourceMarkdown, targetMarkdown);
      if (untranslated.length) {
        failures.push(
          `${document.target}: ${untranslated.length} long English source paragraph(s) remain untranslated ` +
          `(${untranslated.map((paragraph) => paragraph.slice(0, 100)).join(" | ")})`
        );
      }
      if (placeholderPattern.test(targetMarkdown)) failures.push(`${document.target}: contains unfinished-content language`);
      if (language === "vi" && !vietnameseLetterPattern.test(targetMarkdown)) {
        failures.push(`${document.target}: contains no Vietnamese-specific letters`);
      }
      if (language === "ko" && !koreanLetterPattern.test(targetMarkdown)) {
        failures.push(`${document.target}: contains no Hangul`);
      }
      if (language === "vi" && koreanInVietnamesePattern.test(targetMarkdown)) {
        failures.push(`${document.target}: contains Korean text`);
      }
      if (language === "ko" && vietnameseInKoreanPattern.test(targetMarkdown)) {
        failures.push(`${document.target}: contains Vietnamese-specific letters`);
      }

      totals.sourceCodeGroups += localized.sourceGroups;
      totals.inlineCodeGroups += localized.inlineGroups;
      totals.deferredCodeGroups += localized.deferredGroups;

      if (language === "vi") {
        sourceTotals.headings += sourceSignature.headingLevels.length;
        sourceTotals.images += sourceSignature.images.length;
        sourceTotals.callouts += sourceSignature.calloutTypes.length;
        sourceTotals.tables += sourceSignature.tableShapes.length;
        sourceTotals.displayMath += sourceSignature.displayMath.length;
        sourceTotals.inlineMath += sourceSignature.inlineMath.length;
      }
    }

    if (totals.documents !== expectedCorpusTotals.documents ||
        totals.structurallyReady !== expectedCorpusTotals.documents ||
        totals.sourceCodeGroups !== expectedCorpusTotals.sourceCodeGroups ||
        totals.inlineCodeGroups !== expectedCorpusTotals.sourceCodeGroups ||
        totals.deferredCodeGroups !== 0) {
      failures.push(`${language}: incomplete full-book parity ${JSON.stringify(totals)}`);
    }
    localizedTotals[language] = totals;
  }

  for (const field of ["documents", "headings", "images", "callouts", "tables", "displayMath", "inlineMath"]) {
    if (sourceTotals[field] !== expectedCorpusTotals[field]) {
      failures.push(`locked English ${field} total is ${sourceTotals[field]}, expected ${expectedCorpusTotals[field]}`);
    }
  }

  return {
    schemaVersion: 1,
    sourceCommit: expectedSourceCommit,
    sourceDigest: sourceTree.digest,
    source: sourceTotals,
    localized: localizedTotals,
    failures
  };
}

async function run() {
  const report = await auditFullBook();
  if (report.failures.length) {
    throw new Error("Full-book audit failed:\n" + report.failures.map((failure) => `- ${failure}`).join("\n"));
  }
  console.log(
    `Full-book audit passed (${report.source.documents} locked English documents; ` +
    `${report.localized.vi.documents} Vietnamese and ${report.localized.ko.documents} Korean documents; ` +
    `${report.localized.vi.sourceCodeGroups} official code groups per localized edition).`
  );
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await run();
