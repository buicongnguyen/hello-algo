import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { localizeVietnameseAtlas } from "./localize-vi-atlas.mjs";
import { htmlTranslations, interactiveLocale } from "../vi/atlas-locale.mjs";

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
  "VIETNAMESE_TRANSLATION_PLAN.md"
];

for (const relativePath of requiredFiles) {
  await access(path.join(projectRoot, relativePath), constants.R_OK);
}

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
const css = await readFile(path.join(projectRoot, "styles.css"), "utf8");
const js = await readFile(path.join(projectRoot, "app.js"), "utf8");
const viHtml = localizeVietnameseAtlas(html);
const bookCss = await readFile(path.join(projectRoot, "vi", "book.css"), "utf8");
const bookJs = await readFile(path.join(projectRoot, "vi", "book.js"), "utf8");
const translationStatus = JSON.parse(await readFile(path.join(projectRoot, "vi", "translation-status.json"), "utf8"));
const translationPlan = await readFile(path.join(projectRoot, "VIETNAMESE_TRANSLATION_PLAN.md"), "utf8");

const failures = [];
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...ids].filter((id) => html.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate HTML id: ${duplicate}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  if (reference === "../vi/") continue;
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
const englishSectionIds = [...html.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
const vietnameseSectionIds = [...viHtml.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
if (JSON.stringify(englishSectionIds) !== JSON.stringify(vietnameseSectionIds)) {
  failures.push("Vietnamese Atlas does not have section-for-section parity with English");
}
const translations = Object.entries(htmlTranslations).sort(([a], [b]) => b.length - a.length);
const translateStatic = (value) => translations.reduce((result, [english, vietnamese]) => result.replaceAll(english, vietnamese), value);
const intentionalSharedLabels = new Set([
  "Hello Algo Atlas", "Hello Algo", "Atlas", "learning-path.graph",
  "O(log n)", "O(n log n)", "low", "mid", "high"
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
if (!viHtml.includes("Kế hoạch dịch ↗") || !viHtml.includes("window.HELLO_ALGO_LOCALE=")) {
  failures.push("Vietnamese Atlas supporting links or interactive locale payload is missing");
}
if (Object.keys(interactiveLocale.topicData).length !== 13 || Object.keys(interactiveLocale.structureData).length !== 6 || Object.keys(interactiveLocale.choiceData).length !== 5) {
  failures.push("Vietnamese interactive datasets are incomplete");
}
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
if (translationStatus.sourceCommit !== "4935d2d3877a6205008d89def8d2ba43f7e06275") {
  failures.push("Vietnamese translation source commit is not locked to the audited upstream revision");
}
if (translationStatus.documents.length !== 6 || translationStatus.documents.some((document) => document.status !== "pilot")) {
  failures.push("Expected 6 transparently labelled Vietnamese pilot documents");
}
for (const document of translationStatus.documents) {
  for (const relativePath of [document.source, document.target]) {
    try {
      await access(path.join(projectRoot, relativePath), constants.R_OK);
    } catch {
      failures.push(`Translation status references a missing file: ${relativePath}`);
    }
  }
}
if (translationPlan.length < 15000 || !translationPlan.includes("Sáu giai đoạn phát triển")) {
  failures.push("Vietnamese translation plan is not sufficiently detailed");
}

if (failures.length) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Hello Algo bilingual site passed static checks (${ids.size} English IDs, ${viIds.size} Vietnamese IDs, ${requiredFiles.length} core files).`);
