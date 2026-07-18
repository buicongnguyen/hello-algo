import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./build-vi-book.mjs";

const sourceCommit = "4935d2d3877a6205008d89def8d2ba43f7e06275";
const pages = [
  ["preface", "머리말", "머리말", "0장", "en/docs/chapter_preface/index.md", "ko/docs/chapter_preface/index.md", "loi-noi-dau.html", "자료구조와 알고리즘 학습 여정을 여는 머리말입니다."],
  ["about-the-book", "이 책에 관하여", "0.1 · 이 책에 관하여", "0장", "en/docs/chapter_preface/about_the_book.md", "ko/docs/chapter_preface/about_the_book.md", "ve-cuon-sach.html", "Hello Algo의 독자, 구성, 오픈 소스 공동체를 소개합니다."],
  ["how-to-use-the-book", "이 책을 활용하는 방법", "0.2 · 활용 방법", "0장", "en/docs/chapter_preface/suggestions.md", "ko/docs/chapter_preface/suggestions.md", "cach-su-dung-cuon-sach.html", "애니메이션, 코드 실행, 복습을 활용한 학습 방법입니다."],
  ["chapter-0-summary", "0장 요약", "0.3 · 요약", "0장", "en/docs/chapter_preface/summary.md", "ko/docs/chapter_preface/summary.md", "tom-tat-chuong-0.html", "책의 목적과 효과적인 학습 방법을 복습합니다."],
  ["index", "알고리즘과의 만남", "시작", "1장", "en/docs/chapter_introduction/index.md", "ko/docs/chapter_introduction/index.md", "", "자료구조와 알고리즘의 세계를 한국어로 시작합니다."],
  ["algorithms-are-everywhere", "알고리즘은 어디에나 있습니다", "1.1 · 어디에나 있는 알고리즘", "1장", "en/docs/chapter_introduction/algorithms_are_everywhere.md", "ko/docs/chapter_introduction/algorithms_are_everywhere.md", "thuat-toan-o-khap-noi.html", "일상에서 이진 탐색, 삽입 정렬, 그리디 사고를 발견합니다."],
  ["what-is-dsa", "자료구조와 알고리즘이란?", "1.2 · DSA란?", "1장", "en/docs/chapter_introduction/what_is_dsa.md", "ko/docs/chapter_introduction/what_is_dsa.md", "thuat-toan-la-gi.html", "자료구조와 알고리즘의 정의와 관계를 설명합니다."],
  ["chapter-1-summary", "1장 요약", "1.3 · 요약", "1장", "en/docs/chapter_introduction/summary.md", "ko/docs/chapter_introduction/summary.md", "tom-tat-chuong-1.html", "자료구조와 알고리즘의 핵심 개념을 복습합니다."],
  ["complexity-analysis", "복잡도 분석", "복잡도 분석 시작", "2장", "en/docs/chapter_computational_complexity/index.md", "ko/docs/chapter_computational_complexity/index.md", "phan-tich-do-phuc-tap.html", "입력이 커질 때 필요한 시간과 공간의 증가율을 배웁니다."],
  ["performance-evaluation", "알고리즘 효율성 평가", "2.1 · 효율성 평가", "2장", "en/docs/chapter_computational_complexity/performance_evaluation.md", "ko/docs/chapter_computational_complexity/performance_evaluation.md", "danh-gia-hieu-qua.html", "실행 측정의 한계와 복잡도 분석의 목적을 설명합니다."],
  ["iteration-and-recursion", "반복과 재귀", "2.2 · 반복과 재귀", "2장", "en/docs/chapter_computational_complexity/iteration_and_recursion.md", "ko/docs/chapter_computational_complexity/iteration_and_recursion.md", "vong-lap-va-de-quy.html", "반복문, 호출 스택, 재귀 트리와 중복 계산을 비교합니다."],
  ["time-complexity", "시간 복잡도", "2.3 · 시간 복잡도", "2장", "en/docs/chapter_computational_complexity/time_complexity.md", "ko/docs/chapter_computational_complexity/time_complexity.md", "do-phuc-tap-thoi-gian.html", "빅오 표기법과 대표적인 시간 증가율을 학습합니다."],
  ["space-complexity", "공간 복잡도", "2.4 · 공간 복잡도", "2장", "en/docs/chapter_computational_complexity/space_complexity.md", "ko/docs/chapter_computational_complexity/space_complexity.md", "do-phuc-tap-khong-gian.html", "보조 공간, 호출 스택, 시간–공간 트레이드오프를 분석합니다."],
  ["chapter-2-summary", "2장 요약", "2.5 · 요약", "2장", "en/docs/chapter_computational_complexity/summary.md", "ko/docs/chapter_computational_complexity/summary.md", "tom-tat-chuong-2.html", "시간·공간 복잡도 분석의 핵심을 복습합니다."]
].map(([slug, title, shortTitle, chapter, source, target, viRoute, description]) => ({ slug, title, shortTitle, chapter, source, target, viRoute, description }));

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const chapters = [...new Set(pages.map((page) => page.chapter))];

