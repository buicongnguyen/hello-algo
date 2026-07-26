# Hello Algo Atlas v1.10 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.10` — Vietnamese Backtracking and Korean Heap

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `53fc9f0289590bd37df8580926446c1634906ea6`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 13, “Backtracking”;
2. Korean Chapter 8, “Heap.”

English remains the complete 119-document reference edition and is unchanged
in this release. Each chapter is released as one reviewable unit so its
foundations, worked problems, visual traces, official implementations,
summary, and exercises stay together.

## Vietnamese Chapter 13 scope

- the backtracking decision tree, solution and constraint definitions, try,
  prune, recurse, record, and restore phases;
- the complete eleven-step state-space trace and the general backtracking
  framework;
- N-Queens row, column, main-diagonal, and secondary-diagonal constraints;
- permutations with and without duplicate input values, including duplicate-
  branch pruning;
- two subset-sum formulations, ordering assumptions, duplicate-choice
  elimination, infeasible-sum pruning, and state restoration;
- complete summary, concept review, worked answers, and a permutations
  programming exercise.

The seven localized documents preserve all 29 source images, two authored
tables, 142 inline formula spans, fifteen callouts, and all eleven official
13-language code groups at their source teaching positions. Every official
group is inline and uses the synchronized accessible language selector.

## Korean Chapter 8 scope

- minimum-heap and maximum-heap invariants, priority-queue contracts, array
  representation, and parent/child index formulas;
- peek, insertion with upward heapification, and removal with downward
  heapification, including all nineteen operation steps;
- bottom-up heap construction and the full linear-time complexity derivation;
- three Top-k strategies and the size-limited minimum-heap solution;
- complete summary, the distinction between heap memory and the heap data
  structure, concept review, worked answers, and a kth-largest programming
  exercise.

The six localized documents preserve all 34 source images, the operation
table, four displayed derivations, 84 inline formula spans, eight callouts,
and all seven official 13-language code groups at their source teaching
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

- Replaced all thirteen condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 63 figures, three authored tables, four displayed derivations,
  226 inline formula spans, and 23 callouts.
- Placed all 18 official code groups at their source teaching positions with
  no deferred appendix.
- Restored the eleven-step backtracking trace, duplicate-permutation pruning,
  both subset-sum formulations, N-Queens diagonal bookkeeping, all heap push
  and pop steps, and the bottom-up heap complexity proof.
- Added practical invariant, comparator-contract, streaming Top-k, and state-
  restoration explanations without changing the source lesson structure.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 7 of 7 Vietnamese Chapter 13 documents structurally ready;
- 6 of 6 Korean Chapter 8 documents structurally ready;
- 18 of 18 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm the complete backtracking, permutation, subset-
sum, N-Queens, heap insertion, heap removal, and Top-k sequences; synchronized
language selection across repeated code groups; responsive tables; rendered
formulas and callouts; exact cross-language links; and no broken assets,
unrendered Markdown, overflow, or console errors.

## Next release boundary

Release `v1.11` completes:

1. Vietnamese Chapter 14, “Dynamic Programming”;
2. Korean Chapter 9, “Graph.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
