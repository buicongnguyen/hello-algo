# Hello Algo bilingual site

This fork publishes a bilingual GitHub Pages experience for the Hello Algo translation project.

## Published routes

- `/hello-algo/` redirects to Vietnamese.
- `/hello-algo/vi/` is the complete Vietnamese Hello Algo Atlas, with the same sections and interactions as English.
- `/hello-algo/vi/learn/` is the Vietnamese pilot reader.
- `/hello-algo/en/` preserves the complete interactive English Hello Algo Atlas.

Both language pages include a visible VI/EN switch. The Atlas interface is fully localized; the longer book translation remains transparently labelled as an in-progress pilot.

## Vietnamese Atlas

The page includes:

- the same learning graph, data-structure guide, traversal, complexity, binary-search, sorting, motion, and problem-choice sections as `/en/`;
- Vietnamese static copy, controls, live status messages, chart labels, and interactive datasets;
- stable interaction keys shared with English and generated section-for-section from the same source page;
- six source-tracked Vietnamese pilot documents covering all of Chapter 1 and the beginning of Chapter 2;
- a responsive reader with chapter navigation, theme control, source attribution, and previous/next links;
- links to the translation plan and upstream project.

Translation governance lives under `vi/`: a versioned glossary, style guide, contribution workflow, and machine-readable status ledger. Pilot pages are explicitly labelled as self-reviewed and awaiting independent community review.

The complete working plan is in [VIETNAMESE_TRANSLATION_PLAN.md](VIETNAMESE_TRANSLATION_PLAN.md).

## Shared Atlas experience

Both Atlas routes include:

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

Run `npm run check` for source validation or `npm run build` to recreate `dist`, render the Vietnamese Markdown pilot, and check every generated local reference.

The GitHub Pages workflow runs the same build whenever `main` is pushed. Original Hello Algo source and artwork remain under their upstream license; see `LICENSE` and the upstream project for details.
