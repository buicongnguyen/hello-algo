import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./build-vi-book.mjs";
import { englishReaderHref, loadTranslationRegistry, readerHref } from "./translation-registry.mjs";

const pages = [
  ["preface", "머리말", "머리말", "0장", "en/docs/chapter_preface/index.md", "ko/docs/chapter_preface/index.md", "자료구조와 알고리즘 학습 여정을 여는 머리말입니다."],
  ["about-the-book", "이 책에 관하여", "0.1 · 이 책에 관하여", "0장", "en/docs/chapter_preface/about_the_book.md", "ko/docs/chapter_preface/about_the_book.md", "Hello Algo의 독자, 구성, 오픈 소스 공동체를 소개합니다."],
  ["how-to-use-the-book", "이 책을 활용하는 방법", "0.2 · 활용 방법", "0장", "en/docs/chapter_preface/suggestions.md", "ko/docs/chapter_preface/suggestions.md", "애니메이션, 코드 실행, 복습을 활용한 학습 방법입니다."],
  ["chapter-0-summary", "0장 요약", "0.3 · 요약", "0장", "en/docs/chapter_preface/summary.md", "ko/docs/chapter_preface/summary.md", "책의 목적과 효과적인 학습 방법을 복습합니다."],
  ["index", "알고리즘과의 만남", "시작", "1장", "en/docs/chapter_introduction/index.md", "ko/docs/chapter_introduction/index.md", "자료구조와 알고리즘의 세계를 한국어로 시작합니다."],
  ["algorithms-are-everywhere", "알고리즘은 어디에나 있습니다", "1.1 · 어디에나 있는 알고리즘", "1장", "en/docs/chapter_introduction/algorithms_are_everywhere.md", "ko/docs/chapter_introduction/algorithms_are_everywhere.md", "일상에서 이진 탐색, 삽입 정렬, 그리디 사고를 발견합니다."],
  ["what-is-dsa", "자료구조와 알고리즘이란?", "1.2 · DSA란?", "1장", "en/docs/chapter_introduction/what_is_dsa.md", "ko/docs/chapter_introduction/what_is_dsa.md", "자료구조와 알고리즘의 정의와 관계를 설명합니다."],
  ["chapter-1-summary", "1장 요약", "1.3 · 요약", "1장", "en/docs/chapter_introduction/summary.md", "ko/docs/chapter_introduction/summary.md", "자료구조와 알고리즘의 핵심 개념을 복습합니다."],
  ["complexity-analysis", "복잡도 분석", "복잡도 분석 시작", "2장", "en/docs/chapter_computational_complexity/index.md", "ko/docs/chapter_computational_complexity/index.md", "입력이 커질 때 필요한 시간과 공간의 증가율을 배웁니다."],
  ["performance-evaluation", "알고리즘 효율성 평가", "2.1 · 효율성 평가", "2장", "en/docs/chapter_computational_complexity/performance_evaluation.md", "ko/docs/chapter_computational_complexity/performance_evaluation.md", "실행 측정의 한계와 복잡도 분석의 목적을 설명합니다."],
  ["iteration-and-recursion", "반복과 재귀", "2.2 · 반복과 재귀", "2장", "en/docs/chapter_computational_complexity/iteration_and_recursion.md", "ko/docs/chapter_computational_complexity/iteration_and_recursion.md", "반복문, 호출 스택, 재귀 트리와 중복 계산을 비교합니다."],
  ["time-complexity", "시간 복잡도", "2.3 · 시간 복잡도", "2장", "en/docs/chapter_computational_complexity/time_complexity.md", "ko/docs/chapter_computational_complexity/time_complexity.md", "빅오 표기법과 대표적인 시간 증가율을 학습합니다."],
  ["space-complexity", "공간 복잡도", "2.4 · 공간 복잡도", "2장", "en/docs/chapter_computational_complexity/space_complexity.md", "ko/docs/chapter_computational_complexity/space_complexity.md", "보조 공간, 호출 스택, 시간–공간 트레이드오프를 분석합니다."],
  ["chapter-2-summary", "2장 요약", "2.5 · 요약", "2장", "en/docs/chapter_computational_complexity/summary.md", "ko/docs/chapter_computational_complexity/summary.md", "시간·공간 복잡도 분석의 핵심을 복습합니다."],
  ["data-structures", "자료구조", "자료구조 시작", "3장", "en/docs/chapter_data_structure/index.md", "ko/docs/chapter_data_structure/index.md", "자료구조의 논리적 관계와 메모리 배치를 소개합니다."],
  ["data-structure-classification", "자료구조의 분류", "3.1 · 자료구조 분류", "3장", "en/docs/chapter_data_structure/classification_of_data_structure.md", "ko/docs/chapter_data_structure/classification_of_data_structure.md", "선형·비선형 구조와 연속·분산 저장을 비교합니다."],
  ["basic-data-types", "기본 데이터형", "3.2 · 기본 데이터형", "3장", "en/docs/chapter_data_structure/basic_data_types.md", "ko/docs/chapter_data_structure/basic_data_types.md", "정수, 실수, 문자, 불리언과 자료구조의 관계를 설명합니다."],
  ["number-encoding", "숫자 인코딩", "3.3 · 숫자 인코딩", "3장", "en/docs/chapter_data_structure/number_encoding.md", "ko/docs/chapter_data_structure/number_encoding.md", "2의 보수와 IEEE 754 부동소수점 표현을 배웁니다."],
  ["character-encoding", "문자 인코딩", "3.4 · 문자 인코딩", "3장", "en/docs/chapter_data_structure/character_encoding.md", "ko/docs/chapter_data_structure/character_encoding.md", "ASCII, Unicode, UTF-8과 문자열 저장 방식을 살펴봅니다."],
  ["chapter-3-summary", "3장 요약", "3.5 · 요약", "3장", "en/docs/chapter_data_structure/summary.md", "ko/docs/chapter_data_structure/summary.md", "자료구조 분류와 데이터 인코딩의 핵심을 복습합니다."],
  ["arrays-and-linked-lists", "배열과 연결 리스트", "배열과 연결 리스트 시작", "4장", "en/docs/chapter_array_and_linkedlist/index.md", "ko/docs/chapter_array_and_linkedlist/index.md", "연속 저장과 분산 저장의 대표 구조를 소개합니다."],
  ["arrays", "배열", "4.1 · 배열", "4장", "en/docs/chapter_array_and_linkedlist/array.md", "ko/docs/chapter_array_and_linkedlist/array.md", "배열의 접근, 삽입, 삭제, 탐색과 확장을 배웁니다."],
  ["linked-lists", "연결 리스트", "4.2 · 연결 리스트", "4장", "en/docs/chapter_array_and_linkedlist/linked_list.md", "ko/docs/chapter_array_and_linkedlist/linked_list.md", "노드 연결, 기본 연산, 종류와 대표 활용을 설명합니다."],
  ["dynamic-lists", "동적 리스트", "4.3 · 동적 리스트", "4장", "en/docs/chapter_array_and_linkedlist/list.md", "ko/docs/chapter_array_and_linkedlist/list.md", "동적 배열의 확장과 분할 상환 비용을 구현으로 이해합니다."],
  ["ram-and-cache", "RAM과 캐시", "4.4 · RAM과 캐시", "4장", "en/docs/chapter_array_and_linkedlist/ram_and_cache.md", "ko/docs/chapter_array_and_linkedlist/ram_and_cache.md", "저장 계층과 자료구조의 캐시 효율을 비교합니다."],
  ["chapter-4-summary", "4장 요약", "4.5 · 요약", "4장", "en/docs/chapter_array_and_linkedlist/summary.md", "ko/docs/chapter_array_and_linkedlist/summary.md", "배열, 연결 리스트, 동적 리스트와 캐시의 핵심을 복습합니다."],
  ["stacks-and-queues", "스택과 큐", "스택과 큐 시작", "5장", "en/docs/chapter_stack_and_queue/index.md", "ko/docs/chapter_stack_and_queue/index.md", "LIFO, FIFO, 양끝 연산을 소개합니다."],
  ["stack", "스택", "5.1 · 스택", "5장", "en/docs/chapter_stack_and_queue/stack.md", "ko/docs/chapter_stack_and_queue/stack.md", "스택의 연산, 구현, 활용을 설명합니다."],
  ["queue", "큐", "5.2 · 큐", "5장", "en/docs/chapter_stack_and_queue/queue.md", "ko/docs/chapter_stack_and_queue/queue.md", "FIFO, 원형 배열, 대기열 활용을 배웁니다."],
  ["deque", "덱", "5.3 · 덱", "5장", "en/docs/chapter_stack_and_queue/deque.md", "ko/docs/chapter_stack_and_queue/deque.md", "배열과 연결 리스트 기반 양끝 연산을 설명합니다."],
  ["chapter-5-summary", "5장 요약", "5.4 · 요약", "5장", "en/docs/chapter_stack_and_queue/summary.md", "ko/docs/chapter_stack_and_queue/summary.md", "스택, 큐, 덱의 핵심을 복습합니다."],
  ["hashing", "해싱", "해싱 시작", "6장", "en/docs/chapter_hashing/index.md", "ko/docs/chapter_hashing/index.md", "키, 버킷, 충돌의 관계를 소개합니다."],
  ["hash-table", "해시 테이블", "6.1 · 해시 테이블", "6장", "en/docs/chapter_hashing/hash_map.md", "ko/docs/chapter_hashing/hash_map.md", "해시 테이블 구현, 적재율, 확장을 배웁니다."],
  ["hash-collision", "해시 충돌", "6.2 · 해시 충돌", "6장", "en/docs/chapter_hashing/hash_collision.md", "ko/docs/chapter_hashing/hash_collision.md", "분리 연결법과 여러 개방 주소법을 비교합니다."],
  ["hash-algorithm", "해시 알고리즘", "6.3 · 해시 알고리즘", "6장", "en/docs/chapter_hashing/hash_algorithm.md", "ko/docs/chapter_hashing/hash_algorithm.md", "해시 함수의 설계, 성질, 선택을 설명합니다."],
  ["chapter-6-summary", "6장 요약", "6.4 · 요약", "6장", "en/docs/chapter_hashing/summary.md", "ko/docs/chapter_hashing/summary.md", "해시 테이블, 충돌, 해시 함수의 핵심을 복습합니다."],
  ["trees", "트리", "트리 시작", "7장", "en/docs/chapter_tree/index.md", "ko/docs/chapter_tree/index.md", "계층 관계를 표현하는 트리 자료구조를 소개합니다."],
  ["binary-tree", "이진 트리", "7.1 · 이진 트리", "7장", "en/docs/chapter_tree/binary_tree.md", "ko/docs/chapter_tree/binary_tree.md", "이진 트리의 노드, 용어, 종류와 연산을 설명합니다."],
  ["binary-tree-traversal", "이진 트리 순회", "7.2 · 트리 순회", "7장", "en/docs/chapter_tree/binary_tree_traversal.md", "ko/docs/chapter_tree/binary_tree_traversal.md", "레벨 순회와 깊이 우선 순회를 비교합니다."],
  ["array-representation-of-binary-trees", "이진 트리의 배열 표현", "7.3 · 배열 표현", "7장", "en/docs/chapter_tree/array_representation_of_tree.md", "ko/docs/chapter_tree/array_representation_of_tree.md", "완전 이진 트리의 부모와 자식 관계를 배열 인덱스로 표현합니다."],
  ["binary-search-tree", "이진 탐색 트리", "7.4 · 이진 탐색 트리", "7장", "en/docs/chapter_tree/binary_search_tree.md", "ko/docs/chapter_tree/binary_search_tree.md", "BST의 탐색, 삽입, 삭제와 성능을 설명합니다."],
  ["avl-tree", "AVL 트리", "7.5 · AVL 트리 *", "7장", "en/docs/chapter_tree/avl_tree.md", "ko/docs/chapter_tree/avl_tree.md", "네 가지 회전으로 BST의 균형을 유지합니다."],
  ["chapter-7-summary", "7장 요약", "7.6 · 요약", "7장", "en/docs/chapter_tree/summary.md", "ko/docs/chapter_tree/summary.md", "이진 트리, BST, AVL의 핵심을 복습합니다."],
  ["heaps", "힙", "힙 시작", "8장", "en/docs/chapter_heap/index.md", "ko/docs/chapter_heap/index.md", "완전 이진 트리 기반 우선순위 구조를 소개합니다."],
  ["heap", "힙", "8.1 · 힙", "8장", "en/docs/chapter_heap/heap.md", "ko/docs/chapter_heap/heap.md", "힙의 배열 표현과 상향·하향 이동을 설명합니다."],
  ["build-heap", "힙 구성", "8.2 · 힙 구성", "8장", "en/docs/chapter_heap/build_heap.md", "ko/docs/chapter_heap/build_heap.md", "아래에서 위로 선형 시간에 힙을 구성합니다."],
  ["top-k", "Top-k 문제", "8.3 · Top-k", "8장", "en/docs/chapter_heap/top_k.md", "ko/docs/chapter_heap/top_k.md", "크기 k인 힙으로 대규모 또는 스트리밍 데이터를 처리합니다."],
  ["chapter-8-summary", "8장 요약", "8.4 · 요약", "8장", "en/docs/chapter_heap/summary.md", "ko/docs/chapter_heap/summary.md", "힙, 힙 구성, top-k의 핵심을 복습합니다."]
].map(([slug, title, shortTitle, chapter, source, target, description]) => ({ slug, title, shortTitle, chapter, source, target, description }));

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const chapters = [...new Set(pages.map((page) => page.chapter))];

