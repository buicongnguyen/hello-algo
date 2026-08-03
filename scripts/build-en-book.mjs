import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { articleOutline, markdownHeadings, renderMarkdown } from "./markdown-renderer.mjs";
import { sourceDirectiveTabs } from "./source-code-tabs.mjs";
import { englishReaderCatalog, englishReaderLegacyAliases, englishReaderRoutes, loadTranslationRegistry, publicEnglishReaderRoute, readerHref } from "./translation-registry.mjs";

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function cleanInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function pageTitle(markdown, page) {
  const sourceTitle = cleanInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] || page.shortTitle);
  const chapterNumber = page.chapter.match(/^Chapter (\d+)\./)?.[1];
  if (sourceTitle === "Summary" && chapterNumber) return `Chapter ${chapterNumber} Summary`;
  if (sourceTitle === "Exercises" && chapterNumber) return `Chapter ${chapterNumber} Exercises`;
  return sourceTitle;
}

function pageDescription(markdown, fallback) {
  const blocks = markdown.replaceAll("\r\n", "\n").split(/\n\s*\n/);
  for (const block of blocks) {
    const text = block.trim();
    if (!text || /^(?:#|!\[|```|===|!!!|\?\?\?|<!--|\||[-*]\s|\d+\.\s)/.test(text)) continue;
    const description = cleanInlineMarkdown(text.replace(/\n+/g, " "));
    if (description.length >= 24) return description.slice(0, 220);
  }
  return fallback;
}

async function prepareEnglishMarkdown(markdown, source, projectRoot) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];
  for (let index = 0; index < lines.length;) {
    if (/^```src\s*$/.test(lines[index])) {
      const directive = lines[index + 1]?.match(/^\[file\]\{([a-zA-Z0-9_-]+)\}-\[class\]\{([a-zA-Z0-9_-]*)\}-\[func\]\{([a-zA-Z0-9_-]*)\}$/);
      if (!directive || lines[index + 2]?.trim() !== "```") {
        throw new Error(`Invalid source-code directive in ${source} at line ${index + 1}`);
      }
      const [, file, className, functionName] = directive;
      output.push(await sourceDirectiveTabs({ projectRoot, sourcePath: source, file, className, functionName }));
      index += 3;
      continue;
    }

    output.push(lines[index]
      .replace(/^\s*<p[^>]*>\s*Table\s+<id>\s+&nbsp;\s*(.*?)\s*<\/p>\s*$/, "Table: $1")
      .replace(/^\s*<h2[^>]*>(.*?)<\/h2>\s*$/, "## $1")
      .replaceAll("<u>", "")
      .replaceAll("</u>", "")
      .replace(/<\/?(?:div|p|span|center)[^>]*>/g, ""));
    index += 1;
  }
  return output.join("\n");
}

function rewriteInternalLinks(markdown, source) {
  return markdown.replace(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g, (full, label, rawReference) => {
    const [referenceWithQuery, fragment = ""] = rawReference.trim().split("#", 2);
    const reference = referenceWithQuery.split("?", 1)[0];
    if (!reference || /^(?:https?:|mailto:|data:)/.test(reference)) return full;

    let target = path.posix.normalize(path.posix.join(path.posix.dirname(source), reference));
    if (reference.endsWith("/")) target = path.posix.join(target, "index.md");
    else if (!path.posix.extname(target)) target = `${target}.md`;
    const route = englishReaderRoutes.get(target);
    if (!route) return full;
    return `[${label}](${path.posix.basename(route)}${fragment ? `#${fragment}` : ""})`;
  });
}

