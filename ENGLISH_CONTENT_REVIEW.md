# English content review

Reviewed: 2026-07-26

Official source: [`krahets/hello-algo` at `69932aed1891a7b7f6a0de88cd116d3fe13e7032`](https://github.com/krahets/hello-algo/tree/69932aed1891a7b7f6a0de88cd116d3fe13e7032/en)

## Outcome

The English Markdown already present in this fork was official Hello Algo content, but the local English reader exposed only 68 documents from Chapters 7–16. It also selected only some MkDocs code tabs, so readers could not see every programming-language example from the source.

The reader now builds all 119 official English documents. It preserves diagrams, tables, mathematics, callouts, exercises, and every programming-language code tab as a labelled example. This release does not add fork-specific English prose: source fidelity comes first, and later improvements should be clearly separated from upstream text.

## Chapter-by-chapter coverage

| Section | Official English | Local English | Vietnamese | Korean | Localized gap |
| --- | ---: | ---: | ---: | ---: | ---: |
| Source home | 1 | 1 | 1 | 1 | 0 |
| Before Starting | 1 | 1 | 1 | 1 | 0 |
| Chapter 0 · Preface | 4 | 4 | 4 | 4 | 0 |
| Chapter 1 · Hello Algo | 4 | 4 | 4 | 4 | 0 |
| Chapter 2 · Complexity Analysis | 7 | 7 | 7 | 7 | 0 |
| Chapter 3 · Data Structures | 7 | 7 | 7 | 7 | 0 |
| Chapter 4 · Arrays and Linked Lists | 7 | 7 | 7 | 7 | 0 |
| Chapter 5 · Stacks and Queues | 6 | 6 | 6 | 6 | 0 |
| Chapter 6 · Hash Tables | 6 | 6 | 6 | 6 | 0 |
| Chapter 7 · Trees | 8 | 8 | 8 | 8 | 0 |
| Chapter 8 · Heaps | 6 | 6 | 6 | 6 | 0 |
| Chapter 9 · Graphs | 6 | 6 | 6 | 6 | 0 |
| Chapter 10 · Searching | 8 | 8 | 8 | 8 | 0 |
| Chapter 11 · Sorting | 13 | 13 | 13 | 13 | 0 |
| Chapter 12 · Divide and Conquer | 7 | 7 | 7 | 7 | 0 |
| Chapter 13 · Backtracking | 7 | 7 | 7 | 7 | 0 |
| Chapter 14 · Dynamic Programming | 9 | 9 | 9 | 9 | 0 |
| Chapter 15 · Greedy | 7 | 7 | 7 | 7 | 0 |
| Chapter 16 · Appendix | 4 | 4 | 4 | 4 | 0 |
| References | 1 | 1 | 1 | 1 | 0 |
| **Total** | **119** | **119** | **119** | **119** | **0** |

All official document identities now have exact English, Vietnamese, and Korean routes. Route coverage does not imply translation completion: generated parity reports keep condensed localized documents in `draft`.

## Review findings and resolution

1. **Incomplete English navigation — fixed.** Navigation now follows the official MkDocs order from the source home through References.
2. **Missing official exercises — fixed for English.** The 12 upstream exercise Markdown files for Chapters 2–13 are now included in the locked local source.
3. **Programming-language examples were filtered — fixed.** C++, Java, Python, Go, JavaScript, TypeScript, C#, Swift, Dart, and Rust tabs are retained when present.
4. **Official callouts were flattened — fixed.** Notes, questions, warnings, tips, and collapsible answer blocks are rendered with the shared reader callout component.
5. **Internal official links could break locally — fixed.** Source-relative Markdown links are converted to their corresponding local English routes during the build.
6. **Translation switches could imply nonexistent parity — fixed.** Every switch uses a manifest identity and opens the exact counterpart.
7. **Localized explicit language groups were missing — fixed.** Both `src` directives and authored 13-language tab groups are restored in source order.

## Next content release

1. Use `vi/translation-parity.json` and `ko/translation-parity.json` from the production artifact to prioritize condensed drafts.
2. Expand localized prose from the locked English source while preserving the now-complete route and code-example structure.
3. Run independent technical and language review before promoting any localized document from `draft`.
4. Add original explanations, interactive diagrams, or worked examples only after source parity is stable. Mark additions as fork-specific editorial content and retain the upstream attribution and CC BY-NC-SA 4.0 notice.