function navigation(currentSlug) {
  return chapters.map((chapter) => `<div class="book-nav-group"><span>${chapter}</span>${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug === "index" ? "./" : `${page.slug}.html`}">${page.shortTitle}</a>`).join("\n")}</div>`).join("\n");
}

function englishUrl(page) {
  const parts = page.source.split("/");
  const file = parts.at(-1).replace(/\.md$/, "");
  return `https://www.hello-algo.com/en/${parts.at(-2)}/${file === "index" ? "" : `${file}/`}`;
}

function pageTemplate(page, body, index) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  const outputName = page.slug === "index" ? "" : `${page.slug}.html`;
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  const viUrl = `../../vi/learn/${page.viRoute}`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/ko/learn/${outputName}">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo 한국어</title>
  <link rel="stylesheet" href="book.css?v=20260718f"><script src="book.js?v=20260718f" defer></script>
</head>
<body>
  <a class="skip-link" href="#article">본문으로 건너뛰기</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="목차 열기" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>KO</b></strong></a>
    <div class="reader-progress"><span>파일럿</span><strong>${pages.length} / 105 문서</strong></div>
    <nav aria-label="언어와 테마"><a class="active" href="${outputName || "./"}" lang="ko" hreflang="ko" aria-current="page">KO</a><a href="${viUrl}" lang="vi" hreflang="vi" aria-label="같은 문서를 베트남어로 읽기">VI</a><a href="${englishUrl(page)}" lang="en" hreflang="en" aria-label="같은 문서를 영어로 읽기">EN</a><button id="reader-theme" type="button" aria-label="밝은 테마와 어두운 테마 전환">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="한국어판 목차"><div class="sidebar-top"><strong>한국어 파일럿</strong><small>0–2장 · 독립 검토 대기</small></div>${navigation(page.slug)}<div class="sidebar-links"><a href="../#roadmap">학습 지도</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/KOREAN_TRANSLATION_PLAN.md">번역 계획</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/glossary.md">용어집</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/CONTRIBUTING.md">기여하기</a></div></aside>
    <main class="reader-main"><article id="article"><div class="article-meta"><span>${page.chapter}</span><span>파일럿 · 원문 ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>상태: 자체 검토를 마친 파일럿</strong><p>기술, 언어, 링크, 빌드 검사를 완료했으며 독립적인 한국어 기술 검토를 기다리고 있습니다. 대표 Python 예제를 보존했고 EN 버튼은 잠긴 영어 원문과 같은 공식 문서를 엽니다.</p></div>${body}<footer class="article-attribution"><strong>출처와 라이선스</strong><p><a href="${sourceUrl}" target="_blank" rel="noreferrer">krahets와 기여 공동체의 Hello Algo 영어판</a>을 바탕으로 번역하고 예제를 선별하며 일부 내용을 편집했습니다. 파생 콘텐츠는 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>에 따라 제공합니다. 이 프로젝트는 비영리 커뮤니티 작업이며 원본 프로젝트의 공식 후원을 의미하지 않습니다.</p></footer></article>
      <nav class="page-nav" aria-label="이전 글과 다음 글">${previous ? `<a href="${previous.slug === "index" ? "./" : `${previous.slug}.html`}"><span>← 이전 글</span><strong>${previous.title}</strong></a>` : "<i></i>"}${next ? `<a class="next" href="${next.slug === "index" ? "./" : `${next.slug}.html`}"><span>다음 글 →</span><strong>${next.title}</strong></a>` : "<i></i>"}</nav>
    </main>
  </div>
</body></html>`;
}

export async function buildKoreanBook({ projectRoot, outputRoot }) {
  const bookOutput = path.join(outputRoot, "ko", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));
  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of ["chapter_preface.jpg", "chapter_introduction.jpg", "chapter_complexity_analysis.jpg"]) await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  for (const [chapter, directory] of [["chapter_preface", "about_the_book.assets"], ["chapter_introduction", "algorithms_are_everywhere.assets"]]) {
    const destination = path.join(bookOutput, "assets", chapter, directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(projectRoot, "en", "docs", chapter, directory), destination, { recursive: true });
  }
  const motionOutput = path.join(bookOutput, "assets", "index.assets");
  await mkdir(motionOutput, { recursive: true });
  await cp(path.join(projectRoot, "en", "docs", "index.assets", "animation.gif"), path.join(motionOutput, "animation.gif"));
  for (const [index, page] of pages.entries()) {
    const markdown = await readFile(path.join(projectRoot, page.target), "utf8");
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    await writeFile(path.join(bookOutput, outputName), pageTemplate(page, renderMarkdown(markdown, page.target), index));
    await access(path.join(bookOutput, outputName), constants.R_OK);
  }
  return { pageCount: pages.length, sourceCommit };
}
