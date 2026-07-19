import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { localizeVietnameseAtlas } from "./localize-vi-atlas.mjs";
import { htmlTranslations, interactiveLocale } from "../vi/atlas-locale.mjs";
import { localizeKoreanAtlas } from "./localize-ko-atlas.mjs";
import { interactiveLocale as koreanInteractiveLocale } from "../ko/atlas-locale.mjs";
import { createTranslationRegistry, translationReadinessFailures } from "./translation-registry.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  ".nojekyll",
  "vi/atlas-locale.mjs",
  "vi/book.css",
  "vi/book.js",
  "vi/README.md",
  "vi/CONTRIBUTING.md",
  "vi/glossary.md",
  "vi/style-guide.md",
  "vi/translation-status.json",
  "scripts/build-vi-book.mjs",
  "scripts/check-dist.mjs",
  "scripts/localize-vi-atlas.mjs",
  "VIETNAMESE_TRANSLATION_PLAN.md",
  "KOREAN_TRANSLATION_PLAN.md",
  "ko/atlas-locale.mjs", "ko/README.md", "ko/CONTRIBUTING.md", "ko/glossary.md", "ko/style-guide.md", "ko/translation-status.json",
  "scripts/build-en-book.mjs", "scripts/build-ko-book.mjs", "scripts/localize-ko-atlas.mjs", "scripts/localize-atlas.mjs", "scripts/translation-registry.mjs"
];

for (const relativePath of requiredFiles) {
  await access(path.join(projectRoot, relativePath), constants.R_OK);
}

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
const css = await readFile(path.join(projectRoot, "styles.css"), "utf8");
const js = await readFile(path.join(projectRoot, "app.js"), "utf8");
const viHtml = localizeVietnameseAtlas(html);
const koHtml = localizeKoreanAtlas(html);
const bookCss = await readFile(path.join(projectRoot, "vi", "book.css"), "utf8");
const bookJs = await readFile(path.join(projectRoot, "vi", "book.js"), "utf8");
const translationStatus = JSON.parse(await readFile(path.join(projectRoot, "vi", "translation-status.json"), "utf8"));
const translationPlan = await readFile(path.join(projectRoot, "VIETNAMESE_TRANSLATION_PLAN.md"), "utf8");
const koreanPlan = await readFile(path.join(projectRoot, "KOREAN_TRANSLATION_PLAN.md"), "utf8");
const vietnameseGlossary = await readFile(path.join(projectRoot, "vi", "glossary.md"), "utf8");
const koreanContributing = await readFile(path.join(projectRoot, "ko", "CONTRIBUTING.md"), "utf8");
const koreanStatus = JSON.parse(await readFile(path.join(projectRoot, "ko", "translation-status.json"), "utf8"));
const translationRegistry = createTranslationRegistry({ vi: translationStatus, ko: koreanStatus });

const failures = [];
function countMarkdownH1(markdown) {
  let inCodeFence = false;
  let count = 0;
  for (const line of markdown.replaceAll("\r\n", "\n").split("\n")) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (!inCodeFence && line.startsWith("# ")) count += 1;
  }
  return count;
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...ids].filter((id) => html.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate HTML id: ${duplicate}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  if (reference === "../vi/" || reference === "../ko/" || reference === "learn/") continue;
  const localPath = path.join(projectRoot, decodeURIComponent(reference));
  try {
    await access(localPath, constants.R_OK);
  } catch {
    failures.push(`Missing local reference: ${reference}`);
  }
}

const viIds = new Set([...viHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...viIds].filter((id) => viHtml.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate Vietnamese HTML id: ${duplicate}`);
}

for (const match of viHtml.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  if (reference.startsWith("learn/")) continue;
  const localPath = path.resolve(projectRoot, "vi", decodeURIComponent(reference));
  try {
    await access(localPath, constants.R_OK);
  } catch {
    failures.push(`Missing Vietnamese local reference: ${reference}`);
  }
}

for (const selector of [
  "roadmap-canvas",
  "structure-visual",
  "traversal-canvas",
  "complexity-canvas",
  "binary-array",
  "binary-target",
  "binary-next",
  "theme-toggle"
]) {
  if (!html.includes(`id="${selector}"`) || !js.includes(`#${selector}`)) {
    failures.push(`Interactive element is not wired: ${selector}`);
  }
}

const motionSources = [...html.matchAll(/<source src="([^"]+\.mp4)"/g)].map((match) => match[1]);
if (motionSources.length !== 3) failures.push(`Expected 3 motion demos, found ${motionSources.length}`);
if (!js.includes("IntersectionObserver") || !js.includes("prefers-reduced-motion")) {
  failures.push("Motion playback does not include visibility and reduced-motion handling");
}

