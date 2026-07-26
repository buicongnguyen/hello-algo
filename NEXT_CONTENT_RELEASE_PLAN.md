# Hello Algo Atlas v1.2 content-parity plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.2` — first complete localized content wave

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Baseline release: `b04970df1bed83080b83f757196a6ac4e14cb869`

## Objective

The previous release completed the trilingual route, code-example, navigation,
and governance foundation. This release starts the remaining sentence-level
content work with two complete learning units:

1. Vietnamese Chapter 5, “Stacks and Queues”;
2. the Korean Preface, including how to use the book.

The unit boundary is deliberate. A whole chapter or preface is easier to review
and teaches more coherently than isolated pages selected only to improve a
metric.

## Vietnamese Chapter 5 scope

- chapter introduction;
- stack definition, operations, implementations, comparison, and applications;
- queue definition, circular-array design, implementations, and applications;
- deque definition, implementations, and bounded-history application;
- chapter summary and Q&A;
- concept-review and programming exercises.

Every page must retain the locked English source’s:

- heading hierarchy;
- diagrams and illustration-step groups;
- operation tables and complexity expressions;
- official 13-language code groups at the relevant teaching position;
- Python Tutor callouts;
- questions, answers, hints, and exercise links.

## Korean Preface scope

- preface opening;
- audience, prerequisites, content structure, acknowledgements, and attribution;
- writing conventions;
- animated-illustration guidance;
- local code setup and practice workflow;
- discussion guidance and the three-stage learning roadmap;
- preface summary.

The Korean text must retain the official images, command example, code-language
group, links, contributor names, and conditional guidance without presenting
the community translation as an upstream-maintained official edition.

## Governance and status

- Translate only from the locked English source.
- Keep every edited document at `draft`.
- Generated structural parity may become true, but it does not replace
  independent technical and language review.
- Record the release scope in repository documentation and preserve the
  existing CC BY-NC-SA 4.0 attribution.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

The generated parity report must show:

- all six Vietnamese Chapter 5 documents structurally ready;
- all four Korean Preface documents structurally ready;
- all official code groups preserved;
- no automatic `pilot` promotion.

Representative browser checks:

- Vietnamese stack page: table, diagrams, code tabs, and article outline;
- Vietnamese queue page: circular-array explanation and diagrams;
- Korean suggestions page: images, shell command, language tabs, and search;
- 390-pixel navigation with no horizontal page overflow.

## Definition of done

The release is complete when both units pass automated structure checks and a
self-review against the locked source, while remaining clearly labelled as
drafts pending independent reviewers. The next release then continues with
Vietnamese Chapter 6 and Korean Chapter 1.

## Implemented outcome

- All six Vietnamese Chapter 5 documents pass structural parity.
- All four Korean Preface documents pass structural parity.
- The three official code groups on each Vietnamese stack, queue, and deque
  page, plus the Korean writing-conventions group, are placed inline with no
  deferred examples.
- Korean Preface GIFs and supporting images are copied into the production
  artifact and verified as valid local references.
- Browser QA confirms synchronized language-tab switching, rendered terminology
  markup, and a 390-pixel Vietnamese reader with no horizontal overflow.
- The complete site builds 362 HTML pages with no broken local references.
- All localized documents remain drafts with zero automatic pilot promotions;
  independent technical and language review is still required.

The next content release is Vietnamese Chapter 6, “Hashing,” together with
Korean Chapter 1, “Introduction.”
