import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./build-vi-book.mjs";
import { englishReaderRoutes, loadTranslationRegistry, readerHref } from "./translation-registry.mjs";

const pages = [
  ["trees", "Tree", "Tree introduction", "Chapter 7", "en/docs/chapter_tree/index.md", "A guided introduction to hierarchical tree structures."],
  ["binary-tree", "Binary Tree", "7.1 · Binary Tree", "Chapter 7", "en/docs/chapter_tree/binary_tree.md", "Binary-tree nodes, terminology, forms, and operations."],
  ["binary-tree-traversal", "Binary Tree Traversal", "7.2 · Tree Traversal", "Chapter 7", "en/docs/chapter_tree/binary_tree_traversal.md", "Breadth-first and depth-first traversal patterns."],
  ["array-representation-of-binary-trees", "Array Representation of Binary Trees", "7.3 · Array Representation", "Chapter 7", "en/docs/chapter_tree/array_representation_of_tree.md", "Mapping complete binary trees to array indexes."],
  ["binary-search-tree", "Binary Search Tree", "7.4 · Binary Search Tree", "Chapter 7", "en/docs/chapter_tree/binary_search_tree.md", "Search, insertion, deletion, and BST performance."],
  ["avl-tree", "AVL Tree", "7.5 · AVL Tree *", "Chapter 7", "en/docs/chapter_tree/avl_tree.md", "Keeping a search tree balanced with rotations."],
  ["chapter-7-summary", "Chapter 7 Summary", "7.6 · Summary", "Chapter 7", "en/docs/chapter_tree/summary.md", "Review binary trees, BSTs, and AVL trees."],
  ["heaps", "Heap", "Heap introduction", "Chapter 8", "en/docs/chapter_heap/index.md", "An introduction to complete-tree priority structures."],
  ["heap", "Heap", "8.1 · Heap", "Chapter 8", "en/docs/chapter_heap/heap.md", "Heap representation, push, pop, and sift operations."],
  ["build-heap", "Heap Construction Operation", "8.2 · Build Heap", "Chapter 8", "en/docs/chapter_heap/build_heap.md", "Build a heap bottom-up in linear time."],
  ["top-k", "Top-k Problem", "8.3 · Top-k", "Chapter 8", "en/docs/chapter_heap/top_k.md", "Use a bounded heap for large or streaming datasets."],
  ["chapter-8-summary", "Chapter 8 Summary", "8.4 · Summary", "Chapter 8", "en/docs/chapter_heap/summary.md", "Review heaps, heap construction, and top-k."],
  ["graphs", "Graph", "Graph introduction", "Chapter 9", "en/docs/chapter_graph/index.md", "An introduction to network relationships through vertices and edges."],
  ["graph", "Graph", "9.1 · Graph", "Chapter 9", "en/docs/chapter_graph/graph.md", "Graph types, terminology, adjacency matrices, and adjacency lists."],
  ["graph-operations", "Basic Operations on Graphs", "9.2 · Graph Operations", "Chapter 9", "en/docs/chapter_graph/graph_operations.md", "Add and remove vertices and edges in common representations."],
  ["graph-traversal", "Graph Traversal", "9.3 · Graph Traversal", "Chapter 9", "en/docs/chapter_graph/graph_traversal.md", "Traverse graphs with breadth-first and depth-first search."],
  ["chapter-9-summary", "Chapter 9 Summary", "9.4 · Summary", "Chapter 9", "en/docs/chapter_graph/summary.md", "Review graph representation, operations, and traversal."],
  ["searching", "Searching", "Searching introduction", "Chapter 10", "en/docs/chapter_searching/index.md", "An introduction to search problems and strategies."],
  ["binary-search", "Binary Search", "10.1 · Binary Search", "Chapter 10", "en/docs/chapter_searching/binary_search.md", "Discard half of a sorted search range after each comparison."],
  ["binary-search-insertion", "Binary Search Insertion Point", "10.2 · Insertion Point", "Chapter 10", "en/docs/chapter_searching/binary_search_insertion.md", "Find insertion positions before or after duplicate values."],
  ["binary-search-edge", "Binary Search Boundaries", "10.3 · Search Boundaries", "Chapter 10", "en/docs/chapter_searching/binary_search_edge.md", "Find the left and right boundary of duplicate targets."],
  ["replace-linear-by-hashing", "Hash Optimization Strategy", "10.4 · Hash Optimization", "Chapter 10", "en/docs/chapter_searching/replace_linear_by_hashing.md", "Trade space for faster repeated lookup with hashing."],
  ["searching-algorithms-revisited", "Searching Algorithms Revisited", "10.5 · Choosing Search", "Chapter 10", "en/docs/chapter_searching/searching_algorithm_revisited.md", "Compare linear, binary, hash-based, and tree search."],
  ["chapter-10-summary", "Chapter 10 Summary", "10.6 · Summary", "Chapter 10", "en/docs/chapter_searching/summary.md", "Review binary search, boundaries, and search strategies."],
  ["sorting", "Sorting", "Sorting introduction", "Chapter 11", "en/docs/chapter_sorting/index.md", "An introduction to sorting problems and algorithm families."],
  ["sorting-algorithm", "Sorting Algorithm", "11.1 · Sorting Algorithm", "Chapter 11", "en/docs/chapter_sorting/sorting_algorithm.md", "Evaluate complexity, stability, memory use, and adaptability."],
  ["selection-sort", "Selection Sort", "11.2 · Selection Sort", "Chapter 11", "en/docs/chapter_sorting/selection_sort.md", "Select the smallest remaining element each round."],
  ["bubble-sort", "Bubble Sort", "11.3 · Bubble Sort", "Chapter 11", "en/docs/chapter_sorting/bubble_sort.md", "Order values through adjacent swaps."],
  ["insertion-sort", "Insertion Sort", "11.4 · Insertion Sort", "Chapter 11", "en/docs/chapter_sorting/insertion_sort.md", "Insert each value into a sorted prefix."],
  ["quick-sort", "Quick Sort", "11.5 · Quick Sort", "Chapter 11", "en/docs/chapter_sorting/quick_sort.md", "Partition around a pivot and recursively sort both sides."],
  ["merge-sort", "Merge Sort", "11.6 · Merge Sort", "Chapter 11", "en/docs/chapter_sorting/merge_sort.md", "Sort two halves and merge their ordered results."],
  ["heap-sort", "Heap Sort", "11.7 · Heap Sort", "Chapter 11", "en/docs/chapter_sorting/heap_sort.md", "Repeatedly extract the maximum from a heap."],
  ["bucket-sort", "Bucket Sort", "11.8 · Bucket Sort", "Chapter 11", "en/docs/chapter_sorting/bucket_sort.md", "Distribute values among ordered ranges."],
  ["counting-sort", "Counting Sort", "11.9 · Counting Sort", "Chapter 11", "en/docs/chapter_sorting/counting_sort.md", "Count finite-range integer keys."],
  ["radix-sort", "Radix Sort", "11.10 · Radix Sort", "Chapter 11", "en/docs/chapter_sorting/radix_sort.md", "Stably sort one digit at a time."],
  ["chapter-11-summary", "Chapter 11 Summary", "11.11 · Summary", "Chapter 11", "en/docs/chapter_sorting/summary.md", "Compare the major sorting algorithm families."],
  ["divide-and-conquer", "Divide and Conquer", "Divide and conquer introduction", "Chapter 12", "en/docs/chapter_divide_and_conquer/index.md", "An introduction to divide, solve, and combine."],
  ["divide-and-conquer-algorithms", "Divide and Conquer Algorithms", "12.1 · Divide and Conquer", "Chapter 12", "en/docs/chapter_divide_and_conquer/divide_and_conquer.md", "Design subproblems and combine their results."],
  ["binary-search-recursive", "Divide and Conquer Search Strategy", "12.2 · Recursive Search", "Chapter 12", "en/docs/chapter_divide_and_conquer/binary_search_recur.md", "Express binary search recursively."],
  ["build-binary-tree", "Building a Binary Tree Problem", "12.3 · Build a Tree", "Chapter 12", "en/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", "Reconstruct a tree from preorder and inorder traversals."],
  ["hanota", "Hanota Problem", "12.4 · Hanota", "Chapter 12", "en/docs/chapter_divide_and_conquer/hanota_problem.md", "Solve two matching subproblems around one central move."],
  ["chapter-12-summary", "Chapter 12 Summary", "12.5 · Summary", "Chapter 12", "en/docs/chapter_divide_and_conquer/summary.md", "Review divide and conquer, tree construction, and Hanota."],
  ["backtracking", "Backtracking", "Backtracking introduction", "Chapter 13", "en/docs/chapter_backtracking/index.md", "Explore a solution space through choices, pruning, and undo operations."],
  ["backtracking-algorithm", "Backtracking Algorithm", "13.1 · Backtracking Algorithm", "Chapter 13", "en/docs/chapter_backtracking/backtracking_algorithm.md", "Build a reusable attempt, prune, and backtrack framework."],
  ["n-queens", "N-Queens Problem", "13.2 · N-Queens", "Chapter 13", "en/docs/chapter_backtracking/n_queens_problem.md", "Place queens with column and diagonal pruning."],
  ["permutations", "Permutations Problem", "13.3 · Permutations", "Chapter 13", "en/docs/chapter_backtracking/permutations_problem.md", "Generate distinct and duplicate-aware permutations."],
  ["subset-sum", "Subset-Sum Problem", "13.4 · Subset Sum", "Chapter 13", "en/docs/chapter_backtracking/subset_sum_problem.md", "Search combinations while pruning duplicate and impossible branches."],
  ["chapter-13-summary", "Chapter 13 Summary", "13.5 · Summary", "Chapter 13", "en/docs/chapter_backtracking/summary.md", "Review backtracking states, constraints, pruning, and representative problems."],
  ["dynamic-programming", "Dynamic Programming", "Dynamic programming introduction", "Chapter 14", "en/docs/chapter_dynamic_programming/index.md", "Reuse overlapping subproblem results to construct larger solutions."],
  ["intro-to-dynamic-programming", "Introduction to Dynamic Programming", "14.1 · Introduction", "Chapter 14", "en/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", "Move from brute-force recursion to memoization and tabulation."],
  ["dynamic-programming-characteristics", "Characteristics of Dynamic Programming Problems", "14.2 · Problem Characteristics", "Chapter 14", "en/docs/chapter_dynamic_programming/dp_problem_features.md", "Identify overlapping subproblems, optimal substructure, and no aftereffects."],
  ["dynamic-programming-approach", "Dynamic Programming Problem-Solving Approach", "14.3 · Solution Approach", "Chapter 14", "en/docs/chapter_dynamic_programming/dp_solution_pipeline.md", "Define states, transitions, boundaries, and evaluation order."],
  ["zero-one-knapsack", "0-1 Knapsack Problem", "14.4 · 0-1 Knapsack", "Chapter 14", "en/docs/chapter_dynamic_programming/knapsack_problem.md", "Choose each item at most once within a capacity."],
  ["unbounded-knapsack", "Unbounded Knapsack Problem", "14.5 · Unbounded Knapsack", "Chapter 14", "en/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", "Reuse item types and solve coin-change variants."],
  ["edit-distance", "Edit Distance Problem", "14.6 · Edit Distance", "Chapter 14", "en/docs/chapter_dynamic_programming/edit_distance_problem.md", "Measure string similarity with insert, delete, and replace operations."],
  ["chapter-14-summary", "Chapter 14 Summary", "14.7 · Summary", "Chapter 14", "en/docs/chapter_dynamic_programming/summary.md", "Review dynamic programming design and classic applications."],
  ["greedy", "Greedy", "Greedy introduction", "Chapter 15", "en/docs/chapter_greedy/index.md", "Make locally optimal choices under provable conditions."],
  ["greedy-algorithm", "Greedy Algorithm", "15.1 · Greedy Algorithm", "Chapter 15", "en/docs/chapter_greedy/greedy_algorithm.md", "Understand greedy-choice property, optimal substructure, and limitations."],
  ["fractional-knapsack", "Fractional Knapsack Problem", "15.2 · Fractional Knapsack", "Chapter 15", "en/docs/chapter_greedy/fractional_knapsack_problem.md", "Choose items by descending value density."],
  ["max-capacity", "Max Capacity Problem", "15.3 · Max Capacity", "Chapter 15", "en/docs/chapter_greedy/max_capacity_problem.md", "Use two pointers to maximize the bounded area."],
  ["max-product-cutting", "Maximum Product Cutting Problem", "15.4 · Maximum Product Cutting", "Chapter 15", "en/docs/chapter_greedy/max_product_cutting_problem.md", "Split an integer into factors with maximum product."],
  ["chapter-15-summary", "Chapter 15 Summary", "15.5 · Summary", "Chapter 15", "en/docs/chapter_greedy/summary.md", "Review greedy design, proofs, and representative applications."],
  ["appendix", "Appendix", "Appendix introduction", "Chapter 16", "en/docs/chapter_appendix/index.md", "Practical setup, contribution, and terminology resources."],
  ["programming-environment", "Programming Environment Installation", "16.1 · Environment Installation", "Chapter 16", "en/docs/chapter_appendix/installation.md", "Install an editor and language toolchains for running examples."],
  ["contributing", "Contributing Together", "16.2 · Contributing", "Chapter 16", "en/docs/chapter_appendix/contribution.md", "Improve content through a focused GitHub contribution workflow."],
  ["glossary", "Glossary", "16.3 · Glossary", "Chapter 16", "en/docs/chapter_appendix/terminology.md", "Reference the core data-structure and algorithm terminology."]
].map(([slug, title, shortTitle, chapter, source, description]) => ({ slug, title, shortTitle, chapter, source, description }));

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

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
      if (label === "Python") {
        output.push("### Python example", ...content);
      } else if (label === "English") {
        output.push(...content);
      } else if (/^<\d+>$/.test(label)) {
        output.push(...content);
      }
      continue;
    }

    const admonition = lines[index].match(/^(?:!!!|\?\?\?)\s+(\w+)(?:\s+"([^"]+)")?/);
    if (admonition) {
      const content = [];
      index += 1;
      while (index < lines.length && (lines[index] === "" || /^\s{4}/.test(lines[index]))) {
        const stripped = lines[index].replace(/^\s{4}/, "").replaceAll("<u>", "").replaceAll("</u>", "");
        if (stripped) content.push(stripped);
        index += 1;
      }
      const label = admonition[2] || admonition[1][0].toUpperCase() + admonition[1].slice(1);
      output.push(`> **${label}.** ${content.join(" ")}`);
      continue;
    }

    output.push(lines[index]
      .replaceAll("<u>", "")
      .replaceAll("</u>", "")
      .replace(/^<p align="center">.*<\/p>$/, "")
      .replace(/\{[^}]*\}/g, ""));
    index += 1;
  }
  return output.join("\n");
}

