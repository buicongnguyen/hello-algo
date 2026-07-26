# Hello Algo Atlas v1.16 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.16` — Vietnamese Preface and Chapter 1, and Korean Dynamic Programming

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `be9d649b14d46662fb3e60184fd872365e0565f7`

## Objective

Continue the source-locked full-book localization program by completing the
Vietnamese front matter and introductory chapter, then advancing the
sequential Korean edition through Chapter 14:

1. Vietnamese Preface and Chapter 1, “Encounter with Algorithms”;
2. Korean Chapter 14, “Dynamic Programming.”

English remains the complete 119-document reference edition. This release
also restores localized multi-frame dynamic-programming illustrations as
interactive selectors so Vietnamese, Korean, and English share the same
reading model.

## Vietnamese Preface scope

- the book's audience, prerequisites, open-source purpose, and complete
  complexity/data-structure/algorithm content map;
- contributor, reviewer, translation, tooling, design, intellectual-property,
  and personal acknowledgements;
- writing conventions, synchronized 13-language comment examples, animation
  reading strategy, repository setup, local execution, Python Tutor,
  discussion, and the three-stage learning roadmap;
- complete summary of the book's purpose and recommended learning method.

The four documents preserve all nine source images, three callouts, and the
official 13-language writing-convention code group.

## Vietnamese Chapter 1 scope

- binary search through dictionary lookup, presented as a five-frame
  interactive trace;
- insertion sort through arranging playing cards and greedy reasoning through
  making change, including the limits of local greedy choices;
- exact definitions of algorithms and data structures, design tradeoffs, and
  their three-part relationship;
- the building-block analogy, comparison table, conventional DSA abbreviation,
  technical review, and engineering Q&A.

The four documents preserve all ten source images, one table, 23 inline
formula spans, three callouts, and the complete introductory narrative.

## Korean Chapter 14 scope

- exhaustive search, memoization, bottom-up dynamic programming, DP tables,
  state transitions, initial states, and rolling-variable optimization;
- overlapping subproblems, optimal substructure, no-aftereffect, state
  expansion, and limits caused by history-dependent constraints;
- the full solution pipeline from decisions and state definitions through
  transitions, boundaries, computation order, complexity, and space
  optimization;
- minimum path sum, 0-1 knapsack, unbounded knapsack, coin change, coin change
  II, and edit distance;
- complete conceptual review, worked debugging exercises, and programming
  exercises.

The nine documents preserve all 93 source images, 409 inline formula spans,
22 displayed derivations, nineteen callouts, and all twenty-four official
13-language code groups at their source teaching positions.

## Interactive trace and logic fixes

- Restored six localized dynamic-programming illustration groups:
  12 minimum-path steps, 14 0-1-knapsack table steps, six 0-1-knapsack
  compression steps, six unbounded-knapsack compression steps, 15 coin-change
  steps, and 15 edit-distance steps.
- Restored the Vietnamese five-frame dictionary lookup selector.
- Kept illustration selectors independent from synchronized programming
  language selection.
- Corrected the one-dimensional 0-1-knapsack space bound from the ambiguous
  square-table notation to $O(n \times cap)$ before optimization and
  $O(cap)$ afterward.
- Corrected the localized edit-distance summary to compare the final
  characters of the two prefixes at $s[i-1]$ and $t[j-1]$, eliminating an
  off-by-one description inherited from the reference summary.

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

- 4 of 4 Vietnamese Preface documents structurally ready;
- 4 of 4 Vietnamese Chapter 1 documents structurally ready;
- 9 of 9 Korean Chapter 14 documents structurally ready;
- 25 of 25 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm synchronized code-language tabs, independent
illustration-step selectors, all 112 release-unit images, formulas,
derivations, callouts, responsive tables, exact cross-language links, and no
broken assets, raw Markdown, overflow, or console errors.

## Next release boundary

Release `v1.17` completes:

1. Vietnamese Chapter 0 and the appendix;
2. Korean Chapter 15, “Greedy.”

Release `v1.18` closes Korean Chapter 0, the remaining root/front-matter
documents, and the Korean appendix. Release `v1.19` performs the full-book
technical, language, accessibility, and publication audit.
