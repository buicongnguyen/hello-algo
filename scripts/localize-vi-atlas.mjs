import { htmlTranslations, interactiveLocale } from "../vi/atlas-locale.mjs";

function replaceLanguageSwitch(html) {
  const englishSwitch = `<div class="language-switch" aria-label="Choose language">
      <a href="../vi/" lang="vi" hreflang="vi">VI</a>
      <a class="active" href="./" lang="en" hreflang="en" aria-current="page">EN</a>
    </div>`;
  const vietnameseSwitch = `<div class="language-switch" aria-label="Chọn ngôn ngữ">
      <a class="active" href="./" lang="vi" hreflang="vi" aria-current="page">VI</a>
      <a href="../en/" lang="en" hreflang="en">EN</a>
    </div>`;
  if (!html.includes(englishSwitch)) throw new Error("English language switch markup changed; update the Vietnamese localizer");
  return html.replace(englishSwitch, vietnameseSwitch);
}

export function localizeVietnameseAtlas(sourceEnglish) {
  let html = replaceLanguageSwitch(sourceEnglish)
    .replace('<html lang="en">', '<html lang="vi">')
    .replace('<meta name="description" content="A visual learning companion for Hello Algo with interactive data-structure maps, BFS and DFS traversal, binary search, complexity, sorting, and problem-solving patterns.">', '<meta name="description" content="Bạn đồng hành trực quan tiếng Việt cho Hello Algo với bản đồ cấu trúc dữ liệu, BFS và DFS, tìm kiếm nhị phân, độ phức tạp, sắp xếp và các mẫu giải bài toán.">')
    .replace('<meta property="og:title" content="Hello Algo Atlas">', '<meta property="og:title" content="Hello Algo Atlas · Tiếng Việt">')
    .replace('<meta property="og:description" content="See how data structures and algorithms connect, then learn them through interactive visual labs.">', '<meta property="og:description" content="Khám phá mối liên hệ giữa cấu trúc dữ liệu và thuật toán qua các bài thực hành trực quan bằng tiếng Việt.">')
    .replace('content="https://buicongnguyen.github.io/hello-algo/en/"', 'content="https://buicongnguyen.github.io/hello-algo/vi/"')
    .replace('<title>Hello Algo Atlas</title>', '<title>Hello Algo Atlas · Tiếng Việt</title>')
    .replace('href="styles.css', 'href="../styles.css')
    .replaceAll('src="en/docs/', 'src="../en/docs/');

  const translations = Object.entries(htmlTranslations).sort(([a], [b]) => b.length - a.length);
  const translate = (value) => {
    let translated = value;
    for (const [english, vietnamese] of translations) translated = translated.replaceAll(english, vietnamese);
    return translated;
  };
  html = html.replace(/>([^<]+)</g, (_, text) => `>${translate(text)}<`);
  html = html.replace(/(aria-label|alt|title)="([^"]+)"/g, (_, attribute, value) => `${attribute}="${translate(value)}"`);

  const localeJson = JSON.stringify(interactiveLocale).replaceAll("<", "\\u003c");
  html = html.replace(
    '<script src="app.js?v=20260717a" defer></script>',
    `<script>window.HELLO_ALGO_LOCALE=${localeJson};</script>\n  <script src="../app.js?v=20260718d" defer></script>`
  );

  html = html
    .replace(
      '<a href="https://www.hello-algo.com/en/" target="_blank" rel="noreferrer">Sách gốc ↗</a>',
      '<a href="learn/">Bản đọc thử</a>\n      <a href="https://www.hello-algo.com/en/" target="_blank" rel="noreferrer">Sách gốc ↗</a>'
    )
    .replace(
      '<div class="footer-links"><a href="https://github.com/krahets/hello-algo" target="_blank" rel="noreferrer">Kho mã nguồn ↗</a><a href="https://www.hello-algo.com/en/" target="_blank" rel="noreferrer">Đọc Hello Algo ↗</a></div>',
      '<div class="footer-links"><a href="learn/">Bản đọc thử</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/VIETNAMESE_TRANSLATION_PLAN.md" target="_blank" rel="noreferrer">Kế hoạch dịch ↗</a><a href="https://github.com/krahets/hello-algo" target="_blank" rel="noreferrer">Kho mã nguồn ↗</a></div>'
    );

  if (html.includes('src="app.js') || html.includes('src="en/docs/')) {
    throw new Error("Vietnamese Atlas contains an unadjusted English asset path");
  }
  return html;
}
