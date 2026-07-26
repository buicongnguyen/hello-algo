# Hello Algo Atlas v1.14 content-parity plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.14` — Vietnamese Computational Complexity and Korean Divide and Conquer

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `c6e89ea286a2acd0c6437465829daf4005523695`

## Objective

Continue the source-locked full-book localization program by closing an early
condensed Vietnamese chapter and advancing the sequential Korean edition:

1. Vietnamese Chapter 2, “Computational Complexity”;
2. Korean Chapter 12, “Divide and Conquer.”

English remains the complete 119-document reference edition and is unchanged
in this release. Each localized chapter is delivered as a complete learning
unit with its opening, theory, worked traces, summary, and exercises.

## Vietnamese Chapter 2 scope

- actual benchmarking, environmental interference, input-scale coverage, and
  the role of asymptotic analysis;
- complete iteration and recursion models, including nested loops, call-stack
  frames, tail recursion, Fibonacci recursion trees, and explicit-stack
  conversion;
- exact operation counting, asymptotic upper bounds, simplification rules, and
  the distinction among worst, best, and average cases;
- constant, logarithmic, linear, linearithmic, quadratic, exponential, and
  factorial time growth, with the complete source derivations;
- input, temporary, output, stack-frame, and instruction space; peak-memory
  accounting; and constant through exponential space growth;
- time–space tradeoffs, full chapter review, technical Q&A, worked concept
  exercises, and the Fibonacci programming exercise.

The seven localized documents preserve all twenty source images, two authored
tables, six displayed derivations, 257 inline formula spans, twelve callouts,
and all thirty-three official 13-language code groups at their source teaching
positions.

## Korean Chapter 12 scope

- the divide and conquer criteria of decomposability, independent subproblems,
  and mergeable solutions;
- operation-count and parallel-computation explanations, including the full
  bubble-sort inequalities and practical task-granularity constraints;
- recursive binary search expressed as interval subproblems;
- complete preorder/inorder binary-tree reconstruction, interval derivation,
  hash-index optimization, and nine-step build trace;
- the full one-, two-, and three-disc Hanota traces, generalized recurrence,
  recursion tree, complexity analysis, and historical note;
- complete review, suitability classification, exponentiation-by-squaring
  trace, traversal splitting, and programming exercise.

The seven localized documents preserve all thirty-one source images, one
authored table, two displayed derivations, 89 inline formula spans, nine
callouts, and all three official 13-language code groups at their source
teaching positions.

## Governance

- Translate only from the locked English source revision.
- Keep localized documents at `draft` until independent technical and language
  reviews are recorded.
- Use structural parity as a release gate, not as a substitute for human
  review.
- Preserve CC BY-NC-SA 4.0 attribution and the community-fork disclosure.
- Resolve official code from the locked multilingual implementations instead
  of duplicating implementations in localized Markdown.

## Implemented fixes

- Replaced all fourteen condensed drafts with source-aligned Vietnamese and
  Korean teaching pages.
- Restored all 51 figures, three authored tables, eight displayed derivations,
  346 inline formula spans, and twenty-one callouts.
- Placed all thirty-six official code groups inline; six Vietnamese groups that
  were previously deferred are now restored to their teaching positions.
- Restored Big-O derivations, recursion and memory models, divide-and-conquer
  suitability rules, the full binary-tree interval proof, all Hanota traces,
  summaries, worked answers, and programming links.
- Added rendering-safe callout titles so mathematical notation is processed as
  accessible body content instead of leaking raw source syntax.
- Made structural math parity code-aware so formula-like tokens inside fenced
  implementations cannot conceal missing explanatory formulas, added a
  regression fixture for the rule, and restored every omission the stricter
  audit exposed across earlier Vietnamese and Korean release units.
- Added release-level parity gates and representative built-page assertions.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

Generated parity reports must show:

- 7 of 7 Vietnamese Chapter 2 documents structurally ready;
- 7 of 7 Korean Chapter 12 documents structurally ready;
- 36 of 36 official code groups placed inline;
- no deferred code groups and no automatic pilot promotion.

Rendered-page QA must confirm all complexity and divide-and-conquer
derivations, synchronized language tabs, responsive tables, visual traces,
callouts, exact cross-language links, and no broken assets, raw Markdown,
overflow, or console errors.

## Next release boundary

Release `v1.15` completes:

1. Vietnamese Chapter 4, “Array and Linked List”;
2. Korean Chapter 13, “Backtracking.”

The remaining sequence continues through the v1.18 localization waves and the
v1.19 full-book technical, language, accessibility, and publication audit.
