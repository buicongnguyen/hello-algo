# Korean edition plan for Hello Algo

Status: Korean Atlas and 92 Chapter 0–14 reader drafts implemented on 2026-07-18; content-parity work and review remain in progress

Target release: Korean draft `v0.3`, followed by pilot promotion after review gates pass

Target scope: Korean Atlas plus 92 reader documents covering Chapters 0–14

Source revision: `4935d2d3877a6205008d89def8d2ba43f7e06275`

## 1. Objective

Korean draft `v0.7` extends the original Korean pilot `v0.1` architecture to a 92-document Vietnamese and Korean reader baseline for Chapters 0–14:

- a complete Korean interactive Atlas at `/hello-algo/ko/`;
- a 92-document Korean reader covering Chapters 0–14 at `/hello-algo/ko/learn/`;
- a visible `KO / VI / EN` language switch;
- the same diagrams, animations, code, mathematics, navigation, licensing, and source tracking;
- exact links from Korean reader pages to their Vietnamese and official English counterparts;
- transparent `pilot` labelling until an independent Korean technical-language review is complete.

Vietnamese should remain the default homepage for this release. Changing the default language is a separate product decision and is outside this plan.

Korean `v0.1` established 14 routes for Chapters 0–2, `v0.2` added 12 Chapter 3–4 routes, `v0.3` added 10 Chapter 5–6 routes, `v0.4` added 12 Chapter 7–8 routes, `v0.5` added 12 Chapter 9–10 routes, and `v0.6` added 18 Chapter 11–12 routes. Korean `v0.7` adds 14 Chapter 13–14 routes for backtracking and dynamic programming, bringing both localized readers to 92 pages and the local English source reader to 56 pages. Every translated document remains individually status-tracked so drafts are not mistaken for reviewed translations.

## 2. Release definition

| Surface | Korean target |
| --- | --- |
| Interactive Atlas | Same sections and interactions as English and Vietnamese |
| Reading content | 92 Korean documents covering Chapters 0–14 |
| Language switch | `KO / VI / EN` on Atlas and reader pages |
| Code | Representative Python examples, matching the Vietnamese policy |
| Images | Reuse upstream images; translate alt text and captions |
| Source tracking | Lock every document to upstream commit `4935d2d` |
| License | CC BY-NC-SA 4.0 attribution in Korean |
| Default route | Keep `/hello-algo/` redirecting to Vietnamese |
| Release status | `pilot`, pending independent Korean review |

## 3. Architecture decision

### 3.1. Current constraint

The current implementation is partly locale-aware but still contains Vietnamese-specific paths, messages, and conditions in files such as [`app.js`](app.js), [`scripts/build-site.mjs`](scripts/build-site.mjs), and [`scripts/build-vi-book.mjs`](scripts/build-vi-book.mjs).

Adding a separate Korean copy of each builder would create duplicated implementations that could drift apart. The first technical milestone must therefore generalize the existing localization layer while preserving current English and Vietnamese output.

### 3.2. Target structure

```text
helloalgo/
├── en/
├── vi/
│   ├── docs/
│   ├── atlas-locale.mjs
│   ├── reader-config.mjs
│   ├── glossary.md
│   ├── style-guide.md
│   └── translation-status.json
├── ko/
│   ├── docs/
│   ├── atlas-locale.mjs
│   ├── reader-config.mjs
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── glossary.md
│   ├── style-guide.md
│   └── translation-status.json
├── reader/
│   ├── book.css
│   └── book.js
├── scripts/
│   ├── locale-registry.mjs
│   ├── localize-atlas.mjs
│   ├── build-reader.mjs
│   ├── build-site.mjs
│   ├── check-site.mjs
│   └── check-dist.mjs
└── KOREAN_TRANSLATION_PLAN.md
```

The exact names may change during implementation, but the following separation should remain:

- shared rendering and validation logic belongs under `scripts/` and `reader/`;
- localized interface data belongs inside each locale directory;
- translated Markdown belongs in `<locale>/docs/`;
- translation governance and status are tracked independently for each locale.

### 3.3. Shared page identity

Each reader document should have one stable page identity independent of its localized route. A shared manifest or equivalent structure should connect:

- the English source path;
- the Vietnamese target and route;
- the Korean target and route;
- the official English URL;
- chapter order, title, and navigation relationships.

This prevents incorrect language-switch links when slugs differ between languages.

## 4. Public route design

