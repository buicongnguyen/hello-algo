# Hello Algo Atlas v1.3 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.3` — Vietnamese Hashing and Korean Introduction

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `5e9b8af7ce2e46fd6861abf5c6f62530574a541a`

## Objective

Continue the sentence-level localization program with two complete learning
units:

1. Vietnamese Chapter 6, “Hashing”;
2. Korean Chapter 1, “Introduction.”

The release keeps whole chapters together so definitions, examples,
implementations, summaries, and exercises can be reviewed as coherent units.

## Vietnamese Chapter 6 scope

- chapter opening;
- hash-table definition, operation comparison, traversal, and array
  implementation;
- hash functions, collisions, resizing, and load factor;
- separate chaining and open addressing;
- linear, quadratic, and multiple-hash probing;
- hash-algorithm goals, simple designs, prime moduli, and standard algorithms;
- hash values for built-in and custom data types;
- complete chapter summary, Q&A, concept review, and programming exercise.

The localized documents preserve the locked source’s four diagrams, two
operation/security tables, formulas, display-math examples, four callouts, and
seven official code groups at their teaching positions.

## Korean Chapter 1 scope

- chapter opening;
- dictionary lookup as binary search, with all five visual steps;
- card sorting as insertion sort;
- change-making as a greedy example;
- definitions and design goals for algorithms and data structures;
- relationship diagram, building-block analogy, and comparison table;
- complete summary and engineering Q&A.

The localized documents preserve all ten source images, the formula set,
callouts, table, and heading hierarchy.

## Governance

- Translate only from the locked English source.
- Keep every localized document at `draft`.
- Structural parity is an automated release gate, not a substitute for
  independent technical and language review.
- Preserve the existing CC BY-NC-SA 4.0 attribution and community-fork
  disclosure.

## Implemented fixes

- Replaced all ten condensed drafts with source-aligned localized documents.
- Placed all seven Vietnamese official code groups inline with no deferred
  appendix.
- Restored the two Korean relationship images and completed Korean Chapter 1
  media packaging.
- Corrected the Chapter 6 regression gate to require source-faithful inline
  mathematics rather than an unsupported display-math shape.
- Kept every document as a draft with zero automatic pilot promotions.

## Validation

The release passes:

```text
npm run check
npm run build
git diff --check
```

Browser QA also confirms responsive table containment, interactive
13-language code tabs, and complete Korean Chapter 1 media rendering without
broken assets.

The generated parity reports show:

- 6 of 6 Vietnamese Chapter 6 documents structurally ready;
- 4 of 4 Korean Chapter 1 documents structurally ready;
- 7 of 7 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

## Next release boundary

The next content release continues with Vietnamese Chapter 7, “Trees,” and
Korean Chapter 2, “Computational Complexity.”
