# Hello Algo Atlas v1.6 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.6` — Vietnamese Graph and Korean Array and Linked List

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `2907df0a5bf7b4b385d3448aaefe00b5fba1f90f`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 9, “Graph”;
2. Korean Chapter 4, “Array and Linked List.”

English remains the complete 119-document reference edition. A whole chapter
is the release boundary so definitions, operations, visual sequences,
multilingual code, summaries, and exercises can be reviewed as one teaching
sequence rather than as disconnected pages.

## Vietnamese Chapter 9 scope

- graph terminology, directed and undirected edges, weighted graphs, paths,
  connectivity, and degree;
- adjacency-matrix and adjacency-list representations with their complexity
  tradeoffs;
- vertex and edge addition and removal in both representations;
- breadth-first search with a queue, visited set, and shortest unweighted path
  interpretation;
- depth-first search with recursion, backtracking, and traversal-tree
  interpretation;
- complete summary, engineering Q&A, concept review, and programming
  exercises.

The six localized documents preserve all 41 source images, two representation
tables, two display-math blocks, eight callouts, formulas, and all four
official 13-language code groups at their source teaching positions. The
matrix/list operation sequences and the 11-step BFS and DFS sequences are
rendered as readable consecutive figures.

## Korean Chapter 4 scope

- contiguous array storage, indexing, access, insertion, deletion, traversal,
  search, expansion, advantages, limitations, and applications;
- singly, circular, and doubly linked-list structure and operations;
- dynamic-array size, capacity, expansion, amortized append cost, traversal,
  concatenation, sorting, and a learning implementation;
- disk, RAM, and cache hierarchy, memory fragmentation, cache lines,
  prefetching, spatial locality, and temporal locality;
- complete chapter summary, engineering Q&A, concept review, and programming
  exercises.

The seven localized documents preserve all 11 source images, two tables,
15 callouts, 44 inline formula spans, and all 21 official 13-language code
groups at their source teaching positions. No official code group is relegated
to a generated appendix.

## Governance

- Translate only from the locked English source revision.
- Keep every localized document at `draft` until independent technical and
  language reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official multilingual code from the locked source implementations
  so Vietnamese, Korean, and English tabs remain synchronized.

## Implemented fixes

- Replaced all 13 condensed drafts with source-aligned Vietnamese and Korean
  learning pages.
- Preserved all 25 official code groups inline and exposed every language
  through the shared accessible tab interface.
- Converted unsupported media-tab syntax to sequential Vietnamese step
  figures without dropping any diagram.
- Restored Korean formulas, comparison tables, Python Tutor callouts, detailed
  operation reasoning, chapter Q&A, and exercise answers.
- Added release-level parity gates and representative built-page assertions
  for graph steps, code tabs, tables, diagrams, mathematics, callouts, and
  exercise links.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

The generated parity reports must show:

- 6 of 6 Vietnamese Chapter 9 documents structurally ready;
- 7 of 7 Korean Chapter 4 documents structurally ready;
- 25 of 25 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Browser QA must confirm the full BFS/DFS sequences, responsive representation
tables, synchronized language selection across repeated code groups, readable
Korean prose and mathematics, working Python Tutor links, and no broken local
assets at desktop and mobile widths.

## Next release boundary

Release `v1.7` completes:

1. Vietnamese Chapter 10, “Searching”;
2. Korean Chapter 5, “Stack and Queue.”

The remaining sequence is retained from the v1.5 full-book roadmap: v1.8
through v1.18 complete every remaining Vietnamese and Korean chapter, front
matter, and appendix, followed by the v1.19 full-book technical, language,
accessibility, and publication audit.