if (!css.includes("@media (max-width: 760px)")) failures.push("Responsive layout breakpoint is missing");
if (!html.includes("Skip to content")) failures.push("Skip link is missing");
if (!html.includes("aria-live=")) failures.push("Live status region is missing");
if (!html.includes('class="language-switch"') || !html.includes('href="../vi/"')) {
  failures.push("English page language switch is missing");
}
if (!viHtml.includes('<html lang="vi">') || !viHtml.includes('href="../en/"')) {
  failures.push("Vietnamese page or English language option is missing");
}
if (!koHtml.includes('<html lang="ko">') || !koHtml.includes('href="../vi/"') || !koHtml.includes('href="../en/"')) failures.push("Korean Atlas or its language options are missing");
const englishSectionIds = [...html.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
const vietnameseSectionIds = [...viHtml.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
const koreanSectionIds = [...koHtml.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
if (JSON.stringify(englishSectionIds) !== JSON.stringify(vietnameseSectionIds)) {
  failures.push("Vietnamese Atlas does not have section-for-section parity with English");
}
if (JSON.stringify(englishSectionIds) !== JSON.stringify(koreanSectionIds)) failures.push("Korean Atlas does not have section-for-section parity with English");
const translations = Object.entries(htmlTranslations).sort(([a], [b]) => b.length - a.length);
const translateStatic = (value) => translations.reduce((result, [english, vietnamese]) => result.replaceAll(english, vietnamese), value);
const intentionalSharedLabels = new Set([
  "Hello Algo Atlas", "Hello Algo", "Atlas", "learning-path.graph",
  "English reader", "O(log n)", "O(n log n)", "low", "mid", "high"
]);
const untranslatedText = [...html.replace(/<script[\s\S]*?<\/script>/g, "").matchAll(/>([^<]+)</g)]
  .map((match) => match[1].trim())
  .filter((value) => value && /[A-Za-z]{3}/.test(value) && translateStatic(value) === value && !intentionalSharedLabels.has(value));
if (untranslatedText.length) {
  failures.push(`Vietnamese Atlas has untranslated static text: ${[...new Set(untranslatedText)].join(" | ")}`);
}
for (const attribute of ["data-topic", "data-structure", "data-mode", "data-sort-filter", "data-sort-family", "data-choice"]) {
  const values = (document) => [...document.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
  if (JSON.stringify(values(html)) !== JSON.stringify(values(viHtml))) {
    failures.push(`Vietnamese Atlas changed the interactive contract for ${attribute}`);
  }
}
if (!viHtml.includes('href="learn/"') || !viHtml.includes("Bản đồ học tập tương tác")) {
  failures.push("Vietnamese Atlas or pilot reading entry is missing");
}
if ((html.match(/href="learn\/"/g) || []).length < 2 || (viHtml.match(/href="learn\/"/g) || []).length < 2 || (koHtml.match(/href="learn\/"/g) || []).length < 2) failures.push("Every Atlas header and footer must link to its reader");
if (!viHtml.includes("Kế hoạch dịch ↗") || !viHtml.includes("window.HELLO_ALGO_LOCALE=")) {
  failures.push("Vietnamese Atlas supporting links or interactive locale payload is missing");
}
for (const awkwardPhrase of ["truy cập rẻ", "đưa ra phần tử mới nhất", "Gốc có ngay lập tức", "lần đến đầu tiên cho ít cạnh nhất"]) {
  if (viHtml.includes(awkwardPhrase)) failures.push(`Vietnamese Atlas still contains the reviewed phrase: ${awkwardPhrase}`);
}
if (Object.keys(interactiveLocale.topicData).length !== 13 || Object.keys(interactiveLocale.structureData).length !== 6 || Object.keys(interactiveLocale.choiceData).length !== 5) {
  failures.push("Vietnamese interactive datasets are incomplete");
}
if (Object.keys(koreanInteractiveLocale.topicData).length !== 13 || Object.keys(koreanInteractiveLocale.structureData).length !== 6 || Object.keys(koreanInteractiveLocale.choiceData).length !== 5 || !koreanInteractiveLocale.ui) failures.push("Korean interactive datasets are incomplete");
if (koHtml.includes("See the connections.") || koHtml.includes("Learn in dependency order") || !koHtml.includes("window.HELLO_ALGO_LOCALE=")) failures.push("Korean Atlas still contains primary English copy or lacks its locale payload");
for (const [attribute, dataset] of [
  ["data-topic", interactiveLocale.topicData],
  ["data-structure", interactiveLocale.structureData],
  ["data-choice", interactiveLocale.choiceData]
]) {
  const interactionKeys = [...new Set([...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]))].sort();
  if (JSON.stringify(interactionKeys) !== JSON.stringify(Object.keys(dataset).sort())) {
    failures.push(`Vietnamese locale keys do not match ${attribute}`);
  }
}
if (viHtml.includes("See the connections.") || viHtml.includes("Choose the shape that makes the operation cheap")) {
  failures.push("Vietnamese Atlas still contains primary English copy");
}
if (!bookCss.includes("@media (max-width: 820px)") || !bookJs.includes("reader-menu")) {
  failures.push("Vietnamese reader responsive navigation is incomplete");
}
if (translationStatus.sourceCommit !== "a3166c201853739213d5a3a31b1e4a237aaf1076") {
  failures.push("Vietnamese translation source commit is not locked to the audited upstream revision");
}
if (translationStatus.documents.length !== 104 || translationStatus.documents.some((document) => !["draft", "pilot", "published"].includes(document.status))) {
  failures.push("Expected 104 source-locked Vietnamese reader documents at draft or later status");
}
if (translationStatus.documents.filter((document) => document.status === "pilot").length !== 13 || translationStatus.documents.filter((document) => document.status === "draft").length !== 91) {
  failures.push("Vietnamese status ledger must contain 13 structurally verified pilots and 91 drafts");
}
for (const document of translationStatus.documents) {
  for (const relativePath of [document.source, document.target]) {
    try {
      await access(path.join(projectRoot, relativePath), constants.R_OK);
    } catch {
      failures.push(`Translation status references a missing file: ${relativePath}`);
    }
  }
  try {
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const targetMarkdown = await readFile(path.join(projectRoot, document.target), "utf8");
    const h1Count = countMarkdownH1(targetMarkdown);
    if (h1Count !== 1) failures.push(`${document.target} must contain exactly one H1`);
    if (/^(?:===|--8<--)/m.test(targetMarkdown)) {
      failures.push(`${document.target} contains unsupported MkDocs-only syntax`);
    }
    if ((targetMarkdown.match(/^```/gm) || []).length % 2 !== 0) {
      failures.push(`${document.target} contains an unbalanced code fence`);
    }
    if ((targetMarkdown.match(/^\$\$$/gm) || []).length % 2 !== 0) {
      failures.push(`${document.target} contains an unbalanced display-math fence`);
    }
    const narrative = targetMarkdown
      .replace(/```[\s\S]*?```/g, "")
      .replaceAll("chúng ta", "")
      .replaceAll("Chúng ta", "");
    if (/\bta\b/i.test(narrative)) failures.push(`${document.target} uses the disallowed standalone narrator “ta”`);
    if (["pilot", "published"].includes(document.status)) {
      const readinessFailures = translationReadinessFailures(sourceMarkdown, targetMarkdown);
      if (readinessFailures.length) failures.push(`${document.target} cannot be promoted to ${document.status}: ${readinessFailures.join(", ")}`);
    }
  } catch {
    // Missing targets are reported by the existence check above.
  }
}
if (translationRegistry.sourceCommit !== translationStatus.sourceCommit || koreanStatus.documents.length !== 104 || koreanStatus.documents.some((document) => document.status !== "draft")) failures.push("Expected 104 source-locked Korean reader documents at draft status");
for (const document of koreanStatus.documents) {
  for (const relativePath of [document.source, document.target]) {
    try { await access(path.join(projectRoot, relativePath), constants.R_OK); } catch { failures.push(`Korean status references a missing file: ${relativePath}`); }
  }
  try {
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const markdown = await readFile(path.join(projectRoot, document.target), "utf8");
    if (countMarkdownH1(markdown) !== 1) failures.push(`${document.target} must contain exactly one H1`);
    if ((markdown.match(/^```/gm) || []).length % 2 !== 0) failures.push(`${document.target} contains an unbalanced code fence`);
    if ((markdown.match(/^\$\$$/gm) || []).length % 2 !== 0) failures.push(`${document.target} contains an unbalanced display-math fence`);
    if (/\b(?:TODO|TBD|FIXME)\b/.test(markdown)) failures.push(`${document.target} contains an unresolved marker`);
    if (["pilot", "published"].includes(document.status)) {
      const readinessFailures = translationReadinessFailures(sourceMarkdown, markdown);
      if (readinessFailures.length) failures.push(`${document.target} cannot be promoted to ${document.status}: ${readinessFailures.join(", ")}`);
    }
  } catch { /* Missing files are reported above. */ }
}
if (translationPlan.length < 15000 || !translationPlan.includes("Sáu giai đoạn phát triển")) {
  failures.push("Vietnamese translation plan is not sufficiently detailed");
}
if (koreanPlan.length < 20000 || !koreanPlan.includes("Korean pilot `v0.1`")) {
  failures.push("Korean translation plan is not sufficiently detailed");
}
if (vietnameseGlossary.includes("4935d2d") || koreanContributing.includes("4935d2d") || !vietnameseGlossary.includes(translationStatus.sourceCommit) || !koreanContributing.includes(koreanStatus.sourceCommit)) {
  failures.push("Translation governance files do not use the current locked upstream revision");
}

if (failures.length) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Hello Algo trilingual site passed static checks (${ids.size} English IDs, ${viIds.size} Vietnamese IDs, ${koreanSectionIds.length} Korean sections, ${requiredFiles.length} core files).`);
