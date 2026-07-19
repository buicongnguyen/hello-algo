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
  ["en/docs/chapter_heap/summary.md", "en/learn/chapter-8-summary.html"],
  ["en/docs/chapter_graph/index.md", "en/learn/graphs.html"],
  ["en/docs/chapter_graph/graph.md", "en/learn/graph.html"],
  ["en/docs/chapter_graph/graph_operations.md", "en/learn/graph-operations.html"],
  ["en/docs/chapter_graph/graph_traversal.md", "en/learn/graph-traversal.html"],
  ["en/docs/chapter_graph/summary.md", "en/learn/chapter-9-summary.html"],
  ["en/docs/chapter_searching/index.md", "en/learn/searching.html"],
  ["en/docs/chapter_searching/binary_search.md", "en/learn/binary-search.html"],
  ["en/docs/chapter_searching/binary_search_insertion.md", "en/learn/binary-search-insertion.html"],
  ["en/docs/chapter_searching/binary_search_edge.md", "en/learn/binary-search-edge.html"],
  ["en/docs/chapter_searching/replace_linear_by_hashing.md", "en/learn/replace-linear-by-hashing.html"],
  ["en/docs/chapter_searching/searching_algorithm_revisited.md", "en/learn/searching-algorithms-revisited.html"],
  ["en/docs/chapter_searching/summary.md", "en/learn/chapter-10-summary.html"],
  ["en/docs/chapter_sorting/index.md", "en/learn/sorting.html"],
  ["en/docs/chapter_sorting/sorting_algorithm.md", "en/learn/sorting-algorithm.html"],
  ["en/docs/chapter_sorting/selection_sort.md", "en/learn/selection-sort.html"],
  ["en/docs/chapter_sorting/bubble_sort.md", "en/learn/bubble-sort.html"],
  ["en/docs/chapter_sorting/insertion_sort.md", "en/learn/insertion-sort.html"],
  ["en/docs/chapter_sorting/quick_sort.md", "en/learn/quick-sort.html"],
  ["en/docs/chapter_sorting/merge_sort.md", "en/learn/merge-sort.html"],
  ["en/docs/chapter_sorting/heap_sort.md", "en/learn/heap-sort.html"],
  ["en/docs/chapter_sorting/bucket_sort.md", "en/learn/bucket-sort.html"],
  ["en/docs/chapter_sorting/counting_sort.md", "en/learn/counting-sort.html"],
  ["en/docs/chapter_sorting/radix_sort.md", "en/learn/radix-sort.html"],
  ["en/docs/chapter_sorting/summary.md", "en/learn/chapter-11-summary.html"],
  ["en/docs/chapter_divide_and_conquer/index.md", "en/learn/divide-and-conquer.html"],
  ["en/docs/chapter_divide_and_conquer/divide_and_conquer.md", "en/learn/divide-and-conquer-algorithms.html"],
  ["en/docs/chapter_divide_and_conquer/binary_search_recur.md", "en/learn/binary-search-recursive.html"],
  ["en/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", "en/learn/build-binary-tree.html"],
  ["en/docs/chapter_divide_and_conquer/hanota_problem.md", "en/learn/hanota.html"],
  ["en/docs/chapter_divide_and_conquer/summary.md", "en/learn/chapter-12-summary.html"],
  ["en/docs/chapter_backtracking/index.md", "en/learn/backtracking.html"],
  ["en/docs/chapter_backtracking/backtracking_algorithm.md", "en/learn/backtracking-algorithm.html"],
  ["en/docs/chapter_backtracking/n_queens_problem.md", "en/learn/n-queens.html"],
  ["en/docs/chapter_backtracking/permutations_problem.md", "en/learn/permutations.html"],
  ["en/docs/chapter_backtracking/subset_sum_problem.md", "en/learn/subset-sum.html"],
  ["en/docs/chapter_backtracking/summary.md", "en/learn/chapter-13-summary.html"],
  ["en/docs/chapter_dynamic_programming/index.md", "en/learn/dynamic-programming.html"],
  ["en/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", "en/learn/intro-to-dynamic-programming.html"],
  ["en/docs/chapter_dynamic_programming/dp_problem_features.md", "en/learn/dynamic-programming-characteristics.html"],
  ["en/docs/chapter_dynamic_programming/dp_solution_pipeline.md", "en/learn/dynamic-programming-approach.html"],
  ["en/docs/chapter_dynamic_programming/knapsack_problem.md", "en/learn/zero-one-knapsack.html"],
  ["en/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", "en/learn/unbounded-knapsack.html"],
  ["en/docs/chapter_dynamic_programming/edit_distance_problem.md", "en/learn/edit-distance.html"],
  ["en/docs/chapter_dynamic_programming/summary.md", "en/learn/chapter-14-summary.html"],
  ["en/docs/chapter_greedy/index.md", "en/learn/greedy.html"],
  ["en/docs/chapter_greedy/greedy_algorithm.md", "en/learn/greedy-algorithm.html"],
  ["en/docs/chapter_greedy/fractional_knapsack_problem.md", "en/learn/fractional-knapsack.html"],
  ["en/docs/chapter_greedy/max_capacity_problem.md", "en/learn/max-capacity.html"],
  ["en/docs/chapter_greedy/max_product_cutting_problem.md", "en/learn/max-product-cutting.html"],
  ["en/docs/chapter_greedy/summary.md", "en/learn/chapter-15-summary.html"],
  ["en/docs/chapter_appendix/index.md", "en/learn/appendix.html"],
  ["en/docs/chapter_appendix/installation.md", "en/learn/programming-environment.html"],
  ["en/docs/chapter_appendix/contribution.md", "en/learn/contributing.html"],
  ["en/docs/chapter_appendix/terminology.md", "en/learn/glossary.html"]
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
