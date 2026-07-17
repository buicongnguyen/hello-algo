import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

await import("./check-site.mjs");

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(projectRoot, "dist");
const sharedFiles = ["styles.css", "app.js", ".nojekyll"];
const coverFiles = [
  "chapter_complexity_analysis.jpg",
  "chapter_tree.jpg",
  "chapter_graph.jpg",
  "chapter_sorting.jpg",
  "chapter_backtracking.jpg",
  "chapter_dynamic_programming.jpg"
];
const motionFiles = ["animation.mp4", "running_code.mp4", "comment.mp4"];

if (path.dirname(outputRoot) !== projectRoot || path.basename(outputRoot) !== "dist") {
  throw new Error("Refusing to rebuild outside the project dist directory");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of sharedFiles) {
  await cp(path.join(projectRoot, file), path.join(outputRoot, file));
}

const sourceEnglish = await readFile(path.join(projectRoot, "index.html"), "utf8");
const builtEnglish = sourceEnglish
  .replace('href="styles.css', 'href="../styles.css')
  .replace('src="app.js', 'src="../app.js')
  .replaceAll('src="en/docs/', 'src="docs/');
const englishOutput = path.join(outputRoot, "en");
await mkdir(englishOutput, { recursive: true });
await writeFile(path.join(englishOutput, "index.html"), builtEnglish);

await cp(path.join(projectRoot, "vi"), path.join(outputRoot, "vi"), { recursive: true });

const redirectPage = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=vi/">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/vi/">
  <title>Hello Algo Việt Nam</title>
  <script>location.replace("vi/" + location.search + location.hash);</script>
</head>
<body><p>Đang mở <a href="vi/">Hello Algo Việt Nam</a>…</p></body>
</html>`;
await writeFile(path.join(outputRoot, "index.html"), redirectPage);

const coverOutput = path.join(outputRoot, "en", "docs", "assets", "covers");
await mkdir(coverOutput, { recursive: true });
for (const file of coverFiles) {
  await cp(
    path.join(projectRoot, "en", "docs", "assets", "covers", file),
    path.join(coverOutput, file)
  );
}

const motionOutput = path.join(outputRoot, "en", "docs", "index.assets");
await mkdir(motionOutput, { recursive: true });
for (const file of motionFiles) {
  await cp(
    path.join(projectRoot, "en", "docs", "index.assets", file),
    path.join(motionOutput, file)
  );
}

console.log(`Built bilingual GitHub Pages artifact in ${path.relative(projectRoot, outputRoot)} (Vietnamese default, English Atlas, ${coverFiles.length} covers, ${motionFiles.length} motion demos).`);
