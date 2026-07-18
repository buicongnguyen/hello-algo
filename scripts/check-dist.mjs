import { access, readdir, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtml(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

async function referenceExists(candidate) {
  try {
    const details = await stat(candidate);
    if (details.isDirectory()) {
      await access(path.join(candidate, "index.html"), constants.R_OK);
    } else {
      await access(candidate, constants.R_OK);
    }
    return true;
  } catch {
    return false;
  }
}

export async function checkBuiltSite(outputRoot) {
  const failures = [];
  const htmlFiles = await collectHtml(outputRoot);

  for (const htmlFile of htmlFiles) {
    const relativeHtml = path.relative(outputRoot, htmlFile).replaceAll("\\", "/");
    const html = await readFile(htmlFile, "utf8");
    if (!/<html lang="(?:vi|en|ko)">/.test(html)) failures.push(`${relativeHtml} has no supported document language`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length) failures.push(`${relativeHtml} has duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);

    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const rawReference = match[1];
      if (/^(https?:|mailto:|data:)/.test(rawReference)) continue;
      const [pathAndQuery, fragment] = rawReference.split("#", 2);
      const reference = pathAndQuery.split("?")[0];
      const candidate = reference ? path.resolve(path.dirname(htmlFile), decodeURIComponent(reference)) : htmlFile;
      if (!candidate.startsWith(outputRoot + path.sep) || !await referenceExists(candidate)) {
        failures.push(`${relativeHtml} has a broken local reference: ${reference || rawReference}`);
        continue;
      }
      if (fragment) {
        const candidateStats = await stat(candidate);
        const targetHtml = candidateStats.isDirectory() ? path.join(candidate, "index.html") : candidate;
        if (path.extname(targetHtml) === ".html") {
          const target = await readFile(targetHtml, "utf8");
          const decodedFragment = decodeURIComponent(fragment);
          if (!target.includes(`id="${decodedFragment}"`)) {
            failures.push(`${relativeHtml} links to missing fragment #${decodedFragment} in ${path.relative(outputRoot, targetHtml).replaceAll("\\", "/")}`);
          }
        }
      }
    }
  }

  const pilotDirectory = path.join(outputRoot, "vi", "learn");
  const pilotPages = (await readdir(pilotDirectory)).filter((file) => file.endsWith(".html"));
  const translationStatus = JSON.parse(await readFile(path.join(outputRoot, "vi", "translation-status.json"), "utf8"));
  if (pilotPages.length !== translationStatus.documents.length) {
    failures.push(`Expected ${translationStatus.documents.length} Vietnamese pilot pages, found ${pilotPages.length}`);
  }
  const routes = translationStatus.documents.map((document) => document.route);
  if (new Set(routes).size !== routes.length) failures.push("Vietnamese translation status contains duplicate routes");
  for (const route of routes) {
    const candidate = path.join(outputRoot, route, route.endsWith("/") ? "index.html" : "");
    if (!await referenceExists(candidate)) failures.push(`Translation status route was not built: ${route}`);
  }

  const pilotHome = await readFile(path.join(pilotDirectory, "index.html"), "utf8");
  if (!pilotHome.includes("Bản thử · nguồn khóa tại") || !pilotHome.includes("CC BY-NC-SA 4.0")) {
    failures.push("Vietnamese pilot pages are missing source-lock or license disclosure");
  }
  if (!pilotHome.includes("26 / 105 tài liệu") || (pilotHome.match(/class="book-nav-group"/g) || []).length !== 5) {
    failures.push("Vietnamese reader progress or Chapters 0–4 navigation is incomplete");
  }
  for (const pilotPage of pilotPages) {
    const html = await readFile(path.join(pilotDirectory, pilotPage), "utf8");
    if (/\$[^$<>]+\$/.test(html)) failures.push(`${pilotPage} contains unrendered inline math`);
    if (html.includes("```") || html.includes("```src")) failures.push(`${pilotPage} contains an unrendered code fence`);
    if (/^(?:===|!!!|\?\?\?|--8<--)/m.test(html)) failures.push(`${pilotPage} contains unrendered MkDocs-only syntax`);
    if (/\\(?:Omega|Theta|times|cdot|dots|le|ge|lfloor|rfloor)\b/.test(html)) failures.push(`${pilotPage} contains an unreadable raw math command`);
    if (!html.includes("Chuyển ngữ, chọn lọc ví dụ và biên tập bổ sung") || !html.includes("krahets và cộng đồng đóng góp")) {
      failures.push(`${pilotPage} does not disclose source authorship, translation, selection, and editorial modification`);
    }
    if (!html.includes("Đọc trang tương ứng bằng tiếng Anh")) failures.push(`${pilotPage} has no corresponding English-page option`);
    if (!html.includes('hreflang="ko"')) failures.push(`${pilotPage} has no Korean option`);
  }

  const koreanDirectory = path.join(outputRoot, "ko", "learn");
  const koreanPages = (await readdir(koreanDirectory)).filter((file) => file.endsWith(".html"));
  const koreanStatus = JSON.parse(await readFile(path.join(outputRoot, "ko", "translation-status.json"), "utf8"));
  if (koreanPages.length !== koreanStatus.documents.length || koreanPages.length !== 14) failures.push(`Expected 14 Korean pilot pages, found ${koreanPages.length}`);
  const koreanRoutes = koreanStatus.documents.map((document) => document.route);
  if (new Set(koreanRoutes).size !== koreanRoutes.length) failures.push("Korean translation status contains duplicate routes");
  for (const route of koreanRoutes) {
    const candidate = path.join(outputRoot, route, route.endsWith("/") ? "index.html" : "");
    if (!await referenceExists(candidate)) failures.push(`Korean status route was not built: ${route}`);
  }
  const koreanHome = await readFile(path.join(koreanDirectory, "index.html"), "utf8");
  if (!koreanHome.includes('lang="ko"') || !koreanHome.includes("14 / 105 문서") || (koreanHome.match(/class="book-nav-group"/g) || []).length !== 3) failures.push("Korean reader metadata, progress, or Chapters 0–2 navigation is incomplete");
  if (!koreanHome.includes("CC BY-NC-SA 4.0") || !koreanHome.includes("공식 후원을 의미하지 않습니다")) failures.push("Korean reader is missing source and license disclosure");
  for (const koreanPage of koreanPages) {
    const pageHtml = await readFile(path.join(koreanDirectory, koreanPage), "utf8");
    if (!pageHtml.includes('hreflang="ko"') || !pageHtml.includes('hreflang="vi"') || !pageHtml.includes('hreflang="en"')) failures.push(`${koreanPage} does not expose KO / VI / EN options`);
    if (pageHtml.includes("```") || /\$[^$<>]+\$/.test(pageHtml)) failures.push(`${koreanPage} contains unrendered Markdown`);
  }
  const koreanTime = await readFile(path.join(koreanDirectory, "time-complexity.html"), "utf8");
  if (!koreanTime.includes('<pre><code class="language-python"') || !koreanTime.includes('class="math-block"')) failures.push("Korean time-complexity page is missing rendered Python or display mathematics");

  const timeComplexityPage = await readFile(path.join(pilotDirectory, "do-phuc-tap-thoi-gian.html"), "utf8");
  if (!timeComplexityPage.includes('<pre><code class="language-python"') || !timeComplexityPage.includes('class="math-block"')) {
    failures.push("Vietnamese time-complexity page is missing rendered code or display mathematics");
  }

  const numberEncodingPage = await readFile(path.join(pilotDirectory, "ma-hoa-so.html"), "utf8");
  if (!numberEncodingPage.includes('class="math-block"') || !numberEncodingPage.includes("ieee_754_float.png")) {
    failures.push("Vietnamese number-encoding page is missing rendered mathematics or its IEEE 754 diagram");
  }

  const arrayPage = await readFile(path.join(pilotDirectory, "mang.html"), "utf8");
  const linkedListPage = await readFile(path.join(pilotDirectory, "danh-sach-lien-ket.html"), "utf8");
  if (!arrayPage.includes('<pre><code class="language-python"') || !arrayPage.includes("array_definition.png") ||
      !linkedListPage.includes('<pre><code class="language-python"') || !linkedListPage.includes("linkedlist_definition.png")) {
    failures.push("Vietnamese Chapter 4 pages are missing representative Python code or core diagrams");
  }

  const englishAtlas = await readFile(path.join(outputRoot, "en", "index.html"), "utf8");
  const vietnameseAtlas = await readFile(path.join(outputRoot, "vi", "index.html"), "utf8");
  const koreanAtlas = await readFile(path.join(outputRoot, "ko", "index.html"), "utf8");
  const sectionIds = (document) => [...document.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
  if (JSON.stringify(sectionIds(englishAtlas)) !== JSON.stringify(sectionIds(vietnameseAtlas))) {
    failures.push("Built Vietnamese Atlas does not match the English section structure");
  }
  if (JSON.stringify(sectionIds(englishAtlas)) !== JSON.stringify(sectionIds(koreanAtlas)) || !koreanAtlas.includes("window.HELLO_ALGO_LOCALE=")) failures.push("Built Korean Atlas does not match the English structure or lacks its locale payload");
  if (!vietnameseAtlas.includes("window.HELLO_ALGO_LOCALE=") ||
      !vietnameseAtlas.includes('data-topic="hashing"') ||
      !vietnameseAtlas.includes('data-topic="heaps"')) {
    failures.push("Built Vietnamese Atlas is missing its locale payload or stable interaction keys");
  }

  if (failures.length) {
    throw new Error("Built-site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  }

  console.log(`Built-site checks passed (${htmlFiles.length} HTML pages, ${pilotPages.length} Vietnamese and ${koreanPages.length} Korean pilot pages, no broken local references).`);
}
