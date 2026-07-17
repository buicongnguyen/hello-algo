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
    if (!/<html lang="(?:vi|en)">/.test(html)) failures.push(`${relativeHtml} has no supported document language`);

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
  if (!pilotHome.includes("14 / 105 tài liệu") || (pilotHome.match(/class="book-nav-group"/g) || []).length !== 3) {
    failures.push("Vietnamese reader progress or Chapters 0–2 navigation is incomplete");
  }
  for (const pilotPage of pilotPages) {
    const html = await readFile(path.join(pilotDirectory, pilotPage), "utf8");
    if (/\$[^$<>]+\$/.test(html)) failures.push(`${pilotPage} contains unrendered inline math`);
    if (html.includes("```") || html.includes("```src")) failures.push(`${pilotPage} contains an unrendered code fence`);
    if (/\\(?:Omega|Theta|times|cdot|dots|le|ge|lfloor|rfloor)\b/.test(html)) failures.push(`${pilotPage} contains an unreadable raw math command`);
    if (!html.includes("Chuyển ngữ, chọn lọc ví dụ và biên tập bổ sung") || !html.includes("krahets và cộng đồng đóng góp")) {
      failures.push(`${pilotPage} does not disclose source authorship, translation, selection, and editorial modification`);
    }
    if (!html.includes("Đọc trang tương ứng bằng tiếng Anh")) failures.push(`${pilotPage} has no corresponding English-page option`);
  }

  const timeComplexityPage = await readFile(path.join(pilotDirectory, "do-phuc-tap-thoi-gian.html"), "utf8");
  if (!timeComplexityPage.includes('<pre><code class="language-python"') || !timeComplexityPage.includes('class="math-block"')) {
    failures.push("Vietnamese time-complexity page is missing rendered code or display mathematics");
  }

  const englishAtlas = await readFile(path.join(outputRoot, "en", "index.html"), "utf8");
  const vietnameseAtlas = await readFile(path.join(outputRoot, "vi", "index.html"), "utf8");
  const sectionIds = (document) => [...document.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
  if (JSON.stringify(sectionIds(englishAtlas)) !== JSON.stringify(sectionIds(vietnameseAtlas))) {
    failures.push("Built Vietnamese Atlas does not match the English section structure");
  }
  if (!vietnameseAtlas.includes("window.HELLO_ALGO_LOCALE=") ||
      !vietnameseAtlas.includes('data-topic="hashing"') ||
      !vietnameseAtlas.includes('data-topic="heaps"')) {
    failures.push("Built Vietnamese Atlas is missing its locale payload or stable interaction keys");
  }

  if (failures.length) {
    throw new Error("Built-site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  }

  console.log(`Built-site checks passed (${htmlFiles.length} HTML pages, ${pilotPages.length} Vietnamese pilot pages, no broken local references).`);
}
