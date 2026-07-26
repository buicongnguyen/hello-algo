# Hello Algo Atlas v1.13 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.13` — Vietnamese Data Structures and Korean Sorting

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `66d3a52c4f6f8577a54b62c11c66d433927e50ba`

## Objective

Continue the source-locked full-book localization program by closing one
earlier condensed Vietnamese chapter and advancing the sequential Korean
edition:

1. Vietnamese Chapter 3, “Data Structures”;
2. Korean Chapter 11, “Sorting.”

English remains the complete 119-document reference edition and is unchanged
in this release. Each chapter is delivered as a complete learning unit rather
than a collection of isolated pages.

## Vietnamese Chapter 3 scope

- logical classification into linear, tree, and network structures;
- physical classification into contiguous and dispersed memory, address
  behavior, allocation constraints, and the array/linked-list foundation;
- integer, floating-point, character, and Boolean basic types, their Java
  ranges, cross-language differences, and the separation between content type
  and organization;
- sign-magnitude, ones’ complement, and two’s complement, including zero,
  `byte` range, signed addition, and hardware rationale;
- the complete IEEE 754 single-precision layout, normalized and denormalized
  formulas, range, precision, infinity, zero, and NaN;
- ASCII, EASCII, GBK, Unicode code points, UTF-8 self-synchronization,
  UTF-16/UTF-32 tradeoffs, surrogate pairs, and language runtime storage;
- full summary, technical Q&A, worked concept exercises, and a bit-counting
  programming exercise.

The seven localized documents preserve all nine source images, two authored
tables, thirteen displayed derivations, 133 inline formula spans, nine
callouts, and the official 13-language basic-type code group at its source
teaching position.

## Korean Chapter 11 scope

- evaluation by execution cost, in-place behavior, stability, adaptability,
  and comparison-model limits;
- complete selection, bubble, and insertion-sort processes, invariants,
  stability behavior, early termination, and small-array advantages;
- the full nine-step quick-sort partition trace, recursive process, pivot
  selection, stack-depth optimization, and practical performance analysis;
- the complete ten-step merge-sort and twelve-step heap-sort traces;
- bucket distribution, recursive and probability-aware balancing, and external
  sorting considerations;
- simple and stable counting sort with the complete eight-step prefix-sum
  trace, stability proof, and domain restrictions;
- radix sorting from least-significant to most-significant digit, its
  derivation, stability requirement, complexity, and data-model constraints;
- complete comparison summary, technical Q&A, worked answers, and merge/count
  programming exercises.

The thirteen localized documents preserve all 71 source images, two displayed
derivations, 223 inline formula spans, eleven callouts, and all fourteen
official 13-language code groups at their source teaching positions. Five
groups that were previously deferred are now inline.

## Governance

- Translate only from the locked English source revision.
- Keep all localized documents at `draft` until independent technical and
  language reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations instead
  of duplicating implementations in localized Markdown.

## Implemented fixes

- Replaced all twenty condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 80 figures, two authored tables, fifteen displayed derivations,
  356 inline formula spans, and twenty callouts.
- Placed all fifteen official code groups inline, including five Korean
  sorting groups previously deferred to the generated appendix.
- Restored two’s-complement and IEEE 754 derivations, Unicode/UTF tradeoffs,
  every comparison-sort trace, counting-prefix placement, and radix stability.
- Added practical memory-allocation, character-boundary, sorting-invariant,
  distribution, cache, and hybrid-algorithm explanations without changing the
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

- 7 of 7 Vietnamese Chapter 3 documents structurally ready;
- 13 of 13 Korean Chapter 11 documents structurally ready;
- 15 of 15 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm all number/character encoding derivations,
sorting traces, synchronized language tabs, responsive tables, formulas,
callouts, exact cross-language links, and no broken assets, raw Markdown,
overflow, or console errors.

## Next release boundary

Release `v1.14` completes:

1. Vietnamese Chapter 2, “Computational Complexity”;
2. Korean Chapter 12, “Divide and Conquer.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
