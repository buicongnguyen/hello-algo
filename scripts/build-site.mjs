import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

await import("./check-site.mjs");

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(projectRoot, "dist");
const rootFiles = ["index.html", "styles.css", "app.js", ".nojekyll"];
const coverFiles = [
  "chapter_complexity_analysis.jpg",
  "chapter_tree.jpg",
  "chapter_graph.jpg",
  "chapter_sorting.jpg",
  "chapter_backtracking.jpg",
  "chapter_dynamic_programming.jpg"
];

if (path.dirname(outputRoot) !== projectRoot || path.basename(outputRoot) !== "dist") {
  throw new Error("Refusing to rebuild outside the project dist directory");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of rootFiles) {
  await cp(path.join(projectRoot, file), path.join(outputRoot, file));
}

const coverOutput = path.join(outputRoot, "en", "docs", "assets", "covers");
await mkdir(coverOutput, { recursive: true });
for (const file of coverFiles) {
  await cp(
    path.join(projectRoot, "en", "docs", "assets", "covers", file),
    path.join(coverOutput, file)
  );
}

console.log(`Built GitHub Pages artifact in ${path.relative(projectRoot, outputRoot)} (${rootFiles.length + coverFiles.length} files).`);
