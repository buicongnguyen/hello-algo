# Hello Algo trilingual site

This fork publishes a Korean, Vietnamese, and English GitHub Pages experience for the Hello Algo translation project.

## Published routes

- `/hello-algo/` redirects to Vietnamese.
- `/hello-algo/vi/` is the complete Vietnamese Hello Algo Atlas, with the same sections and interactions as English.
- `/hello-algo/vi/learn/` is a complete 119-document Vietnamese route set covering the book home, Before Starting, Chapters 0–16, exercises, and References. All documents remain drafts until generated parity and human-review gates pass.
- `/hello-algo/en/` preserves the complete interactive English Hello Algo Atlas.
- `/hello-algo/ko/` is the complete Korean Hello Algo Atlas.
- `/hello-algo/ko/learn/` is a complete 119-document Korean draft reader.
- `/hello-algo/en/learn/` is a 119-document local reader generated from the locked official English source, covering the source home, Before Starting, Chapters 0–16, and References. Every page links to its exact VI and KO counterpart.

All Atlas and reader pages include a visible KO/VI/EN switch. Vietnamese and Korean documents remain drafts until their structure and content match the locked English source and pass technical and language review.

## Vietnamese Atlas

The page includes:

- the same learning graph, data-structure guide, traversal, complexity, binary-search, sorting, motion, and problem-choice sections as `/en/`;
- Vietnamese static copy, controls, live status messages, chart labels, and interactive datasets;
- stable interaction keys shared with English and generated section-for-section from the same source page;
- 119 source-tracked Vietnamese documents covering the complete official catalog;
- a responsive reader with chapter navigation, article outline, search, theme control, source attribution, and previous/next links;
- a per-page English option that opens the exact corresponding upstream chapter;
- links to the translation plan and upstream project.

Translation governance lives under `vi/`: a versioned glossary, style guide, contribution workflow, machine-readable status ledger, and generated parity report.

The complete working plan is in [VIETNAMESE_TRANSLATION_PLAN.md](VIETNAMESE_TRANSLATION_PLAN.md).

The v1.2 content wave completes structural parity for all six Vietnamese Chapter 5 documents: the chapter opening, stack, queue, deque, summary, and exercises. Their official diagrams, operation tables, complexity notation, callouts, and 13-language code groups are preserved inline. The pages remain drafts pending independent technical and Vietnamese-language review.

The v1.3 content wave completes structural parity for all six Vietnamese Chapter 6 documents. Hash-table operations, collision strategies, hash-algorithm design, formulas, diagrams, summaries, exercises, and all seven official code groups are preserved at their source teaching positions.

The v1.4 content wave completes structural parity for all eight Vietnamese Chapter 7 documents. Binary-tree terminology and operations, BFS/DFS traversal, array representation, binary search trees, AVL rotations, 52 images, exercises, and all 18 official code groups are preserved at their source teaching positions.

The v1.5 content wave completes structural parity for all six Vietnamese Chapter 8 documents. Heap operations, array representation, insertion and removal heapify, linear-time heap construction, Top-k, 34 images, the full complexity derivation, exercises, and all seven official code groups are preserved at their source teaching positions.

The v1.6 content wave completes structural parity for all six Vietnamese Chapter 9 documents. Graph terminology and representations, matrix/list operations, 11-step BFS and DFS sequences, 41 images, two tables, exercises, and all four official code groups are preserved at their source teaching positions.

## Korean draft

The Korean Atlas has section-for-section parity with the English and Vietnamese Atlas, localized interactions, and accessibility labels. The Korean reader contains all 119 source-locked drafts with exact Vietnamese and English counterpart links. Documents preserve the official diagrams and 13-language code groups; condensed prose remains draft until content-parity and review gates pass. Governance files live under `ko/`.

The v1.2 content wave also completes structural parity for the four-document Korean Preface, including audience, prerequisites, acknowledgements, reading conventions, animated guidance, local code setup, discussion guidance, and learning roadmap. These pages remain drafts pending independent technical and Korean-language review.

The implemented v1.2 scope and its handoff to the now-completed v1.3 wave are recorded in [NEXT_CONTENT_RELEASE_PLAN.md](NEXT_CONTENT_RELEASE_PLAN.md).

The v1.3 content wave completes structural parity for the four-document Korean Chapter 1, including all dictionary-search steps, card sorting, greedy change-making, the data-structure relationship diagrams, comparison table, and engineering Q&A. The implemented scope and following release boundary are recorded in [NEXT_CONTENT_RELEASE_PLAN_V1_3.md](NEXT_CONTENT_RELEASE_PLAN_V1_3.md).

The v1.4 content wave completes structural parity for all seven Korean Chapter 2 documents. Efficiency evaluation, iteration and recursion, time and space complexity, formulas, 20 images, exercises, and all 33 official code groups are preserved inline. The implemented scope and following release boundary are recorded in [NEXT_CONTENT_RELEASE_PLAN_V1_4.md](NEXT_CONTENT_RELEASE_PLAN_V1_4.md).

The v1.5 content wave completes structural parity for all seven Korean Chapter 3 documents. Logical and physical structure, basic data types, integer and floating-point encoding, Unicode and UTF encodings, nine images, thirteen display-math blocks, exercises, and the official 13-language code group are preserved inline. The full remaining roadmap is recorded in [NEXT_CONTENT_RELEASE_PLAN_V1_5.md](NEXT_CONTENT_RELEASE_PLAN_V1_5.md).

The v1.6 content wave completes structural parity for all seven Korean Chapter 4 documents. Arrays, linked lists, dynamic arrays, RAM and cache behavior, 11 images, two tables, 15 callouts, exercises, and all 21 official code groups are preserved inline. The implemented scope and next release boundary are recorded in [NEXT_CONTENT_RELEASE_PLAN_V1_6.md](NEXT_CONTENT_RELEASE_PLAN_V1_6.md).

## Shared Atlas experience

All three Atlas routes include:

- a clickable learning-dependency graph;
- an interactive data-structure field guide and operation-cost matrix;
- step-by-step BFS and DFS traversal;
- interactive complexity and binary-search labs;
- an eight-algorithm sorting comparison;
- three motion demos from the original repository;
- problem-choice and algorithm-pattern maps;
- direct routes into the original English Hello Algo chapters.

## Local development

Run `npm start` to validate, build, and preview the exact `dist` artifact. The default local port is `4173`; set `PORT` to use another one.

Run `npm run check` for source validation or `npm run build` to recreate `dist`, render the localized Markdown readers, and check every generated local reference and counterpart route.

The GitHub Pages workflow runs the same build whenever `main` is pushed. Original Hello Algo source and artwork remain under their upstream license; see `LICENSE` and the upstream project for details.
