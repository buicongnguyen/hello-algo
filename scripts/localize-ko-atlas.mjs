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
    languageSwitch: `<div class="language-switch" aria-label="언어 선택">
      <a class="active" href="./" lang="ko" hreflang="ko" aria-current="page">KO</a>
      <a href="../vi/" lang="vi" hreflang="vi">VI</a>
      <a href="../en/" lang="en" hreflang="en">EN</a>
    </div>`,
    readerLabel: "한국어 읽기",
    originalBookLabel: "원본 도서 ↗",
    planUrl: "https://github.com/buicongnguyen/hello-algo/blob/main/KOREAN_TRANSLATION_PLAN.md",
    planLabel: "번역 계획 ↗",
    repositoryLabel: "원본 저장소 ↗"
  });
}
