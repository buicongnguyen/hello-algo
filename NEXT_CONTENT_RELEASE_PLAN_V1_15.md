# Hello Algo Atlas v1.15 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.15` — Vietnamese Arrays and Linked Lists and Korean Backtracking

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `5b6cbee35eead7f0f17c0addc30c0a32f7c04f82`

## Objective

Continue the source-locked full-book localization program by completing the
last condensed Vietnamese core-data-structure chapter and advancing the
sequential Korean edition:

1. Vietnamese Chapter 4, “Arrays and Linked Lists”;
2. Korean Chapter 13, “Backtracking.”

English remains the complete 119-document reference edition and is unchanged
in this release. Both localized chapters are delivered as complete learning
units with introductions, theory, worked traces, summaries, and exercises.

## Vietnamese Chapter 4 scope

- continuous array storage, address calculation, random access, insertion,
  deletion, traversal, search, expansion, and practical selection criteria;
- singly, circular, and doubly linked lists, including reference-update order,
  memory ownership, access/search tradeoffs, and representative applications;
- dynamic-list abstraction, size versus capacity, amortized append behavior,
  concatenation, sorting, and a complete instructional implementation;
- disk, RAM, and CPU-cache hierarchy; fragmentation, cache lines, prefetching,
  spatial and temporal locality, and hardware-aware data-structure selection;
- full review, technical Q&A, three worked concept exercises, plus array and
  linked-list programming exercises.

The seven localized documents preserve all eleven source images, two authored
tables, 44 inline formula spans, fifteen callouts, and all twenty-one official
13-language code groups at their source teaching positions.

## Korean Chapter 13 scope

- the complete attempt, backtrack, and pruning model, including state
  restoration, result copying, the eleven-step path trace, and a reusable
  backtracking framework;
- safe pruning proofs, common terminology, complexity limitations,
  heuristics, and representative search, constraint-satisfaction, and
  combinatorial-optimization applications;
- row-wise N-Queens placement with column and diagonal invariants, full
  complexity analysis, and implementation details;
- permutations with position-based and same-value pruning, including the
  vertical and horizontal scopes of `selected` and `duplicated`;
- both subset-sum formulations, canonical nondecreasing choice order,
  repeated-value pruning, positive-input monotonicity, and all visual traces;
- complete review, conceptual debugging exercises, and the permutations
  programming exercise.

The seven localized documents preserve all twenty-nine source images, two
authored tables, 142 inline formula spans, fifteen callouts, and all eleven
official 13-language code groups at their source teaching positions.

## Governance

- Translate only from the locked English source revision.
- Keep localized documents at `draft` until independent technical and language
  reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations instead
  of duplicating implementations in localized Markdown.

## Implemented fixes

- Replaced all fourteen condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 40 figures, four authored tables, 186 inline formula spans, and
  thirty callouts.
- Placed all thirty-two official code groups inline; four Korean groups and one
  Vietnamese group that were previously deferred are now restored to their
  teaching positions.
- Restored array-memory and cache explanations, linked-list invariants,
  amortized dynamic-array behavior, the full eleven-step backtracking trace,
  N-Queens derivations, duplicate-aware permutations, both subset-sum models,
  summaries, worked answers, and programming links.
- Restored the eleven-frame backtracking trace as an interactive step selector
  in both localized editions, matching the English reference instead of
  spreading every frame down the page.
- Preserved the code-aware formula-parity gate introduced in v1.14 and added
  chapter-level built-page assertions for the new release units.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 7 of 7 Vietnamese Chapter 4 documents structurally ready;
- 7 of 7 Korean Chapter 13 documents structurally ready;
- 32 of 32 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm synchronized language tabs, the eleven-frame
backtracking step selectors, all array, linked-list, cache, decision-tree,
N-Queens, permutation, and subset-sum visuals, responsive tables, callouts,
exact cross-language links, and no broken assets, raw Markdown, overflow, or
console errors.

## Next release boundary

Release `v1.16` completes:

1. Vietnamese Chapter 1 and front matter;
2. Korean Chapter 14, “Dynamic Programming.”

Release `v1.17` then completes Vietnamese Chapter 0 and the appendix together
with Korean Chapter 15. Release `v1.18` closes Korean Chapter 0, remaining
root/front matter, and the appendix. Release `v1.19` performs the full-book
technical, language, accessibility, and publication audit.
