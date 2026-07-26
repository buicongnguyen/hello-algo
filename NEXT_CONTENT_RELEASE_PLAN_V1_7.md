# Hello Algo Atlas v1.7 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.7` — Vietnamese Searching and Korean Stack and Queue

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `5634c923f365d3322b43c85a09157f7626a3aba4`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 10, “Searching”;
2. Korean Chapter 5, “Stack and Queue.”

English remains the complete 119-document reference edition. Whole chapters
remain the release boundary so the algorithm invariant, every visual step,
official multilingual implementations, summaries, and exercises can be
reviewed together.

## Vietnamese Chapter 10 scope

- binary search over closed and left-closed/right-open intervals;
- overflow-safe midpoint calculation and full seven-step trace;
- insertion points with and without duplicate values;
- left and right boundary variants and their conversions;
- replacing repeated linear search with hash lookup in Two Sum;
- systematic comparison of linear, binary, tree, and hash-based search;
- complete summary, concept review, and programming exercises.

The eight localized documents preserve all 27 source images, the search-method
comparison table, 13 callouts, 113 inline formula spans, and all eight official
13-language code groups at their source teaching positions. Unsupported source
media tabs are represented as consecutive labeled steps without dropping any
figure.

## Korean Chapter 5 scope

- stack LIFO behavior, operations, array and linked-list implementations;
- queue FIFO behavior, array and linked-list implementations, and circular
  indexing;
- deque operations at both ends, doubly linked-list and circular-array
  implementations;
- time, space, cache, capacity, allocation, and boundary-condition tradeoffs;
- browser history, undo/redo, task processing, traversal, sliding-window, and
  scheduling applications;
- complete summary, engineering Q&A, concept review, and programming exercise.

The six localized documents preserve all 26 source images, three operation
tables, eight callouts, 17 inline formula spans, and all nine official
13-language code groups at their source teaching positions. Every official
group is inline and shares the accessible synchronized language selector.

## Governance

- Translate only from the locked English source revision.
- Keep localized documents at `draft` until independent technical and language
  reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations rather
  than duplicating code in localized Markdown.

## Implemented fixes

- Replaced all 14 condensed drafts with source-aligned Vietnamese and Korean
  teaching pages.
- Restored all 53 figures, four tables, 21 callouts, and 130 formula spans.
- Moved all 17 official code groups to their source teaching positions with no
  deferred appendix.
- Converted binary-search and insertion-point media tabs into complete labeled
  step sequences.
- Restored boundary-search conversions, time-space tradeoffs, circular-buffer
  invariants, implementation comparisons, and source-aligned exercises.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 8 of 8 Vietnamese Chapter 10 documents structurally ready;
- 6 of 6 Korean Chapter 5 documents structurally ready;
- 17 of 17 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Browser QA must confirm the seven-step binary-search trace, eight-step
insertion-point trace, responsive comparison/operation tables, synchronized
language selection across repeated code groups, rendered mathematics,
localized callouts, and no broken assets or console errors.

## Next release boundary

Release `v1.8` completes:

1. Vietnamese Chapter 11, “Sorting”;
2. Korean Chapter 6, “Hashing.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