```text
/hello-algo/                 → Vietnamese default
/hello-algo/en/              → English Atlas
/hello-algo/vi/              → Vietnamese Atlas
/hello-algo/vi/learn/        → Vietnamese reader
/hello-algo/ko/              → Korean Atlas
/hello-algo/ko/learn/        → Korean reader
```

Use stable ASCII slugs for Korean reader pages. They are easier to type, share, test, and maintain than percent-encoded Hangul routes.

| English source | Korean target | Korean route |
| --- | --- | --- |
| `chapter_preface/index.md` | `ko/docs/chapter_preface/index.md` | `/ko/learn/preface.html` |
| `chapter_preface/about_the_book.md` | `ko/docs/chapter_preface/about_the_book.md` | `/ko/learn/about-the-book.html` |
| `chapter_preface/suggestions.md` | `ko/docs/chapter_preface/suggestions.md` | `/ko/learn/how-to-use-the-book.html` |
| `chapter_preface/summary.md` | `ko/docs/chapter_preface/summary.md` | `/ko/learn/chapter-0-summary.html` |
| `chapter_introduction/index.md` | `ko/docs/chapter_introduction/index.md` | `/ko/learn/` |
| `chapter_introduction/algorithms_are_everywhere.md` | `ko/docs/chapter_introduction/algorithms_are_everywhere.md` | `/ko/learn/algorithms-are-everywhere.html` |
| `chapter_introduction/what_is_dsa.md` | `ko/docs/chapter_introduction/what_is_dsa.md` | `/ko/learn/what-is-dsa.html` |
| `chapter_introduction/summary.md` | `ko/docs/chapter_introduction/summary.md` | `/ko/learn/chapter-1-summary.html` |
| `chapter_computational_complexity/index.md` | `ko/docs/chapter_computational_complexity/index.md` | `/ko/learn/complexity-analysis.html` |
| `chapter_computational_complexity/performance_evaluation.md` | `ko/docs/chapter_computational_complexity/performance_evaluation.md` | `/ko/learn/performance-evaluation.html` |
| `chapter_computational_complexity/iteration_and_recursion.md` | `ko/docs/chapter_computational_complexity/iteration_and_recursion.md` | `/ko/learn/iteration-and-recursion.html` |
| `chapter_computational_complexity/time_complexity.md` | `ko/docs/chapter_computational_complexity/time_complexity.md` | `/ko/learn/time-complexity.html` |
| `chapter_computational_complexity/space_complexity.md` | `ko/docs/chapter_computational_complexity/space_complexity.md` | `/ko/learn/space-complexity.html` |
| `chapter_computational_complexity/summary.md` | `ko/docs/chapter_computational_complexity/summary.md` | `/ko/learn/chapter-2-summary.html` |

Every Korean reader page must provide:

- `KO`, linking to the current Korean page;
- `VI`, linking to the exact Vietnamese counterpart;
- `EN`, linking to the exact official English counterpart;
- `<html lang="ko">`;
- correct `lang` and `hreflang` attributes;
- a canonical GitHub Pages URL;
- previous and next navigation matching the shared document order.

## 5. Korean language standard

### 5.1. Audience and tone

Use standard South Korean spelling and terminology. Write for readers who know basic programming but may be new to formal algorithm analysis.

Recommended style:

1. Use the polite explanatory `-합니다 / -됩니다` style consistently.
2. Prefer short, direct sentences without removing logical qualifications.
3. Preserve conditions such as “usually,” “at most,” “only if,” “best case,” and “worst case.”
4. Keep formulas, variables, API names, class names, function names, and identifiers unchanged.
5. Translate explanatory code comments only when the executable behavior remains identical.
6. Introduce an English technical term in parentheses on first use when that helps lookup or avoids ambiguity.
7. Use the approved Korean glossary consistently throughout the Atlas and reader.
8. Give images Korean alt text and captions that explain what the reader should observe.
9. Do not imply that the Korean fork is officially sponsored by upstream.

### 5.2. Initial glossary

