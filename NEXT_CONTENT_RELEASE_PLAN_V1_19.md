# Hello Algo Atlas v1.19 full-book audit plan

Status: implemented and validated locally on 2026-07-27

Target release: `v1.19` — final trilingual full-book audit

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

Source-tree digest: `a78c2f1f0ea9016b0afc0e1e1adc697c6ec1f95bf005dd16cae482a95d5915f2`

Baseline release: `857a7bfe4242e164dd55f7d3875412c1f30504cc`

## Objective

Prove that the complete local English reader and both localized readers cover
the same source-locked book without a remaining chapter gap. The audit covers
the book home, Before Starting, Preface, Chapters 1–15, Appendix, and
References: 119 documents per language and 357 reader documents in total.

This release is a completion audit, not another partial chapter wave. It adds a
permanent gate that fails when a future edit changes the locked English source
or loses localized structure, media, mathematics, code examples, or language
integrity.

## Authoritative English edition

The complete local `en/` source tree is checked against one deterministic
digest calculated from:

- all 1,843 English source, code, media, and governance files;
- 16,240,433 normalized source bytes;
- all 119 catalogued Markdown documents and their stable navigation catalog;
- every illustration and every 13-language implementation used by the reader;
- the locked upstream commit recorded by both translation manifests.

The tree differs from the pinned upstream commit in exactly one documented
runtime correction:

- `en/codes/javascript/chapter_searching/binary_search_insertion.js` repairs two
  invalid quoted console messages so the official JavaScript example parses
  and runs. Its individual SHA-256 is locked in the audit report.

The locked English corpus contains:

- 119 documents;
- 552 article headings;
- 502 illustrations;
- 168 callouts;
- 29 tables;
- 47 displayed mathematical blocks;
- 1,939 inline mathematical spans;
- 165 official multilingual code groups.

Any source edit now requires an explicit source-lock update rather than silently
changing the reference edition.

## Vietnamese and Korean document audit

For every one of the 238 localized documents, the v1.19 gate verifies:

1. the exact ordered sequence of heading levels;
2. the exact ordered sequence of source illustration filenames;
3. the exact ordered sequence of callout types;
4. the row-and-column shape of every table;
5. the source count of displayed and inline mathematical expressions;
6. invariant long numeric literals used in mathematical expressions, with the
   documented Korean unit conversion from 585 billion to 5,850 `억`;
7. all 165 official code groups inline, with zero deferred groups;
8. no unfinished-content markers;
9. no long English source prose copied into a localized narrative;
10. no Korean text in Vietnamese documents and no Vietnamese-specific letters
    in Korean documents;
11. positive Vietnamese- and Korean-script evidence in every corresponding
    document.

Both generated parity ledgers must continue to report 119 of 119 structurally
ready documents with zero failures.

## Reader and accessibility audit

The shared reader receives the following final hardening:

- every code tab panel is keyboard focusable and remains linked to its tab with
  ARIA;
- the search overlay exposes the search landmark in English, Vietnamese, and
  Korean;
- the theme toggle keeps a stable localized accessible name and exposes its
  synchronized pressed state in all three languages;
- reduced-motion preferences suppress both CSS transitions and animations;
- the shared asset cache key is advanced so GitHub Pages clients receive these
  fixes immediately.

The built-site gate also checks every generated reader image for meaningful
alternative text and confirms the search landmark on every page.

## Generated audit artifact

`dist/full-book-audit.json` is generated deterministically during every build.
It records:

- the source commit and source-tree digest;
- the authoritative English structural totals;
- the 119/119 Vietnamese and Korean readiness totals;
- the 165/165 inline official-code totals for each localized edition;
- zero deferred code groups and zero audit failures.

The build independently regenerates and compares this artifact so a stale or
hand-edited report cannot pass.

## Governance

- Vietnamese remains the default GitHub Pages route.
- English remains the source-locked reference edition; the sole executable
  correction is disclosed and independently hashed.
- Vietnamese and Korean remain labelled `draft`; automated and self-review
  evidence must not be represented as independent human language review.
- CC BY-NC-SA 4.0 attribution, source authorship, editorial disclosure, and the
  community-fork disclaimer remain visible on every localized document.
- KO / VI / EN language controls must continue to open the exact counterpart.

## Validation

The release must pass:

```text
npm run check
npm run build
git diff --check
```

The full-book proof requires:

- the source digest to match the locked revision;
- 119 English, 119 Vietnamese, and 119 Korean reader documents;
- 119/119 structural readiness for both localized editions;
- exact structural-order checks on all 238 translations;
- 165 official code groups inline per localized edition;
- 2,437 rendered code-tab choices in the English reader and corresponding
  effective choices in both localized readers;
- 362 generated HTML pages and 361 unique sitemap URLs;
- no broken local links or fragments;
- no raw Markdown, duplicate IDs, missing alternative text, or console errors;
- responsive desktop and mobile rendering;
- working search, language, theme, keyboard-tab, and reduced-motion behavior.

## Completion boundary

After v1.19 passes local and production validation, no planned chapter or
language phase remains for the locked 119-document edition. Future work is
maintenance rather than unfinished translation scope:

1. collect independent Vietnamese and Korean technical and language reviews;
2. promote individual documents only when the governance review states permit;
3. create a new explicit source-lock release when upstream English changes;
4. add editorial enhancements without weakening source attribution or parity.
