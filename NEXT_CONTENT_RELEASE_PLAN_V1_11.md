# Hello Algo Atlas v1.11 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.11` — Vietnamese Dynamic Programming and Korean Graph

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `bea32c2afac5f9671a66093a9909a219e2d9d933`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 14, “Dynamic Programming”;
2. Korean Chapter 9, “Graph.”

English remains the complete 119-document reference edition and is unchanged
in this release. Each chapter is delivered as one reviewable unit so its
foundations, derivations, visual traces, official implementations, summary,
and exercises remain together.

## Vietnamese Chapter 14 scope

- the progression from brute-force recursion through memoization to bottom-up
  dynamic programming and rolling-state optimization;
- overlapping subproblems, optimal substructure, no aftereffects, expanded
  state definitions, and problem-identification signals;
- the complete minimum-path-sum solution pipeline, including state, boundary,
  transition-order, recursion, memoization, and twelve-step table trace;
- 0-1 knapsack decisions, reverse one-dimensional traversal, the fourteen-step
  table trace, and six-step overwrite comparison;
- unbounded knapsack, forward traversal, coin-change minimum and combination
  variants, including every table transition;
- edit distance decisions, boundary initialization, fifteen-step trace, and
  upper-left-state preservation;
- complete summary, concept review, worked answers, and programming exercises.

The nine localized documents preserve all 93 source images, eleven displayed
derivations, 409 inline formula spans, nineteen callouts, and all 24 official
13-language code groups at their source teaching positions. Every official
group is inline and uses the synchronized accessible language selector.

## Korean Chapter 9 scope

- graph, vertex, edge, adjacency, path, degree, direction, connectivity, and
  weight terminology;
- adjacency-matrix and adjacency-list representation, invariants, density
  tradeoffs, and real-world modeling;
- complete five-step vertex/edge operation sequences for both representations
  and their time/space comparison;
- breadth-first traversal with queue and visited-set behavior, including the
  complete eleven-step trace;
- depth-first traversal, recursion and backtracking behavior, including the
  complete eleven-step trace;
- disconnected-graph coverage, deterministic neighbor ordering, complete
  summary, worked exercises, and a path-existence programming exercise.

The six localized documents preserve all 41 source images, two authored
tables, one displayed derivation, 102 inline formula spans, eight callouts,
and all four official 13-language code groups at their source teaching
positions. No official group is deferred to an appendix.

## Governance

- Translate only from the locked English source revision.
- Keep every localized document at `draft` until independent technical and
  language reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations rather
  than duplicating implementations in localized Markdown.

## Implemented fixes

- Replaced fourteen condensed drafts with source-aligned Vietnamese and Korean
  teaching pages; retained the already-complete Vietnamese exercise page.
- Restored all 134 figures, two authored tables, twelve displayed derivations,
  511 inline formula spans, and 27 callouts.
- Placed all 28 official code groups at their source teaching positions with
  no deferred appendix.
- Restored every minimum-path, knapsack, coin-change, edit-distance, graph-
  operation, BFS, and DFS visual step.
- Added practical state-design, representation-invariant, traversal-marking,
  graph-density, and disconnected-graph explanations without changing the
  source lesson structure.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 9 of 9 Vietnamese Chapter 14 documents structurally ready;
- 6 of 6 Korean Chapter 9 documents structurally ready;
- 28 of 28 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm every dynamic-programming and graph visual
sequence; synchronized language selection across repeated code groups;
responsive tables; rendered formulas and callouts; exact cross-language
links; and no broken assets, unrendered Markdown, overflow, or console errors.

## Next release boundary

Release `v1.12` completes:

1. Vietnamese Chapter 15, “Greedy”;
2. Korean Chapter 10, “Searching.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
