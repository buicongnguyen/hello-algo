# Hello Algo Atlas v1.4 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.4` — Vietnamese Trees and Korean Computational Complexity

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `e1e9243b4eb6ea7e3cf66dccd58e5a2cda39e462`

## Objective

Continue the source-locked localization program with two complete learning
units:

1. Vietnamese Chapter 7, “Trees”;
2. Korean Chapter 2, “Computational Complexity.”

Whole chapters remain the release boundary so definitions, diagrams, code,
summaries, and exercises can be reviewed as coherent teaching sequences.

## Vietnamese Chapter 7 scope

- chapter opening and tree learning objectives;
- binary-tree nodes, terminology, operations, common forms, and degeneration;
- level-order breadth-first traversal;
- preorder, inorder, and postorder depth-first traversal;
- array representation of perfect, complete, and sparse binary trees;
- binary-search-tree lookup, insertion, removal, ordered traversal, and
  efficiency;
- AVL height, balance factor, four rotation cases, insertion, and removal;
- complete summary, engineering Q&A, concept review, and programming
  exercises.

The eight localized documents preserve all 52 source images, three comparison
tables, formulas, callouts, and 18 official code groups at their teaching
positions.

## Korean Chapter 2 scope

- actual testing and theoretical algorithm-efficiency estimation;
- `for`, `while`, nested iteration, regular recursion, tail recursion, and
  recursion trees;
- time-growth trends and asymptotic upper bounds;
- operation counting and Big-O derivation;
- constant, logarithmic, linear, linearithmic, quadratic, exponential, and
  factorial time;
- worst, best, and average time complexity;
- algorithm-related space, peak memory, stack frames, and common space
  classes;
- complete summary, Q&A, concept review, and programming exercise.

The seven localized documents preserve all 20 source images, six display-math
blocks, two tables, callouts, formulas, and 33 official code groups at their
teaching positions.

## Governance

- Translate only from the locked English source.
- Keep every localized document at `draft`.
- Treat structural parity as an automated release gate, not a replacement for
  independent technical and language review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Keep official code sourced from the locked multilingual implementations
  rather than maintaining duplicated localized copies.

## Implemented fixes

- Replaced all 15 condensed drafts with source-aligned Vietnamese and Korean
  documents.
- Placed all 51 official code groups inline with no deferred appendix.
- Replaced unsupported raw MkDocs step tabs in Vietnamese source files with
  reader-native sequential figures while preserving every image.
- Updated the Vietnamese binary-tree regression to require all three official
  code groups inline.
- Added Korean Chapter 2 media packaging for iteration, time, and space
  complexity.
- Kept every document as a draft with zero automatic pilot promotions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

The generated parity reports must show:

- 8 of 8 Vietnamese Chapter 7 documents structurally ready;
- 7 of 7 Korean Chapter 2 documents structurally ready;
- 51 of 51 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Browser QA must also confirm responsive tables, interactive 13-language code
tabs, rendered mathematics, and complete Vietnamese/Korean media without
broken assets.

## Next release boundary

The next content release continues with Vietnamese Chapter 8, “Heap,” and
Korean Chapter 3, “Data Structures.”
