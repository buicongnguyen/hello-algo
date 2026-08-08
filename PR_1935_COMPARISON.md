# Vietnamese translation comparison: this fork and PR #1935

This is a read-only snapshot generated with:

```bash
npm run compare:vi -- 6f8cbf73364e8e3d5576251bb7e3d6699b961d5c 31f6300e516b6317f86f86e4eaaf0334fcc33182
```

- This fork: `6f8cbf73364e8e3d5576251bb7e3d6699b961d5c`
- [upstream PR #1935](https://github.com/krahets/hello-algo/pull/1935): `31f6300e516b6317f86f86e4eaaf0334fcc33182`
- Shared Vietnamese documents: **105**
- Shared documents with different translations: **104**
- Identical shared documents: **1**
- Documents only in this fork: **14**, all exercise documents
- Documents only in PR #1935: **0**

The report describes differences. It does not declare either wording correct and does not copy or merge content.

## Structural comparison of the 105 shared documents

| Metric | This fork | PR #1935 | Documents with different counts |
| --- | ---: | ---: | ---: |
| Headings | 448 | 448 | 0 |
| Images | 502 | 502 | 0 |
| Tables | 22 | 21 | 1 |
| Formulas | 1,895 | 1,893 | 2 |
| Display-math fences | 94 | 94 | 0 |
| Inline formulas | 1,848 | 1,846 | 2 |
| Code blocks | 174 | 141 | 18 |

## Exercise documents only in this fork

- `vi/docs/chapter_array_and_linkedlist/exercises.md`
- `vi/docs/chapter_backtracking/exercises.md`
- `vi/docs/chapter_computational_complexity/exercises.md`
- `vi/docs/chapter_data_structure/exercises.md`
- `vi/docs/chapter_divide_and_conquer/exercises.md`
- `vi/docs/chapter_dynamic_programming/exercises.md`
- `vi/docs/chapter_graph/exercises.md`
- `vi/docs/chapter_greedy/exercises.md`
- `vi/docs/chapter_hashing/exercises.md`
- `vi/docs/chapter_heap/exercises.md`
- `vi/docs/chapter_searching/exercises.md`
- `vi/docs/chapter_sorting/exercises.md`
- `vi/docs/chapter_stack_and_queue/exercises.md`
- `vi/docs/chapter_tree/exercises.md`

## Glossary observations for human review

This fork declares a bilingual governance glossary and a bilingual Appendix list. PR #1935 has an Appendix terminology list, but its table does not preserve the English-to-Vietnamese mapping in a machine-readable form. Reviewers should therefore compare the source tables directly instead of treating a missing mapping as a wrong translation.

The report found wording that deserves explicit review:

| Concept | This fork | Wording observed in PR #1935 |
| --- | --- | --- |
| function | `hàm` | `hàm`, `chức năng` |
| queue | `hàng đợi` | `hàng đợi`, `xếp hàng` |
| hash collision | `xung đột băm` | `va chạm băm` |
| bucket | `bucket`, `thùng` | `xô` |

These are review candidates, not automatic replacements.

## Source revisions

- This fork declares upstream English commit `69932aed1891a7b7f6a0de88cd116d3fe13e7032`; its audited English-source digest is recorded by the release checks.
- PR #1935 does not declare a translation source commit in `vi/translation-status.json`; its `en/docs` tree at the compared ref is `339c1dccbbc60e0bfb9ebb78dc31d6094a40028f`.

The English tree IDs make the source difference reproducible without guessing which translation should be preferred.
