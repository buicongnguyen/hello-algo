import { htmlTranslations, interactiveLocale } from "../vi/atlas-locale.mjs";
import { localizeAtlas } from "./localize-atlas.mjs";

export function localizeVietnameseAtlas(sourceEnglish) {
  return localizeAtlas(sourceEnglish, {
    code: "vi",
    title: "Hello Algo Atlas · Tiếng Việt",
    metaDescription: "Bạn đồng hành trực quan tiếng Việt cho Hello Algo với bản đồ cấu trúc dữ liệu, BFS và DFS, tìm kiếm nhị phân, độ phức tạp, sắp xếp và các mẫu giải bài toán.",
    ogDescription: "Khám phá mối liên hệ giữa cấu trúc dữ liệu và thuật toán qua các bài thực hành trực quan bằng tiếng Việt.",
    htmlTranslations,
    interactiveLocale,
    readerRoutes: {
      "en/docs/index.md": "learn/trang-chu-sach.html",
      "en/docs/chapter_hello_algo/index.md": "learn/truoc-khi-bat-dau.html",
      "en/docs/chapter_preface/index.md": "learn/loi-noi-dau.html",
      "en/docs/chapter_introduction/index.md": "learn/",
      "en/docs/chapter_computational_complexity/index.md": "learn/phan-tich-do-phuc-tap.html",
      "en/docs/chapter_data_structure/index.md": "learn/cau-truc-du-lieu.html",
      "en/docs/chapter_array_and_linkedlist/index.md": "learn/mang-va-danh-sach-lien-ket.html",
      "en/docs/chapter_stack_and_queue/index.md": "learn/ngan-xep-va-hang-doi.html",
      "en/docs/chapter_hashing/index.md": "learn/bam.html",
      "en/docs/chapter_tree/index.md": "learn/cay.html",
      "en/docs/chapter_heap/index.md": "learn/heap.html",
      "en/docs/chapter_graph/index.md": "learn/do-thi.html",
      "en/docs/chapter_searching/index.md": "learn/tim-kiem.html",
      "en/docs/chapter_sorting/index.md": "learn/sap-xep.html",
      "en/docs/chapter_divide_and_conquer/index.md": "learn/chia-de-tri.html",
      "en/docs/chapter_backtracking/index.md": "learn/quay-lui.html",
      "en/docs/chapter_dynamic_programming/index.md": "learn/quy-hoach-dong.html",
      "en/docs/chapter_greedy/index.md": "learn/tham-lam.html",
      "en/docs/chapter_appendix/index.md": "learn/phu-luc.html",
      "en/docs/chapter_reference/index.md": "learn/tai-lieu-tham-khao.html"
    },
    languageSwitch: `<div class="language-switch" aria-label="Chọn ngôn ngữ">
      <a href="../ko/" lang="ko" hreflang="ko">KO</a>
      <a class="active" href="./" lang="vi" hreflang="vi" aria-current="page">VI</a>
      <a href="../en/" lang="en" hreflang="en">EN</a>
    </div>`,
    readerLabel: "Bản đọc thử",
    originalBookLabel: "Sách gốc ↗",
    modernCppUrl: "https://buicongnguyen.github.io/Modern_c_20/vi/",
    modernCppLabel: "C++20 hiện đại ↗",
    planUrl: "https://github.com/buicongnguyen/hello-algo/blob/main/VIETNAMESE_TRANSLATION_PLAN.md",
    planLabel: "Kế hoạch dịch ↗",
    repositoryLabel: "Kho mã nguồn ↗"
  });
}
