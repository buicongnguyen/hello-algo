import { spawnSync } from "node:child_process";
import { markdownStructure } from "./translation-registry.mjs";

const [leftInput, rightInput, ...options] = process.argv.slice(2);
if (!leftInput || !rightInput || options.some((option) => option !== "--json")) {
  console.error("Usage: node scripts/compare-vietnamese-refs.mjs <left-ref> <right-ref> [--json]");
  process.exit(2);
}

function git(args, { optional = false } = {}) {
  const result = spawnSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true
  });
  if (result.status !== 0) {
    if (optional) return null;
    throw new Error(result.stderr.trim() || `git ${args.join(" ")} failed`);
  }
  return result.stdout;
}

function resolveRef(input) {
  return {
    input,
    commit: git(["rev-parse", "--verify", `${input}^{commit}`]).trim()
  };
}

function listVietnameseDocuments(ref) {
  return new Map(git(["ls-tree", "-r", ref, "--", "vi/docs"])
    .replaceAll("\r\n", "\n")
    .split("\n")
    .flatMap((line) => {
      const match = line.match(/^\d+\s+blob\s+([0-9a-f]+)\t(.+\.md)$/);
      return match ? [[match[2], match[1]]] : [];
    })
    .sort(([left], [right]) => left.localeCompare(right)));
}

function readObjects(objectIds) {
  const uniqueIds = [...new Set(objectIds)];
  if (!uniqueIds.length) return new Map();
  const result = spawnSync("git", ["cat-file", "--batch"], {
    cwd: process.cwd(),
    input: `${uniqueIds.join("\n")}\n`,
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true
  });
  if (result.status !== 0) throw new Error(result.stderr.toString("utf8").trim() || "git cat-file --batch failed");

  const objects = new Map();
  let cursor = 0;
  for (const requestedId of uniqueIds) {
    const headerEnd = result.stdout.indexOf(0x0a, cursor);
    if (headerEnd < 0) throw new Error(`Missing Git object header for ${requestedId}`);
    const header = result.stdout.subarray(cursor, headerEnd).toString("utf8");
    const match = header.match(/^([0-9a-f]+)\s+blob\s+(\d+)$/);
    if (!match) throw new Error(`Unexpected Git object header: ${header}`);
    const size = Number(match[2]);
    const contentStart = headerEnd + 1;
    objects.set(requestedId, result.stdout.subarray(contentStart, contentStart + size).toString("utf8"));
    cursor = contentStart + size + 1;
  }
  return objects;
}

function show(ref, file, optional = false) {
  return git(["show", `${ref}:${file}`], { optional });
}

function sourceRevision(ref) {
  const manifestText = show(ref, "vi/translation-status.json", true);
  let declared = null;
  if (manifestText) {
    try {
      declared = JSON.parse(manifestText).sourceCommit || null;
    } catch {
      declared = null;
    }
  }
  return {
    declared,
    englishDocsTree: git(["rev-parse", `${ref}:en/docs`], { optional: true })?.trim() || null
  };
}

function glossaryEntries(markdown) {
  const entries = new Map();
  if (!markdown) return entries;
  for (const line of markdown.replaceAll("\r\n", "\n").split("\n")) {
    const bilingual = line.match(/^\|\s*([^|—]+?)\s+—\s+([^|]+?)\s*\|$/);
    if (bilingual && !/English/i.test(bilingual[1])) {
      entries.set(bilingual[1].trim().toLowerCase(), bilingual[2].trim());
      continue;
    }
    const columns = line.split("|").slice(1, -1).map((value) => value.trim());
    if (columns.length >= 2 && columns[0] && columns[1] && !/^[-: ]+$/.test(columns[0]) && !/English/i.test(columns[0])) {
      entries.set(columns[0].toLowerCase(), columns[1]);
    }
  }
  return entries;
}

function glossaryProfile(ref) {
  const governance = show(ref, "vi/glossary.md", true);
  const appendix = show(ref, "vi/docs/chapter_appendix/terminology.md", true);
  const entries = glossaryEntries(appendix);
  for (const [term, translation] of glossaryEntries(governance)) entries.set(term, translation);
  return {
    source: governance ? "vi/glossary.md" : appendix ? "vi/docs/chapter_appendix/terminology.md" : null,
    bilingualEntries: entries.size,
    entries,
    raw: `${governance || ""}\n${appendix || ""}`
  };
}

const importantTerms = [
  "algorithm", "data structure", "function", "method", "iteration", "array", "linked list",
  "stack", "queue", "hash table", "hash function", "collision", "bucket", "tree", "heap",
  "graph", "binary search", "backtracking", "dynamic programming", "greedy"
];
const fields = ["headings", "images", "tables", "formulas", "displayMathFences", "inlineMath", "codeBlocks"];
function metric(structure, field) {
  if (field === "formulas") return structure.displayMathFences / 2 + structure.inlineMath;
  if (field === "codeBlocks") return structure.codeFences / 2;
  return structure[field];
}
const left = resolveRef(leftInput);
const right = resolveRef(rightInput);
const leftDocuments = listVietnameseDocuments(left.commit);
const rightDocuments = listVietnameseDocuments(right.commit);
const leftFiles = [...leftDocuments.keys()];
const rightFiles = [...rightDocuments.keys()];
const leftSet = new Set(leftFiles);
const rightSet = new Set(rightFiles);
const shared = leftFiles.filter((file) => rightSet.has(file));
const onlyLeft = leftFiles.filter((file) => !rightSet.has(file));
const onlyRight = rightFiles.filter((file) => !leftSet.has(file));
const objectContents = readObjects([
  ...shared.map((file) => leftDocuments.get(file)),
  ...shared.map((file) => rightDocuments.get(file))
]);
const differentTranslations = [];
const totals = {
  left: Object.fromEntries(fields.map((field) => [field, 0])),
  right: Object.fromEntries(fields.map((field) => [field, 0]))
};
const parityMismatches = Object.fromEntries(fields.map((field) => [field, []]));

