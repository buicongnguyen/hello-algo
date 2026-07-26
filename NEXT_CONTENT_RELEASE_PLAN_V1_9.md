# Hello Algo Atlas v1.9 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.9` — Vietnamese Divide and Conquer and Korean Tree

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `1d2f03291293a66a4c1319dbc467807f6835403c`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 12, “Divide and Conquer”;
2. Korean Chapter 7, “Tree.”

English remains the complete 119-document reference edition and is unchanged
in this release. The chapter boundary keeps foundational explanations, worked
problems, visual traces, official implementations, summaries, and exercises
together for technical and language review.

## Vietnamese Chapter 12 scope

- divide and conquer's partition and merge phases and the three suitability
  criteria;
- operation-count and parallel-computation explanations, including the
  bubble-sort comparison and bucket-sort example;
- recursive binary search as a divide-and-conquer search strategy;
- reconstructing a binary tree from preorder and inorder traversals, including
  interval derivation and the complete nine-step recursion trace;
- the Hanota recurrence, base cases, pillar roles, three-disc trace, recursion
  tree, and complexity;
- complete summary, concept review, worked answers, and exponentiation-by-
  squaring exercise.

The seven localized documents preserve all 31 source images, the subtree index
table, two displayed derivations, 89 inline formula spans, nine callouts, and
all three official 13-language code groups at their source teaching positions.
Unsupported source media tabs are represented as consecutive labeled steps
without dropping any figure.

## Korean Chapter 7 scope

- binary-tree nodes, references, terminology, initialization, link updates,
  common tree shapes, and degeneration;
- breadth-first level traversal and recursive depth-first preorder, inorder,
  and postorder traversal with the complete eleven-step trace;
- array representation of perfect, arbitrary, and complete binary trees;
- binary-search-tree search, insertion, all three deletion cases, inorder
  ordering, degeneration, and applications;
- AVL height and balance factors, four rotation cases, insertion, deletion,
  search, and practical tradeoffs;
- complete summary, engineering Q&A, concept review, and three programming
  exercises.

The eight localized documents preserve all 52 source images, three comparison
tables, 87 inline formula spans, fourteen callouts, and all eighteen official
13-language code groups at their source teaching positions. Every official
group is inline and uses the accessible synchronized language selector.

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

- Replaced all fifteen condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 83 figures, four authored tables, two displayed derivations,
  176 inline formula spans, and 23 callouts.
- Moved all 21 official code groups to their source teaching positions with no
  deferred appendix.
- Converted binary-tree construction, Hanota, traversal, BST deletion, and AVL
  rotation media tabs into complete labeled step sequences.
- Restored divide-and-conquer suitability and efficiency reasoning, traversal
  interval derivation, queue/stack complexity, BST deletion invariants, AVL
  height-update order, and single/double rotation selection.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 7 of 7 Vietnamese Chapter 12 documents structurally ready;
- 8 of 8 Korean Chapter 7 documents structurally ready;
- 21 of 21 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm complete construction, Hanota, traversal,
deletion, and rotation sequences; responsive tables; synchronized language
selection across repeated code groups; rendered formulas and callouts; exact
cross-language links; and no broken assets or console errors.

## Next release boundary

Release `v1.10` completes:

1. Vietnamese Chapter 13, “Backtracking”;
2. Korean Chapter 8, “Heap.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
