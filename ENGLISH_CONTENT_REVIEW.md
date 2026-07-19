# English content review

Reviewed: 2026-07-19

Official source: [`krahets/hello-algo` at `a3166c201853739213d5a3a31b1e4a237aaf1076`](https://github.com/krahets/hello-algo/tree/a3166c201853739213d5a3a31b1e4a237aaf1076/en)

## Outcome

The English Markdown already present in this fork was official Hello Algo content, but the local English reader exposed only 68 documents from Chapters 7–16. It also selected only some MkDocs code tabs, so readers could not see every programming-language example from the source.

The reader now builds all 119 official English documents. It preserves diagrams, tables, mathematics, callouts, exercises, and every programming-language code tab as a labelled example. This release does not add fork-specific English prose: source fidelity comes first, and later improvements should be clearly separated from upstream text.

## Chapter-by-chapter coverage

| Section | Official English | Local English | Vietnamese | Korean | Localized gap |
| --- | ---: | ---: | ---: | ---: | ---: |
| Source home | 1 | 1 | 0 | 0 | 1 |
| Before Starting | 1 | 1 | 0 | 0 | 1 |
| Chapter 0 · Preface | 4 | 4 | 4 | 4 | 0 |
| Chapter 1 · Hello Algo | 4 | 4 | 4 | 4 | 0 |
| Chapter 2 · Complexity Analysis | 7 | 7 | 6 | 6 | 1 |
| Chapter 3 · Data Structures | 7 | 7 | 6 | 6 | 1 |
| Chapter 4 · Arrays and Linked Lists | 7 | 7 | 6 | 6 | 1 |
| Chapter 5 · Stacks and Queues | 6 | 6 | 5 | 5 | 1 |
| Chapter 6 · Hash Tables | 6 | 6 | 5 | 5 | 1 |
| Chapter 7 · Trees | 8 | 8 | 7 | 7 | 1 |
| Chapter 8 · Heaps | 6 | 6 | 5 | 5 | 1 |
| Chapter 9 · Graphs | 6 | 6 | 5 | 5 | 1 |
| Chapter 10 · Searching | 8 | 8 | 7 | 7 | 1 |
| Chapter 11 · Sorting | 13 | 13 | 12 | 12 | 1 |
| Chapter 12 · Divide and Conquer | 7 | 7 | 6 | 6 | 1 |
| Chapter 13 · Backtracking | 7 | 7 | 6 | 6 | 1 |
| Chapter 14 · Dynamic Programming | 9 | 9 | 9 | 9 | 0 |
| Chapter 15 · Greedy | 7 | 7 | 7 | 7 | 0 |
| Chapter 16 · Appendix | 4 | 4 | 4 | 4 | 0 |
| References | 1 | 1 | 0 | 0 | 1 |
| **Total** | **119** | **119** | **104** | **104** | **15** |

The 12 chapter gaps are the official exercise pages for Chapters 2–13. The other three gaps are the source home, Before Starting, and References. English pages show a disabled `KO` or `VI` state for these documents instead of linking readers to unrelated content.

## Review findings and resolution

1. **Incomplete English navigation — fixed.** Navigation now follows the official MkDocs order from the source home through References.
2. **Missing official exercises — fixed for English.** The 12 upstream exercise Markdown files for Chapters 2–13 are now included in the locked local source.
3. **Programming-language examples were filtered — fixed.** C++, Java, Python, Go, JavaScript, TypeScript, C#, Swift, Dart, and Rust tabs are retained when present.
4. **Official callouts were flattened — fixed.** Notes, questions, warnings, tips, and collapsible answer blocks are rendered with the shared reader callout component.
5. **Internal official links could break locally — fixed.** Source-relative Markdown links are converted to their corresponding local English routes during the build.
6. **Translation switches could imply nonexistent parity — fixed.** Exact counterparts remain links; missing translations are visibly marked pending.

## Next content release

1. Translate and review the 12 missing exercise pages for both Vietnamese and Korean.
2. Decide whether the three special pages need localized reader equivalents or should link to localized Atlas landing pages.
3. Run independent technical and language review before promoting localized documents from `draft` or `pilot`.
4. Add original explanations, interactive diagrams, or worked examples only after source parity is stable. Mark those additions as fork-specific editorial content and retain the upstream attribution and CC BY-NC-SA 4.0 notice.