function navigation(currentSlug) {
  const chapters = [...new Set(pages.map((page) => page.chapter))];
  return chapters.map((chapter) => `<div class="book-nav-group"><span>${chapter}</span>${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug}.html">${page.shortTitle}</a>`).join("\n")}</div>`).join("\n");
}

function pageTemplate(page, body, index, sourceCommit, vietnameseDocument, koreanDocument) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/en/learn/${page.slug}.html">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo English</title>
  <link rel="stylesheet" href="book.css?v=20260718g"><script src="book.js?v=20260718g" defer></script>
</head>
<body data-translation-status="source">
  <a class="skip-link" href="#article">Skip to the article</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="Open table of contents" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>EN</b></strong></a>
    <div class="reader-progress"><span>Source</span><strong>${pages.length} / 105 documents</strong></div>
    <nav aria-label="Language and theme"><a href="${readerHref(koreanDocument)}" lang="ko" hreflang="ko" aria-label="Read the corresponding Korean page">KO</a><a href="${readerHref(vietnameseDocument)}" lang="vi" hreflang="vi" aria-label="Read the corresponding Vietnamese page">VI</a><a class="active" href="${page.slug}.html" lang="en" hreflang="en" aria-current="page">EN</a><button id="reader-theme" type="button" aria-label="Toggle light and dark theme">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="English table of contents"><div class="sidebar-top"><strong>English reading</strong><small>Chapters 7–16 · locked source</small></div>${navigation(page.slug)}<div class="sidebar-links"><a href="../#roadmap">Learning map</a><a href="https://github.com/krahets/hello-algo">Upstream repository</a></div></aside>
    <main class="reader-main"><article id="article"><div class="article-meta"><span>${page.chapter}</span><span>English source · ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>Original English source</strong><p>This local reading view is generated from the source-locked Hello Algo English document. KO and VI open the exact translated counterpart.</p></div>${body}<footer class="article-attribution"><strong>Source and license</strong><p>English content from <a href="${sourceUrl}" target="_blank" rel="noreferrer">Hello Algo by krahets and its contributors</a>, presented locally under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>.</p></footer></article>
      <nav class="page-nav" aria-label="Previous and next article">${previous ? `<a href="${previous.slug}.html"><span>← Previous</span><strong>${previous.title}</strong></a>` : "<i></i>"}${next ? `<a class="next" href="${next.slug}.html"><span>Next →</span><strong>${next.title}</strong></a>` : "<i></i>"}</nav>
    </main>
  </div>
</body></html>`;
}

