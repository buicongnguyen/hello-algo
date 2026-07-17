import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const sourceCommit = "4935d2d3877a6205008d89def8d2ba43f7e06275";
const pages = [
  {
    slug: "index",
    title: "Gặp gỡ thuật toán",
    shortTitle: "Mở đầu",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/index.md",
    target: "vi/docs/chapter_introduction/index.md",
    description: "Bắt đầu hành trình học cấu trúc dữ liệu và thuật toán bằng tiếng Việt."
  },
  {
    slug: "thuat-toan-o-khap-noi",
    title: "Thuật toán ở khắp nơi",
    shortTitle: "1.1 · Thuật toán ở khắp nơi",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/algorithms_are_everywhere.md",
    target: "vi/docs/chapter_introduction/algorithms_are_everywhere.md",
    description: "Nhận ra tìm kiếm nhị phân, sắp xếp chèn và tư tưởng tham lam trong đời sống."
  },
  {
    slug: "thuat-toan-la-gi",
    title: "Thuật toán là gì?",
    shortTitle: "1.2 · Thuật toán là gì?",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/what_is_dsa.md",
    target: "vi/docs/chapter_introduction/what_is_dsa.md",
    description: "Định nghĩa thuật toán, cấu trúc dữ liệu và mối quan hệ giữa hai khái niệm."
  },
  {
    slug: "tom-tat-chuong-1",
    title: "Tóm tắt Chương 1",
    shortTitle: "1.3 · Tóm tắt",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/summary.md",
    target: "vi/docs/chapter_introduction/summary.md",
    description: "Ôn lại các ý chính và lý do kiến thức thuật toán có giá trị trong công việc."
  },
  {
    slug: "phan-tich-do-phuc-tap",
    title: "Phân tích độ phức tạp",
    shortTitle: "Mở đầu độ phức tạp",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/index.md",
    target: "vi/docs/chapter_computational_complexity/index.md",
    description: "Xây dựng trực giác về thời gian, bộ nhớ và khả năng mở rộng của thuật toán."
  },
  {
    slug: "danh-gia-hieu-qua",
    title: "Đánh giá hiệu quả thuật toán",
    shortTitle: "2.1 · Đánh giá hiệu quả",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/performance_evaluation.md",
    target: "vi/docs/chapter_computational_complexity/performance_evaluation.md",
    description: "So sánh phép đo thực tế với phân tích độ phức tạp tiệm cận."
  }
];

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function renderInline(value) {
  const tokens = [];
  const protect = (html) => {
    const token = `@@TOKEN${tokens.length}@@`;
    tokens.push(html);
    return token;
  };
  const safeUrl = /^(https?:|mailto:|#|\.{0,2}\/|[a-zA-Z0-9_./-]+(?:#[a-zA-Z0-9_-]+)?)$/;
  const protectedValue = value
    .replace(/`([^`]+)`/g, (_, code) => protect(`<code>${escapeHtml(code)}</code>`))
    .replace(/\$([^$]+)\$/g, (_, expression) => {
      const readableExpression = expression.replaceAll("\\log", "log");
      return protect(`<span class="math">${escapeHtml(readableExpression)}</span>`);
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      if (!safeUrl.test(url)) return escapeHtml(label);
      return protect(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`);
    });
  let rendered = escapeHtml(protectedValue).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  tokens.forEach((tokenContent, index) => {
    rendered = rendered.replace(`@@TOKEN${index}@@`, tokenContent);
  });
  return rendered;
}