function navigation(currentSlug) {
  return chapters.map((chapter) => `<div class="book-nav-group"><span>${chapter}</span>${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug === "index" ? "./" : `${page.slug}.html`}">${page.shortTitle}</a>`).join("\n")}</div>`).join("\n");
}

function pageTemplate(page, body, index, sourceCommit, koreanDocument, vietnameseDocument) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  const outputName = page.slug === "index" ? "" : `${page.slug}.html`;
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  const viUrl = readerHref(vietnameseDocument);
  const statusCopy = {
    draft: {
      label: "초안",
      sidebar: "내용 확장 및 검토 중",
      title: "상태: 검토 중인 한국어 초안",
      description: "경로, 링크, 렌더링은 검사했지만 일부 문서는 아직 영어 원문보다 간략합니다. 구조와 예제를 보완하고 기술·한국어 검토를 마치기 전까지 파일럿 번역으로 간주하지 않습니다."
    },
    pilot: {
      label: "파일럿",
      sidebar: "독립 검토 대기",
      title: "상태: 자체 검토를 마친 파일럿",
      description: "영어 원문의 구조와 예제를 보존하고 기술·언어·링크·빌드 자체 검토를 마쳤습니다. 안정 번역으로 승격하기 전에 독립적인 한국어 기술 검토가 필요합니다."
    },
    published: {
      label: "정식",
      sidebar: "검토 완료",
      title: "상태: 검토를 마친 안정 번역",
      description: "영어 원문과의 구조·내용 대조 및 독립적인 기술·한국어 검토를 완료했습니다."
    }
  }[koreanDocument.status];
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/ko/learn/${outputName}">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo 한국어</title>
  <link rel="stylesheet" href="book.css?v=20260718g"><script src="book.js?v=20260718g" defer></script>
</head>
<body data-translation-status="${koreanDocument.status}">
  <a class="skip-link" href="#article">본문으로 건너뛰기</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="목차 열기" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>KO</b></strong></a>
    <div class="reader-progress"><span>${statusCopy.label}</span><strong>${pages.length} / 105 문서</strong></div>
    <nav aria-label="언어와 테마"><a class="active" href="${outputName || "./"}" lang="ko" hreflang="ko" aria-current="page">KO</a><a href="${viUrl}" lang="vi" hreflang="vi" aria-label="같은 문서를 베트남어로 읽기">VI</a><a href="${englishReaderHref(page.source)}" lang="en" hreflang="en" aria-label="같은 문서를 영어로 읽기">EN</a><button id="reader-theme" type="button" aria-label="밝은 테마와 어두운 테마 전환">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="한국어판 목차"><div class="sidebar-top"><strong>한국어 읽기</strong><small>0–8장 · ${statusCopy.sidebar}</small></div>${navigation(page.slug)}<div class="sidebar-links"><a href="../#roadmap">학습 지도</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/KOREAN_TRANSLATION_PLAN.md">번역 계획</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/glossary.md">용어집</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/CONTRIBUTING.md">기여하기</a></div></aside>
    <main class="reader-main"><article id="article"><div class="article-meta"><span>${page.chapter}</span><span>${statusCopy.label} · 원문 ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>${statusCopy.title}</strong><p>${statusCopy.description} VI와 EN 버튼은 같은 원문에 대응하는 문서를 엽니다.</p></div>${body}<footer class="article-attribution"><strong>출처와 라이선스</strong><p><a href="${sourceUrl}" target="_blank" rel="noreferrer">krahets와 기여 공동체의 Hello Algo 영어판</a>을 바탕으로 번역하고 예제를 선별하며 일부 내용을 편집했습니다. 파생 콘텐츠는 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>에 따라 제공합니다. 이 프로젝트는 비영리 커뮤니티 작업이며 원본 프로젝트의 공식 후원을 의미하지 않습니다.</p></footer></article>
      <nav class="page-nav" aria-label="이전 글과 다음 글">${previous ? `<a href="${previous.slug === "index" ? "./" : `${previous.slug}.html`}"><span>← 이전 글</span><strong>${previous.title}</strong></a>` : "<i></i>"}${next ? `<a class="next" href="${next.slug === "index" ? "./" : `${next.slug}.html`}"><span>다음 글 →</span><strong>${next.title}</strong></a>` : "<i></i>"}</nav>
    </main>
  </div>
</body></html>`;
}