export async function buildEnglishBook({ projectRoot, outputRoot }) {
  const registry = await loadTranslationRegistry(projectRoot);
  const bookOutput = path.join(outputRoot, "en", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));

  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of ["chapter_tree.jpg", "chapter_heap.jpg", "chapter_graph.jpg", "chapter_searching.jpg", "chapter_sorting.jpg", "chapter_divide_and_conquer.jpg", "chapter_backtracking.jpg", "chapter_dynamic_programming.jpg", "chapter_greedy.jpg", "chapter_appendix.jpg"]) await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  for (const [chapter, directory] of [
    ["chapter_tree", "binary_tree.assets"], ["chapter_tree", "binary_tree_traversal.assets"], ["chapter_tree", "array_representation_of_tree.assets"], ["chapter_tree", "binary_search_tree.assets"], ["chapter_tree", "avl_tree.assets"],
    ["chapter_heap", "heap.assets"], ["chapter_heap", "build_heap.assets"], ["chapter_heap", "top_k.assets"],
    ["chapter_graph", "graph.assets"], ["chapter_graph", "graph_operations.assets"], ["chapter_graph", "graph_traversal.assets"],
    ["chapter_searching", "binary_search.assets"], ["chapter_searching", "binary_search_insertion.assets"], ["chapter_searching", "binary_search_edge.assets"], ["chapter_searching", "replace_linear_by_hashing.assets"], ["chapter_searching", "searching_algorithm_revisited.assets"],
    ["chapter_sorting", "sorting_algorithm.assets"], ["chapter_sorting", "selection_sort.assets"], ["chapter_sorting", "bubble_sort.assets"], ["chapter_sorting", "insertion_sort.assets"], ["chapter_sorting", "quick_sort.assets"], ["chapter_sorting", "merge_sort.assets"], ["chapter_sorting", "heap_sort.assets"], ["chapter_sorting", "bucket_sort.assets"], ["chapter_sorting", "counting_sort.assets"], ["chapter_sorting", "radix_sort.assets"], ["chapter_sorting", "summary.assets"],
    ["chapter_divide_and_conquer", "divide_and_conquer.assets"], ["chapter_divide_and_conquer", "binary_search_recur.assets"], ["chapter_divide_and_conquer", "build_binary_tree_problem.assets"], ["chapter_divide_and_conquer", "hanota_problem.assets"],
    ["chapter_backtracking", "backtracking_algorithm.assets"], ["chapter_backtracking", "n_queens_problem.assets"], ["chapter_backtracking", "permutations_problem.assets"], ["chapter_backtracking", "subset_sum_problem.assets"],
    ["chapter_dynamic_programming", "intro_to_dynamic_programming.assets"], ["chapter_dynamic_programming", "dp_problem_features.assets"], ["chapter_dynamic_programming", "dp_solution_pipeline.assets"], ["chapter_dynamic_programming", "knapsack_problem.assets"], ["chapter_dynamic_programming", "unbounded_knapsack_problem.assets"], ["chapter_dynamic_programming", "edit_distance_problem.assets"],
    ["chapter_greedy", "greedy_algorithm.assets"], ["chapter_greedy", "fractional_knapsack_problem.assets"], ["chapter_greedy", "max_capacity_problem.assets"], ["chapter_greedy", "max_product_cutting_problem.assets"],
    ["chapter_appendix", "installation.assets"], ["chapter_appendix", "contribution.assets"]
  ]) {
    const destination = path.join(bookOutput, "assets", chapter, directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(projectRoot, "en", "docs", chapter, directory), destination, { recursive: true });
  }

  for (const [index, page] of pages.entries()) {
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    const koreanDocument = registry.byLanguage.ko.get(page.source);
    if (!vietnameseDocument || !koreanDocument) throw new Error(`English reader page has no localized counterparts: ${page.source}`);
    const route = englishReaderRoutes.get(page.source);
    if (route !== `en/learn/${page.slug}.html`) throw new Error(`English route registry mismatch: ${page.source}`);
    const markdown = await readFile(path.join(projectRoot, page.source), "utf8");
    const renderPath = page.source.replace(/^en\/docs\//, "vi/docs/");
    const body = renderMarkdown(prepareEnglishMarkdown(markdown), renderPath);
    await writeFile(path.join(bookOutput, `${page.slug}.html`), pageTemplate(page, body, index, registry.sourceCommit, vietnameseDocument, koreanDocument));
    await access(path.join(bookOutput, `${page.slug}.html`), constants.R_OK);
  }
  return { pageCount: pages.length, sourceCommit: registry.sourceCommit };
}
