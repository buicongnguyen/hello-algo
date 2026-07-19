import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./build-vi-book.mjs";
import { englishReaderCatalog, englishReaderRoutes, loadTranslationRegistry, readerHref } from "./translation-registry.mjs";

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

function prepareEnglishMarkdown(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];
  for (let index = 0; index < lines.length;) {
    const tab = lines[index].match(/^===\s+"([^"]+)"/);
    if (tab) {
      const label = tab[1];
      const content = [];
      index += 1;
      while (index < lines.length && (lines[index] === "" || /^\s{4}/.test(lines[index]))) {
        content.push(lines[index].replace(/^\s{4}/, ""));
        index += 1;
      }
      if (label === "English" || /^<\d+>$/.test(label)) output.push(...content);
      else output.push(`#### ${label}`, ...content);
      continue;
    }

    output.push(lines[index]
      .replaceAll("<u>", "")
      .replaceAll("</u>", "")
      .replace(/<\/?(?:div|p|span|center)[^>]*>/g, "")
      .replace(/\{[^}]*\}/g, ""));
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
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/en/learn/${page.slug}.html">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo English</title>
  <link rel="stylesheet" href="book.css?v=20260719a"><script src="book.js?v=20260718g" defer></script>
</head>
<body data-translation-status="source">
  <a class="skip-link" href="#article">Skip to the article</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="Open table of contents" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>EN</b></strong></a>
    <div class="reader-progress"><span>Official source</span><strong>${pages.length} / 119 documents</strong></div>
    <nav aria-label="Language and theme">${koreanOption}${vietnameseOption}<a class="active" href="${page.slug}.html" lang="en" hreflang="en" aria-current="page">EN</a><button id="reader-theme" type="button" aria-label="Toggle light and dark theme">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="English table of contents"><div class="sidebar-top"><strong>Official English reading</strong><small>Home · Chapters 0–16 · References</small></div>${navigation(pages, page.slug)}<div class="sidebar-links"><a href="https://www.hello-algo.com/en/">Official website</a><a href="https://github.com/krahets/hello-algo">Upstream repository</a><a href="../#roadmap">Learning map</a></div></aside>
    <main class="reader-main"><article id="article"><div class="article-meta"><span>${escapeHtml(page.chapter)}</span><span>Official source · ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>Source-faithful English edition</strong><p>This local view is generated from the current official Hello Algo English Markdown and preserves every programming-language code tab as a labeled example. ${counterpartNotice}</p></div>${body}<footer class="article-attribution"><strong>Source and license</strong><p>English content from <a href="${sourceUrl}" target="_blank" rel="noreferrer">Hello Algo by krahets and its contributors</a>, presented locally under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>.</p></footer></article>
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
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));
  await copyReferencedAssets(pages, projectRoot, bookOutput);

  for (const [index, page] of pages.entries()) {
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    const koreanDocument = registry.byLanguage.ko.get(page.source);
    const body = renderMarkdown(rewriteInternalLinks(prepareEnglishMarkdown(page.markdown), page.source), page.source);
    await writeFile(path.join(bookOutput, `${page.slug}.html`), pageTemplate(pages, page, body, index, registry.sourceCommit, vietnameseDocument, koreanDocument));
    await access(path.join(bookOutput, `${page.slug}.html`), constants.R_OK);
  }
  return { pageCount: pages.length, sourceCommit: registry.sourceCommit };
}