| English | Recommended Korean | Notes |
| --- | --- | --- |
| algorithm | 알고리즘 | Keep one term throughout the project |
| data structure | 자료구조 | DSA → 자료구조와 알고리즘 |
| input / output | 입력 / 출력 | Preserve code identifiers |
| correctness | 정확성 | Distinguish from efficiency |
| efficiency | 효율성 | Explain the evaluated resource |
| trade-off | 트레이드오프 | May be explained as 상충 관계 on first use |
| array | 배열 | index → 인덱스 |
| linked list | 연결 리스트 | node → 노드 |
| stack | 스택 | LIFO explanation should also be localized |
| queue | 큐 | FIFO explanation should also be localized |
| hash table | 해시 테이블 | hash function → 해시 함수 |
| collision | 해시 충돌 | Use consistently |
| tree | 트리 | root → 루트 노드; leaf → 리프 노드 |
| binary tree | 이진 트리 | child → 자식 노드 |
| heap | 힙 | Distinguish data structure and memory contexts |
| graph | 그래프 | vertex → 정점; edge → 간선 |
| adjacency list | 인접 리스트 | Keep with graph terminology |
| traversal | 순회 | Use as the standard technical term |
| iteration | 반복 | loop → 반복문 |
| recursion | 재귀 | base case → 기저 조건 |
| tail recursion | 꼬리 재귀 | Do not imply every language optimizes it |
| call stack | 호출 스택 | stack frame → 스택 프레임 |
| recursion tree | 재귀 트리 | recursion depth → 재귀 깊이 |
| binary search | 이진 탐색 | search space → 탐색 범위 |
| divide and conquer | 분할 정복 | Use consistently |
| backtracking | 백트래킹 | pruning → 가지치기 |
| dynamic programming | 동적 계획법 | DP may be used after first explanation |
| greedy algorithm | 그리디 알고리즘 | local optimum → 지역 최적해 |
| complexity analysis | 복잡도 분석 | asymptotic analysis → 점근적 복잡도 분석 |
| time complexity | 시간 복잡도 | Preserve Big-O notation |
| space complexity | 공간 복잡도 | Separate input and auxiliary space when needed |
| asymptotic upper bound | 점근적 상한 | Big-O notation → 빅오 표기법 |
| constant | 상수 | constant time → 상수 시간 |
| logarithmic | 로그 | logarithmic time → 로그 시간 |
| linear | 선형 | linear time → 선형 시간 |
| quadratic | 이차 | quadratic time → 이차 시간 |
| exponential | 지수 | exponential time → 지수 시간 |
| factorial | 팩토리얼 | factorial time → 팩토리얼 시간 |
| worst case | 최악의 경우 | Keep distinct from average case |
| average case | 평균적인 경우 | Check probability context carefully |

The glossary is an initial proposal. A Korean technical reviewer should approve it before most chapter translation begins.

## 6. Translation source policy

The English source remains authoritative:

```text
Source language: English
Source commit: 4935d2d3877a6205008d89def8d2ba43f7e06275
Secondary reference: Vietnamese pilot
Target language: Korean
```

Vietnamese may be used to understand editorial decisions, but every Korean translation must be checked directly against English. This prevents an error from propagating through English → Vietnamese → Korean.

Each Korean status record must include:

- English source file;
- Korean target file;
- Korean public route;
- upstream source commit;
- translation wave;
- status: `planned`, `draft`, `pilot`, or `published`.

Recommended Korean status meanings:

| Status | Meaning |
| --- | --- |
| `planned` | Included in the roadmap; no draft yet |
| `draft` | Korean draft exists; review is incomplete |
| `pilot` | Technical and self-review complete; independent review pending |
| `published` | Technical and Korean-language reviews complete; stable release |

## 7. Implementation phases

### Phase 1 — Generalize localization

Create a language registry for English, Vietnamese, and Korean.

Refactor:

- Atlas localization into one reusable function;
- reader generation into one reusable builder;
- navigation, attribution, progress, metadata, and switches into locale configuration;
- `app.js` to consume a generic locale payload instead of `isVietnamese` branches;
- reader CSS and JavaScript into shared assets;
- build checks to iterate through all configured locales.

Acceptance criteria:

- English and Vietnamese output remains unchanged;
- all existing Vietnamese routes remain valid;
- all 36 Vietnamese reader pages still build;
- all English and Vietnamese interactions still work;
- the build can register a third locale without duplicating a builder.

### Phase 2 — Create Korean governance and configuration

Add:

```text
ko/README.md
ko/CONTRIBUTING.md
ko/glossary.md
ko/style-guide.md
ko/translation-status.json
ko/atlas-locale.mjs
ko/reader-config.mjs
```

The Korean status file began with the same 14 English source documents as the original Vietnamese baseline. Version `v0.2` extends that registry with the 12 Chapter 3–4 documents; every added document starts as `draft` and moves through the defined review gates.

### Phase 3 — Localize the Korean Atlas

Translate:

