import { access, readdir, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { localizeSourceExamples, sourceCodeLanguages } from "./source-code-tabs.mjs";
import { createTranslationRegistry, englishReaderHref, englishReaderLegacyAliases, englishReaderRoutes, readerHref, routeFileName } from "./translation-registry.mjs";
import { createTranslationParityReport } from "./translation-parity.mjs";
import { auditFullBook } from "./check-full-book.mjs";
import { restoreIllustrationTabs } from "./localized-content.mjs";

const katexCssUrl = "https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css";
const katexCssIntegrity = "sha384-1vdNCNel6Tx/NQa8IR1mGOGKsbGreCkOPfbtPPnUURJ5Tu2PRVfQ/7KLZC+Pi1p1";
const katexScriptUrl = "https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.js";
const katexScriptIntegrity = "sha384-ycJ6GAwiS15LoUPipwJOrWTvkUHl/YqELValBwI5I4awP1EeEQJYarj+w85ntcz7";

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

function sourceTabStats(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  let groups = 0;
  let tabs = 0;
  for (let index = 0; index < lines.length;) {
    if (!/^===\s+"([^"]+)"/.test(lines[index])) {
      index += 1;
      continue;
    }
    groups += 1;
    let groupTabs = 0;
    while (index < lines.length && /^===\s+"([^"]+)"/.test(lines[index])) {
      groupTabs += 1;
      tabs += 1;
      index += 1;
      while (index < lines.length && (lines[index] === "" || /^\s{4}/.test(lines[index]))) index += 1;
    }
    if (groupTabs < 2) throw new Error("Source contains a tab group with fewer than two choices");
  }
  return { groups, tabs };
}

function sourceCodeFenceCount(markdown) {
  let open = false;
  let count = 0;
  for (const line of markdown.replaceAll("\r\n", "\n").split("\n")) {
    const fence = line.trimStart().match(/^```([^\s`]*)/);
    if (!fence) continue;
    if (!open) {
      if (fence[1] !== "src") count += 1;
      open = true;
    } else {
      open = false;
    }
  }
  return count;
}