function assetUrl(sourcePath, reference) {
  if (reference.startsWith("../assets/covers/")) {
    return `assets/covers/${path.basename(reference)}`;
  }
  const sourceDirectory = path.dirname(sourcePath.replaceAll("\\", "/"));
  const relativeDirectory = sourceDirectory.replace(/^vi\/docs\//, "");
  return `assets/${relativeDirectory}/${reference}`;
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function renderMarkdown(markdown, sourcePath) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      output.push(`<figure><img src="${escapeHtml(assetUrl(sourcePath, image[2]))}" alt="${escapeHtml(image[1])}" loading="lazy"><figcaption>${renderInline(image[1])}</figcaption></figure>`);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trimStart().startsWith(">")) {
        quote.push(lines[index].trimStart().replace(/^>\s?/, ""));
        index += 1;
      }
      output.push(`<blockquote>${quote.filter(Boolean).map((part) => `<p>${renderInline(part)}</p>`).join("")}</blockquote>`);
      continue;
    }

    const listMatch = line.match(/^\s*(\d+\.|[-*])\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (index < lines.length) {
        const match = lines[index].match(/^\s*(\d+\.|[-*])\s+(.+)$/);
        if (!match || /\d+\./.test(match[1]) !== ordered) break;
        items.push(`<li>${renderInline(match[2])}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      output.push(`<div class="table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trimEnd();
      if (!next.trim() || /^(#{1,4})\s+/.test(next) || /^!\[/.test(next) || next.startsWith(">") || /^\s*(\d+\.|[-*])\s+/.test(next)) break;
      if (next.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;
      paragraph.push(next.trim());
      index += 1;
    }
    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return output.join("\n");
}

function navigation(currentSlug) {
  return ["Chương 1", "Chương 2"].map((chapter) => `
    <div class="book-nav-group">
      <span>${chapter}</span>
      ${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug}.html">${page.shortTitle}</a>`).join("\n")}
    </div>`).join("\n");
}

function pageTemplate(page, body, pageIndex) {
  const previous = pages[pageIndex - 1];
  const next = pages[pageIndex + 1];
  const canonicalName = page.slug === "index" ? "" : `${page.slug}.html`;
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/vi/learn/${canonicalName}">
  <meta name="theme-color" content="#07111f">
  <title>${escapeHtml(page.title)} · Hello Algo tiếng Việt</title>
  <link rel="stylesheet" href="book.css?v=20260718c">
  <script src="book.js?v=20260718c" defer></script>
</head>
<body>
  <a class="skip-link" href="#article">Bỏ qua để đến bài đọc</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="Mở mục lục" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>VI</b></strong></a>
    <div class="reader-progress"><span>Đợt thử</span><strong>6 / 105 tài liệu</strong></div>
    <nav aria-label="Ngôn ngữ và giao diện">
      <a class="active" href="./" lang="vi" aria-current="page">VI</a>
      <a href="../../en/" lang="en">EN</a>
      <button id="reader-theme" type="button" aria-label="Đổi giao diện sáng hoặc tối">◐</button>
    </nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="Mục lục bản tiếng Việt">
      <div class="sidebar-top"><strong>Bản đọc thử</strong><small>Giai đoạn 2 · chờ phản biện độc lập</small></div>
      ${navigation(page.slug)}
      <div class="sidebar-links"><a href="../#roadmap">Bản đồ học tập</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/VIETNAMESE_TRANSLATION_PLAN.md">Kế hoạch dịch</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/vi/glossary.md">Thuật ngữ</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/vi/CONTRIBUTING.md">Đóng góp</a></div>
    </aside>
    <main class="reader-main">
      <article id="article">
        <div class="article-meta"><span>${page.chapter}</span><span>Bản thử · nguồn khóa tại ${sourceCommit.slice(0, 7)}</span></div>
        <div class="pilot-notice"><strong>Trạng thái: bản thử đã tự kiểm tra</strong><p>Nội dung đã qua kiểm tra kỹ thuật, ngôn ngữ, liên kết và bản dựng trong fork này. Dự án vẫn cần phản biện độc lập trước khi nâng lên bản dịch ổn định.</p></div>
        ${body}
        <footer class="article-attribution">
          <strong>Nguồn và giấy phép</strong>
          <p>Chuyển ngữ và biên tập bổ sung từ <a href="${sourceUrl}" target="_blank" rel="noreferrer">Hello Algo tiếng Anh</a>. Nội dung phái sinh được chia sẻ theo <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.vi" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>; đây là dự án cộng đồng, không ngụ ý được upstream bảo trợ chính thức.</p>
        </footer>
      </article>
      <nav class="page-nav" aria-label="Bài trước và bài sau">
        ${previous ? `<a href="${previous.slug}.html"><span>← Bài trước</span><strong>${previous.title}</strong></a>` : "<i></i>"}
        ${next ? `<a class="next" href="${next.slug}.html"><span>Bài sau →</span><strong>${next.title}</strong></a>` : "<i></i>"}
      </nav>
    </main>
  </div>
</body>
</html>`;
}

export async function buildVietnameseBook({ projectRoot, outputRoot }) {
  const bookOutput = path.join(outputRoot, "vi", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));

  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of ["chapter_introduction.jpg", "chapter_complexity_analysis.jpg"]) {
    await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  }

  const introAssets = path.join(bookOutput, "assets", "chapter_introduction");
  await mkdir(introAssets, { recursive: true });
  for (const directory of ["algorithms_are_everywhere.assets", "what_is_dsa.assets"]) {
    await cp(
      path.join(projectRoot, "en", "docs", "chapter_introduction", directory),
      path.join(introAssets, directory),
      { recursive: true }
    );
  }

  for (const [pageIndex, page] of pages.entries()) {
    const markdown = await readFile(path.join(projectRoot, page.target), "utf8");
    const html = pageTemplate(page, renderMarkdown(markdown, page.target), pageIndex);
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    await writeFile(path.join(bookOutput, outputName), html);
  }

  for (const page of pages) {
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    await access(path.join(bookOutput, outputName), constants.R_OK);
  }

  return { pageCount: pages.length, sourceCommit };
}
