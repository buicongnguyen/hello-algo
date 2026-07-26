import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildVietnameseBook } from "./build-vi-book.mjs";
import { buildKoreanBook } from "./build-ko-book.mjs";
import { buildEnglishBook } from "./build-en-book.mjs";
import { checkBuiltSite } from "./check-dist.mjs";
import { localizeVietnameseAtlas } from "./localize-vi-atlas.mjs";
import { localizeKoreanAtlas } from "./localize-ko-atlas.mjs";
import { createTranslationParityReport } from "./translation-parity.mjs";
import { englishReaderCatalog } from "./translation-registry.mjs";

await import("./check-site.mjs");
await import("./check-javascript-examples.mjs");

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

const vietnameseOutput = path.join(outputRoot, "vi");
await mkdir(vietnameseOutput, { recursive: true });
const vietnameseStatus = JSON.parse(await readFile(path.join(projectRoot, "vi", "translation-status.json"), "utf8"));
await cp(path.join(projectRoot, "vi", "translation-status.json"), path.join(vietnameseOutput, "translation-status.json"));
await writeFile(
  path.join(vietnameseOutput, "translation-parity.json"),
  JSON.stringify(await createTranslationParityReport({ projectRoot, manifest: vietnameseStatus }), null, 2) + "\n"
);
await writeFile(path.join(vietnameseOutput, "index.html"), localizeVietnameseAtlas(sourceEnglish));

const vietnameseBook = await buildVietnameseBook({ projectRoot, outputRoot });

const koreanOutput = path.join(outputRoot, "ko");
await mkdir(koreanOutput, { recursive: true });
const koreanStatus = JSON.parse(await readFile(path.join(projectRoot, "ko", "translation-status.json"), "utf8"));
await cp(path.join(projectRoot, "ko", "translation-status.json"), path.join(koreanOutput, "translation-status.json"));
await writeFile(
  path.join(koreanOutput, "translation-parity.json"),
  JSON.stringify(await createTranslationParityReport({ projectRoot, manifest: koreanStatus }), null, 2) + "\n"
);
await writeFile(path.join(koreanOutput, "index.html"), localizeKoreanAtlas(sourceEnglish));
const koreanBook = await buildKoreanBook({ projectRoot, outputRoot });
const englishBook = await buildEnglishBook({ projectRoot, outputRoot });

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

const siteRoot = "https://buicongnguyen.github.io/hello-algo/";
const sitemapRoutes = [
  "",
  "en/",
  "vi/",
  "ko/",
  ...englishReaderCatalog.map((page) => page.route),
  ...vietnameseStatus.documents.map((document) => document.route),
  ...koreanStatus.documents.map((document) => document.route)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url><loc>${siteRoot}${route}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap);
await writeFile(path.join(outputRoot, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteRoot}sitemap.xml\n`);

const notFoundPage = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Không tìm thấy trang · Hello Algo</title>
  <link rel="stylesheet" href="${siteRoot}styles.css?v=20260726a">
  <style>.not-found{width:min(calc(100% - 2rem),720px);margin:12vh auto;padding:2rem}.not-found nav{display:flex;flex-wrap:wrap;gap:.7rem}.not-found nav a{padding:.7rem 1rem;border:1px solid currentColor;border-radius:.6rem;text-decoration:none}</style>
</head>
<body>
  <main class="not-found">
    <p class="eyebrow">404 · Hello Algo</p>
    <h1>Không tìm thấy trang</h1>
    <p>Đường dẫn có thể đã thay đổi. Chọn ngôn ngữ để trở lại bản đọc đầy đủ.</p>
    <nav aria-label="Chọn ngôn ngữ">
      <a href="${siteRoot}vi/learn/" lang="vi">Tiếng Việt</a>
      <a href="${siteRoot}ko/learn/" lang="ko">한국어</a>
      <a href="${siteRoot}en/learn/" lang="en">English</a>
    </nav>
  </main>
</body>
</html>`;
await writeFile(path.join(outputRoot, "404.html"), notFoundPage);

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

await checkBuiltSite(outputRoot);

console.log(`Built trilingual GitHub Pages artifact in ${path.relative(projectRoot, outputRoot)} (Vietnamese default, ${vietnameseBook.pageCount} Vietnamese, ${koreanBook.pageCount} Korean, and ${englishBook.pageCount} local English reading pages, English Atlas, ${coverFiles.length} Atlas covers, ${motionFiles.length} motion demos).`);