async function localizedCodeStats({ projectRoot, sourcePath, sourceMarkdown, targetMarkdown, locale, html }) {
  const localized = await localizeSourceExamples({
    projectRoot,
    sourcePath,
    sourceMarkdown,
    targetMarkdown,
    locale
  });
  const localizedIllustrations = restoreIllustrationTabs(sourceMarkdown, localized.markdown);
  if (localizedIllustrations.unresolved.length) {
    throw new Error(`Localized illustration tabs do not match ${sourcePath}`);
  }
  const expected = sourceTabStats(localizedIllustrations.markdown);
  return {
    sourceGroups: localized.sourceGroups,
    inlineGroups: localized.inlineGroups,
    deferredGroups: localized.deferredGroups,
    expectedGroups: expected.groups,
    expectedTabs: expected.tabs,
    expectedCodeBlocks: sourceCodeFenceCount(localizedIllustrations.markdown),
    renderedGroups: (html.match(/class="content-tabs"/g) || []).length,
    renderedTabs: (html.match(/role="tab"/g) || []).length,
    renderedPanels: (html.match(/role="tabpanel"/g) || []).length,
    focusablePanels: (html.match(/role="tabpanel" tabindex="0"/g) || []).length,
    selectedTabs: (html.match(/aria-selected="true"/g) || []).length,
    renderedCodeBlocks: (html.match(/<pre><code(?: class="language-[^"]+")?>/g) || []).length
  };
}

export async function checkBuiltSite(outputRoot) {
  const failures = [];
  let renderedExerciseLinks = 0;
  const projectRoot = path.resolve(import.meta.dirname, "..");
  const htmlFiles = await collectHtml(outputRoot);

  for (const htmlFile of htmlFiles) {
    const relativeHtml = path.relative(outputRoot, htmlFile).replaceAll("\\", "/");
    const html = await readFile(htmlFile, "utf8");
    if (!/<html lang="(?:vi|en|ko)">/.test(html)) failures.push(`${relativeHtml} has no supported document language`);
    if (/^(?:en|vi|ko)\/index\.html$/.test(relativeHtml) && !html.includes("app.js?v=20260727b")) {
      failures.push(`${relativeHtml} does not use the current Atlas script cache key`);
    }
    if (/^(?:en|vi|ko)\/index\.html$/.test(relativeHtml)) {
      const themeLabel = relativeHtml.startsWith("vi/")
        ? "Giao diện sáng"
        : relativeHtml.startsWith("ko/")
          ? "밝은 테마"
          : "Light theme";
      const companionLanguage = relativeHtml.slice(0, 2);
      if (!html.includes(`id="theme-toggle" type="button" aria-label="${themeLabel}" title="${themeLabel}" aria-pressed="false"`)) {
        failures.push(`${relativeHtml} does not expose the stable localized Atlas theme state`);
      }
      if (!html.includes(`https://buicongnguyen.github.io/Modern_c_20/${companionLanguage}/`)) {
        failures.push(`${relativeHtml} does not link to its localized Modern C++20 companion`);
      }
    }
    const readerPage = /^(?:en|vi|ko)\/learn\/.+\.html$/.test(relativeHtml);
    if (readerPage && (!html.includes("book.js?v=20260727b") || !html.includes("book.css?v=20260804a"))) {
      failures.push(`${relativeHtml} does not use the current reader asset cache keys`);
    }
    if (readerPage) {
      if (/^(?:vi|ko)\/learn\/.+\.html$/.test(relativeHtml) && !html.includes('class="english-term" role="note"')) {
        failures.push(`${relativeHtml} does not show the corresponding English terminology below its title`);
      }
      if (html.includes("{ .rounded-button") || html.includes("{ .exercise-button")) {
        failures.push(`${relativeHtml} exposes raw MkDocs link attributes`);
      }
      for (const link of html.matchAll(/<a\b[^>]*href="https:\/\/leetcode\.com\/problems\/[^"]+"[^>]*>/g)) {
        renderedExerciseLinks += 1;
        const openingTag = link[0];
        if (!/class="[^"]*\brounded-button\b[^"]*\bexercise-button\b[^"]*"/.test(openingTag) ||
            !/target="_blank"/.test(openingTag) ||
            !/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(openingTag)) {
          failures.push(`${relativeHtml} has a LeetCode exercise link without its safe button attributes`);
        }
      }
      const themeLabel = relativeHtml.startsWith("vi/")
        ? "Giao diện sáng"
        : relativeHtml.startsWith("ko/")
          ? "밝은 테마"
          : "Light theme";
      const companionLanguage = relativeHtml.slice(0, 2);
      const headingIds = [...html.matchAll(/<h[1-4] id="([^"]+)">/g)].map((match) => match[1]);
      const headingAnchors = [...html.matchAll(/<a class="heading-anchor" href="#([^"]+)"/g)].map((match) => match[1]);
      if (!headingIds.length || JSON.stringify(headingIds) !== JSON.stringify(headingAnchors)) {
        failures.push(`${relativeHtml} does not expose a stable permalink for every article heading`);
      }
      if ((html.match(/<link rel="alternate" hreflang="(?:en|vi|ko|x-default)"/g) || []).length !== 4) {
        failures.push(`${relativeHtml} does not expose the complete EN/VI/KO/x-default alternate set`);
      }
      if (!html.includes('id="reader-search-open"') || !html.includes('id="reader-search-input"') ||
          !html.includes('class="reader-search" id="reader-search" role="search"') ||
          !html.includes('class="article-outline"')) {
        failures.push(`${relativeHtml} is missing search or the current-article outline`);
      }
      if (/<img\b(?![^>]*\balt="[^"]+")[^>]*>/i.test(html)) {
        failures.push(`${relativeHtml} contains an image without meaningful alternative text`);
      }
      if (!html.includes(`id="reader-theme" type="button" aria-label="${themeLabel}" aria-pressed="false"`)) {
        failures.push(`${relativeHtml} does not expose the stable localized theme state`);
      }
      if (!html.includes(`https://buicongnguyen.github.io/Modern_c_20/${companionLanguage}/`)) {
        failures.push(`${relativeHtml} does not link to its localized Modern C++20 companion`);
      }
    }
    if (readerPage && (!html.includes(`href="${katexCssUrl}" integrity="${katexCssIntegrity}"`) ||
        !html.includes(`src="${katexScriptUrl}" integrity="${katexScriptIntegrity}"`))) {
      failures.push(`${relativeHtml} does not load the pinned KaTeX assets with integrity checks`);
    }
    if (readerPage && (html.includes("&lt;u&gt;") || html.includes("&lt;/u&gt;") || html.includes("&lt;p align="))) {
      failures.push(`${relativeHtml} exposes escaped source-formatting markup to readers`);
    }
    if (readerPage) {
      for (const match of html.matchAll(/<(?:span|div) class="(?:math|math-block)"[^>]*>([^<]*)<\/(?:span|div)>/g)) {
        if (!match[0].includes('data-math="')) failures.push(`${relativeHtml} has a math node without an encoded source expression`);
        if (/\\[A-Za-z]+/.test(match[1])) failures.push(`${relativeHtml} exposes an unrendered math command: ${match[1].slice(0, 80)}`);
      }
    }

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

  if (renderedExerciseLinks !== 51) {
    failures.push(`Expected 51 styled LeetCode exercise links across the trilingual readers, found ${renderedExerciseLinks}`);
  }

  const pilotDirectory = path.join(outputRoot, "vi", "learn");
  const fullBookAudit = JSON.parse(await readFile(path.join(outputRoot, "full-book-audit.json"), "utf8"));
  const expectedFullBookAudit = await auditFullBook();
  if (JSON.stringify(fullBookAudit) !== JSON.stringify(expectedFullBookAudit) ||
      fullBookAudit.failures.length !== 0 ||
      fullBookAudit.source.documents !== 119 ||
      fullBookAudit.localized.vi.structurallyReady !== 119 ||
      fullBookAudit.localized.ko.structurallyReady !== 119) {
    failures.push("full-book-audit.json is stale, incomplete, or does not prove all three editions");
  }
  const pilotPages = (await readdir(pilotDirectory)).filter((file) => file.endsWith(".html"));
  const translationStatus = JSON.parse(await readFile(path.join(outputRoot, "vi", "translation-status.json"), "utf8"));
  const koreanStatus = JSON.parse(await readFile(path.join(outputRoot, "ko", "translation-status.json"), "utf8"));
  const translationRegistry = createTranslationRegistry({ vi: translationStatus, ko: koreanStatus });
  for (const [language, manifest] of Object.entries({ vi: translationStatus, ko: koreanStatus })) {
    const reportPath = path.join(outputRoot, language, "translation-parity.json");
    const report = JSON.parse(await readFile(reportPath, "utf8"));
    const expected = await createTranslationParityReport({ projectRoot, manifest });
    if (JSON.stringify(report) !== JSON.stringify(expected)) {
      failures.push(`${language}/translation-parity.json is stale or was not generated deterministically`);
    }
    if (report.documents.length !== 119 || report.summary.total !== 119 ||
        report.summary.structurallyReady + report.summary.needsWork !== 119) {
      failures.push(`${language} translation parity report does not cover all 119 documents`);
    }
    for (const document of report.documents) {
      if (!document.officialCodeGroups.preserved) {
        failures.push(`${document.target} does not preserve all official code groups in its effective reader Markdown`);
      }
      if (["pilot", "published"].includes(document.status) && !document.eligibleForPilot) {
        failures.push(`${document.target} is marked ${document.status} but fails parity: ${document.failures.join(", ")}`);
      }
    }
    const releaseUnits = language === "vi"
      ? [
          { prefix: "en/docs/index.md", count: 1, label: "Vietnamese Book Home" },
          { prefix: "en/docs/chapter_hello_algo/", count: 1, label: "Vietnamese Chapter 0" },
          { prefix: "en/docs/chapter_preface/", count: 4, label: "Vietnamese Preface" },
          { prefix: "en/docs/chapter_introduction/", count: 4, label: "Vietnamese Chapter 1" },
          { prefix: "en/docs/chapter_computational_complexity/", count: 7, label: "Vietnamese Chapter 2" },
          { prefix: "en/docs/chapter_data_structure/", count: 7, label: "Vietnamese Chapter 3" },
          { prefix: "en/docs/chapter_array_and_linkedlist/", count: 7, label: "Vietnamese Chapter 4" },
          { prefix: "en/docs/chapter_stack_and_queue/", count: 6, label: "Vietnamese Chapter 5" },
          { prefix: "en/docs/chapter_hashing/", count: 6, label: "Vietnamese Chapter 6" },
          { prefix: "en/docs/chapter_tree/", count: 8, label: "Vietnamese Chapter 7" },
          { prefix: "en/docs/chapter_heap/", count: 6, label: "Vietnamese Chapter 8" },
          { prefix: "en/docs/chapter_graph/", count: 6, label: "Vietnamese Chapter 9" },
          { prefix: "en/docs/chapter_searching/", count: 8, label: "Vietnamese Chapter 10" },
          { prefix: "en/docs/chapter_sorting/", count: 13, label: "Vietnamese Chapter 11" },
          { prefix: "en/docs/chapter_divide_and_conquer/", count: 7, label: "Vietnamese Chapter 12" },
          { prefix: "en/docs/chapter_backtracking/", count: 7, label: "Vietnamese Chapter 13" },
          { prefix: "en/docs/chapter_dynamic_programming/", count: 9, label: "Vietnamese Chapter 14" },
          { prefix: "en/docs/chapter_greedy/", count: 7, label: "Vietnamese Chapter 15" },
          { prefix: "en/docs/chapter_appendix/", count: 4, label: "Vietnamese Appendix" },
          { prefix: "en/docs/chapter_reference/", count: 1, label: "Vietnamese References" }
        ]
      : [
          { prefix: "en/docs/index.md", count: 1, label: "Korean Book Home" },
          { prefix: "en/docs/chapter_hello_algo/", count: 1, label: "Korean Chapter 0" },
          { prefix: "en/docs/chapter_preface/", count: 4, label: "Korean Preface" },
          { prefix: "en/docs/chapter_introduction/", count: 4, label: "Korean Chapter 1" },
          { prefix: "en/docs/chapter_computational_complexity/", count: 7, label: "Korean Chapter 2" },
          { prefix: "en/docs/chapter_data_structure/", count: 7, label: "Korean Chapter 3" },
          { prefix: "en/docs/chapter_array_and_linkedlist/", count: 7, label: "Korean Chapter 4" },
          { prefix: "en/docs/chapter_stack_and_queue/", count: 6, label: "Korean Chapter 5" },
          { prefix: "en/docs/chapter_hashing/", count: 6, label: "Korean Chapter 6" },
          { prefix: "en/docs/chapter_tree/", count: 8, label: "Korean Chapter 7" },
          { prefix: "en/docs/chapter_heap/", count: 6, label: "Korean Chapter 8" },
          { prefix: "en/docs/chapter_graph/", count: 6, label: "Korean Chapter 9" },
          { prefix: "en/docs/chapter_searching/", count: 8, label: "Korean Chapter 10" },
          { prefix: "en/docs/chapter_sorting/", count: 13, label: "Korean Chapter 11" },
          { prefix: "en/docs/chapter_divide_and_conquer/", count: 7, label: "Korean Chapter 12" },
          { prefix: "en/docs/chapter_backtracking/", count: 7, label: "Korean Chapter 13" },
          { prefix: "en/docs/chapter_dynamic_programming/", count: 9, label: "Korean Chapter 14" },
          { prefix: "en/docs/chapter_greedy/", count: 7, label: "Korean Chapter 15" },
          { prefix: "en/docs/chapter_appendix/", count: 4, label: "Korean Appendix" },
          { prefix: "en/docs/chapter_reference/", count: 1, label: "Korean References" }
        ];
    for (const releaseUnit of releaseUnits) {
      const releaseDocuments = report.documents.filter((document) => document.source.startsWith(releaseUnit.prefix));
      if (releaseDocuments.length !== releaseUnit.count ||
          releaseDocuments.some((document) => !document.structuralParity || document.officialCodeGroups.deferred !== 0)) {
        failures.push(`${releaseUnit.label} is not a complete, structurally ready inline-code release unit`);
      }
    }
    if (report.summary.structurallyReady !== 119 || report.summary.needsWork !== 0) {
      failures.push(`${language} reader must keep all 119 source documents structurally ready`);
    }
  }
  for (const language of ["vi", "ko", "en"]) {
    const searchIndex = JSON.parse(await readFile(path.join(outputRoot, language, "learn", "search-index.json"), "utf8"));
    if (searchIndex.length !== 119 || searchIndex.some((entry) =>
      typeof entry.title !== "string" || typeof entry.url !== "string" || !Array.isArray(entry.headings)
    )) {
      failures.push(`${language} reader search index is incomplete or malformed`);
    }
    for (const entry of searchIndex) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/.test(entry.url)) {
        failures.push(`${language} reader search index contains an unsafe page URL: ${entry.url}`);
        continue;
      }
      const pageHtml = await readFile(path.join(outputRoot, language, "learn", entry.url), "utf8");
      const renderedHeadingCount = (pageHtml.match(/<h[1-4] id="/g) || []).length;
      if (entry.headings.length !== renderedHeadingCount) {
        failures.push(`${language}/learn/${entry.url} indexes ${entry.headings.length} headings but renders ${renderedHeadingCount}`);
      }
    }
  }
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
  if (!pilotHome.includes("nguồn khóa tại") || !pilotHome.includes("CC BY-NC-SA 4.0")) {
    failures.push("Vietnamese reader pages are missing source-lock or license disclosure");
  }
  if (!pilotHome.includes('data-reader-source="en/docs/chapter_introduction/index.md"') || !pilotHome.includes("119 / 119 tài liệu") || (pilotHome.match(/class="book-nav-group"/g) || []).length !== 20) {
    failures.push("Vietnamese reader progress or complete book navigation is incomplete");
  }
  for (const document of translationStatus.documents) {
    const pilotPage = routeFileName(document.route);
    const html = await readFile(path.join(pilotDirectory, pilotPage), "utf8");
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const targetMarkdown = await readFile(path.join(projectRoot, document.target), "utf8");
    const codeStats = await localizedCodeStats({
      projectRoot,
      sourcePath: document.source,
      sourceMarkdown,
      targetMarkdown,
      locale: "vi",
      html
    });
    const proseHtml = html.replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, "");
    if (codeStats.renderedGroups !== codeStats.expectedGroups ||
        codeStats.renderedTabs !== codeStats.expectedTabs ||
        codeStats.renderedPanels !== codeStats.expectedTabs ||
        codeStats.focusablePanels !== codeStats.expectedTabs ||
        codeStats.selectedTabs !== codeStats.expectedGroups ||
        codeStats.renderedCodeBlocks !== codeStats.expectedCodeBlocks) {
      failures.push(`${pilotPage} does not preserve all authored and official multilingual code examples`);
    }
    if (!html.includes(`data-translation-status="${document.status}"`)) failures.push(`${pilotPage} does not display its manifest translation status`);
    if (/\$[^$<>]+\$/.test(proseHtml)) failures.push(`${pilotPage} contains unrendered inline math`);
    if (proseHtml.includes("```") || proseHtml.includes("```src")) failures.push(`${pilotPage} contains an unrendered code fence`);
    if (/^(?:===|!!!|\?\?\?|--8<--)/m.test(proseHtml)) failures.push(`${pilotPage} contains unrendered MkDocs-only syntax`);
    if (/\\(?:Omega|Theta|times|cdot|dots|le|ge|lfloor|rfloor)\b/.test(proseHtml)) failures.push(`${pilotPage} contains an unreadable raw math command`);
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

  const vietnamesePreface = await readFile(path.join(pilotDirectory, "loi-noi-dau.html"), "utf8");
  const vietnameseAbout = await readFile(path.join(pilotDirectory, "ve-cuon-sach.html"), "utf8");
  const vietnameseSuggestions = await readFile(path.join(pilotDirectory, "cach-su-dung-cuon-sach.html"), "utf8");
  const vietnameseIntroduction = await readFile(path.join(pilotDirectory, "index.html"), "utf8");
  const vietnameseAlgorithmsEverywhere = await readFile(path.join(pilotDirectory, "thuat-toan-o-khap-noi.html"), "utf8");
  const vietnameseWhatIsDsa = await readFile(path.join(pilotDirectory, "thuat-toan-la-gi.html"), "utf8");
  const vietnameseChapterOneSummary = await readFile(path.join(pilotDirectory, "tom-tat-chuong-1.html"), "utf8");
  if (!vietnamesePreface.includes("chapter_preface.jpg") ||
      !vietnamesePreface.includes('class="admonition admonition-abstract"') ||
      !vietnameseAbout.includes("hello_algo_mindmap.png") ||
      !vietnameseAbout.includes('class="admonition admonition-success"') ||
      !vietnameseAbout.includes("Material for MkDocs") ||
      (vietnameseSuggestions.match(/class="content-tabs"/g) || []).length !== 1 ||
      (vietnameseSuggestions.match(/<img /g) || []).length < 7 ||
      !vietnameseSuggestions.includes('class="admonition admonition-tip"') ||
      !vietnameseSuggestions.includes("download_code.png") ||
      !vietnameseSuggestions.includes("learning_route.png")) {
    failures.push("Vietnamese preface is missing its complete guidance, multilingual comment tabs, media, callouts, or acknowledgements");
  }
  if (!vietnameseIntroduction.includes("chapter_introduction.jpg") ||
      !vietnameseIntroduction.includes('class="admonition admonition-abstract"') ||
      (vietnameseAlgorithmsEverywhere.match(/class="content-tabs"/g) || []).length !== 1 ||
      (vietnameseAlgorithmsEverywhere.match(/<img /g) || []).length < 7 ||
      !vietnameseAlgorithmsEverywhere.includes("binary_search_dictionary_step5.png") ||
      !vietnameseAlgorithmsEverywhere.includes('class="admonition admonition-tip"') ||
      !vietnameseWhatIsDsa.includes("relationship_between_data_structure_and_algorithm.png") ||
      !vietnameseWhatIsDsa.includes("assembling_blocks.png") ||
      !vietnameseWhatIsDsa.includes("<table>") ||
      !vietnameseWhatIsDsa.includes('class="admonition admonition-tip"') ||
      !vietnameseChapterOneSummary.includes("sắp xếp cơ số") ||
      !vietnameseChapterOneSummary.includes('class="math"')) {
    failures.push("Vietnamese Chapter 1 is missing its interactive lookup trace, definitions, relationship media/table, callouts, or technical review");
  }

  const koreanDirectory = path.join(outputRoot, "ko", "learn");
  const koreanPages = (await readdir(koreanDirectory)).filter((file) => file.endsWith(".html"));
  if (koreanPages.length !== koreanStatus.documents.length || koreanPages.length !== 119) failures.push(`Expected 119 Korean draft pages, found ${koreanPages.length}`);
  const koreanRoutes = koreanStatus.documents.map((document) => document.route);
  if (new Set(koreanRoutes).size !== koreanRoutes.length) failures.push("Korean translation status contains duplicate routes");
  for (const route of koreanRoutes) {
    const candidate = path.join(outputRoot, route, route.endsWith("/") ? "index.html" : "");
    if (!await referenceExists(candidate)) failures.push(`Korean status route was not built: ${route}`);
  }
  const koreanHome = await readFile(path.join(koreanDirectory, "index.html"), "utf8");
  if (!koreanHome.includes('lang="ko"') || !koreanHome.includes('data-reader-source="en/docs/chapter_introduction/index.md"') || !koreanHome.includes("119 / 119 문서") || (koreanHome.match(/class="book-nav-group"/g) || []).length !== 20) failures.push("Korean reader identity, metadata, progress, or complete book navigation is incomplete");
  if (!koreanHome.includes("CC BY-NC-SA 4.0") || !koreanHome.includes("공식 후원을 의미하지 않습니다")) failures.push("Korean reader is missing source and license disclosure");
  for (const document of koreanStatus.documents) {
    const koreanPage = routeFileName(document.route);
    const pageHtml = await readFile(path.join(koreanDirectory, koreanPage), "utf8");
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const targetMarkdown = await readFile(path.join(projectRoot, document.target), "utf8");
    const codeStats = await localizedCodeStats({
      projectRoot,
      sourcePath: document.source,
      sourceMarkdown,
      targetMarkdown,
      locale: "ko",
      html: pageHtml
    });
    const proseHtml = pageHtml.replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, "");
    if (codeStats.renderedGroups !== codeStats.expectedGroups ||
        codeStats.renderedTabs !== codeStats.expectedTabs ||
        codeStats.renderedPanels !== codeStats.expectedTabs ||
        codeStats.focusablePanels !== codeStats.expectedTabs ||
        codeStats.selectedTabs !== codeStats.expectedGroups ||
        codeStats.renderedCodeBlocks !== codeStats.expectedCodeBlocks) {
      failures.push(`${koreanPage} does not preserve all authored and official multilingual code examples`);
    }
    const vietnameseDocument = translationRegistry.byLanguage.vi.get(document.source);
    const expectedVietnameseAlternate = vietnameseDocument && `href="${readerHref(vietnameseDocument)}" lang="vi" hreflang="vi"`;
    const expectedEnglishAlternate = `href="${englishReaderHref(document.source)}" lang="en" hreflang="en"`;
    if (!pageHtml.includes(`data-translation-status="${document.status}"`)) failures.push(`${koreanPage} does not display its manifest translation status`);
    if (!pageHtml.includes('hreflang="ko"') || !expectedVietnameseAlternate || !pageHtml.includes(expectedVietnameseAlternate) || !pageHtml.includes(expectedEnglishAlternate)) failures.push(`${koreanPage} does not expose exact KO / VI / EN counterparts`);
    if (proseHtml.includes("```") || /\$[^$<>]+\$/.test(proseHtml)) failures.push(`${koreanPage} contains unrendered Markdown`);
  }
  const koreanTime = await readFile(path.join(koreanDirectory, "time-complexity.html"), "utf8");
  const koreanIteration = await readFile(path.join(koreanDirectory, "iteration-and-recursion.html"), "utf8");
  if (!koreanTime.includes('<pre><code class="language-python"') ||
      !koreanTime.includes('class="math-block"') ||
      !koreanTime.includes("time_complexity_common_types.png")) {
    failures.push("Korean time-complexity page is missing rendered Python, display mathematics, or its comparison diagram");
  }
  if (!koreanIteration.includes("iteration.png") ||
      !koreanIteration.includes("recursion_tree.png") ||
      !koreanIteration.includes('<pre><code class="language-python"') ||
      !koreanIteration.includes("<table>")) {
    failures.push("Korean iteration-and-recursion page is missing diagrams, Python examples, or its comparison table");
  }
  const koreanNumberEncoding = await readFile(path.join(koreanDirectory, "number-encoding.html"), "utf8");
  const koreanArray = await readFile(path.join(koreanDirectory, "arrays.html"), "utf8");
  const koreanLinkedList = await readFile(path.join(koreanDirectory, "linked-lists.html"), "utf8");
  const koreanDynamicList = await readFile(path.join(koreanDirectory, "dynamic-lists.html"), "utf8");
  const koreanRamAndCache = await readFile(path.join(koreanDirectory, "ram-and-cache.html"), "utf8");
  const koreanArrayExercises = await readFile(path.join(koreanDirectory, "chapter-4-exercises.html"), "utf8");
  if (!koreanNumberEncoding.includes("ieee_754_float.png") || !koreanNumberEncoding.includes('class="math-block"')) failures.push("Korean Chapter 3 is missing its IEEE 754 diagram or rendered mathematics");
  if (!koreanArray.includes("array_definition.png") || !koreanArray.includes('<pre><code class="language-python"') || !koreanLinkedList.includes("linkedlist_definition.png") || !koreanLinkedList.includes('<pre><code class="language-python"')) failures.push("Korean Chapter 4 is missing representative diagrams or Python examples");
  if ((koreanArray.match(/class="content-tabs"/g) || []).length !== 7 ||
      (koreanLinkedList.match(/class="content-tabs"/g) || []).length !== 7 ||
      (koreanDynamicList.match(/class="content-tabs"/g) || []).length !== 7 ||
      !koreanLinkedList.includes("linkedlist_common_types.png") ||
      !koreanLinkedList.includes("<table>") ||
      !koreanRamAndCache.includes("computer_storage_devices.png") ||
      !koreanRamAndCache.includes("<table>") ||
      (koreanDynamicList.match(/class="admonition admonition-pythontutor"/g) || []).length < 6 ||
      !koreanArrayExercises.includes('class="admonition admonition-success"') ||
      !koreanArrayExercises.includes("leetcode.com/problems/reverse-linked-list")) {
    failures.push("Korean Chapter 4 is missing complete code tabs, linked-list/cache media, tables, visualizations, or exercises");
  }
  const vietnameseStack = await readFile(path.join(pilotDirectory, "ngan-xep.html"), "utf8");
  const koreanStack = await readFile(path.join(koreanDirectory, "stack.html"), "utf8");
  const koreanQueue = await readFile(path.join(koreanDirectory, "queue.html"), "utf8");
  const koreanDeque = await readFile(path.join(koreanDirectory, "deque.html"), "utf8");
  const koreanStackExercises = await readFile(path.join(koreanDirectory, "chapter-5-exercises.html"), "utf8");
  const vietnameseHash = await readFile(path.join(pilotDirectory, "bang-bam.html"), "utf8");
  const koreanHash = await readFile(path.join(koreanDirectory, "hash-table.html"), "utf8");
  const koreanHashCollision = await readFile(path.join(koreanDirectory, "hash-collision.html"), "utf8");
  const koreanHashAlgorithm = await readFile(path.join(koreanDirectory, "hash-algorithm.html"), "utf8");
  const koreanHashExercises = await readFile(path.join(koreanDirectory, "chapter-6-exercises.html"), "utf8");
  if (!vietnameseStack.includes("stack_operations.png") || !koreanStack.includes("stack_operations.png") || !vietnameseStack.includes('<pre><code class="language-python"') || !koreanStack.includes('<pre><code class="language-python"')) failures.push("Chapter 5 stack pages are missing diagrams or Python examples");
  if ((koreanStack.match(/class="content-tabs"/g) || []).length < 3 ||
      (koreanQueue.match(/class="content-tabs"/g) || []).length < 3 ||
      (koreanDeque.match(/class="content-tabs"/g) || []).length < 3 ||
      !koreanStack.includes("linkedlist_stack_step3_pop.png") ||
      !koreanStack.includes("array_stack_step3_pop.png") ||
      !koreanStack.includes("<table>") ||
      !koreanQueue.includes("linkedlist_queue_step3_pop.png") ||
      !koreanQueue.includes("array_queue_step3_pop.png") ||
      !koreanQueue.includes("<table>") ||
      !koreanDeque.includes("linkedlist_deque_step5_pop_first.png") ||
      !koreanDeque.includes("array_deque_step5_pop_first.png") ||
      !koreanDeque.includes("<table>") ||
      !koreanStackExercises.includes('class="admonition admonition-success"') ||
      !koreanStackExercises.includes("leetcode.com/problems/valid-parentheses")) {
    failures.push("Korean Chapter 5 is missing complete code tabs, operation media, tables, or exercises");
  }
  if (!vietnameseHash.includes("hash_table_lookup.png") || !koreanHash.includes("hash_table_lookup.png") ||
      !vietnameseHash.includes('class="math"') || !koreanHash.includes('class="math"') ||
      !vietnameseHash.includes('<pre><code class="language-python"') || !koreanHash.includes('<pre><code class="language-python"')) {
    failures.push("Chapter 6 hash-table pages are missing diagrams, inline mathematics, or Python examples");
  }
  if ((koreanHash.match(/class="content-tabs"/g) || []).length !== 3 ||
      !koreanHash.includes("hash_table_reshash.png") ||
      !koreanHash.includes("<table>") ||
      (koreanHash.match(/class="admonition admonition-pythontutor"/g) || []).length !== 2 ||
      (koreanHashCollision.match(/class="content-tabs"/g) || []).length !== 2 ||
      !koreanHashCollision.includes("hash_table_open_addressing_deletion.png") ||
      !koreanHashCollision.includes('class="admonition admonition-tip"') ||
      (koreanHashAlgorithm.match(/class="content-tabs"/g) || []).length !== 2 ||
      (koreanHashAlgorithm.match(/class="math-block"/g) || []).length !== 2 ||
      !koreanHashAlgorithm.includes("hash_collision_best_worst_condition.png") ||
      !koreanHashAlgorithm.includes("<table>") ||
      (koreanHashAlgorithm.match(/class="admonition/g) || []).length !== 2 ||
      (koreanHashExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      !koreanHashExercises.includes("leetcode.com/problems/valid-anagram")) {
    failures.push("Korean Chapter 6 is missing complete code tabs, collision media, mathematics, tables, callouts, or exercises");
  }

  const vietnameseTree = await readFile(path.join(pilotDirectory, "cay-nhi-phan.html"), "utf8");
  const vietnameseAvl = await readFile(path.join(pilotDirectory, "cay-avl.html"), "utf8");
  const koreanTree = await readFile(path.join(koreanDirectory, "binary-tree.html"), "utf8");
  const koreanTreeTraversal = await readFile(path.join(koreanDirectory, "binary-tree-traversal.html"), "utf8");
  const koreanArrayTree = await readFile(path.join(koreanDirectory, "array-representation-of-binary-trees.html"), "utf8");
  const koreanBst = await readFile(path.join(koreanDirectory, "binary-search-tree.html"), "utf8");
  const koreanAvl = await readFile(path.join(koreanDirectory, "avl-tree.html"), "utf8");
  const koreanTreeExercises = await readFile(path.join(koreanDirectory, "chapter-7-exercises.html"), "utf8");
  const vietnameseHeap = await readFile(path.join(pilotDirectory, "cau-truc-heap.html"), "utf8");
  const vietnameseBuildHeap = await readFile(path.join(pilotDirectory, "xay-dung-heap.html"), "utf8");
  const vietnameseTopK = await readFile(path.join(pilotDirectory, "top-k.html"), "utf8");
  const koreanHeap = await readFile(path.join(koreanDirectory, "heap.html"), "utf8");
  const koreanBuildHeap = await readFile(path.join(koreanDirectory, "build-heap.html"), "utf8");
  const koreanTopK = await readFile(path.join(koreanDirectory, "top-k.html"), "utf8");
  const koreanHeapExercises = await readFile(path.join(koreanDirectory, "chapter-8-exercises.html"), "utf8");
  if (!vietnameseTree.includes("binary_tree_definition.png") || !koreanTree.includes("binary_tree_definition.png") || !vietnameseTree.includes('<pre><code class="language-python"') || !koreanTree.includes('<pre><code class="language-python"')) failures.push("Chapter 7 binary-tree pages are missing diagrams or Python examples");
  if (!vietnameseAvl.includes("avltree_rotation_cases.png") ||
      !vietnameseAvl.includes('<pre><code class="language-python"') ||
      !vietnameseAvl.includes("<table>")) {
    failures.push("Vietnamese AVL page is missing rotation diagrams, Python examples, or its rotation table");
  }
  if ((koreanTree.match(/class="content-tabs"/g) || []).length < 3 ||
      !koreanTree.includes("binary_tree_best_worst_cases.png") ||
      !koreanTree.includes("<table>") ||
      (koreanTree.match(/class="admonition/g) || []).length !== 5 ||
      (koreanTreeTraversal.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanTreeTraversal.includes("preorder_step11.png") ||
      (koreanArrayTree.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanArrayTree.includes("array_representation_complete_binary_tree.png") ||
      (koreanBst.match(/class="content-tabs"/g) || []).length < 3 ||
      !koreanBst.includes("bst_remove_case3_step4.png") ||
      !koreanBst.includes("<table>") ||
      (koreanAvl.match(/class="content-tabs"/g) || []).length < 8 ||
      !koreanAvl.includes("avltree_rotation_cases.png") ||
      !koreanAvl.includes("<table>") ||
      !koreanAvl.includes('class="admonition admonition-tip"') ||
      (koreanTreeExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanTreeExercises.match(/class="admonition admonition-tip"/g) || []).length !== 3 ||
      !koreanTreeExercises.includes("leetcode.com/problems/kth-smallest-element-in-a-bst")) {
    failures.push("Korean Chapter 7 is missing complete code tabs, tree traces, tables, callouts, or exercises");
  }
  if (!vietnameseHeap.includes("min_heap_and_max_heap.png") || !koreanHeap.includes("min_heap_and_max_heap.png") || !vietnameseHeap.includes('<pre><code class="language-python"') || !koreanHeap.includes('<pre><code class="language-python"')) failures.push("Chapter 8 heap pages are missing diagrams or Python examples");
  if (!vietnameseHeap.includes("heap_push_step9.png") ||
      !vietnameseHeap.includes("heap_pop_step10.png") ||
      !vietnameseHeap.includes("<table>") ||
      !vietnameseBuildHeap.includes("heapify_operations_count.png") ||
      (vietnameseBuildHeap.match(/class="math-block"/g) || []).length < 4 ||
      !vietnameseTopK.includes("top_k_heap_step9.png") ||
      !vietnameseTopK.includes('<pre><code class="language-python"')) {
    failures.push("Vietnamese Chapter 8 is missing heap steps, its operation table, complexity derivation, or Top-k code");
  }
  if ((koreanHeap.match(/class="content-tabs"/g) || []).length < 5 ||
      !koreanHeap.includes("heap_push_step9.png") ||
      !koreanHeap.includes("heap_pop_step10.png") ||
      !koreanHeap.includes("<table>") ||
      !koreanHeap.includes('class="admonition admonition-pythontutor"') ||
      (koreanBuildHeap.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanBuildHeap.includes("heapify_operations_count.png") ||
      (koreanBuildHeap.match(/class="math-block"/g) || []).length !== 4 ||
      (koreanTopK.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanTopK.includes("top_k_heap_step9.png") ||
      !koreanTopK.includes('class="admonition admonition-question"') ||
      !koreanTopK.includes('class="admonition admonition-tip"') ||
      (koreanHeapExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanHeapExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !koreanHeapExercises.includes("<table>") ||
      !koreanHeapExercises.includes("leetcode.com/problems/kth-largest-element-in-an-array")) {
    failures.push("Korean Chapter 8 is missing complete code tabs, heap traces, derivations, callouts, tables, or exercises");
  }

  const koreanClassification = await readFile(path.join(koreanDirectory, "data-structure-classification.html"), "utf8");
  const koreanBasicTypes = await readFile(path.join(koreanDirectory, "basic-data-types.html"), "utf8");
  const koreanCharacterEncoding = await readFile(path.join(koreanDirectory, "character-encoding.html"), "utf8");
  if (!koreanClassification.includes("classification_logic_structure.png") ||
      !koreanClassification.includes("classification_phisical_structure.png") ||
      !koreanBasicTypes.includes("<table>") ||
      !koreanBasicTypes.includes('<pre><code class="language-python"') ||
      !koreanNumberEncoding.includes("ieee_754_float.png") ||
      (koreanNumberEncoding.match(/class="math-block"/g) || []).length < 10 ||
      !koreanCharacterEncoding.includes("utf-8_hello_algo.png")) {
    failures.push("Korean Chapter 3 is missing classification media, basic-type code/table, number mathematics, or encoding media");
  }

  const vietnameseGraph = await readFile(path.join(pilotDirectory, "duyet-do-thi.html"), "utf8");
  const vietnameseGraphOperations = await readFile(path.join(pilotDirectory, "thao-tac-do-thi.html"), "utf8");
  const koreanGraphOverview = await readFile(path.join(koreanDirectory, "graph.html"), "utf8");
  const koreanGraphOperations = await readFile(path.join(koreanDirectory, "graph-operations.html"), "utf8");
  const koreanGraph = await readFile(path.join(koreanDirectory, "graph-traversal.html"), "utf8");
  const koreanGraphExercises = await readFile(path.join(koreanDirectory, "chapter-9-exercises.html"), "utf8");
  const vietnameseSearch = await readFile(path.join(pilotDirectory, "tim-kiem-nhi-phan.html"), "utf8");
  const vietnameseSearchInsertion = await readFile(path.join(pilotDirectory, "diem-chen-tim-kiem-nhi-phan.html"), "utf8");
  const vietnameseSearchEdge = await readFile(path.join(pilotDirectory, "bien-tim-kiem-nhi-phan.html"), "utf8");
  const vietnameseHashOptimization = await readFile(path.join(pilotDirectory, "toi-uu-tim-kiem-bang-bam.html"), "utf8");
  const vietnameseSearchRevisited = await readFile(path.join(pilotDirectory, "nhin-lai-thuat-toan-tim-kiem.html"), "utf8");
  const vietnameseSearchExercises = await readFile(path.join(pilotDirectory, "bai-tap-tim-kiem.html"), "utf8");
  const koreanSearch = await readFile(path.join(koreanDirectory, "binary-search.html"), "utf8");
  const koreanSearchInsertion = await readFile(path.join(koreanDirectory, "binary-search-insertion.html"), "utf8");
  const koreanSearchEdge = await readFile(path.join(koreanDirectory, "binary-search-edge.html"), "utf8");
  const koreanHashOptimization = await readFile(path.join(koreanDirectory, "replace-linear-by-hashing.html"), "utf8");
  const koreanSearchRevisited = await readFile(path.join(koreanDirectory, "searching-algorithms-revisited.html"), "utf8");
  const koreanSearchExercises = await readFile(path.join(koreanDirectory, "chapter-10-exercises.html"), "utf8");
  if (!vietnameseGraph.includes("graph_bfs.png") || !koreanGraph.includes("graph_bfs.png") || !vietnameseGraph.includes('<pre><code class="language-python"') || !koreanGraph.includes('<pre><code class="language-python"')) failures.push("Chapter 9 graph-traversal pages are missing diagrams or Python examples");
  if (!vietnameseGraphOperations.includes("adjacency_matrix_step5_remove_vertex.png") ||
      !vietnameseGraphOperations.includes("adjacency_list_step5_remove_vertex.png") ||
      !vietnameseGraphOperations.includes("<table>") ||
      (vietnameseGraphOperations.match(/class="content-tabs"/g) || []).length < 2 ||
      !vietnameseGraph.includes("graph_bfs_step11.png") ||
      !vietnameseGraph.includes("graph_dfs_step11.png") ||
      (vietnameseGraph.match(/class="content-tabs"/g) || []).length < 2 ||
      (vietnameseGraph.match(/class="admonition/g) || []).length < 3) {
    failures.push("Vietnamese Chapter 9 is missing graph-operation steps, traversal sequences, tables, code tabs, or callouts");
  }
  if (!koreanGraphOverview.includes("linkedlist_tree_graph.png") ||
      !koreanGraphOverview.includes("adjacency_matrix.png") ||
      !koreanGraphOverview.includes("adjacency_list.png") ||
      !koreanGraphOverview.includes("<table>") ||
      (koreanGraphOverview.match(/class="math-block"/g) || []).length !== 1 ||
      (koreanGraphOperations.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanGraphOperations.includes("adjacency_matrix_step5_remove_vertex.png") ||
      !koreanGraphOperations.includes("adjacency_list_step5_remove_vertex.png") ||
      !koreanGraphOperations.includes("<table>") ||
      (koreanGraph.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanGraph.includes("graph_bfs_step11.png") ||
      !koreanGraph.includes("graph_dfs_step11.png") ||
      (koreanGraph.match(/class="admonition/g) || []).length !== 3 ||
      (koreanGraphExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanGraphExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !koreanGraphExercises.includes("<table>") ||
      !koreanGraphExercises.includes("leetcode.com/problems/find-if-path-exists-in-graph")) {
    failures.push("Korean Chapter 9 is missing complete graph representations, operation/traversal traces, code tabs, tables, callouts, or exercises");
  }
  if (!vietnameseSearch.includes("binary_search_example.png") || !koreanSearch.includes("binary_search_example.png") || !vietnameseSearch.includes('<pre><code class="language-python"') || !koreanSearch.includes('<pre><code class="language-python"')) failures.push("Chapter 10 binary-search pages are missing diagrams or Python examples");
  if (!vietnameseSearch.includes("binary_search_step7.png") ||
      !vietnameseSearch.includes("binary_search_ranges.png") ||
      (vietnameseSearch.match(/class="content-tabs"/g) || []).length < 2 ||
      !vietnameseSearchInsertion.includes("binary_search_insertion_step8.png") ||
      (vietnameseSearchInsertion.match(/class="content-tabs"/g) || []).length < 2 ||
      (vietnameseSearchInsertion.match(/class="admonition/g) || []).length < 3 ||
      !vietnameseSearchEdge.includes("binary_search_edge_by_element.png") ||
      (vietnameseSearchEdge.match(/class="content-tabs"/g) || []).length < 2 ||
      !vietnameseHashOptimization.includes("two_sum_hashtable_step3.png") ||
      (vietnameseHashOptimization.match(/class="content-tabs"/g) || []).length < 2 ||
      !vietnameseSearchRevisited.includes("searching_algorithms.png") ||
      !vietnameseSearchRevisited.includes("<table>") ||
      (vietnameseSearchExercises.match(/class="admonition/g) || []).length < 5) {
    failures.push("Vietnamese Chapter 10 is missing search traces, code tabs, comparison media/table, callouts, or exercises");
  }
  if (!koreanSearch.includes("binary_search_step7.png") ||
      !koreanSearch.includes("binary_search_ranges.png") ||
      (koreanSearch.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanSearchInsertion.includes("binary_search_insertion_step8.png") ||
      (koreanSearchInsertion.match(/class="content-tabs"/g) || []).length < 2 ||
      (koreanSearchInsertion.match(/class="admonition/g) || []).length !== 3 ||
      !koreanSearchEdge.includes("binary_search_edge_by_element.png") ||
      !koreanSearchEdge.includes("binary_search_right_edge_by_left_edge.png") ||
      (koreanSearchEdge.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanHashOptimization.includes("two_sum_hashtable_step3.png") ||
      (koreanHashOptimization.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanSearchRevisited.includes("searching_algorithms.png") ||
      !koreanSearchRevisited.includes("<table>") ||
      !koreanSearchRevisited.includes('class="admonition admonition-tip"') ||
      (koreanSearchExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanSearchExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !koreanSearchExercises.includes("<table>") ||
      !koreanSearchExercises.includes("leetcode.com/problems/search-insert-position")) {
    failures.push("Korean Chapter 10 is missing complete search traces, code tabs, comparison media/table, callouts, or exercises");
  }

  const vietnameseSort = await readFile(path.join(pilotDirectory, "sap-xep-nhanh.html"), "utf8");
  const vietnameseMergeSort = await readFile(path.join(pilotDirectory, "sap-xep-tron.html"), "utf8");
  const vietnameseHeapSort = await readFile(path.join(pilotDirectory, "sap-xep-vun-dong.html"), "utf8");
  const vietnameseCountingSort = await readFile(path.join(pilotDirectory, "sap-xep-dem.html"), "utf8");
  const vietnameseRadixSort = await readFile(path.join(pilotDirectory, "sap-xep-co-so.html"), "utf8");
  const vietnameseSortExercises = await readFile(path.join(pilotDirectory, "bai-tap-sap-xep.html"), "utf8");
  const koreanSort = await readFile(path.join(koreanDirectory, "quick-sort.html"), "utf8");
  const koreanSelectionSort = await readFile(path.join(koreanDirectory, "selection-sort.html"), "utf8");
  const koreanBubbleSort = await readFile(path.join(koreanDirectory, "bubble-sort.html"), "utf8");
  const koreanInsertionSort = await readFile(path.join(koreanDirectory, "insertion-sort.html"), "utf8");
  const koreanMergeSort = await readFile(path.join(koreanDirectory, "merge-sort.html"), "utf8");
  const koreanHeapSort = await readFile(path.join(koreanDirectory, "heap-sort.html"), "utf8");
  const koreanBucketSort = await readFile(path.join(koreanDirectory, "bucket-sort.html"), "utf8");
  const koreanCountingSort = await readFile(path.join(koreanDirectory, "counting-sort.html"), "utf8");
  const koreanRadixSort = await readFile(path.join(koreanDirectory, "radix-sort.html"), "utf8");
  const koreanSortSummary = await readFile(path.join(koreanDirectory, "chapter-11-summary.html"), "utf8");
  const koreanSortExercises = await readFile(path.join(koreanDirectory, "chapter-11-exercises.html"), "utf8");
  const vietnameseDivideOverview = await readFile(path.join(pilotDirectory, "thuat-toan-chia-de-tri.html"), "utf8");
  const vietnameseBuildTree = await readFile(path.join(pilotDirectory, "dung-cay-nhi-phan.html"), "utf8");
  const vietnameseDivide = await readFile(path.join(pilotDirectory, "thap-ha-noi.html"), "utf8");
  const vietnameseDivideExercises = await readFile(path.join(pilotDirectory, "bai-tap-chia-de-tri.html"), "utf8");
  const koreanDivideOverview = await readFile(path.join(koreanDirectory, "divide-and-conquer-algorithms.html"), "utf8");
  const koreanDivideSearch = await readFile(path.join(koreanDirectory, "binary-search-recursive.html"), "utf8");
  const koreanBuildTree = await readFile(path.join(koreanDirectory, "build-binary-tree.html"), "utf8");
  const koreanDivide = await readFile(path.join(koreanDirectory, "hanota.html"), "utf8");
  const koreanDivideExercises = await readFile(path.join(koreanDirectory, "chapter-12-exercises.html"), "utf8");
  if (!vietnameseSort.includes("quick_sort_overview.png") || !koreanSort.includes("quick_sort_overview.png") || !vietnameseSort.includes('<pre><code class="language-python"') || !koreanSort.includes('<pre><code class="language-python"')) failures.push("Chapter 11 quick-sort pages are missing diagrams or Python examples");
  if ((vietnameseSort.match(/class="content-tabs"/g) || []).length < 4 ||
      !vietnameseSort.includes("pivot_division_step9.png") ||
      !vietnameseSort.includes('class="admonition admonition-note"') ||
      (vietnameseMergeSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseMergeSort.includes("merge_sort_step10.png") ||
      (vietnameseHeapSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseHeapSort.includes("heap_sort_step12.png") ||
      (vietnameseHeapSort.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      (vietnameseCountingSort.match(/class="content-tabs"/g) || []).length < 2 ||
      !vietnameseCountingSort.includes("counting_sort_step8.png") ||
      (vietnameseCountingSort.match(/class="math-block"/g) || []).length !== 1 ||
      !vietnameseCountingSort.includes('class="admonition admonition-note"') ||
      (vietnameseRadixSort.match(/class="content-tabs"/g) || []).length < 1 ||
      (vietnameseRadixSort.match(/class="math-block"/g) || []).length !== 1 ||
      !vietnameseRadixSort.includes('class="admonition admonition-question"') ||
      (vietnameseSortExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseSortExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !vietnameseSortExercises.includes("leetcode.com/problems/sort-an-array")) {
    failures.push("Vietnamese Chapter 11 is missing complete code tabs, sorting traces, mathematics, callouts, or exercises");
  }
  if ((koreanSelectionSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanSelectionSort.includes("selection_sort_step11.png") ||
      !koreanSelectionSort.includes("selection_sort_instability.png") ||
      (koreanBubbleSort.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanBubbleSort.includes("bubble_operation_step7.png") ||
      !koreanBubbleSort.includes("bubble_sort_overview.png") ||
      (koreanInsertionSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanInsertionSort.includes("insertion_operation.png") ||
      !koreanInsertionSort.includes("insertion_sort_overview.png") ||
      (koreanSort.match(/class="content-tabs"/g) || []).length < 4 ||
      !koreanSort.includes("pivot_division_step9.png") ||
      !koreanSort.includes("quick_sort_overview.png") ||
      !koreanSort.includes('class="admonition admonition-note"') ||
      (koreanMergeSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanMergeSort.includes("merge_sort_step10.png") ||
      (koreanHeapSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanHeapSort.includes("heap_sort_step12.png") ||
      (koreanHeapSort.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      (koreanBucketSort.match(/class="content-tabs"/g) || []).length < 1 ||
      !koreanBucketSort.includes("scatter_in_buckets_recursively.png") ||
      !koreanBucketSort.includes("scatter_in_buckets_distribution.png") ||
      (koreanCountingSort.match(/class="content-tabs"/g) || []).length < 2 ||
      !koreanCountingSort.includes("counting_sort_step8.png") ||
      (koreanCountingSort.match(/class="math-block"/g) || []).length !== 1 ||
      !koreanCountingSort.includes('class="admonition admonition-note"') ||
      (koreanRadixSort.match(/class="content-tabs"/g) || []).length < 1 ||
      (koreanRadixSort.match(/class="math-block"/g) || []).length !== 1 ||
      !koreanRadixSort.includes('class="admonition admonition-question"') ||
      !koreanSortSummary.includes("sorting_algorithms_comparison.png") ||
      (koreanSortExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanSortExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !koreanSortExercises.includes("<table>") ||
      !koreanSortExercises.includes("leetcode.com/problems/sort-an-array")) {
    failures.push("Korean Chapter 11 is missing complete sorting traces, inline code tabs, derivations, callouts, comparison media, or exercises");
  }
  if (!vietnameseDivide.includes("hanota_example.png") || !koreanDivide.includes("hanota_example.png") || !vietnameseDivide.includes('<pre><code class="language-python"') || !koreanDivide.includes('<pre><code class="language-python"')) failures.push("Chapter 12 Hanota pages are missing diagrams or Python examples");
  if (!vietnameseDivideOverview.includes("divide_and_conquer_parallel_computing.png") ||
      (vietnameseDivideOverview.match(/class="math-block"/g) || []).length !== 2 ||
      (vietnameseBuildTree.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseBuildTree.includes("built_tree_step9.png") ||
      !vietnameseBuildTree.includes("built_tree_overall.png") ||
      !vietnameseBuildTree.includes("<table>") ||
      !vietnameseBuildTree.includes('class="admonition admonition-question"') ||
      (vietnameseDivide.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseDivide.includes("hanota_f2_step4.png") ||
      !vietnameseDivide.includes("hanota_f3_step4.png") ||
      !vietnameseDivide.includes("hanota_recursive_tree.png") ||
      !vietnameseDivide.includes('class="admonition admonition-quote"') ||
      (vietnameseDivideExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseDivideExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !vietnameseDivideExercises.includes("leetcode.com/problems/powx-n")) {
    failures.push("Vietnamese Chapter 12 is missing complete code tabs, derivations, visual traces, callouts, or exercises");
  }
  if (!koreanDivideOverview.includes("divide_and_conquer_merge_sort.png") ||
      !koreanDivideOverview.includes("divide_and_conquer_parallel_computing.png") ||
      (koreanDivideOverview.match(/class="math-block"/g) || []).length !== 2 ||
      (koreanDivideSearch.match(/class="content-tabs"/g) || []).length !== 1 ||
      !koreanDivideSearch.includes("binary_search_recur.png") ||
      !koreanDivideSearch.includes('class="admonition admonition-question"') ||
      (koreanBuildTree.match(/class="content-tabs"/g) || []).length !== 2 ||
      !koreanBuildTree.includes("built_tree_step9.png") ||
      !koreanBuildTree.includes("built_tree_overall.png") ||
      !koreanBuildTree.includes("<table>") ||
      !koreanBuildTree.includes('class="admonition admonition-question"') ||
      (koreanDivide.match(/class="content-tabs"/g) || []).length !== 4 ||
      !koreanDivide.includes("hanota_f2_step4.png") ||
      !koreanDivide.includes("hanota_f3_step4.png") ||
      !koreanDivide.includes("hanota_recursive_tree.png") ||
      !koreanDivide.includes('class="admonition admonition-quote"') ||
      (koreanDivideExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanDivideExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !koreanDivideExercises.includes("leetcode.com/problems/powx-n")) {
    failures.push("Korean Chapter 12 is missing complete derivations, inline code tabs, visual traces, tables, callouts, or exercises");
  }

  const vietnameseBacktrackingAlgorithm = await readFile(path.join(pilotDirectory, "thuat-toan-quay-lui.html"), "utf8");
  const vietnameseBacktracking = await readFile(path.join(pilotDirectory, "bai-toan-n-hau.html"), "utf8");
  const vietnamesePermutations = await readFile(path.join(pilotDirectory, "bai-toan-hoan-vi.html"), "utf8");
  const vietnameseSubsetSum = await readFile(path.join(pilotDirectory, "bai-toan-tong-tap-con.html"), "utf8");
  const vietnameseBacktrackingExercises = await readFile(path.join(pilotDirectory, "bai-tap-quay-lui.html"), "utf8");
  const koreanBacktrackingAlgorithm = await readFile(path.join(koreanDirectory, "backtracking-algorithm.html"), "utf8");
  const koreanBacktracking = await readFile(path.join(koreanDirectory, "n-queens.html"), "utf8");
  const koreanPermutations = await readFile(path.join(koreanDirectory, "permutations.html"), "utf8");
  const koreanSubsetSum = await readFile(path.join(koreanDirectory, "subset-sum.html"), "utf8");
  const koreanBacktrackingExercises = await readFile(path.join(koreanDirectory, "chapter-13-exercises.html"), "utf8");
  const vietnameseDpIntro = await readFile(path.join(pilotDirectory, "gioi-thieu-quy-hoach-dong.html"), "utf8");
  const vietnameseDpFeatures = await readFile(path.join(pilotDirectory, "dac-trung-bai-toan-quy-hoach-dong.html"), "utf8");
  const vietnameseDpPipeline = await readFile(path.join(pilotDirectory, "quy-trinh-giai-quy-hoach-dong.html"), "utf8");
  const vietnameseKnapsack = await readFile(path.join(pilotDirectory, "ba-lo-khong-mot.html"), "utf8");
  const vietnameseUnboundedKnapsack = await readFile(path.join(pilotDirectory, "ba-lo-vo-han.html"), "utf8");
  const vietnameseDynamicProgramming = await readFile(path.join(pilotDirectory, "khoang-cach-chinh-sua.html"), "utf8");
  const vietnameseDynamicExercises = await readFile(path.join(pilotDirectory, "bai-tap-quy-hoach-dong.html"), "utf8");
  const koreanDpIntro = await readFile(path.join(koreanDirectory, "intro-to-dynamic-programming.html"), "utf8");
  const koreanDpFeatures = await readFile(path.join(koreanDirectory, "dynamic-programming-characteristics.html"), "utf8");
  const koreanDpPipeline = await readFile(path.join(koreanDirectory, "dynamic-programming-approach.html"), "utf8");
  const koreanKnapsack = await readFile(path.join(koreanDirectory, "zero-one-knapsack.html"), "utf8");
  const koreanUnboundedKnapsack = await readFile(path.join(koreanDirectory, "unbounded-knapsack.html"), "utf8");
  const koreanDynamicProgramming = await readFile(path.join(koreanDirectory, "edit-distance.html"), "utf8");
  const koreanDynamicExercises = await readFile(path.join(koreanDirectory, "dynamic-programming-exercises.html"), "utf8");
  if (!vietnameseBacktracking.includes("solution_4_queens.png") || !koreanBacktracking.includes("solution_4_queens.png") || !vietnameseBacktracking.includes('<pre><code class="language-python"') || !koreanBacktracking.includes('<pre><code class="language-python"')) failures.push("Chapter 13 N-Queens pages are missing diagrams or Python examples");
  if ((vietnameseBacktrackingAlgorithm.match(/class="content-tabs"/g) || []).length !== 6 ||
      !vietnameseBacktrackingAlgorithm.includes("preorder_find_paths_step11.png") ||
      !vietnameseBacktrackingAlgorithm.includes("preorder_find_constrained_paths.png") ||
      !vietnameseBacktrackingAlgorithm.includes("backtrack_remove_return_or_not.png") ||
      !vietnameseBacktrackingAlgorithm.includes("<table>") ||
      (vietnameseBacktrackingAlgorithm.match(/class="admonition/g) || []).length !== 4 ||
      (vietnameseBacktracking.match(/class="content-tabs"/g) || []).length !== 1 ||
      !vietnameseBacktracking.includes("n_queens_cols_diagonals.png") ||
      !vietnameseBacktracking.includes('class="admonition admonition-question"') ||
      !vietnameseBacktracking.includes('class="admonition admonition-tip"') ||
      (vietnamesePermutations.match(/class="content-tabs"/g) || []).length !== 2 ||
      !vietnamesePermutations.includes("permutations_ii_pruning_summary.png") ||
      !vietnamesePermutations.includes("<table>") ||
      (vietnameseSubsetSum.match(/class="content-tabs"/g) || []).length !== 3 ||
      !vietnameseSubsetSum.includes("subset_sum_i.png") ||
      !vietnameseSubsetSum.includes("subset_sum_ii.png") ||
      (vietnameseBacktrackingExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseBacktrackingExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !vietnameseBacktrackingExercises.includes("leetcode.com/problems/permutations")) {
    failures.push("Vietnamese Chapter 13 is missing complete code tabs, decision traces, pruning media, tables, callouts, or exercises");
  }
  if ((koreanBacktrackingAlgorithm.match(/class="content-tabs"/g) || []).length !== 6 ||
      !koreanBacktrackingAlgorithm.includes("preorder_find_paths_step11.png") ||
      !koreanBacktrackingAlgorithm.includes("preorder_find_constrained_paths.png") ||
      !koreanBacktrackingAlgorithm.includes("backtrack_remove_return_or_not.png") ||
      !koreanBacktrackingAlgorithm.includes("<table>") ||
      (koreanBacktrackingAlgorithm.match(/class="admonition/g) || []).length !== 4 ||
      (koreanBacktracking.match(/class="content-tabs"/g) || []).length !== 1 ||
      !koreanBacktracking.includes("n_queens_cols_diagonals.png") ||
      !koreanBacktracking.includes('class="admonition admonition-question"') ||
      !koreanBacktracking.includes('class="admonition admonition-tip"') ||
      (koreanPermutations.match(/class="content-tabs"/g) || []).length !== 2 ||
      !koreanPermutations.includes("permutations_ii_pruning_summary.png") ||
      !koreanPermutations.includes("<table>") ||
      (koreanSubsetSum.match(/class="content-tabs"/g) || []).length !== 3 ||
      !koreanSubsetSum.includes("subset_sum_i.png") ||
      !koreanSubsetSum.includes("subset_sum_ii.png") ||
      (koreanBacktrackingExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanBacktrackingExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !koreanBacktrackingExercises.includes("leetcode.com/problems/permutations")) {
    failures.push("Korean Chapter 13 is missing complete code tabs, decision traces, pruning media, tables, callouts, or exercises");
  }
  if (!vietnameseDynamicProgramming.includes("edit_distance_example.png") || !koreanDynamicProgramming.includes("edit_distance_example.png") || !vietnameseDynamicProgramming.includes('<pre><code class="language-python"') || !koreanDynamicProgramming.includes('<pre><code class="language-python"')) failures.push("Chapter 14 edit-distance pages are missing diagrams or Python examples");
  if ((vietnameseDpIntro.match(/class="content-tabs"/g) || []).length !== 5 ||
      !vietnameseDpIntro.includes("climbing_stairs_dfs_memo_tree.png") ||
      !vietnameseDpIntro.includes("climbing_stairs_dp.png") ||
      (vietnameseDpIntro.match(/class="math-block"/g) || []).length !== 2 ||
      (vietnameseDpFeatures.match(/class="content-tabs"/g) || []).length !== 3 ||
      !vietnameseDpFeatures.includes("climbing_stairs_constraint_state_transfer.png") ||
      (vietnameseDpFeatures.match(/class="math-block"/g) || []).length !== 2 ||
      (vietnameseDpFeatures.match(/class="admonition/g) || []).length !== 3 ||
      (vietnameseDpPipeline.match(/class="content-tabs"/g) || []).length !== 5 ||
      !vietnameseDpPipeline.includes("min_path_sum_dp_step12.png") ||
      (vietnameseDpPipeline.match(/class="admonition/g) || []).length !== 4 ||
      (vietnameseKnapsack.match(/class="content-tabs"/g) || []).length !== 6 ||
      !vietnameseKnapsack.includes("knapsack_dp_step14.png") ||
      !vietnameseKnapsack.includes("knapsack_dp_comp_step6.png") ||
      (vietnameseUnboundedKnapsack.match(/class="content-tabs"/g) || []).length !== 8 ||
      !vietnameseUnboundedKnapsack.includes("unbounded_knapsack_dp_comp_step6.png") ||
      !vietnameseUnboundedKnapsack.includes("coin_change_dp_step15.png") ||
      (vietnameseUnboundedKnapsack.match(/class="math-block"/g) || []).length !== 3 ||
      (vietnameseDynamicProgramming.match(/class="content-tabs"/g) || []).length !== 3 ||
      !vietnameseDynamicProgramming.includes("edit_distance_dp_step15.png") ||
      (vietnameseDynamicProgramming.match(/class="math-block"/g) || []).length !== 2 ||
      (vietnameseDynamicExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseDynamicExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !vietnameseDynamicExercises.includes("leetcode.com/problems/climbing-stairs")) {
    failures.push("Vietnamese Chapter 14 is missing complete code tabs, state derivations, dynamic-programming traces, callouts, or exercises");
  }
  if ((koreanDpIntro.match(/class="content-tabs"/g) || []).length !== 5 ||
      !koreanDpIntro.includes("climbing_stairs_dfs_memo_tree.png") ||
      !koreanDpIntro.includes("climbing_stairs_dp.png") ||
      (koreanDpIntro.match(/class="math-block"/g) || []).length !== 2 ||
      (koreanDpFeatures.match(/class="content-tabs"/g) || []).length !== 3 ||
      !koreanDpFeatures.includes("climbing_stairs_constraint_state_transfer.png") ||
      (koreanDpFeatures.match(/class="math-block"/g) || []).length !== 2 ||
      (koreanDpFeatures.match(/class="admonition/g) || []).length !== 3 ||
      (koreanDpPipeline.match(/class="content-tabs"/g) || []).length !== 5 ||
      !koreanDpPipeline.includes("min_path_sum_dp_step12.png") ||
      (koreanDpPipeline.match(/class="admonition/g) || []).length !== 4 ||
      (koreanKnapsack.match(/class="content-tabs"/g) || []).length !== 6 ||
      !koreanKnapsack.includes("knapsack_dp_step14.png") ||
      !koreanKnapsack.includes("knapsack_dp_comp_step6.png") ||
      (koreanUnboundedKnapsack.match(/class="content-tabs"/g) || []).length !== 8 ||
      !koreanUnboundedKnapsack.includes("unbounded_knapsack_dp_comp_step6.png") ||
      !koreanUnboundedKnapsack.includes("coin_change_dp_step15.png") ||
      (koreanUnboundedKnapsack.match(/class="math-block"/g) || []).length !== 3 ||
      (koreanDynamicProgramming.match(/class="content-tabs"/g) || []).length !== 3 ||
      !koreanDynamicProgramming.includes("edit_distance_dp_step15.png") ||
      (koreanDynamicProgramming.match(/class="math-block"/g) || []).length !== 2 ||
      (koreanDynamicExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanDynamicExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !koreanDynamicExercises.includes("leetcode.com/problems/climbing-stairs")) {
    failures.push("Korean Chapter 14 is missing complete code tabs, state derivations, interactive dynamic-programming traces, callouts, or exercises");
  }

  const vietnameseGreedyAlgorithm = await readFile(path.join(pilotDirectory, "thuat-toan-tham-lam.html"), "utf8");
  const vietnameseGreedy = await readFile(path.join(pilotDirectory, "ba-lo-phan-so.html"), "utf8");
  const vietnameseMaxCapacity = await readFile(path.join(pilotDirectory, "suc-chua-lon-nhat.html"), "utf8");
  const vietnameseMaxProduct = await readFile(path.join(pilotDirectory, "tich-cat-lon-nhat.html"), "utf8");
  const koreanGreedyIndex = await readFile(path.join(koreanDirectory, "greedy.html"), "utf8");
  const koreanGreedyAlgorithm = await readFile(path.join(koreanDirectory, "greedy-algorithm.html"), "utf8");
  const koreanGreedy = await readFile(path.join(koreanDirectory, "fractional-knapsack.html"), "utf8");
  const koreanMaxCapacity = await readFile(path.join(koreanDirectory, "max-capacity.html"), "utf8");
  const koreanMaxProduct = await readFile(path.join(koreanDirectory, "max-product-cutting.html"), "utf8");
  const koreanGreedySummary = await readFile(path.join(koreanDirectory, "chapter-15-summary.html"), "utf8");
  const vietnameseGreedyExercises = await readFile(path.join(pilotDirectory, "bai-tap-tham-lam.html"), "utf8");
  const koreanGreedyExercises = await readFile(path.join(koreanDirectory, "greedy-exercises.html"), "utf8");
  const vietnameseBeforeStarting = await readFile(path.join(pilotDirectory, "truoc-khi-bat-dau.html"), "utf8");
  const vietnameseAppendixIndex = await readFile(path.join(pilotDirectory, "phu-luc.html"), "utf8");
  const vietnameseAppendix = await readFile(path.join(pilotDirectory, "cai-dat-moi-truong-lap-trinh.html"), "utf8");
  const vietnameseContribution = await readFile(path.join(pilotDirectory, "cung-dong-gop.html"), "utf8");
  const vietnameseTerminology = await readFile(path.join(pilotDirectory, "bang-thuat-ngu.html"), "utf8");
  const koreanBookHome = await readFile(path.join(koreanDirectory, "book-home.html"), "utf8");
  const koreanBeforeStarting = await readFile(path.join(koreanDirectory, "before-starting.html"), "utf8");
  const koreanAppendixIndex = await readFile(path.join(koreanDirectory, "appendix.html"), "utf8");
  const koreanAppendix = await readFile(path.join(koreanDirectory, "programming-environment.html"), "utf8");
  const koreanContribution = await readFile(path.join(koreanDirectory, "contributing.html"), "utf8");
  const koreanTerminology = await readFile(path.join(koreanDirectory, "glossary.html"), "utf8");
  if (!vietnameseGreedy.includes("fractional_knapsack_example.png") || !koreanGreedy.includes("fractional_knapsack_example.png") || !vietnameseGreedy.includes('<pre><code class="language-python"') || !koreanGreedy.includes('<pre><code class="language-python"')) failures.push("Chapter 15 fractional-knapsack pages are missing diagrams or Python examples");
  if ((vietnameseGreedyAlgorithm.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseGreedyAlgorithm.includes("coin_change_greedy_vs_dp.png") ||
      (vietnameseGreedyAlgorithm.match(/class="admonition/g) || []).length !== 2 ||
      (vietnameseGreedy.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseGreedy.includes("fractional_knapsack_area_chart.png") ||
      (vietnameseMaxCapacity.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseMaxCapacity.includes("max_capacity_greedy_step9.png") ||
      !vietnameseMaxCapacity.includes("max_capacity_skipped_states.png") ||
      (vietnameseMaxCapacity.match(/class="math-block"/g) || []).length !== 2 ||
      (vietnameseMaxProduct.match(/class="content-tabs"/g) || []).length < 1 ||
      !vietnameseMaxProduct.includes("max_product_cutting_greedy_infer2.png") ||
      (vietnameseMaxProduct.match(/class="math-block"/g) || []).length !== 4 ||
      (vietnameseGreedyExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseGreedyExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !vietnameseGreedyExercises.includes("Ba lô phân số")) {
    failures.push("Vietnamese Chapter 15 is missing complete code tabs, greedy traces, derivations, callouts, or exercises");
  }
  if (!koreanGreedyIndex.includes("chapter_greedy.jpg") ||
      !koreanGreedyIndex.includes('class="admonition admonition-abstract"') ||
      (koreanGreedyAlgorithm.match(/class="content-tabs"/g) || []).length !== 1 ||
      !koreanGreedyAlgorithm.includes("coin_change_greedy_strategy.png") ||
      !koreanGreedyAlgorithm.includes("coin_change_greedy_vs_dp.png") ||
      (koreanGreedyAlgorithm.match(/class="admonition/g) || []).length !== 2 ||
      (koreanGreedy.match(/class="content-tabs"/g) || []).length !== 1 ||
      !koreanGreedy.includes("fractional_knapsack_example.png") ||
      !koreanGreedy.includes("fractional_knapsack_area_chart.png") ||
      !koreanGreedy.includes("전체 실행 시간은 정렬이 지배") ||
      (koreanMaxCapacity.match(/class="content-tabs"/g) || []).length !== 2 ||
      !koreanMaxCapacity.includes("max_capacity_greedy_step9.png") ||
      !koreanMaxCapacity.includes("max_capacity_skipped_states.png") ||
      (koreanMaxCapacity.match(/class="math-block"/g) || []).length !== 2 ||
      (koreanMaxProduct.match(/class="content-tabs"/g) || []).length !== 1 ||
      !koreanMaxProduct.includes("max_product_cutting_greedy_infer2.png") ||
      (koreanMaxProduct.match(/class="math-block"/g) || []).length !== 4 ||
      !koreanMaxProduct.includes("동등하거나 더 나은 최적 분할") ||
      !koreanGreedySummary.includes("교환 논증") ||
      (koreanGreedyExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (koreanGreedyExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !koreanGreedyExercises.includes("분할 가능 배낭")) {
    failures.push("Korean Chapter 15 is missing complete greedy reasoning, code tabs, visual traces, derivations, proofs, callouts, or exercises");
  }
  if (!vietnameseDynamicExercises.includes('class="admonition admonition-success"') || !koreanDynamicExercises.includes('class="admonition admonition-success"') || !vietnameseDynamicExercises.includes("leetcode.com/problems/climbing-stairs") || !koreanDynamicExercises.includes("leetcode.com/problems/climbing-stairs")) failures.push("Chapter 14 exercise pages are missing rendered answers or programming links");
  if (!vietnameseGreedyExercises.includes('class="admonition admonition-success"') || !koreanGreedyExercises.includes('class="admonition admonition-success"') || !vietnameseGreedyExercises.includes("10 + 1 + 1 + 1 + 1") || !koreanGreedyExercises.includes("10 + 1 + 1 + 1 + 1")) failures.push("Chapter 15 exercise pages are missing rendered answers or greedy counterexamples");
  if (!vietnameseGreedyExercises.includes("kg, nên B có mật độ giá trị cao hơn và được đưa vào trước.</li>")) failures.push("Wrapped Markdown list items are split outside their list item");
  if (!vietnameseBeforeStarting.includes("chapter_hello_algo.jpg") ||
      !vietnameseBeforeStarting.includes("<strong>Xin chào, thuật toán!</strong>") ||
      !vietnameseAppendixIndex.includes("chapter_appendix.jpg") ||
      !vietnameseAppendix.includes("vscode_installation.png") ||
      !vietnameseAppendix.includes("vscode_extension_installation.png") ||
      !vietnameseAppendix.includes("Môi trường Python") ||
      !vietnameseAppendix.includes("Môi trường C/C++") ||
      !vietnameseAppendix.includes("Môi trường Java") ||
      !vietnameseAppendix.includes("Môi trường C#") ||
      !vietnameseAppendix.includes("Môi trường Go") ||
      !vietnameseAppendix.includes("Môi trường Swift") ||
      !vietnameseAppendix.includes("Môi trường JavaScript") ||
      !vietnameseAppendix.includes("Pretty TypeScript Errors") ||
      !vietnameseAppendix.includes("Môi trường Dart") ||
      !vietnameseAppendix.includes("Môi trường Rust") ||
      !vietnameseContribution.includes('class="admonition admonition-success"') ||
      !vietnameseContribution.includes("edit_markdown.png") ||
      !vietnameseContribution.includes('<pre><code class="language-shell">docker-compose up -d') ||
      !vietnameseContribution.includes('<pre><code class="language-shell">docker-compose down') ||
      !vietnameseTerminology.includes("<table>") ||
      (vietnameseTerminology.match(/<tr>/g) || []).length !== 127 ||
      !vietnameseTerminology.includes("greedy algorithm — thuật toán tham lam") ||
      !vietnameseTerminology.includes("state-transition equation — phương trình chuyển trạng thái")) {
    failures.push("Vietnamese Chapter 0 or Appendix is missing source-complete opening, installation, contribution, Docker, or glossary content");
  }
  if (!koreanBookHome.includes('href="before-starting.html"') ||
      !koreanBookHome.includes("애니메이션 그림과 바로 실행할 수 있는 코드") ||
      !koreanBeforeStarting.includes("chapter_hello_algo.jpg") ||
      !koreanBeforeStarting.includes("<strong>안녕하세요, 알고리즘!</strong>") ||
      !koreanBeforeStarting.includes("파인만 교수") ||
      !koreanAppendixIndex.includes("chapter_appendix.jpg") ||
      !koreanAppendix.includes("vscode_installation.png") ||
      !koreanAppendix.includes("vscode_extension_installation.png") ||
      !koreanAppendix.includes("Python 환경") ||
      !koreanAppendix.includes("C/C++ 환경") ||
      !koreanAppendix.includes("Java 환경") ||
      !koreanAppendix.includes("C# 환경") ||
      !koreanAppendix.includes("Go 환경") ||
      !koreanAppendix.includes("Swift 환경") ||
      !koreanAppendix.includes("JavaScript 환경") ||
      !koreanAppendix.includes("Pretty TypeScript Errors") ||
      !koreanAppendix.includes("Dart 환경") ||
      !koreanAppendix.includes("Rust 환경") ||
      !koreanContribution.includes('class="admonition admonition-success"') ||
      !koreanContribution.includes("edit_markdown.png") ||
      !koreanContribution.includes('<pre><code class="language-shell">docker-compose up -d') ||
      !koreanContribution.includes('<pre><code class="language-shell">docker-compose down') ||
      !koreanTerminology.includes("<table>") ||
      (koreanTerminology.match(/<tr>/g) || []).length !== 127 ||
      !koreanTerminology.includes("state-transition equation — 상태 전이 방정식") ||
      !koreanTerminology.includes("greedy algorithm — 그리디 알고리즘")) {
    failures.push("Korean Book Home, Chapter 0, or Appendix is missing source-complete navigation, opening, installation, contribution, Docker, or glossary content");
  }
  if (!vietnameseAppendix.includes("vscode_installation.png") ||
      !vietnameseAppendix.includes("vscode_extension_installation.png") ||
      !koreanAppendix.includes("vscode_installation.png")) {
    failures.push("Chapter 16 environment pages are missing installation guidance or diagrams");
  }

  const englishDirectory = path.join(outputRoot, "en", "learn");
  const englishPages = (await readdir(englishDirectory)).filter((file) => file.endsWith(".html"));
  const expectedEnglishFiles = englishReaderRoutes.size + englishReaderLegacyAliases.size;
  if (englishPages.length !== expectedEnglishFiles || englishReaderRoutes.size !== 119) failures.push(`Expected 119 official English documents and ${englishReaderLegacyAliases.size} compatibility alias, found ${englishPages.length} HTML files`);
  let expectedEnglishTabGroups = 0;
  let expectedEnglishTabs = 0;
  for (const [source, route] of englishReaderRoutes) {
    const englishPage = await readFile(path.join(outputRoot, route), "utf8");
    const sourceMarkdown = await readFile(path.resolve(import.meta.dirname, "..", source), "utf8");
    const sourceTabs = sourceTabStats(sourceMarkdown);
    const sourceDirectives = (sourceMarkdown.match(/^```src\s*$/gm) || []).length;
    const expectedGroups = sourceTabs.groups + sourceDirectives;
    const expectedTabs = sourceTabs.tabs + sourceDirectives * sourceCodeLanguages.length;
    const renderedGroups = (englishPage.match(/class="content-tabs"/g) || []).length;
    const renderedTabs = (englishPage.match(/role="tab"/g) || []).length;
    const renderedPanels = (englishPage.match(/role="tabpanel"/g) || []).length;
    const focusablePanels = (englishPage.match(/role="tabpanel" tabindex="0"/g) || []).length;
    const selectedTabs = (englishPage.match(/aria-selected="true"/g) || []).length;
    expectedEnglishTabGroups += expectedGroups;
    expectedEnglishTabs += expectedTabs;
    if (renderedGroups !== expectedGroups || renderedTabs !== expectedTabs || renderedPanels !== expectedTabs ||
        focusablePanels !== expectedTabs || selectedTabs !== expectedGroups) {
      failures.push(`${route} does not preserve its ${expectedGroups} code groups and ${expectedTabs} tab choices`);
    }
    const vietnameseDocument = translationRegistry.byLanguage.vi.get(source);
    const koreanDocument = translationRegistry.byLanguage.ko.get(source);
    if (vietnameseDocument) {
      if (!englishPage.includes(`href="${readerHref(vietnameseDocument)}" lang="vi" hreflang="vi"`)) failures.push(`${route} does not expose its exact VI counterpart`);
    } else if (!englishPage.includes('class="language-pending" lang="vi" aria-disabled="true"')) {
      failures.push(`${route} does not mark the pending VI counterpart`);
    }
    if (koreanDocument) {
      if (!englishPage.includes(`href="${readerHref(koreanDocument)}" lang="ko" hreflang="ko"`)) failures.push(`${route} does not expose its exact KO counterpart`);
    } else if (!englishPage.includes('class="language-pending" lang="ko" aria-disabled="true"')) {
      failures.push(`${route} does not mark the pending KO counterpart`);
    }
    if (/^(?:===|!!!|\?\?\?|--8<--)/m.test(englishPage) || englishPage.includes("&lt;u&gt;") || englishPage.includes("&lt;id&gt;") || englishPage.includes("&lt;h2") || englishPage.includes('class="language-src"')) failures.push(`${route} contains unrendered MkDocs-only syntax`);
    if (englishPage.includes("≤q") || englishPage.includes("≥q")) failures.push(`${route} contains a partially rendered comparison operator`);
  }
  for (const [aliasRoute, source] of englishReaderLegacyAliases) {
    const canonicalRoute = englishReaderRoutes.get(source);
    const aliasPage = await readFile(path.join(outputRoot, aliasRoute), "utf8");
    const canonicalPage = await readFile(path.join(outputRoot, canonicalRoute), "utf8");
    if (aliasPage !== canonicalPage) failures.push(`${aliasRoute} does not preserve its canonical ${canonicalRoute} content`);
  }
  const englishReaderLanding = await readFile(path.join(englishDirectory, "index.html"), "utf8");
  const englishBookHome = await readFile(path.join(englishDirectory, "book-home.html"), "utf8");
  const englishBeforeStarting = await readFile(path.join(englishDirectory, "before-starting.html"), "utf8");
  const englishPreface = await readFile(path.join(englishDirectory, "preface.html"), "utf8");
  const englishChapterTwoExercises = await readFile(path.join(englishDirectory, "chapter-2-exercises.html"), "utf8");
  const englishChapterSevenExercises = await readFile(path.join(englishDirectory, "chapter-7-exercises.html"), "utf8");
  const englishReferences = await readFile(path.join(englishDirectory, "references.html"), "utf8");
  if (!englishReaderLanding.includes('data-reader-source="en/docs/chapter_introduction/index.md"') ||
      !englishReaderLanding.includes("Encounter with Algorithms") ||
      !englishBookHome.includes('data-reader-source="en/docs/index.md"') ||
      !englishBookHome.includes("Hello Algo") ||
      !englishBeforeStarting.includes("Before Starting") ||
      !englishPreface.includes("Preface") ||
      !englishReferences.includes("References")) failures.push("English landing, Book Home, or other special pages are missing their exact official source content");
  if (!englishChapterTwoExercises.includes('class="admonition') ||
      !englishChapterTwoExercises.includes('href="../../vi/learn/bai-tap-do-phuc-tap.html" lang="vi" hreflang="vi"') ||
      !englishChapterTwoExercises.includes('href="../../ko/learn/chapter-2-exercises.html" lang="ko" hreflang="ko"')) {
    failures.push("English Chapter 2 exercises do not render answers or exact localized counterparts");
  }
  if (!englishChapterSevenExercises.includes('<pre><code class="language-text">') || englishChapterSevenExercises.includes("<p>``")) failures.push("Nested exercise code blocks are not rendered as block code");
  if (!englishReaderLanding.includes("119 / 119 documents") || (englishReaderLanding.match(/class="book-nav-group"/g) || []).length !== 20) failures.push("English reader progress or full Home / Chapters 0–16 / References navigation is incomplete");
  const englishTree = await readFile(path.join(englishDirectory, "binary-tree.html"), "utf8");
  const englishSubsetSum = await readFile(path.join(englishDirectory, "subset-sum.html"), "utf8");
  const englishBookCss = await readFile(path.join(englishDirectory, "book.css"), "utf8");
  const englishBookJs = await readFile(path.join(englishDirectory, "book.js"), "utf8");
  const englishSuggestions = await readFile(path.join(englishDirectory, "suggestions.html"), "utf8");
  const englishHeap = await readFile(path.join(englishDirectory, "heap.html"), "utf8");
  const englishGraph = await readFile(path.join(englishDirectory, "graph-traversal.html"), "utf8");
  const englishSearch = await readFile(path.join(englishDirectory, "binary-search.html"), "utf8");
  const englishSort = await readFile(path.join(englishDirectory, "quick-sort.html"), "utf8");
  const englishDivide = await readFile(path.join(englishDirectory, "hanota.html"), "utf8");
  const englishBacktracking = await readFile(path.join(englishDirectory, "n-queens.html"), "utf8");
  const englishDynamicProgramming = await readFile(path.join(englishDirectory, "edit-distance.html"), "utf8");
  const englishGreedy = await readFile(path.join(englishDirectory, "fractional-knapsack.html"), "utf8");
  const englishAppendix = await readFile(path.join(englishDirectory, "programming-environment.html"), "utf8");
  const englishGlossary = await readFile(path.join(englishDirectory, "glossary.html"), "utf8");
  const englishDynamicExercises = await readFile(path.join(englishDirectory, "dynamic-programming-exercises.html"), "utf8");
  const englishGreedyExercises = await readFile(path.join(englishDirectory, "greedy-exercises.html"), "utf8");
  if (!englishTree.includes("binary_tree_definition.png") || !englishHeap.includes("min_heap_and_max_heap.png") || !englishGraph.includes("graph_bfs.png") || !englishSearch.includes("binary_search_example.png") || !englishSort.includes("quick_sort_overview.png") || !englishDivide.includes("hanota_example.png") || !englishBacktracking.includes("solution_4_queens.png") || !englishDynamicProgramming.includes("edit_distance_example.png") || !englishGreedy.includes("fractional_knapsack_example.png") || !englishAppendix.includes("vscode_installation.png") || !englishGlossary.includes("<table>") || !englishGlossary.includes("greedy algorithm") || !englishTree.includes("Source-faithful English edition")) failures.push("Local English pages are missing official source content or attribution");
  if (!englishTree.includes("2^{h+1} - 1") || !englishSubsetSum.includes("{3, 4, 5}")) failures.push("English preprocessing removed mathematical braces or exponents");
  if (!englishSubsetSum.includes("def subset_sum_i(") || !englishSubsetSum.includes("function subsetSumI(") || !englishSubsetSum.includes('data-tab-label="Ruby"')) failures.push("English source directives do not render their multilingual implementations");
  if (!englishTree.includes("language-cpp") || !englishTree.includes("language-java") || !englishTree.includes("language-python")) failures.push("Local English code examples do not preserve the official programming-language tabs");
  if (expectedEnglishTabGroups === 0 || expectedEnglishTabs !== 2437 || !englishSuggestions.includes('role="tablist" aria-label="Programming language examples"') || !englishSuggestions.includes('data-tab-label="C++"') || !englishSuggestions.includes('data-tab-label="Ruby"')) failures.push("English tab audit is incomplete or the suggestions language selector is missing");
  if (!englishBookCss.includes(".content-tablist") || !englishBookJs.includes("hello-algo-code-language") || !englishBookJs.includes("ArrowRight")) failures.push("Reader assets do not style or operate accessible synchronized tabs");
  if (!englishTree.includes('class="visualization-link"') || !englishTree.includes("Open interactive code visualization")) failures.push("Local English Python Tutor examples are not exposed as usable visualization links");
  if (!englishBookCss.includes("overflow-wrap: anywhere")) failures.push("Reader CSS does not contain long official visualization URLs");
  if (!englishDynamicExercises.includes("When Is Dynamic Programming Appropriate?") || !englishDynamicExercises.includes("leetcode.com/problems/climbing-stairs") || !englishGreedyExercises.includes("Is Choosing the Largest Coin Always Best?") || !englishGreedyExercises.includes("10 + 1 + 1 + 1 + 1")) failures.push("Local English Chapter 14–15 exercise pages are incomplete");

  const vietnameseIteration = await readFile(path.join(pilotDirectory, "vong-lap-va-de-quy.html"), "utf8");
  const timeComplexityPage = await readFile(path.join(pilotDirectory, "do-phuc-tap-thoi-gian.html"), "utf8");
  const vietnameseSpaceComplexity = await readFile(path.join(pilotDirectory, "do-phuc-tap-khong-gian.html"), "utf8");
  const vietnameseComplexityExercises = await readFile(path.join(pilotDirectory, "bai-tap-do-phuc-tap.html"), "utf8");
  if ((vietnameseIteration.match(/class="content-tabs"/g) || []).length !== 8 ||
      !vietnameseIteration.includes("recursion_tree.png") ||
      !vietnameseIteration.includes("<table>") ||
      (vietnameseIteration.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      (vietnameseIteration.match(/class="admonition admonition-question"/g) || []).length !== 1 ||
      (timeComplexityPage.match(/class="content-tabs"/g) || []).length !== 16 ||
      !timeComplexityPage.includes("time_complexity_factorial.png") ||
      (timeComplexityPage.match(/class="math-block"/g) || []).length !== 5 ||
      !timeComplexityPage.includes("<table>") ||
      !timeComplexityPage.includes('class="admonition admonition-note"') ||
      !timeComplexityPage.includes('class="admonition admonition-tip"') ||
      !timeComplexityPage.includes('class="admonition admonition-question"') ||
      (vietnameseSpaceComplexity.match(/class="content-tabs"/g) || []).length !== 9 ||
      !vietnameseSpaceComplexity.includes("space_complexity_exponential.png") ||
      (vietnameseSpaceComplexity.match(/class="math-block"/g) || []).length !== 1 ||
      (vietnameseComplexityExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseComplexityExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !vietnameseComplexityExercises.includes("leetcode.com/problems/fibonacci-number")) {
    failures.push("Vietnamese Chapter 2 is missing complete iteration/recursion media, inline code tabs, complexity derivations, tables, callouts, or exercises");
  }

  const vietnameseClassification = await readFile(path.join(pilotDirectory, "phan-loai-cau-truc-du-lieu.html"), "utf8");
  const vietnameseBasicTypes = await readFile(path.join(pilotDirectory, "kieu-du-lieu-co-ban.html"), "utf8");
  const numberEncodingPage = await readFile(path.join(pilotDirectory, "ma-hoa-so.html"), "utf8");
  const vietnameseCharacterEncoding = await readFile(path.join(pilotDirectory, "ma-hoa-ky-tu.html"), "utf8");
  const vietnameseDataStructureSummary = await readFile(path.join(pilotDirectory, "tom-tat-chuong-3.html"), "utf8");
  const vietnameseDataStructureExercises = await readFile(path.join(pilotDirectory, "bai-tap-cau-truc-du-lieu.html"), "utf8");
  if (!vietnameseClassification.includes("classification_logic_structure.png") ||
      !vietnameseClassification.includes("computer_memory_location.png") ||
      !vietnameseClassification.includes("classification_phisical_structure.png") ||
      (vietnameseClassification.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      (vietnameseBasicTypes.match(/class="content-tabs"/g) || []).length !== 1 ||
      !vietnameseBasicTypes.includes("<table>") ||
      !vietnameseBasicTypes.includes('class="admonition admonition-pythontutor"') ||
      !numberEncodingPage.includes("1s_2s_complement.png") ||
      !numberEncodingPage.includes("ieee_754_float.png") ||
      (numberEncodingPage.match(/class="math-block"/g) || []).length !== 10 ||
      !numberEncodingPage.includes("<table>") ||
      !vietnameseCharacterEncoding.includes("ascii_table.png") ||
      !vietnameseCharacterEncoding.includes("unicode_hello_algo.png") ||
      !vietnameseCharacterEncoding.includes("utf-8_hello_algo.png") ||
      (vietnameseDataStructureSummary.match(/class="math-block"/g) || []).length !== 3 ||
      (vietnameseDataStructureExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseDataStructureExercises.match(/class="admonition admonition-tip"/g) || []).length !== 1 ||
      !vietnameseDataStructureExercises.includes("leetcode.com/problems/number-of-1-bits")) {
    failures.push("Vietnamese Chapter 3 is missing complete classification media, code tabs, number derivations, encoding media, tables, or exercises");
  }

  const arrayPage = await readFile(path.join(pilotDirectory, "mang.html"), "utf8");
  const linkedListPage = await readFile(path.join(pilotDirectory, "danh-sach-lien-ket.html"), "utf8");
  const vietnameseDynamicList = await readFile(path.join(pilotDirectory, "danh-sach-dong.html"), "utf8");
  const vietnameseRamAndCache = await readFile(path.join(pilotDirectory, "ram-va-bo-nho-dem.html"), "utf8");
  const vietnameseArrayExercises = await readFile(path.join(pilotDirectory, "bai-tap-mang-va-danh-sach-lien-ket.html"), "utf8");
  if (!arrayPage.includes('<pre><code class="language-python"') || !arrayPage.includes("array_definition.png") ||
      !linkedListPage.includes('<pre><code class="language-python"') || !linkedListPage.includes("linkedlist_definition.png")) {
    failures.push("Vietnamese Chapter 4 pages are missing representative Python code or core diagrams");
  }
  if ((arrayPage.match(/class="content-tabs"/g) || []).length !== 7 ||
      (linkedListPage.match(/class="content-tabs"/g) || []).length !== 7 ||
      (vietnameseDynamicList.match(/class="content-tabs"/g) || []).length !== 7 ||
      !linkedListPage.includes("linkedlist_common_types.png") ||
      !linkedListPage.includes("<table>") ||
      !vietnameseRamAndCache.includes("computer_storage_devices.png") ||
      !vietnameseRamAndCache.includes("<table>") ||
      (vietnameseDynamicList.match(/class="admonition admonition-pythontutor"/g) || []).length !== 6 ||
      (vietnameseArrayExercises.match(/class="admonition admonition-success"/g) || []).length !== 3 ||
      (vietnameseArrayExercises.match(/class="admonition admonition-tip"/g) || []).length !== 2 ||
      !vietnameseArrayExercises.includes("leetcode.com/problems/reverse-linked-list")) {
    failures.push("Vietnamese Chapter 4 is missing complete code tabs, linked-list/cache media, tables, visualizations, or exercises");
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

  const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (sitemapUrls.length !== 361 || new Set(sitemapUrls).size !== sitemapUrls.length) {
    failures.push(`Sitemap must contain 361 unique Atlas and reader URLs, found ${sitemapUrls.length}`);
  }
  const notFound = await readFile(path.join(outputRoot, "404.html"), "utf8");
  if (!notFound.includes('lang="vi"') || !notFound.includes('lang="ko"') || !notFound.includes('lang="en"')) {
    failures.push("Multilingual 404 page does not link to all three readers");
  }
  const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
  if (!robots.includes("Sitemap: https://buicongnguyen.github.io/hello-algo/sitemap.xml")) {
    failures.push("robots.txt does not advertise the production sitemap");
  }

  if (failures.length) {
    throw new Error("Built-site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  }

  console.log(`Built-site checks passed (${htmlFiles.length} HTML pages, ${pilotPages.length} Vietnamese and ${koreanPages.length} Korean reader pages, no broken local references).`);
}
