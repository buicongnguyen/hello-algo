# Hello Algo Atlas v1.18 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.18` — Korean Book Home, Chapter 0, and Appendix

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `f15536e1a87b2c7a478cb9eb6820a55f7bf395d7`

## Objective

Close every remaining Korean structural-parity gap in the source-locked
119-document reader:

1. the Korean book home;
2. Korean “Before Starting,” treated as Chapter 0 in the Atlas roadmap;
3. the Korean installation, contribution, and glossary documents;
4. revalidation of the already-ready Appendix opening as part of one complete
   Appendix release unit.

English remains the complete reference edition and Vietnamese remains the
default route. Vietnamese and Korean documents continue to display `draft`
until independent technical and language reviews are recorded.

## Korean book home

The Korean book home now preserves:

- the concise purpose of the data-structures-and-algorithms tutorial;
- animated illustrations and ready-to-run code as the learning model;
- a working local link to the exact Korean Before Starting route.

## Korean Chapter 0 scope

The complete author message preserves:

- the LeetCode “Sword for Offer” origin and the recurring question of how to
  begin studying algorithms;
- the strengths and risks of problem-first and textbook-first learning;
- the Minesweeper analogy, job-search constraints, and the purpose of a guided
  learning path;
- the data-structures-and-algorithms landscape, mine-clearing methods, and
  gradual construction of a knowledge system;
- the Feynman attention quotation, acknowledgement of errors, and request for
  corrections;
- the cover and non-heading “Hello, Algorithms!” transition;
- computer-era and pre-computer examples of algorithms and data structures,
  followed by the book’s learning goal.

The document preserves its single source heading and cover image.

## Korean Appendix scope

The four Appendix documents preserve:

- the cover and practical role of the Appendix;
- VS Code installation and extension guidance;
- Python, C/C++, Java, C#, Go, Swift, JavaScript, TypeScript, Dart, and Rust
  environment setup;
- the GitHub edit, fork, clone, local test, commit, push, and pull-request
  workflow;
- the open-source update callout, edit-page image, and Docker deployment and
  removal commands;
- all 126 source glossary entries in a bilingual English–Korean table;
- the three mathematical glossary spans for big-O, top-k, and the n-queens
  problem.

## Release metrics

Across the book home, Chapter 0, and the four Appendix documents, this release
unit preserves:

- six source documents;
- twenty-one source headings;
- five source images;
- one source callout;
- three inline mathematical spans;
- both Docker command blocks;
- no official code group to defer.

The generated parity ledger must report both localized readers at 119 of 119
structurally ready documents with zero remaining structural gaps.

## Terminology and logic review

- Kept `자료구조` as one word, matching the Korean governance glossary.
- Kept the established distinctions `포화 이진 트리`, `완전 이진 트리`, and
  `정 이진 트리`.
- Aligned hashing terms with the completed Korean chapter: `적재율`,
  `분리 연결법`, `개방 주소법`, `선형 탐사`, and `지연 삭제`.
- Used a working reader-relative home link instead of carrying the English
  source-directory link into generated Korean HTML.
- Rendered the “Hello, Algorithms!” transition as emphasized prose so the
  Korean document matches the source heading count without exposing raw HTML.

## Governance

- Translate only from the locked English source revision.
- Keep localized documents at `draft` until independent technical and language
  reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Keep exact KO / VI / EN counterparts for every reader document.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 119 of 119 Vietnamese documents structurally ready;
- 119 of 119 Korean documents structurally ready;
- no deferred official code groups;
- no automatic pilot or published promotion.

Rendered-page QA must confirm the book-home link, Chapter 0 cover and
transition, both installation images, all language-environment sections, the
contribution callout and image, both Docker commands, the 126-row glossary,
formula rendering, exact cross-language links, and no broken assets, raw
Markdown, overflow, or console errors.

## Next release boundary

Release `v1.19` performs the final full-book audit across Vietnamese, Korean,
and English:

1. technical and mathematical consistency;
2. terminology and language consistency;
3. code-tab, illustration, link, metadata, and navigation parity;
4. accessibility, responsive layout, and reduced-motion behavior;
5. publication, licensing, source-lock, and generated-report integrity.
