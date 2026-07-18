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
    languageSwitch: `<div class="language-switch" aria-label="Chọn ngôn ngữ">
      <a href="../ko/" lang="ko" hreflang="ko">KO</a>
      <a class="active" href="./" lang="vi" hreflang="vi" aria-current="page">VI</a>
      <a href="../en/" lang="en" hreflang="en">EN</a>
    </div>`,
    readerLabel: "Bản đọc thử",
    originalBookLabel: "Sách gốc ↗",
    planUrl: "https://github.com/buicongnguyen/hello-algo/blob/main/VIETNAMESE_TRANSLATION_PLAN.md",
    planLabel: "Kế hoạch dịch ↗",
    repositoryLabel: "Kho mã nguồn ↗"
  });
}