- hero copy and primary navigation;
- learning roadmap and topic descriptions;
- data-structure comparison controls and explanations;
- BFS and DFS simulator labels, state, and messages;
- complexity comparison labels and live messages;
- binary-search simulator controls and explanations;
- sorting comparison labels and descriptions;
- dynamic-programming explanations;
- accessibility labels and live regions;
- footer, project links, and licensing text.

The Korean Atlas must preserve:

- all English section IDs;
- the same 13 topic keys;
- the same 6 structure keys;
- the same 5 interactive choice keys;
- keyboard behavior;
- animation behavior;
- reduced-motion handling;
- section-for-section parity with English and Vietnamese.

### Phase 4 — Translate Chapter 0

Translate:

```text
ko/docs/chapter_preface/index.md
ko/docs/chapter_preface/about_the_book.md
ko/docs/chapter_preface/suggestions.md
ko/docs/chapter_preface/summary.md
```

Review focus:

- book purpose and target audience;
- learning recommendations;
- contributor attribution;
- natural Korean educational tone;
- translated alt text and captions.

### Phase 5 — Translate Chapter 1

Translate:

```text
ko/docs/chapter_introduction/index.md
ko/docs/chapter_introduction/algorithms_are_everywhere.md
ko/docs/chapter_introduction/what_is_dsa.md
ko/docs/chapter_introduction/summary.md
```

Review focus:

- core algorithm definitions;
- distinction between data structures and algorithms;
- beginner-friendly examples;
- terminology consistency;
- parity with the English source structure.

### Phase 6 — Translate Chapter 2

Translate:

```text
ko/docs/chapter_computational_complexity/index.md
ko/docs/chapter_computational_complexity/performance_evaluation.md
ko/docs/chapter_computational_complexity/iteration_and_recursion.md
ko/docs/chapter_computational_complexity/time_complexity.md
ko/docs/chapter_computational_complexity/space_complexity.md
ko/docs/chapter_computational_complexity/summary.md
```

Review focus:

- Big-O definitions and terminology;
- recursion, call-stack, and recursion-tree explanations;
- mathematical expressions;
- best, worst, and average cases;
- time–space trade-offs;
- executable Python examples;
- image and text correspondence.

### Phase 7 — Integrate three-language navigation

Atlas switch:

```text
KO | VI | EN
```

Reader switch:

```text
KO → current Korean page
VI → exact Vietnamese counterpart
EN → exact official English counterpart
```

Update the repository README language selector to include:

```text
한국어 | Tiếng Việt | English
```

Do not make Korean the repository’s default README or website landing language unless that change is requested separately.

### Phase 8 — QA and pilot release

Run the complete automated and manual review matrix, publish the pilot through the existing GitHub Pages workflow, and verify public production routes.

Korean documents remain `draft` until structural parity and self-review gates pass, then remain `pilot` until an independent Korean reviewer approves both technical meaning and language quality.

## 8. Automated validation

### 8.1. Source checks

`npm run check` should verify:

- all Korean foundation files exist;
- Korean and Vietnamese use the same locked English source commit;
- exactly 36 Korean documents are registered;
- every source and target file exists;
- document routes are unique;
- each Markdown document has exactly one H1;
- code and display-math fences are balanced;
- no unresolved TODO or uncertain translation marker remains;
- Korean Atlas sections match English sections;
- interactive keys match across all languages;
- all required Korean interface strings exist;
- unexpected English interface prose is absent;
- every document includes the required source and license disclosure.

### 8.2. Built-site checks

`npm run build` should verify:

- total generated HTML reaches 76 pages;
- all 36 Korean reader routes exist;
- Korean pages use `<html lang="ko">`;
- Korean navigation contains seven chapter groups;
- Korean reader progress displays `36 / 105`;
- `KO / VI / EN` options are present and point to correct counterparts;
- all local images, scripts, styles, and fragments resolve;
- no raw Markdown code fence remains;
- no unreadable raw LaTeX command remains;
- code and display mathematics render correctly;
- Python examples compile;
- English and Vietnamese output passes regression checks.

### 8.3. Translation completeness checks

The Korean Atlas should use an explicit allowlist for intentional English text such as:

- `Hello Algo`;
- `Atlas`;
- algorithm notation such as `O(n log n)`;
- identifiers shown inside examples;
- product or library names that should not be translated.

All other user-facing English strings should fail the source check until translated or intentionally approved.

## 9. Korean presentation and accessibility

Korean text needs additional line-breaking support:

