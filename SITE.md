# Hello Algo trilingual site

This fork publishes a Korean, Vietnamese, and English GitHub Pages experience for the Hello Algo translation project.

## Published routes

- `/hello-algo/` redirects to Vietnamese.
- `/hello-algo/vi/` is the complete Vietnamese Hello Algo Atlas, with the same sections and interactions as English.
- `/hello-algo/vi/learn/` is the Vietnamese pilot reader.
- `/hello-algo/en/` preserves the complete interactive English Hello Algo Atlas.
- `/hello-algo/ko/` is the complete Korean Hello Algo Atlas.
- `/hello-algo/ko/learn/` is a 14-document Korean pilot reader covering Chapters 0–2.

All Atlas and reader pages include a visible KO/VI/EN switch. The localized readers remain transparently labelled as pilots pending independent review.

## Vietnamese Atlas

The page includes:

- the same learning graph, data-structure guide, traversal, complexity, binary-search, sorting, motion, and problem-choice sections as `/en/`;
- Vietnamese static copy, controls, live status messages, chart labels, and interactive datasets;
- stable interaction keys shared with English and generated section-for-section from the same source page;
- 26 source-tracked Vietnamese pilot documents covering Chapters 0–4;
- a responsive reader with chapter navigation, theme control, source attribution, and previous/next links;
- a per-page English option that opens the exact corresponding upstream chapter;
- links to the translation plan and upstream project.

Translation governance lives under `vi/`: a versioned glossary, style guide, contribution workflow, and machine-readable status ledger. Pilot pages are explicitly labelled as self-reviewed and awaiting independent community review.

The complete working plan is in [VIETNAMESE_TRANSLATION_PLAN.md](VIETNAMESE_TRANSLATION_PLAN.md).

## Korean pilot

The Korean edition has section-for-section parity with the English and Vietnamese Atlas, localized interactions and accessibility labels, 14 source-locked Chapter 0–2 documents, representative Python examples, and exact Vietnamese and English counterpart links. Governance files live under `ko/`.

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

Run `npm run check` for source validation or `npm run build` to recreate `dist`, render both localized Markdown pilots, and check every generated local reference.

The GitHub Pages workflow runs the same build whenever `main` is pushed. Original Hello Algo source and artwork remain under their upstream license; see `LICENSE` and the upstream project for details.
