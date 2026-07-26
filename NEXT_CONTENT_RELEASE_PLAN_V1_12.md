# Hello Algo Atlas v1.12 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.12` — Vietnamese Greedy and Korean Searching

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `f2dcf6c00dcebe112adbcbddefd3068ec489779f`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 15, “Greedy”;
2. Korean Chapter 10, “Searching.”

English remains the complete 119-document reference edition and is unchanged
in this release. Each localized chapter is delivered as a reviewable unit so
its motivation, proofs, visual traces, official implementations, summary, and
exercises stay together.

## Vietnamese Chapter 15 scope

- greedy choices, optimal substructure, the standard problem-solving process,
  proof obligations, and counterexamples where a local choice is not global;
- the coin-change example and why a largest-first strategy depends on the
  denomination system;
- fractional knapsack ordered by value density, its complete choice sequence,
  exchange argument, time complexity, and space complexity;
- the maximum-capacity two-pointer strategy with its full nine-step trace,
  skipped-state proof, and area derivation;
- maximum-product cutting, its mathematical transformations, preference for
  factors of three, remainder handling, and proof;
- complete summary, concept review, worked answers, greedy counterexamples,
  and programming exercises.

The seven localized documents preserve all 25 source images, six displayed
derivations, 155 inline formula spans, ten callouts, and all four official
13-language code groups at their source teaching positions. Every official
group is inline and uses the synchronized accessible language selector.

## Korean Chapter 10 scope

- closed and left-closed/right-open binary-search intervals, invariants,
  overflow-safe midpoint calculation, performance, and limitations;
- the complete seven-step binary-search trace and both official interval
  implementations;
- insertion points without and with duplicates, including the naive linear
  alternative, the optimized boundary invariant, and the eight-step trace;
- left and right boundary transformations and their official implementations;
- two-sum optimization from quadratic linear search to average-linear hash
  lookup, including the complete three-step hash-table trace;
- systematic comparison of linear, binary, hash, and tree search, including
  preprocessing, query, update, ordering, memory, and worst-case assumptions;
- complete summary, worked concept questions, answer tables, and programming
  exercises for binary search and insertion position.

The eight localized documents preserve all 27 source images, one authored
comparison table, 113 inline formula spans, thirteen callouts, and all eight
official 13-language code groups at their source teaching positions. No
official group is deferred to an appendix.

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
  teaching pages; retained the already-complete Vietnamese greedy exercise
  page.
- Restored all 52 figures, one authored table, six displayed derivations,
  268 inline formula spans, and 23 callouts.
- Placed all twelve official code groups at their source teaching positions
  with no deferred appendix.
- Restored every greedy decision sequence, exchange/skipped-state proof,
  product derivation, binary-search trace, insertion trace, and two-sum hash
  trace.
- Added practical invariant, boundary, lifecycle-cost, and method-selection
  explanations without changing the source lesson structure.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 7 of 7 Vietnamese Chapter 15 documents structurally ready;
- 8 of 8 Korean Chapter 10 documents structurally ready;
- 12 of 12 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm every greedy and searching visual sequence;
synchronized language selection across repeated code groups; responsive
tables; rendered formulas and callouts; exact cross-language links; and no
broken assets, unrendered Markdown, overflow, or console errors.

## Next release boundary

Release `v1.13` completes:

1. Vietnamese Chapter 3, “Data Structures”;
2. Korean Chapter 11, “Sorting.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
