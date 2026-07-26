# Hello Algo Atlas v1.17 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.17` — Vietnamese Chapter 0 and Appendix, and Korean Greedy

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `7c89b3a8d8a3ac12757f6fad4d5b351be93bfc28`

## Objective

Continue the source-locked full-book localization program by closing the
remaining Vietnamese special material and advancing the sequential Korean
edition through Chapter 15:

1. Vietnamese “Before Starting,” treated as Chapter 0 in the Atlas roadmap;
2. the four-document Vietnamese Appendix;
3. Korean Chapter 15, “Greedy.”

English remains the complete 119-document reference edition. All localized
documents remain drafts until independent technical and language review is
recorded.

## Vietnamese Chapter 0 scope

The author’s complete opening message is preserved, including:

- the motivation for writing an approachable algorithms book;
- the problem-solving and textbook-learning tradeoffs;
- the Minesweeper analogy and the limits of a single book;
- the Feynman attention quotation, request for corrections, and book purpose;
- the cover and “Hello, Algorithms!” transition into everyday algorithm and
  data-structure examples.

The single document preserves its source heading structure and cover image.

## Vietnamese Appendix scope

The four Appendix documents preserve:

- VS Code installation and its extension workflow;
- installation guidance for Python, C/C++, Java, C#, Go, Swift, JavaScript,
  TypeScript, Dart, and Rust;
- the complete GitHub edit, fork, clone, commit, push, and pull-request
  workflow;
- the open-source update callout, page-edit image, and Docker deployment and
  removal commands;
- the complete bilingual catalog of every source glossary term, including the
  mathematical forms of big-O, top-k, and the n-queens problem.

Together with Chapter 0, this Vietnamese release unit preserves five images,
twenty source headings, one callout, three inline formula spans, and the
complete source content of five documents.

## Korean Chapter 15 scope

The seven Korean documents preserve:

- greedy decisions, irreversible choices, greedy-choice property, optimal
  substructure, proof obligations, counterexamples, approximation use, and
  representative applications;
- the coin-change strategy and denomination counterexamples;
- fractional knapsack, unit value, sorting, implementation, complexity, the
  exchange proof, and its geometric interpretation;
- maximum capacity through exhaustive-state comparison, the safe two-pointer
  rule, all nine trace frames, skipped states, and correctness proof;
- maximum-product cutting through both greedy inferences, four displayed
  derivations, implementation-dependent exponentiation cost, and a corrected
  exchange argument for the equality case;
- complete conceptual exercises, worked answers, and the programming task.

The chapter preserves all 25 source images, 155 inline formula spans, twelve
display-math fence lines, ten callouts, and all four official 13-language code
groups at their source teaching positions.

## Logic and terminology review

- Standardized the Korean term “분할 가능 배낭 문제” across the page title,
  navigation, summary, exercises, and Atlas terminology.
- Clarified that fractional-knapsack traversal is linear but the complete
  algorithm is normally dominated by sorting.
- Rewrote the maximum-product proof so the equality case establishes an
  equivalent canonical optimal decomposition instead of incorrectly claiming
  a strict contradiction.
- Preserved the maximum-capacity invariant: moving the taller side cannot
  increase area, while moving the shorter side safely removes only
  non-optimal states.
- Kept the Vietnamese glossary bilingual while retaining exactly the three
  mathematical spans present in the locked English source.

## Governance

- Translate only from the locked English source revision.
- Keep localized documents at `draft` until independent technical and language
  reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations instead
  of duplicating implementations in localized Markdown.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 1 of 1 Vietnamese Chapter 0 documents structurally ready;
- 4 of 4 Vietnamese Appendix documents structurally ready;
- 7 of 7 Korean Chapter 15 documents structurally ready;
- 4 of 4 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm synchronized programming-language tabs,
the independent nine-frame maximum-capacity selector, all thirty release-unit
images, formulas, derivations, callouts, the glossary table, exact
cross-language links, and no broken assets, raw Markdown, overflow, or console
errors.

## Next release boundary

Release `v1.18` closes the five remaining Korean parity gaps:

1. the Korean book home;
2. Korean Chapter 0, “Before Starting”;
3. the Korean installation, contribution, and glossary documents, while
   revalidating the already-ready Appendix opening as one release unit.

Release `v1.19` then performs the full-book technical, language,
accessibility, and publication audit across Vietnamese, Korean, and English.