function navigation(pages, currentSlug) {
  const chapters = [...new Set(pages.map((page) => page.chapter))];
  return chapters.map((chapter) => `<div class="book-nav-group"><span>${escapeHtml(chapter)}</span>${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug}.html">${escapeHtml(page.shortTitle)}</a>`).join("\n")}</div>`).join("\n");
}

function localizedOption(document, language, label, ariaLabel) {
  if (document) return `<a href="${readerHref(document)}" lang="${language}" hreflang="${language}" aria-label="${ariaLabel}">${label}</a>`;
  return `<span class="language-pending" lang="${language}" aria-disabled="true" title="Translation pending">${label}</span>`;
}

function pageTemplate(pages, page, body, index, sourceCommit, vietnameseDocument, koreanDocument) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  const koreanOption = localizedOption(koreanDocument, "ko", "KO", "Read the corresponding Korean page");
  const vietnameseOption = localizedOption(vietnameseDocument, "vi", "VI", "Read the corresponding Vietnamese page");
  const counterpartNotice = koreanDocument && vietnameseDocument
    ? "KO and VI open the exact translated counterpart."
    : "A localized counterpart is marked as pending when that source page has not yet been translated.";
  const siteRoot = "https://buicongnguyen.github.io/hello-algo/";
  const englishCanonical = `${siteRoot}${publicEnglishReaderRoute(page.route)}`;
  const vietnameseCanonical = `${siteRoot}${vietnameseDocument.route}`;
  const koreanCanonical = `${siteRoot}${koreanDocument.route}`;
  const outline = articleOutline(body, "On this page");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="${englishCanonical}">
  <link rel="alternate" hreflang="en" href="${englishCanonical}">
  <link rel="alternate" hreflang="vi" href="${vietnameseCanonical}">
  <link rel="alternate" hreflang="ko" href="${koreanCanonical}">
  <link rel="alternate" hreflang="x-default" href="${vietnameseCanonical}">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo English</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css" integrity="sha384-1vdNCNel6Tx/NQa8IR1mGOGKsbGreCkOPfbtPPnUURJ5Tu2PRVfQ/7KLZC+Pi1p1" crossorigin="anonymous">
  <link rel="stylesheet" href="book.css?v=20260804a">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.js" integrity="sha384-ycJ6GAwiS15LoUPipwJOrWTvkUHl/YqELValBwI5I4awP1EeEQJYarj+w85ntcz7" crossorigin="anonymous" defer></script>
  <script src="book.js?v=20260727b" defer></script>
</head>
<body data-reader-source="${page.source}" data-translation-status="source">
  <a class="skip-link" href="#article">Skip to the article</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="Open table of contents" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>EN</b></strong></a>
    <div class="reader-progress"><span>Official source</span><strong>${pages.length} / 119 documents</strong></div>
    <nav aria-label="Language and theme">${koreanOption}${vietnameseOption}<a class="active" href="${page.slug}.html" lang="en" hreflang="en" aria-current="page">EN</a><button id="reader-search-open" type="button" aria-label="Search the book">⌕</button><button id="reader-theme" type="button" aria-label="Light theme" aria-pressed="false">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="English table of contents"><div class="sidebar-top"><strong>Official English reading</strong><small>Home · Chapters 0–16 · References</small></div>${navigation(pages, page.slug)}<div class="sidebar-links"><a href="https://www.hello-algo.com/en/">Official website</a><a href="https://buicongnguyen.github.io/Modern_c_20/en/">Modern C++20 companion</a><a href="https://github.com/krahets/hello-algo">Upstream repository</a><a href="../#roadmap">Learning map</a></div></aside>
    <main class="reader-main"><section class="reader-search" id="reader-search" role="search" hidden aria-label="Search the book"><div><label for="reader-search-input">Search 119 documents</label><button id="reader-search-close" type="button" aria-label="Close search">×</button></div><input id="reader-search-input" type="search" autocomplete="off" placeholder="Algorithm, data structure, heading…" data-empty-label="No results found"><ul id="reader-search-results" aria-live="polite"></ul></section><article id="article"><div class="article-meta"><span>${escapeHtml(page.chapter)}</span><span>Official source · ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>Source-faithful English edition</strong><p>This local view is generated from the current official Hello Algo English Markdown and preserves every programming-language code tab as a labeled example. ${counterpartNotice}</p></div>${outline}${body}<footer class="article-attribution"><strong>Source and license</strong><p>English content from <a href="${sourceUrl}" target="_blank" rel="noreferrer">Hello Algo by krahets and its contributors</a>, presented locally under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>.</p></footer></article>
      <nav class="page-nav" aria-label="Previous and next article">${previous ? `<a href="${previous.slug}.html"><span>← Previous</span><strong>${escapeHtml(previous.title)}</strong></a>` : "<i></i>"}${next ? `<a class="next" href="${next.slug}.html"><span>Next →</span><strong>${escapeHtml(next.title)}</strong></a>` : "<i></i>"}</nav>
    </main>
  </div>
</body></html>`;
}

