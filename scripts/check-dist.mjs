import { access, readdir, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { createTranslationRegistry, englishReaderHref, englishReaderRoutes, readerHref, routeFileName } from "./translation-registry.mjs";

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
  const koreanStatus = JSON.parse(await readFile(path.join(outputRoot, "ko", "translation-status.json"), "utf8"));
  const translationRegistry = createTranslationRegistry({ vi: translationStatus, ko: koreanStatus });
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
  if (!pilotHome.includes("48 / 105 tài liệu") || (pilotHome.match(/class="book-nav-group"/g) || []).length !== 9) {
    failures.push("Vietnamese reader progress or Chapters 0–8 navigation is incomplete");
  }
  for (const document of translationStatus.documents) {
    const pilotPage = routeFileName(document.route);
    const html = await readFile(path.join(pilotDirectory, pilotPage), "utf8");
    if (!html.includes(`data-translation-status="${document.status}"`)) failures.push(`${pilotPage} does not display its manifest translation status`);
    if (/\$[^$<>]+\$/.test(html)) failures.push(`${pilotPage} contains unrendered inline math`);
    if (html.includes("```") || html.includes("```src")) failures.push(`${pilotPage} contains an unrendered code fence`);
    if (/^(?:===|!!!|\?\?\?|--8<--)/m.test(html)) failures.push(`${pilotPage} contains unrendered MkDocs-only syntax`);
    if (/\\(?:Omega|Theta|times|cdot|dots|le|ge|lfloor|rfloor)\b/.test(html)) failures.push(`${pilotPage} contains an unreadable raw math command`);
    if (!html.includes("Chuyển ngữ, chọn lọc ví dụ và biên tập bổ sung") || !html.includes("krahets và cộng đồng đóng góp")) {
      failures.push(`${pilotPage} does not disclose source authorship, translation, selection, and editorial modification`);
    }
    const expectedEnglishAlternate = `href="${englishReaderHref(document.source)}" lang="en" hreflang="en"`;
    if (!html.includes("Đọc trang tương ứng bằng tiếng Anh") || !html.includes(expectedEnglishAlternate)) failures.push(`${pilotPage} has no exact corresponding English-page option`);
    const koreanDocument = translationRegistry.byLanguage.ko.get(document.source);
    if (koreanDocument) {
      const expectedKoreanAlternate = `href="${readerHref(koreanDocument)}" lang="ko" hreflang="ko"`;
      if (!html.includes(expectedKoreanAlternate)) failures.push(`${pilotPage} does not link to its exact Korean counterpart`);
    } else if (html.includes('hreflang="ko"') || !html.includes('href="../../ko/learn/" lang="ko" data-language-home="ko"')) {
      failures.push(`${pilotPage} must expose Korean home without claiming an equivalent translation`);
    }
  }

  const koreanDirectory = path.join(outputRoot, "ko", "learn");
  const koreanPages = (await readdir(koreanDirectory)).filter((file) => file.endsWith(".html"));
  if (koreanPages.length !== koreanStatus.documents.length || koreanPages.length !== 48) failures.push(`Expected 48 Korean draft pages, found ${koreanPages.length}`);
  const koreanRoutes = koreanStatus.documents.map((document) => document.route);
  if (new Set(koreanRoutes).size !== koreanRoutes.length) failures.push("Korean translation status contains duplicate routes");
  for (const route of koreanRoutes) {
    const candidate = path.join(outputRoot, route, route.endsWith("/") ? "index.html" : "");
    if (!await referenceExists(candidate)) failures.push(`Korean status route was not built: ${route}`);
  }
  const koreanHome = await readFile(path.join(koreanDirectory, "index.html"), "utf8");
  if (!koreanHome.includes('lang="ko"') || !koreanHome.includes("48 / 105 문서") || (koreanHome.match(/class="book-nav-group"/g) || []).length !== 9) failures.push("Korean reader metadata, progress, or Chapters 0–8 navigation is incomplete");
  if (!koreanHome.includes("CC BY-NC-SA 4.0") || !koreanHome.includes("공식 후원을 의미하지 않습니다")) failures.push("Korean reader is missing source and license disclosure");
  for (const document of koreanStatus.documents) {
    const koreanPage = routeFileName(document.route);
    const pageHtml = await readFile(path.join(koreanDirectory, koreanPage), "utf8");
    const vietnameseDocument = translationRegistry.byLanguage.vi.get(document.source);
    const expectedVietnameseAlternate = vietnameseDocument && `href="${readerHref(vietnameseDocument)}" lang="vi" hreflang="vi"`;
    const expectedEnglishAlternate = `href="${englishReaderHref(document.source)}" lang="en" hreflang="en"`;
    if (!pageHtml.includes(`data-translation-status="${document.status}"`)) failures.push(`${koreanPage} does not display its manifest translation status`);
    if (!pageHtml.includes('hreflang="ko"') || !expectedVietnameseAlternate || !pageHtml.includes(expectedVietnameseAlternate) || !pageHtml.includes(expectedEnglishAlternate)) failures.push(`${koreanPage} does not expose exact KO / VI / EN counterparts`);
    if (pageHtml.includes("```") || /\$[^$<>]+\$/.test(pageHtml)) failures.push(`${koreanPage} contains unrendered Markdown`);
  }
  const koreanTime = await readFile(path.join(koreanDirectory, "time-complexity.html"), "utf8");
  if (!koreanTime.includes('<pre><code class="language-python"') || !koreanTime.includes('class="math-block"')) failures.push("Korean time-complexity page is missing rendered Python or display mathematics");
  const koreanNumberEncoding = await readFile(path.join(koreanDirectory, "number-encoding.html"), "utf8");
  const koreanArray = await readFile(path.join(koreanDirectory, "arrays.html"), "utf8");
  const koreanLinkedList = await readFile(path.join(koreanDirectory, "linked-lists.html"), "utf8");
  if (!koreanNumberEncoding.includes("ieee_754_float.png") || !koreanNumberEncoding.includes('class="math-block"')) failures.push("Korean Chapter 3 is missing its IEEE 754 diagram or rendered mathematics");
  if (!koreanArray.includes("array_definition.png") || !koreanArray.includes('<pre><code class="language-python"') || !koreanLinkedList.includes("linkedlist_definition.png") || !koreanLinkedList.includes('<pre><code class="language-python"')) failures.push("Korean Chapter 4 is missing representative diagrams or Python examples");
  const vietnameseStack = await readFile(path.join(pilotDirectory, "ngan-xep.html"), "utf8");
  const koreanStack = await readFile(path.join(koreanDirectory, "stack.html"), "utf8");
  const vietnameseHash = await readFile(path.join(pilotDirectory, "bang-bam.html"), "utf8");
  const koreanHash = await readFile(path.join(koreanDirectory, "hash-table.html"), "utf8");
  if (!vietnameseStack.includes("stack_operations.png") || !koreanStack.includes("stack_operations.png") || !vietnameseStack.includes('<pre><code class="language-python"') || !koreanStack.includes('<pre><code class="language-python"')) failures.push("Chapter 5 stack pages are missing diagrams or Python examples");
  if (!vietnameseHash.includes("hash_table_lookup.png") || !koreanHash.includes("hash_table_lookup.png") || !vietnameseHash.includes('class="math-block"') || !koreanHash.includes('class="math-block"')) failures.push("Chapter 6 hash-table pages are missing diagrams or rendered mathematics");

  const vietnameseTree = await readFile(path.join(pilotDirectory, "cay-nhi-phan.html"), "utf8");
  const koreanTree = await readFile(path.join(koreanDirectory, "binary-tree.html"), "utf8");
  const vietnameseHeap = await readFile(path.join(pilotDirectory, "cau-truc-heap.html"), "utf8");
  const koreanHeap = await readFile(path.join(koreanDirectory, "heap.html"), "utf8");
  if (!vietnameseTree.includes("binary_tree_definition.png") || !koreanTree.includes("binary_tree_definition.png") || !vietnameseTree.includes('<pre><code class="language-python"') || !koreanTree.includes('<pre><code class="language-python"')) failures.push("Chapter 7 binary-tree pages are missing diagrams or Python examples");
  if (!vietnameseHeap.includes("min_heap_and_max_heap.png") || !koreanHeap.includes("min_heap_and_max_heap.png") || !vietnameseHeap.includes('<pre><code class="language-python"') || !koreanHeap.includes('<pre><code class="language-python"')) failures.push("Chapter 8 heap pages are missing diagrams or Python examples");

  const englishDirectory = path.join(outputRoot, "en", "learn");
  const englishPages = (await readdir(englishDirectory)).filter((file) => file.endsWith(".html"));
  if (englishPages.length !== englishReaderRoutes.size || englishPages.length !== 12) failures.push(`Expected 12 local English Chapter 7–8 pages, found ${englishPages.length}`);
  for (const [source, route] of englishReaderRoutes) {
    const englishPage = await readFile(path.join(outputRoot, route), "utf8");
    const vietnameseDocument = translationRegistry.byLanguage.vi.get(source);
    const koreanDocument = translationRegistry.byLanguage.ko.get(source);
    if (!englishPage.includes(`href="${readerHref(vietnameseDocument)}" lang="vi" hreflang="vi"`) || !englishPage.includes(`href="${readerHref(koreanDocument)}" lang="ko" hreflang="ko"`)) failures.push(`${route} does not expose exact VI and KO counterparts`);
    if (/^(?:===|!!!|\?\?\?|--8<--)/m.test(englishPage) || englishPage.includes("&lt;u&gt;")) failures.push(`${route} contains unrendered MkDocs-only syntax`);
  }
  const englishTree = await readFile(path.join(englishDirectory, "binary-tree.html"), "utf8");
  const englishHeap = await readFile(path.join(englishDirectory, "heap.html"), "utf8");
  if (!englishTree.includes("binary_tree_definition.png") || !englishHeap.includes("min_heap_and_max_heap.png") || !englishTree.includes("Original English source")) failures.push("Local English Chapter 7–8 pages are missing source content or attribution");

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

  console.log(`Built-site checks passed (${htmlFiles.length} HTML pages, ${pilotPages.length} Vietnamese and ${koreanPages.length} Korean reader pages, no broken local references).`);
}
