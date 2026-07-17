import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  ".nojekyll",
  "vi/index.html",
  "vi/vi.css",
  "vi/vi.js",
  "VIETNAMESE_TRANSLATION_PLAN.md"
];

for (const relativePath of requiredFiles) {
  await access(path.join(projectRoot, relativePath), constants.R_OK);
}

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
const css = await readFile(path.join(projectRoot, "styles.css"), "utf8");
const js = await readFile(path.join(projectRoot, "app.js"), "utf8");
const viHtml = await readFile(path.join(projectRoot, "vi", "index.html"), "utf8");
const viCss = await readFile(path.join(projectRoot, "vi", "vi.css"), "utf8");
const viJs = await readFile(path.join(projectRoot, "vi", "vi.js"), "utf8");
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
if ((viHtml.match(/class="phase-card/g) || []).length !== 6 || !viJs.includes("phaseButtons")) {
  failures.push("Vietnamese translation roadmap interaction is incomplete");
}
if (!viCss.includes("@media (max-width: 760px)") || !viHtml.includes("Bản dịch cộng đồng")) {
  failures.push("Vietnamese status or responsive layout is missing");
}
if (translationPlan.length < 15000 || !translationPlan.includes("Sáu giai đoạn phát triển")) {
  failures.push("Vietnamese translation plan is not sufficiently detailed");
}

if (failures.length) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Hello Algo bilingual site passed static checks (${ids.size} English IDs, ${viIds.size} Vietnamese IDs, ${requiredFiles.length} core files).`);
