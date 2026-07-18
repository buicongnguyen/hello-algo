import { readFile } from "node:fs/promises";
import path from "node:path";

const supportedLanguages = ["vi", "ko"];
const supportedStatuses = new Set(["planned", "draft", "pilot", "published"]);

export const englishReaderRoutes = new Map([
  ["en/docs/chapter_tree/index.md", "en/learn/trees.html"],
  ["en/docs/chapter_tree/binary_tree.md", "en/learn/binary-tree.html"],
  ["en/docs/chapter_tree/binary_tree_traversal.md", "en/learn/binary-tree-traversal.html"],
  ["en/docs/chapter_tree/array_representation_of_tree.md", "en/learn/array-representation-of-binary-trees.html"],
  ["en/docs/chapter_tree/binary_search_tree.md", "en/learn/binary-search-tree.html"],
  ["en/docs/chapter_tree/avl_tree.md", "en/learn/avl-tree.html"],
  ["en/docs/chapter_tree/summary.md", "en/learn/chapter-7-summary.html"],
  ["en/docs/chapter_heap/index.md", "en/learn/heaps.html"],
  ["en/docs/chapter_heap/heap.md", "en/learn/heap.html"],
  ["en/docs/chapter_heap/build_heap.md", "en/learn/build-heap.html"],
  ["en/docs/chapter_heap/top_k.md", "en/learn/top-k.html"],
  ["en/docs/chapter_heap/summary.md", "en/learn/chapter-8-summary.html"]
]);

export function createTranslationRegistry(manifests) {
  const byLanguage = {};
  let sourceCommit;

  for (const language of supportedLanguages) {
    const manifest = manifests[language];
    if (!manifest || manifest.targetLanguage !== language || manifest.sourceLanguage !== "en" || !Array.isArray(manifest.documents)) {
      throw new Error(`Invalid ${language} translation manifest`);
    }
    if (sourceCommit === undefined) sourceCommit = manifest.sourceCommit;
    if (manifest.sourceCommit !== sourceCommit) {
      throw new Error("Translation manifests do not use the same locked English revision");
    }

    const documents = new Map();
    const routes = new Set();
    for (const document of manifest.documents) {
      if (!document.source?.startsWith("en/docs/") || !document.target?.startsWith(`${language}/docs/`) ||
          !document.route?.startsWith(`${language}/learn/`) || !supportedStatuses.has(document.status)) {
        throw new Error(`${language} translation manifest has an invalid document identity for ${document.source || "unknown source"}`);
      }
      if (documents.has(document.source)) {
        throw new Error(`${language} translation manifest duplicates source: ${document.source}`);
      }
      if (routes.has(document.route)) {
        throw new Error(`${language} translation manifest duplicates route: ${document.route}`);
      }
      documents.set(document.source, document);
      routes.add(document.route);
    }
    byLanguage[language] = documents;
  }

  return { manifests, byLanguage, sourceCommit };
}

export async function loadTranslationRegistry(projectRoot) {
  const manifests = Object.fromEntries(await Promise.all(supportedLanguages.map(async (language) => [
    language,
    JSON.parse(await readFile(path.join(projectRoot, language, "translation-status.json"), "utf8"))
  ])));
  return createTranslationRegistry(manifests);
}

export function readerHref(document) {
  return `../../${document.route}`;
}

export function routeFileName(route) {
  return route.endsWith("/") ? "index.html" : route.split("/").at(-1);
}

export function officialEnglishUrl(source) {
  const parts = source.split("/");
  const file = parts.at(-1).replace(/\.md$/, "");
  return `https://www.hello-algo.com/en/${parts.at(-2)}/${file === "index" ? "" : `${file}/`}`;
}

export function englishReaderHref(source) {
  const route = englishReaderRoutes.get(source);
  return route ? `../../${route}` : officialEnglishUrl(source);
}

export function markdownStructure(markdown) {
  return {
    headings: (markdown.match(/^#{1,6} /gm) || []).length,
    images: (markdown.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length,
    codeFences: (markdown.match(/^```/gm) || []).length,
    displayMathFences: (markdown.match(/^\$\$$/gm) || []).length,
    nonWhitespaceCharacters: markdown.replace(/\s/g, "").length
  };
}

export function translationReadinessFailures(sourceMarkdown, targetMarkdown) {
  const source = markdownStructure(sourceMarkdown);
  const target = markdownStructure(targetMarkdown);
  const failures = [];

  for (const field of ["headings", "images", "codeFences", "displayMathFences"]) {
    if (target[field] !== source[field]) {
      failures.push(`${field} ${target[field]}/${source[field]}`);
    }
  }
  if (target.nonWhitespaceCharacters < source.nonWhitespaceCharacters * 0.35) {
    failures.push(`content length ${target.nonWhitespaceCharacters}/${source.nonWhitespaceCharacters}`);
  }
  return failures;
}
