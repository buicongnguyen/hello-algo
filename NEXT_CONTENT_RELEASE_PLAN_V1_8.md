# Hello Algo Atlas v1.8 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.8` — Vietnamese Sorting and Korean Hashing

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `8539339f0c4ad22620065db77085e094367f36f6`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 11, “Sorting”;
2. Korean Chapter 6, “Hashing.”

English remains the complete 119-document reference edition and is unchanged
in this release. A whole chapter remains the release boundary so explanations,
visual traces, official implementations, summaries, and exercises can be
reviewed as one coherent teaching sequence.

## Vietnamese Chapter 11 scope

- criteria for execution efficiency, in-place operation, stability,
  adaptability, and comparison-based sorting;
- complete selection, bubble, and insertion-sort traces and tradeoffs;
- quick-sort partitioning, median-of-three pivot selection, and bounded
  recursion-depth optimization;
- merge-sort divide/merge phases and linked-list application;
- max-heap construction, extraction, and twelve-step heap-sort trace;
- bucket distribution, counting-sort prefix sums, and radix digit ordering;
- complete comparison summary, engineering Q&A, concept review, and
  programming exercises.

The thirteen localized documents preserve all 71 source images, the exercise
answer table, two display-math blocks, 223 inline formula spans, eleven
callouts, and all fourteen official 13-language code groups at their source
teaching positions. Unsupported source media tabs are represented as
consecutive labeled steps without dropping any figure.

## Korean Chapter 6 scope

- hash-table lookup, update, traversal, bucket mapping, load factor, resizing,
  and rehashing;
- separate chaining, linear probing, lazy deletion, quadratic probing, and
  multiple hashing;
- collision invariants, probe continuity, runtime implementation choices, and
  adversarial collision behavior;
- hash goals, non-cryptographic design patterns, prime moduli, MD5, SHA
  families, and security boundaries;
- built-in hash values, equality contracts, immutable keys, random salting,
  and persistent-hash cautions;
- complete summary, engineering Q&A, concept review, and programming exercise.

The six localized documents preserve all nine source images, two comparison
tables, two display-math blocks, 60 inline formula spans, ten callouts, and all
seven official 13-language code groups at their source teaching positions.
Every official group is inline and shares the accessible synchronized language
selector.

## Governance

- Translate only from the locked English source revision.
- Keep every localized document at `draft` until independent technical and
  language reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations rather
  than duplicating code in localized Markdown.

## Implemented fixes

- Replaced all nineteen condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 80 figures, three authored tables, four display-math blocks,
  283 inline formula spans, and 21 callouts.
- Moved all 21 official code groups to their source teaching positions with no
  deferred appendix.
- Converted selection, bubble, quick, merge, heap, and counting-sort media tabs
  into complete labeled step sequences.
- Restored stable-sort reasoning, quick-sort degeneration and recursion
  controls, counting-sort prefix sums, open-address deletion continuity, hash
  equality contracts, and cryptographic/non-cryptographic boundaries.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 13 of 13 Vietnamese Chapter 11 documents structurally ready;
- 6 of 6 Korean Chapter 6 documents structurally ready;
- 21 of 21 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Browser QA must confirm complete sorting step sequences, responsive tables,
synchronized language selection across repeated code groups, rendered prefix
sum and prime-modulus mathematics, localized callouts, exact cross-language
links, and no broken assets or console errors.

## Next release boundary

Release `v1.9` completes:

1. Vietnamese Chapter 12, “Divide and Conquer”;
2. Korean Chapter 7, “Tree.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