export async function buildKoreanBook({ projectRoot, outputRoot }) {
  const registry = await loadTranslationRegistry(projectRoot);
  const bookOutput = path.join(outputRoot, "ko", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));
  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of ["chapter_preface.jpg", "chapter_introduction.jpg", "chapter_complexity_analysis.jpg", "chapter_data_structure.jpg", "chapter_array_and_linkedlist.jpg", "chapter_stack_and_queue.jpg", "chapter_hashing.jpg", "chapter_tree.jpg", "chapter_heap.jpg"]) await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  for (const [chapter, directory] of [
    ["chapter_preface", "about_the_book.assets"], ["chapter_introduction", "algorithms_are_everywhere.assets"],
    ["chapter_data_structure", "classification_of_data_structure.assets"], ["chapter_data_structure", "number_encoding.assets"], ["chapter_data_structure", "character_encoding.assets"],
    ["chapter_array_and_linkedlist", "array.assets"], ["chapter_array_and_linkedlist", "linked_list.assets"], ["chapter_array_and_linkedlist", "ram_and_cache.assets"],
    ["chapter_stack_and_queue", "stack.assets"], ["chapter_stack_and_queue", "queue.assets"], ["chapter_stack_and_queue", "deque.assets"],
    ["chapter_hashing", "hash_map.assets"], ["chapter_hashing", "hash_collision.assets"], ["chapter_hashing", "hash_algorithm.assets"],
    ["chapter_tree", "binary_tree.assets"], ["chapter_tree", "binary_tree_traversal.assets"], ["chapter_tree", "array_representation_of_tree.assets"], ["chapter_tree", "binary_search_tree.assets"], ["chapter_tree", "avl_tree.assets"],
    ["chapter_heap", "heap.assets"], ["chapter_heap", "build_heap.assets"], ["chapter_heap", "top_k.assets"]
  ]) {
    const destination = path.join(bookOutput, "assets", chapter, directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(projectRoot, "en", "docs", chapter, directory), destination, { recursive: true });
  }
  const motionOutput = path.join(bookOutput, "assets", "index.assets");
  await mkdir(motionOutput, { recursive: true });
  await cp(path.join(projectRoot, "en", "docs", "index.assets", "animation.gif"), path.join(motionOutput, "animation.gif"));
  for (const [index, page] of pages.entries()) {
    const koreanDocument = registry.byLanguage.ko.get(page.source);
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    if (!koreanDocument || !vietnameseDocument) throw new Error(`Korean reader page has no shared translation identity: ${page.source}`);
    const markdown = await readFile(path.join(projectRoot, page.target), "utf8");
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    const expectedRoute = `ko/learn/${outputName === "index.html" ? "" : outputName}`;
    if (koreanDocument.target !== page.target || koreanDocument.route !== expectedRoute) throw new Error(`Korean registry identity does not match reader page ${page.source}`);
    await writeFile(path.join(bookOutput, outputName), pageTemplate(page, renderMarkdown(markdown, page.target), index, registry.sourceCommit, koreanDocument, vietnameseDocument));
    await access(path.join(bookOutput, outputName), constants.R_OK);
  }
  return { pageCount: pages.length, sourceCommit: registry.sourceCommit, status: "draft" };
}