for (const file of shared) {
  const leftObject = leftDocuments.get(file);
  const rightObject = rightDocuments.get(file);
  const leftMarkdown = objectContents.get(leftObject);
  const rightMarkdown = objectContents.get(rightObject);
  if (leftObject !== rightObject) differentTranslations.push(file);
  const structures = {
    left: markdownStructure(leftMarkdown),
    right: markdownStructure(rightMarkdown)
  };
  for (const field of fields) {
    const leftValue = metric(structures.left, field);
    const rightValue = metric(structures.right, field);
    totals.left[field] += leftValue;
    totals.right[field] += rightValue;
    if (leftValue !== rightValue) {
      parityMismatches[field].push({
        file,
        left: leftValue,
        right: rightValue
      });
    }
  }
}

const leftGlossary = glossaryProfile(left.commit);
const rightGlossary = glossaryProfile(right.commit);
const glossaryDifferences = importantTerms.flatMap((term) => {
  const leftValue = leftGlossary.entries.get(term) || null;
  const rightValue = rightGlossary.entries.get(term) || null;
  return leftValue !== rightValue ? [{ term, left: leftValue, right: rightValue }] : [];
});
const wordingCandidates = [
  { concept: "function", terms: ["hàm", "chức năng"] },
  { concept: "queue", terms: ["hàng đợi", "xếp hàng"] },
  { concept: "hash collision", terms: ["xung đột băm", "va chạm băm"] },
  { concept: "bucket", terms: ["bucket", "thùng", "xô"] }
];
const observedWording = wordingCandidates.flatMap(({ concept, terms }) => {
  const observed = (profile) => terms.filter((term) => profile.raw.toLocaleLowerCase("vi").includes(term));
  const leftTerms = observed(leftGlossary);
  const rightTerms = observed(rightGlossary);
  return JSON.stringify(leftTerms) !== JSON.stringify(rightTerms)
    ? [{ concept, left: leftTerms, right: rightTerms }]
    : [];
});
const report = {
  refs: {
    left: { ...left, source: sourceRevision(left.commit) },
    right: { ...right, source: sourceRevision(right.commit) }
  },
  documents: {
    left: leftFiles.length,
    right: rightFiles.length,
    shared: shared.length,
    differentTranslations: differentTranslations.length,
    identicalTranslations: shared.length - differentTranslations.length,
    onlyLeft,
    onlyRight,
    exercisesOnlyLeft: onlyLeft.filter((file) => file.endsWith("/exercises.md")),
    exercisesOnlyRight: onlyRight.filter((file) => file.endsWith("/exercises.md"))
  },
  structuralParity: {
    totals,
    mismatchDocuments: Object.fromEntries(fields.map((field) => [field, parityMismatches[field].length])),
    details: parityMismatches
  },
  glossary: {
    left: { source: leftGlossary.source, bilingualEntries: leftGlossary.bilingualEntries },
    right: { source: rightGlossary.source, bilingualEntries: rightGlossary.bilingualEntries },
    importantDifferences: glossaryDifferences,
    observedWording,
    note: "Differences are reported for review only; this tool never selects or merges wording."
  }
};

if (options.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const label = (side) => `${side.input} (${side.commit.slice(0, 12)})`;
const sourceLabel = (side) => side.source.declared
  ? `${side.source.declared} (declared), English tree ${side.source.englishDocsTree || "unavailable"}`
  : `not declared; English tree ${side.source.englishDocsTree || "unavailable"}`;
console.log(`# Vietnamese translation comparison

- Left: ${label(report.refs.left)}
- Right: ${label(report.refs.right)}
- Shared documents: ${report.documents.shared}
- Different translations: ${report.documents.differentTranslations}
- Identical translations: ${report.documents.identicalTranslations}
- Only left: ${report.documents.onlyLeft.length} (${report.documents.exercisesOnlyLeft.length} exercises)
- Only right: ${report.documents.onlyRight.length} (${report.documents.exercisesOnlyRight.length} exercises)
- Left source revision: ${sourceLabel(report.refs.left)}
- Right source revision: ${sourceLabel(report.refs.right)}

## Structural totals across shared documents

| Metric | Left | Right | Documents with different counts |
| --- | ---: | ---: | ---: |
${fields.map((field) => `| ${field} | ${totals.left[field]} | ${totals.right[field]} | ${parityMismatches[field].length} |`).join("\n")}

## Documents present on only one side

Left only:
${onlyLeft.length ? onlyLeft.map((file) => `- ${file}`).join("\n") : "- None"}

Right only:
${onlyRight.length ? onlyRight.map((file) => `- ${file}`).join("\n") : "- None"}

## Important glossary differences

- Left glossary: ${leftGlossary.source || "not found"} (${leftGlossary.bilingualEntries} bilingual entries)
- Right glossary: ${rightGlossary.source || "not found"} (${rightGlossary.bilingualEntries} bilingual entries)
${glossaryDifferences.length
  ? glossaryDifferences.map(({ term, left: leftValue, right: rightValue }) => `- ${term}: left=${leftValue || "not mapped"}; right=${rightValue || "not mapped"}`).join("\n")
  : "- No differences among the tracked terms."}
${observedWording.length
  ? `\nObserved wording that reviewers should inspect:\n${observedWording.map(({ concept, left: leftTerms, right: rightTerms }) => `- ${concept}: left=${leftTerms.join(", ") || "not observed"}; right=${rightTerms.join(", ") || "not observed"}`).join("\n")}`
  : ""}

This report is read-only. It does not choose, copy, or merge either translation.`);
