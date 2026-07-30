import { htmlTranslations, interactiveLocale } from "../ko/atlas-locale.mjs";
import { localizeAtlas } from "./localize-atlas.mjs";

export function localizeKoreanAtlas(sourceEnglish) {
  return localizeAtlas(sourceEnglish, {
    code: "ko",
    title: "Hello Algo Atlas · 한국어",
    metaDescription: "자료구조 학습 지도, BFS와 DFS, 이진 탐색, 복잡도, 정렬, 문제 해결 패턴을 담은 한국어 Hello Algo 시각 학습 안내서입니다.",
    ogDescription: "한국어 대화형 실습으로 자료구조와 알고리즘의 연결을 이해하세요.",
    htmlTranslations,
    interactiveLocale,
    exactOnly: true,
    readerRoutes: {
      "en/docs/index.md": "learn/book-home.html",
      "en/docs/chapter_hello_algo/index.md": "learn/before-starting.html",
      "en/docs/chapter_preface/index.md": "learn/preface.html",
      "en/docs/chapter_introduction/index.md": "learn/",
      "en/docs/chapter_computational_complexity/index.md": "learn/complexity-analysis.html",
      "en/docs/chapter_data_structure/index.md": "learn/data-structures.html",
      "en/docs/chapter_array_and_linkedlist/index.md": "learn/arrays-and-linked-lists.html",
      "en/docs/chapter_stack_and_queue/index.md": "learn/stacks-and-queues.html",
      "en/docs/chapter_hashing/index.md": "learn/hashing.html",
      "en/docs/chapter_tree/index.md": "learn/trees.html",
      "en/docs/chapter_heap/index.md": "learn/heaps.html",
      "en/docs/chapter_graph/index.md": "learn/graphs.html",
      "en/docs/chapter_searching/index.md": "learn/searching.html",
      "en/docs/chapter_sorting/index.md": "learn/sorting.html",
      "en/docs/chapter_divide_and_conquer/index.md": "learn/divide-and-conquer.html",
      "en/docs/chapter_backtracking/index.md": "learn/backtracking.html",
      "en/docs/chapter_dynamic_programming/index.md": "learn/dynamic-programming.html",
      "en/docs/chapter_greedy/index.md": "learn/greedy.html",
      "en/docs/chapter_appendix/index.md": "learn/appendix.html",
      "en/docs/chapter_reference/index.md": "learn/references.html"
    },
    languageSwitch: `<div class="language-switch" aria-label="언어 선택">
      <a class="active" href="./" lang="ko" hreflang="ko" aria-current="page">KO</a>
      <a href="../vi/" lang="vi" hreflang="vi">VI</a>
      <a href="../en/" lang="en" hreflang="en">EN</a>
    </div>`,
    readerLabel: "한국어 읽기",
    originalBookLabel: "원본 도서 ↗",
    modernCppUrl: "https://buicongnguyen.github.io/Modern_c_20/ko/",
    modernCppLabel: "모던 C++20 ↗",
    planUrl: "https://github.com/buicongnguyen/hello-algo/blob/main/KOREAN_TRANSLATION_PLAN.md",
    planLabel: "번역 계획 ↗",
    repositoryLabel: "원본 저장소 ↗"
  });
}