```css
:lang(ko) {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

Recommended system font fallback:

```css
font-family:
  "Pretendard",
  "Noto Sans KR",
  "Apple SD Gothic Neo",
  "Malgun Gothic",
  sans-serif;
```

Do not add a remote font dependency unless it has a clear performance and licensing justification. System fallbacks should remain usable.

Manual presentation review should cover:

- 360px mobile layout;
- tablet and desktop layouts;
- long Korean headings;
- Korean buttons and live messages;
- sidebar wrapping and scroll behavior;
- code blocks and formulas;
- keyboard navigation;
- screen-reader labels;
- light and dark themes;
- reduced-motion behavior;
- animated images and video descriptions.

## 10. Translation and review workflow

Every Korean document passes six gates.

### Gate 1 — Lock the source

- Confirm the English source path.
- Confirm upstream commit `4935d2d3877a6205008d89def8d2ba43f7e06275`.
- Record the route and translation wave.

### Gate 2 — Create the Korean draft

- Preserve headings, formulas, code fences, links, images, and logical structure.
- Translate explanatory prose, alt text, captions, and relevant code comments.
- Record unresolved terminology questions in the pull request rather than inventing multiple variants.

### Gate 3 — Technical review

- Check definitions and conditions.
- Compare formulas and complexity claims with English.
- Execute or compile representative code.
- Confirm that explanations match diagrams.

### Gate 4 — Korean-language editing

- Check grammar, spacing, punctuation, and tone.
- Enforce the glossary.
- Remove unnatural literal translations.
- Confirm that the text remains accessible to beginners.

### Gate 5 — Build and presentation review

- Run source and build checks.
- Check routes, images, language links, code, and math.
- Review responsive presentation and accessibility.

### Gate 6 — Release approval

- Use `pilot` after technical and self-review.
- Use `published` only after independent technical and Korean-language review.
- Record the reviewers and source revision in release notes or pull-request history.

AI may help create and improve drafts, but it does not count as the independent Korean reviewer.

## 11. Branch and pull-request strategy

Recommended branches:

```text
i18n/locale-foundation
translation/ko-atlas
translation/ko-chapter-0
translation/ko-chapter-1
translation/ko-chapter-2
release/ko-pilot-v0.1
```

Recommended pull-request sequence:

1. Locale-independent infrastructure with no visible content change.
2. Korean governance files, glossary, status manifest, and Atlas.
3. Chapter 0 translation.
4. Chapter 1 translation.
5. Chapter 2 translation.
6. Integrated Korean pilot QA and release.

Keep each translation pull request small enough for careful comparison with its English source.

Suggested commit messages:

```text
Generalize Atlas and reader localization
Add Korean translation governance
Localize the interactive Atlas in Korean
Translate Korean Chapter 0 pilot
Translate Korean Chapter 1 pilot
Translate Korean Chapter 2 pilot
Release Korean pilot for Chapters 0–2
```

Every pull request should report:

```markdown
## Scope
- English source files:
- Source commit:
- Korean target files:
- Translation wave:

## Terminology changes
- New or changed terms:

## Validation
- [ ] Source checks passed
- [ ] Build passed
- [ ] Links and images checked
- [ ] Formula and code parity checked