async function copyReferencedAssets(pages, projectRoot, bookOutput) {
  const docsRoot = path.resolve(projectRoot, "en", "docs");
  const copied = new Set();
  for (const page of pages) {
    for (const match of page.markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      const reference = match[1].trim().split(/\s+/)[0].split("#")[0];
      if (!reference || /^(?:https?:|data:)/.test(reference)) continue;

      let sourceAsset;
      let destination;
      if (reference.startsWith("../assets/covers/")) {
        sourceAsset = path.resolve(projectRoot, "en", "docs", "assets", "covers", path.basename(reference));
        destination = path.join(bookOutput, "assets", "covers", path.basename(reference));
      } else {
        sourceAsset = path.resolve(projectRoot, path.dirname(page.source), reference);
        const sourceDirectory = path.posix.dirname(page.source).replace(/^en\/docs\/?/, "");
        destination = path.resolve(bookOutput, "assets", sourceDirectory, reference);
      }
      if (!sourceAsset.startsWith(docsRoot + path.sep) || !destination.startsWith(path.resolve(bookOutput) + path.sep)) {
        throw new Error(`Unsafe English reader asset path: ${reference}`);
      }
      if (copied.has(destination)) continue;
      await access(sourceAsset, constants.R_OK);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(sourceAsset, destination);
      copied.add(destination);
    }
  }
}

export async function buildEnglishBook({ projectRoot, outputRoot }) {
  const registry = await loadTranslationRegistry(projectRoot);
  const pages = await Promise.all(englishReaderCatalog.map(async (catalogPage) => {
    const markdown = await readFile(path.join(projectRoot, catalogPage.source), "utf8");
    const route = catalogPage.route;
    const slug = path.posix.basename(route, ".html");
    const title = pageTitle(markdown, catalogPage);
    return {
      ...catalogPage,
      slug,
      title,
      description: pageDescription(markdown, title),
      markdown
    };
  }));

  const bookOutput = path.join(outputRoot, "en", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "reader", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "reader", "book.js"), path.join(bookOutput, "book.js"));
  await copyReferencedAssets(pages, projectRoot, bookOutput);

  const searchIndex = [];
  for (const [index, page] of pages.entries()) {
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    const koreanDocument = registry.byLanguage.ko.get(page.source);
    const markdown = await prepareEnglishMarkdown(page.markdown, page.source, projectRoot);
    const preparedMarkdown = rewriteInternalLinks(markdown, page.source);
    const body = renderMarkdown(preparedMarkdown, page.source);
    searchIndex.push({ title: page.title, shortTitle: page.shortTitle, chapter: page.chapter, url: `${page.slug}.html`, headings: markdownHeadings(preparedMarkdown) });
    await writeFile(path.join(bookOutput, `${page.slug}.html`), pageTemplate(pages, page, body, index, registry.sourceCommit, vietnameseDocument, koreanDocument));
    await access(path.join(bookOutput, `${page.slug}.html`), constants.R_OK);
  }
  for (const [aliasRoute, source] of englishReaderLegacyAliases) {
    const canonicalRoute = englishReaderRoutes.get(source);
    if (!canonicalRoute) throw new Error(`Unknown English reader alias source: ${source}`);
    await writeFile(
      path.join(outputRoot, aliasRoute),
      await readFile(path.join(outputRoot, canonicalRoute), "utf8")
    );
  }
  await writeFile(path.join(bookOutput, "search-index.json"), JSON.stringify(searchIndex, null, 2) + "\n");
  return { pageCount: pages.length, sourceCommit: registry.sourceCommit };
}
