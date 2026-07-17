import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const requiredFiles = ["index.html", "styles.css", "app.js", ".nojekyll"];

for (const relativePath of requiredFiles) {
  await access(path.join(projectRoot, relativePath), constants.R_OK);
}

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
const css = await readFile(path.join(projectRoot, "styles.css"), "utf8");
const js = await readFile(path.join(projectRoot, "app.js"), "utf8");

const failures = [];
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...ids].filter((id) => html.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate HTML id: ${duplicate}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  const localPath = path.join(projectRoot, decodeURIComponent(reference));
  try {
    await access(localPath, constants.R_OK);
  } catch {
    failures.push(`Missing local reference: ${reference}`);
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

if (failures.length) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Hello Algo Atlas passed static checks (${ids.size} unique IDs, ${requiredFiles.length} core files).`);