## Reviewer attention
- Technical questions:
- Korean-language questions:
```

## 12. Attribution and license

Every Korean article must contain a Korean disclosure equivalent to:

> Hello Algo의 영어판을 바탕으로 번역하고, 예제를 선별하며 일부 내용을 편집했습니다. 파생 콘텐츠는 CC BY-NC-SA 4.0에 따라 제공됩니다. 이 프로젝트는 비영리 커뮤니티 프로젝트이며 원본 프로젝트의 공식 후원을 의미하지 않습니다.

The final wording should be approved by a Korean editor. Each page must retain:

- a link to the exact locked English source file;
- attribution to krahets and the contributing community;
- the CC BY-NC-SA 4.0 link;
- a statement that this is an unofficial, non-commercial community project;
- disclosure when examples or editorial structure have been selected or modified.

## 13. Suggested schedule

| Week | Deliverable |
| --- | --- |
| 1 | Locale-independent builder and English/Vietnamese regression checks |
| 2 | Korean glossary, style guide, contribution guide, status manifest, and Atlas draft |
| 3 | Korean Atlas technical and language review |
| 4 | Chapter 0 translation and review |
| 5 | Chapter 1 translation and review |
| 6 | Chapter 2 translation draft |
| 7 | Chapter 2 review, responsive checks, and full regression testing |
| 8 | Korean pilot release, deployment, and production verification |

Implementation and first drafts can be accelerated with automation, but independent Korean review remains the main scheduling constraint.

## 14. Risks and mitigations

### Locale implementations drift apart

Mitigation: generalize the builder before adding Korean and use a shared page identity manifest.

### Korean terminology becomes inconsistent

Mitigation: approve the glossary early and require every terminology change to identify affected pages.

### Literal Korean is technically correct but difficult to read

Mitigation: separate technical review from Korean-language editing and use a beginner-focused style guide.

### Vietnamese errors propagate into Korean

Mitigation: translate directly from the locked English source; use Vietnamese only as a secondary reference.

### Long Korean text breaks layouts

Mitigation: add Korean-specific line-breaking rules and test mobile, sidebar, controls, and live messages.

### Language switches point to the wrong document

Mitigation: connect all localized routes through stable page identities and test every counterpart link.

### Code changes during translation

Mitigation: preserve identifiers and behavior, compile all Python examples, and compare code with the English source.

### Images contain untranslated embedded text

Mitigation: translate alt text and captions, disclose remaining original-language image text, and replace images only when licensing and technical accuracy are clear.

### Readers assume the Korean edition is official

Mitigation: display an unofficial community-project disclosure on the Atlas, reader, repository documentation, and attribution footer.

### Upstream changes during the project

Mitigation: keep the pilot locked to `4935d2d`; collect upstream changes separately and merge them only after the pilot release.

## 15. Release checklist

### Content

- [ ] Korean Atlas copy is complete.
- [x] All 36 Korean Markdown documents exist.
- [ ] The Korean glossary is approved for the pilot.
- [ ] Korean alt text and captions are complete.
- [ ] Formulas match the locked English source.
- [ ] Representative Python examples match source behavior.
- [ ] No unresolved TODO or uncertain sentence remains.

### Review

- [ ] Every page passed technical review.
- [ ] Every page passed Korean-language editing.
- [ ] Terminology matches `ko/glossary.md`.
- [ ] Editorial selections or modifications are disclosed.
- [ ] Independent review status is recorded accurately.

### Technical validation

- [x] `npm run check` passes.
- [x] `npm run build` passes.
- [x] English and Vietnamese regression checks pass.
- [x] Exactly 36 Korean reader pages are generated.
- [x] All local references resolve.
- [x] All counterpart language links are correct.
- [x] Code, math, images, and animation references render.
- [ ] Korean pages use correct language metadata.
- [ ] Mobile and desktop presentation is acceptable.
- [ ] Keyboard and reduced-motion behavior works.

### Publication

- [ ] The root route still defaults to Vietnamese.
- [ ] `/en/`, `/vi/`, and `/ko/` load successfully.
- [ ] `/vi/learn/` and `/ko/learn/` load successfully.
- [ ] GitHub Pages deployment succeeds.
- [ ] All 36 production Korean routes return successfully.
- [ ] Production assets and language links pass smoke testing.
- [ ] Release notes identify the Korean edition as a pilot.

## 16. Definition of done

The Korean pilot is complete only when:

1. `/ko/` has section-for-section parity with `/en/` and `/vi/`.
2. `/ko/learn/` contains all 36 Chapter 0–6 documents.
3. Every Korean page has working Korean, Vietnamese, and English options.
4. Korean terminology matches the approved glossary.
5. Images, captions, formulas, and code are verified.
6. Attribution and CC BY-NC-SA 4.0 disclosure are visible.
7. English and Vietnamese pass regression testing.
8. The GitHub Pages deployment succeeds.
9. Production routes and assets pass smoke testing.
10. Documents remain `draft` until self-review gates pass and remain `pilot` until independent Korean review is complete.

## 17. Follow-up roadmap

After the original Korean `v0.1` architecture, expand the reader in controlled waves:

1. Korean `v0.2` (implemented as drafts): Chapters 3–4, covering data structures, arrays, linked lists, dynamic lists, RAM, and cache.
2. Korean `v0.3` (implemented as drafts): Chapters 5–6, covering stacks, queues, deques, hash tables, collisions, and hash algorithms.
3. Chapter 7 onward: tree, heap, and graph chapters.
4. Searching and sorting chapters.
5. Divide and conquer, backtracking, dynamic programming, and greedy algorithms.
6. Code annotations and language-specific examples.
7. Appendices, references, final consistency review, and stable Korean release.

Each wave should reuse the same source lock, status tracking, review gates, automated checks, and attribution rules established by the reader architecture.
