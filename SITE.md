# Hello Algo trilingual site

This fork publishes a Korean, Vietnamese, and English GitHub Pages experience for the Hello Algo translation project.

## Published routes

- `/hello-algo/` redirects to Vietnamese.
- `/hello-algo/vi/` is the complete Vietnamese Hello Algo Atlas, with the same sections and interactions as English.
- `/hello-algo/vi/learn/` is a 104-of-119-document Vietnamese reader covering Chapters 0–16; 13 structurally verified pages are pilots and the remaining 91 are drafts.
- `/hello-algo/en/` preserves the complete interactive English Hello Algo Atlas.
- `/hello-algo/ko/` is the complete Korean Hello Algo Atlas.
- `/hello-algo/ko/learn/` is a 104-of-119-document Korean draft reader covering Chapters 0–16.
- `/hello-algo/en/learn/` starts a 119-document local reader generated from the locked official English source, covering the source home, Before Starting, Chapters 0–16, and References. Existing localized counterparts are linked exactly; untranslated counterparts are visibly marked pending.

All Atlas and reader pages include a visible KO/VI/EN switch or a disabled pending state when that document has no translation. Vietnamese documents are labelled as pilots or drafts; Korean reader documents remain drafts until their structure and content are expanded to match the locked English source and pass review.

## Vietnamese Atlas

The page includes:

- the same learning graph, data-structure guide, traversal, complexity, binary-search, sorting, motion, and problem-choice sections as `/en/`;
- Vietnamese static copy, controls, live status messages, chart labels, and interactive datasets;
- stable interaction keys shared with English and generated section-for-section from the same source page;
- 104 source-tracked Vietnamese documents covering Chapters 0–16, with per-document draft or pilot status;
- a responsive reader with chapter navigation, theme control, source attribution, and previous/next links;
- a per-page English option that opens the exact corresponding upstream chapter;
- links to the translation plan and upstream project.

Translation governance lives under `vi/`: a versioned glossary, style guide, contribution workflow, and machine-readable status ledger. Pilot pages are explicitly labelled as self-reviewed and awaiting independent community review.

The complete working plan is in [VIETNAMESE_TRANSLATION_PLAN.md](VIETNAMESE_TRANSLATION_PLAN.md).

## Korean draft

The Korean Atlas has section-for-section parity with the English and Vietnamese Atlas, localized interactions, and accessibility labels. The Korean reader contains 104 source-locked Chapter 0–16 drafts with exact Vietnamese and English counterpart links. Chapters 3–16 include Korean explanations, diagrams, formulas, tables, Python examples, and new exercise pages for Chapters 14–15. Condensed documents remain drafts until content-parity and review gates pass. Governance files live under `ko/`.

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
