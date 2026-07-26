# Hello Algo Atlas v1.5 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.5` — Vietnamese Heap and Korean Data Structures

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `2fc0454bfa0169525647120978c05b226d9ecf67`

## Objective

Continue the source-locked full-book localization program with two complete
learning units:

1. Vietnamese Chapter 8, “Heap”;
2. Korean Chapter 3, “Data Structures.”

English remains the locked 119-document source edition. Whole chapters remain
the Vietnamese and Korean release boundary so definitions, diagrams, code,
summaries, and exercises can be reviewed as coherent teaching sequences.

## Vietnamese Chapter 8 scope

- chapter opening and heap learning objectives;
- min-heap and max-heap properties;
- priority queues and common heap operations;
- array representation and parent-child index mappings;
- bottom-up insertion heapify and top-down removal heapify;
- linear-time heap construction and its full complexity derivation;
- three Top-k approaches and streaming maintenance;
- complete summary, Q&A, concept review, and programming exercise.

The six localized documents preserve all 34 source images, the operation table,
four display-math blocks, eight callouts, formulas, and all seven official code
groups at their source teaching positions.

## Korean Chapter 3 scope

- logical classification into linear, tree, and network structures;
- physical classification into contiguous and dispersed storage;
- basic integer, floating-point, character, and Boolean types;
- sign-magnitude, 1's complement, 2's complement, and IEEE 754;
- ASCII, EASCII, GBK, Unicode, UTF-8, UTF-16, and UTF-32;
- programming-language string representations;
- complete summary, engineering Q&A, concept review, and programming exercise.

The seven localized documents preserve all nine source images, two tables,
thirteen display-math blocks, nine callouts, formulas, and the official
13-language basic-data-types code group at its teaching position.

## Governance

- Translate only from the locked English source.
- Keep every localized document at `draft`.
- Treat structural parity as an automated release gate, not as a replacement
  for independent technical and language review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Keep official code sourced from the locked multilingual implementations
  rather than maintaining duplicated localized copies.

## Implemented fixes

- Replaced all 13 condensed drafts with source-aligned Vietnamese and Korean
  documents.
- Placed all eight official code groups inline with no deferred appendix.
- Converted unsupported source media tabs into reader-native sequential
  figures while preserving every image.
- Preserved the complete heap-construction derivation and number-encoding
  mathematics as rendered display blocks.
- Added preloaded Python Tutor examples for heap and basic data types.
- Kept every document as a draft with zero automatic pilot promotions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

The generated parity reports must show:

- 6 of 6 Vietnamese Chapter 8 documents structurally ready;
- 7 of 7 Korean Chapter 3 documents structurally ready;
- 8 of 8 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Browser QA must confirm responsive tables, interactive 13-language code tabs,
rendered mathematics, complete media, and no broken assets on representative
Vietnamese and Korean pages.

## Remaining full-book backlog after v1.5

English is complete at 119 source documents. The localization program continues
through every remaining whole chapter:

1. v1.6 — Vietnamese Chapter 9 “Graph”; Korean Chapter 4 “Array and Linked List”;
2. v1.7 — Vietnamese Chapter 10 “Searching”; Korean Chapter 5 “Stack and Queue”;
3. v1.8 — Vietnamese Chapter 11 “Sorting”; Korean Chapter 6 “Hashing”;
4. v1.9 — Vietnamese Chapter 12 “Divide and Conquer”; Korean Chapter 7 “Tree”;
5. v1.10 — Vietnamese Chapter 13 “Backtracking”; Korean Chapter 8 “Heap”;
6. v1.11 — Vietnamese Chapter 14 “Dynamic Programming”; Korean Chapter 9 “Graph”;
7. v1.12 — Vietnamese Chapter 15 “Greedy”; Korean Chapter 10 “Searching”;
8. v1.13 — Vietnamese Chapter 3 “Data Structures”; Korean Chapter 11 “Sorting”;
9. v1.14 — Vietnamese Chapter 2 “Computational Complexity”; Korean Chapter 12 “Divide and Conquer”;
10. v1.15 — Vietnamese Chapter 4 “Array and Linked List”; Korean Chapter 13 “Backtracking”;
11. v1.16 — Vietnamese Chapter 1 and front matter; Korean Chapter 14 “Dynamic Programming”;
12. v1.17 — Vietnamese Chapter 0 and appendix; Korean Chapter 15 “Greedy”;
13. v1.18 — Korean Chapter 0, remaining root/front matter, and appendix;
14. v1.19 — full-book technical, language, accessibility, and publication audit.

The ordering completes the next sequential chapters first, then closes earlier
condensed drafts and front matter. A release may split a very large chapter
into reviewable sub-waves, but completion is measured only at the whole-chapter
boundary.
