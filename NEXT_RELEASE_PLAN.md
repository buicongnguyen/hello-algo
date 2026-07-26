# Hello Algo Atlas next-release plan

Status: implemented and validated locally on 2026-07-26

Target release: `v1.1` — complete trilingual routes, code parity, and reader navigation

Baseline commit: `71b9e110cef417830c078377164118878e179e8d`

Source revision: `a3166c201853739213d5a3a31b1e4a237aaf1076`

## 1. Release objective

This release turns the current broad draft coverage into a more trustworthy
trilingual reader. It prioritizes source parity, technical correctness, and
navigation over adding fork-specific teaching prose.

The release is successful when:

1. every official English programming-language tab group appears in the
   corresponding Vietnamese and Korean page at the same teaching position;
2. localized translation status cannot be promoted without measurable
   structural parity;
3. the missing book home, Before Starting, exercise, and reference documents
   have localized routes;
4. a generated report identifies every remaining localized prose or media gap
   without incorrectly promoting condensed drafts;
5. headings can be linked directly and readers can search or navigate within
   the current article;
6. search engines can discover the EN, VI, and KO counterparts without treating
   them as unrelated duplicates;
7. pull requests run the same validation that protects the production build.

## 2. Audited baseline before this release

| Area | English | Vietnamese | Korean |
| --- | ---: | ---: | ---: |
| Reader documents | 119 / 119 | 104 / 119 | 104 / 119 |
| Published status | official source view | 13 pilot, 91 draft | 104 draft |
| Approximate target/source character ratio | source | 43% | 24% |
| Pages below 25% of source length | 0 | 58 | 78 |
| Official `src` groups restored | 133 | 133 | 133 |
| Explicit official language groups restored | 32 | 0 | 0 |

The character ratio is a triage signal, not a translation-quality score. The
release gates below use structural parity and human review instead.

## 2.1. Implemented outcome

| Area | Result |
| --- | --- |
| Document identities | 119 EN, 119 VI, and 119 KO |
| Official programming-language groups | all 165 groups preserved in every reader |
| Language choices | 13 synchronized tabs where official implementations exist |
| Translation state | 119 VI drafts and 119 KO drafts; no automatic promotion |
| Governance | schema v2 manifests plus deterministic per-document parity reports |
| Navigation | unique heading IDs, permalinks, article outline, title/heading search |
| Discovery | exact counterpart links, `hreflang`, `x-default`, sitemap, robots, multilingual 404 |
| Repository quality | shared renderer/assets, PR CI, Pages build checks, multilingual templates |

Full sentence-level translation parity is deliberately not asserted by this
release. The reports currently identify the remaining condensed documents for
the next content-focused release; automated code restoration and route presence
are not treated as human translation review.

## 3. Scope

### 3.1 Multilingual code parity

- Parse both official `src` directives and explicit `=== "Language"` groups.
- Replace the corresponding localized one-language example inline.
- Do not append a duplicate source-code appendix to the end of the article.
- Preserve all 13 official languages:
  Python, C++, Java, C#, Go, Swift, JavaScript, TypeScript, Dart, Rust, C,
  Kotlin, and Ruby.
- Synchronize the selected language across every group.
- Test group count, tab count, panel count, selected state, and teaching order.

### 3.2 Translation correctness and coverage

- Correct audited binary-tree terminology and complexity statements.
- Add localized documents for:
  - book home;
  - Before Starting;
  - Chapter 2–13 exercises;
  - References.
- Keep every new document as `draft` until its review gates pass.
- Rank Vietnamese Chapters 5–8 and Korean Preface/Chapters 1–4 in the generated
  parity report for the next content-focused release.
- Translate from the locked English source, never from another translation.

### 3.3 Reader navigation and discoverability

- Generate stable, unique IDs for article headings.
- Add visible heading permalinks.
- Add a current-article outline.
- Add client-side title and heading search across all reader documents.
- Add EN/VI/KO `hreflang` links when a counterpart exists.
- Add `x-default` pointing to the Vietnamese default route.
- Generate `sitemap.xml`.
- Add a multilingual `404.html` with links to each reader and Atlas.

### 3.4 Translation governance

- Extend manifest schema with structural parity and review metadata.
- Record at minimum:
  source revision, source/target identity, status, wave, parity state,
  technical-review state, language-review state, and last-updated date.
- Treat `pilot` as requiring structural parity plus completed self-review.
- Treat `published` as requiring independent technical and language review.
- Expand the Korean glossary and style guide to the same governance depth as
  the Vietnamese edition.
- Add Korean-capable issue and pull-request templates.

### 3.5 Repository maintainability

- Move the shared Markdown renderer and reader-shell helpers out of the
  Vietnamese builder.
- Derive page identity from the English catalog and translation manifests
  instead of maintaining three independent route inventories.
