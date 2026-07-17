# Hello Algo bilingual site

This fork publishes a bilingual GitHub Pages experience for the Hello Algo translation project.

## Published routes

- `/hello-algo/` redirects to Vietnamese.
- `/hello-algo/vi/` is the default Vietnamese project and translation-roadmap page.
- `/hello-algo/en/` preserves the complete interactive English Hello Algo Atlas.

Both language pages include a visible VI/EN switch. The Vietnamese page is deliberately transparent that the full book translation is still in progress.

## Vietnamese project page

The page includes:

- a six-stage repository translation roadmap;
- six chapter release waves;
- an interactive phase explorer;
- a six-gate document review workflow;
- an initial Vietnamese–English terminology table;
- quality and participation principles;
- an original Hello Algo motion demo;
- links to the detailed repository plan and upstream project.

The complete working plan is in [VIETNAMESE_TRANSLATION_PLAN.md](VIETNAMESE_TRANSLATION_PLAN.md).

## English Atlas

The English route includes:

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

Run `npm run check` for static validation or `npm run build` to recreate `dist` without starting the preview server.

The GitHub Pages workflow runs the same build whenever `main` is pushed. Original Hello Algo source and artwork remain under their upstream license; see `LICENSE` and the upstream project for details.