- Add pull-request CI for `npm run check` and `npm run build`.
- Keep GitHub Pages deployment on successful pushes to `main`.
- Remove stale copied sponsorship material.
- Correct the supported-language count to 13.

## 4. Implementation phases

### Phase A — parity engine

1. Add a source-example parser that returns official example groups in source
   order.
2. Match localized placeholder examples to those groups.
3. Replace placeholders inline.
4. Fail the build when a source group cannot be placed unambiguously.
5. Add regression fixtures for pages with:
   - only explicit tabs;
   - only `src` directives;
   - both formats;
   - repeated class or function names.

Exit gate:

- all 165 official programming-language groups are present in EN, VI, and KO;
- no localized duplicate appendix is generated;
- representative pages show exactly one visible panel per group.

### Phase B — route completion and audited corrections

1. Add the 15 missing routes to both manifests and reader navigation.
2. Create localized drafts with full source structure.
3. Correct the audited binary-tree statements.
4. Add a structural-parity report grouped by chapter.

Exit gate:

- EN, VI, and KO each expose 119 document identities;
- no missing language-switch destination;
- all new documents remain accurately labelled `draft`.

### Phase C — priority content triage and correctness

Vietnamese next-content order:

1. Chapter 5 — stacks and queues;
2. Chapter 6 — hashing;
3. Chapter 7 — trees;
4. Chapter 8 — heaps.

Korean next-content order:

1. Preface and Chapter 1;
2. Chapter 2;
3. Chapter 3;
4. Chapter 4.

This release establishes the measurable gate each future translation must preserve:

- heading hierarchy;
- diagrams and localized alternative text;
- tables and formulas;
- questions, notes, tips, and warnings;
- code examples at the matching explanatory position;
- distinctions such as level versus depth and average versus worst case.

Exit gate for `v1.1`:

- every document receives source and target metrics in a generated report;
- every official programming-language group is preserved in the effective
  reader Markdown and built HTML;
- audited binary-tree terminology and balance conditions are corrected;
- every localized document remains `draft` until its individual structural and
  human-review metadata is complete.

Sentence-level expansion of the priority waves is the first scope of `v1.2`,
not a reason to delay the safer route, code, governance, and navigation fixes.

### Phase D — navigation and SEO

1. Generate collision-resistant heading slugs.
2. Add per-page outline and permalink UI.
3. Generate a compact search index at build time.
4. Add keyboard-accessible search UI.
5. Add counterpart and `x-default` alternate metadata.
6. Generate sitemap and multilingual 404 page.

Exit gate:

- every heading has a unique ID;
- search finds titles and headings in all three languages;
- keyboard and mobile interaction pass;
- all sitemap routes resolve.

### Phase E — architecture, CI, and repository cleanup

1. Extract the shared renderer and move reader assets out of a locale directory.
2. Replace duplicated page arrays with catalog/manifest-derived models.
3. Add pull-request CI.
4. Add multilingual contribution templates.
5. Remove stale sponsorship content and correct documentation counts.

Exit gate:

- no language builder owns shared renderer or reader-asset logic;
- one manifest entry controls one localized route;
- clean checkout passes both validation commands.

## 5. Quality gates

Every release candidate must pass:

```text
npm run check
npm run build
git diff --check
```

Automated checks must cover:

- unique routes, targets, heading IDs, tab IDs, and canonical URLs;
- exact source-to-output tab and panel counts;
- structural parity for documents eligible for `pilot`;
- local links and media;
- KaTeX source and fallback rendering;
- language switch and `hreflang` identity;
- sitemap and 404 destinations;
- runnable JavaScript examples.

Manual checks must cover:

- English, Vietnamese, and Korean desktop pages;
- 390-pixel mobile layout;
- light and dark themes;
- keyboard tab and search interaction;
- one code-heavy, one math-heavy, and one diagram-heavy article per language;
- technical-language review before any status promotion.

## 6. Risks and controls

| Risk | Control |
| --- | --- |
| A localized code block cannot be matched safely | Fail the build and require an explicit marker |
| A condensed draft is mistaken for a complete translation | Surface structural parity and keep `draft` |
| Mechanical expansion changes technical meaning | Translate from locked English and require technical review |
| Search index increases page weight | Generate one compact JSON index and load it on demand |
| Heading slugs change later | Use deterministic source-based slug generation and test uniqueness |
| Upstream changes during the release | Keep the source lock; audit newer commits separately |
| Custom renderer grows more fragile | Extract it, add fixtures, and keep unsupported syntax fail-closed |

## 7. Definition of done

The implementation is ready when all `v1.1` gates pass, `git diff --check`
reports no whitespace errors, and production verification confirms the exact
committed artifact. Translation documents remain drafts and must not be
promoted merely because routes or automated checks exist. Sentence-level parity
and independent review continue document by document in `v1.2`.
