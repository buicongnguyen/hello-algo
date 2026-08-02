import path from "node:path";

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function readMathGroup(value, start) {
  while (/\s/.test(value[start] || "")) start += 1;
  if (value[start] !== "{") return null;
  let depth = 0;
  for (let index = start; index < value.length; index += 1) {
    if (value[index] === "{") depth += 1;
    if (value[index] === "}") depth -= 1;
    if (depth === 0) return { content: value.slice(start + 1, index), end: index + 1 };
  }
  return null;
}

function replaceFractions(value) {
  let output = "";
  let cursor = 0;
  while (cursor < value.length) {
    const fractionIndex = value.indexOf("\\frac", cursor);
    if (fractionIndex < 0) return output + value.slice(cursor);
    const numerator = readMathGroup(value, fractionIndex + "\\frac".length);
    const denominator = numerator && readMathGroup(value, numerator.end);
    if (!numerator || !denominator) {
      output += value.slice(cursor, fractionIndex) + "frac";
      cursor = fractionIndex + "\\frac".length;
      continue;
    }
    output += value.slice(cursor, fractionIndex);
    output += `(${replaceFractions(numerator.content)})/(${replaceFractions(denominator.content)})`;
    cursor = denominator.end;
  }
  return output;
}

const formatMath = (value) => replaceFractions(value)
  .replace(/\\begin\s*\{[^{}]+\}/g, "")
  .replace(/\\end\s*\{[^{}]+\}/g, "")
  .replace(/\\(?:mathrm|text)\s*\{([^{}]*)\}/g, "$1")
  .replace(/\\hat\s*\{([^{}]*)\}/g, "$1̂")
  .replaceAll("\\Rightarrow", "⇒")
  .replaceAll("\\rightarrow", "→")
  .replaceAll("\\leftarrow", "←")
  .replaceAll("\\left", "")
  .replaceAll("\\right", "")
  .replace(/\\([{}])/g, "$1")
  .replaceAll("\\newline", "\n")
  .replaceAll("\\infty", "∞")
  .replaceAll("\\approx", "≈")
  .replaceAll("\\subset", "⊂")
  .replaceAll("\\pm", "±")
  .replaceAll("\\ne", "≠")
  .replace(/\\in\b/g, "∈")
  .replaceAll("\\sum", "Σ")
  .replaceAll("\\prod", "Π")
  .replaceAll("\\bmod", " mod ")
  .replaceAll("\\min", "min")
  .replaceAll("\\max", "max")
  .replaceAll("\\ll", "≪")
  .replaceAll("\\gg", "≫")
  .replaceAll("\\quad", "  ")
  .replaceAll("\\ldots", "…")
  .replaceAll("\\log", "log")
  .replaceAll("\\Omega", "Ω")
  .replaceAll("\\Theta", "Θ")
  .replaceAll("\\times", "×")
  .replaceAll("\\cdot", "·")
  .replaceAll("\\dots", "…")
  .replace(/\\leq?/g, "≤")
  .replace(/\\geq?/g, "≥")
  .replaceAll("\\lfloor", "⌊")
  .replaceAll("\\rfloor", "⌋")
  .replaceAll("\\;", " ")
  .replace(/\\(?=\s)/g, "")
  .replace(/\\([A-Za-z]+)/g, "$1")
  .replaceAll("&", "")
  .trim();

const prepareMath = (value) => value.replaceAll("\\newline", "\\\\");
const encodeMath = (value) => Buffer.from(prepareMath(value), "utf8").toString("base64");

function markdownAttributes(rawAttributes, allowedNames) {
  const classes = [];
  const named = new Map();
  let remaining = (rawAttributes || "").trim();
  const tokenPattern = /^(?:\.([a-zA-Z][a-zA-Z0-9_-]*)|([a-zA-Z][a-zA-Z0-9_-]*)=(?:"([^"]*)"|'([^']*)'|([^\s]+)))(?:\s+|$)/;

  while (remaining) {
    const token = remaining.match(tokenPattern);
    if (!token) break;
    remaining = remaining.slice(token[0].length).trimStart();
    if (token[1]) {
      classes.push(token[1]);
      continue;
    }

    const name = token[2].toLowerCase();
    const value = token[3] ?? token[4] ?? token[5] ?? "";
    if (name === "class") {
      classes.push(...value.split(/\s+/).filter((className) => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(className)));
    } else if (allowedNames.has(name)) {
      named.set(name, value);
    }
  }

  return { classes: [...new Set(classes)], named };
}

function linkAttributes(rawAttributes) {
  const parsed = markdownAttributes(rawAttributes, new Set(["target", "rel"]));
  const attributes = [];
  if (parsed.classes.length) attributes.push(`class="${escapeHtml(parsed.classes.join(" "))}"`);

  const requestedTarget = parsed.named.get("target");
  const target = new Set(["_blank", "_self", "_parent", "_top"]).has(requestedTarget) ? requestedTarget : "";
  if (target) attributes.push(`target="${target}"`);

  const relTokens = (parsed.named.get("rel") || "")
    .split(/\s+/)
    .filter((token) => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(token));
  if (target === "_blank") relTokens.push("noopener", "noreferrer");
  const rel = [...new Set(relTokens)];
  if (rel.length) attributes.push(`rel="${escapeHtml(rel.join(" "))}"`);
  return attributes.length ? ` ${attributes.join(" ")}` : "";
}

function imageAttributes(rawAttributes) {
  const { classes } = markdownAttributes(rawAttributes, new Set());
  return classes.length ? ` class="${escapeHtml(classes.join(" "))}"` : "";
}

function renderInline(value) {
  const tokens = [];
  const protect = (html) => {
    const token = `@@TOKEN${tokens.length}@@`;
    tokens.push(html);
    return token;
  };
  const safeUrl = /^(?:https?:\/\/[^\s"'<>]+|mailto:[^\s"'<>]+|#[a-zA-Z0-9_-]+|\.{0,2}\/[a-zA-Z0-9_./#-]*|[a-zA-Z0-9_./-]+(?:#[a-zA-Z0-9_-]+)?)$/;
  const protectedValue = value
    .replaceAll("<u>", () => protect("<u>"))
    .replaceAll("</u>", () => protect("</u>"))
    .replace(/`([^`]+)`/g, (_, code) => protect(`<code>${escapeHtml(code)}</code>`))
    .replace(/\$([^$]+)\$/g, (_, expression) => {
      return protect(`<span class="math" data-math="${encodeMath(expression)}">${escapeHtml(formatMath(expression))}</span>`);
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)(?:\s*\{([^{}]*)\})?/g, (_, label, url, rawAttributes) => {
      if (!safeUrl.test(url)) return escapeHtml(label);
      return protect(`<a href="${escapeHtml(url)}"${linkAttributes(rawAttributes)}>${escapeHtml(label)}</a>`);
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
  const relativeDirectory = sourceDirectory.replace(/^(?:en|vi|ko)\/docs\//, "");
  return `assets/${relativeDirectory}/${reference}`;
}

function isTableDivider(line) {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

const programmingLanguages = new Set(["Python", "C++", "Java", "C#", "Go", "Swift", "JS", "TS", "Dart", "Rust", "C", "Kotlin", "Ruby"]);

function tabListLabel(sourcePath, synchronized) {
  if (sourcePath.startsWith("vi/")) return synchronized ? "Ví dụ theo ngôn ngữ lập trình" : "Các bước minh họa";
  if (sourcePath.startsWith("ko/")) return synchronized ? "프로그래밍 언어 예제" : "그림 단계";
  return synchronized ? "Programming language examples" : "Illustration steps";
}

function headingSlug(value) {
  const plain = value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`~]/g, "")
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return plain || "section";
}

function uniqueHeadingId(value, tabState) {
  tabState.headingCounts ??= new Map();
  const base = headingSlug(value);
  const occurrence = (tabState.headingCounts.get(base) || 0) + 1;
  tabState.headingCounts.set(base, occurrence);
  return occurrence === 1 ? base : `${base}-${occurrence}`;
}

export function articleOutline(body, label) {
  const links = [...body.matchAll(/<h([1-3]) id="([^"]+)">([\s\S]*?)<a class="heading-anchor"/g)]
    .map((match) => `<a class="outline-level-${match[1]}" href="#${match[2]}">${match[3].replace(/<[^>]+>/g, "")}</a>`)
    .join("");
  return links
    ? `<details class="article-outline"><summary>${escapeHtml(label)}</summary><nav aria-label="${escapeHtml(label)}">${links}</nav></details>`
    : "";
}

export function markdownHeadings(markdown) {
  const headings = [];
  let fence = null;
  let inComment = false;
  for (const rawLine of markdown.replaceAll("\r\n", "\n").split("\n")) {
    if (fence !== null) {
      const fenceMarker = rawLine.match(/^\s*(`{3,}|~{3,})/)?.[1];
      if (fenceMarker?.[0] === fence.marker && fenceMarker.length >= fence.length) fence = null;
      continue;
    }

    let line = rawLine;
    if (inComment) {
      const commentEnd = line.indexOf("-->");
      if (commentEnd < 0) continue;
      line = line.slice(commentEnd + 3);
      inComment = false;
    }

    while (line.includes("<!--")) {
      const commentStart = line.indexOf("<!--");
      const commentEnd = line.indexOf("-->", commentStart + 4);
      if (commentEnd < 0) {
        line = line.slice(0, commentStart);
        inComment = true;
        break;
      }
      line = line.slice(0, commentStart) + line.slice(commentEnd + 3);
    }

    const fenceMarker = line.match(/^\s*(```+|~~~+)/)?.[1];
    if (fenceMarker) {
      fence = { marker: fenceMarker[0], length: fenceMarker.length };
      continue;
    }

    const match = line.match(/^#{1,4}\s+(.+)$/);
    if (!match) continue;
    headings.push(match[1]
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .replace(/<[^>]+>/g, "")
      .trim());
  }
  return headings;
}

function listItemDescriptor(line) {
  const match = line.match(/^(\s*)(\d+\.|[-*+])\s+(.+)$/);
  if (!match) return null;
  return {
    indent: match[1].replaceAll("\t", "    ").length,
    ordered: /^\d+\.$/.test(match[2]),
    start: Number.parseInt(match[2], 10) || 1,
    content: match[3].trim()
  };
}

function startsBlock(line, lines, index) {
  const trimmed = line.trimStart();
  return /^(?:#{1,4}\s+|===\s+|!\[|>|```|~~~|\$\$\s*$|!!!\s+|\?\?\?\s+)/.test(trimmed) ||
    (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1]));
}

function lineIndent(line) {
  return line.match(/^\s*/)[0].replaceAll("\t", "    ").length;
}

function renderList(lines, start, sourcePath, tabState) {
  const first = listItemDescriptor(lines[start]);
  const baseIndent = first.indent;
  const ordered = first.ordered;
  const tag = ordered ? "ol" : "ul";
  const items = [];
  let index = start;

  const renderChildBlock = (blockStart) => {
    let blockEnd = blockStart;
    while (blockEnd < lines.length) {
      if (!lines[blockEnd].trim()) {
        blockEnd += 1;
        continue;
      }
      const descriptor = listItemDescriptor(lines[blockEnd]);
      if (lineIndent(lines[blockEnd]) <= baseIndent ||
          (descriptor?.indent === baseIndent && descriptor.ordered === ordered)) break;
      blockEnd += 1;
    }
    const childIndent = baseIndent + 4;
    const markdown = lines.slice(blockStart, blockEnd)
      .map((line) => line.startsWith(" ".repeat(childIndent)) ? line.slice(childIndent) : line.trimStart())
      .join("\n")
      .trimEnd();
    return {
      html: renderMarkdown(markdown, sourcePath, tabState),
      index: blockEnd
    };
  };

  while (index < lines.length) {
    const current = listItemDescriptor(lines[index]);
    if (!current || current.indent !== baseIndent || current.ordered !== ordered) break;
    const segments = [];
    let text = [current.content];
    const flushText = () => {
      if (!text.length) return;
      segments.push(renderInline(text.join(" ")));
      text = [];
    };
    index += 1;

    while (index < lines.length) {
      if (!lines[index].trim()) {
        let lookahead = index;
        while (lookahead < lines.length && !lines[lookahead].trim()) lookahead += 1;
        const next = listItemDescriptor(lines[lookahead] || "");
        if (next?.indent === baseIndent && next.ordered === ordered) {
          index = lookahead;
          break;
        }
        if (lookahead < lines.length && lineIndent(lines[lookahead]) > baseIndent) {
          index = lookahead;
          flushText();
          const child = renderChildBlock(index);
          segments.push(child.html);
          index = child.index;
          continue;
        }
        break;
      }

      const next = listItemDescriptor(lines[index]);
      if (next) {
        if (next.indent <= baseIndent) break;
        flushText();
        const child = renderChildBlock(index);
        segments.push(child.html);
        index = child.index;
        continue;
      }
      if (lineIndent(lines[index]) > baseIndent && startsBlock(lines[index], lines, index)) {
        flushText();
        const child = renderChildBlock(index);
        segments.push(child.html);
        index = child.index;
        continue;
      }
      if (startsBlock(lines[index], lines, index)) break;
      text.push(lines[index].trim());
      index += 1;
    }

    flushText();
    items.push(`<li>${segments.join("")}</li>`);
  }

  return {
    html: `<${tag}${ordered && first.start !== 1 ? ` start="${first.start}"` : ""}>${items.join("")}</${tag}>`,
    index
  };
}

export function renderMarkdown(markdown, sourcePath, tabState = { count: 0, headingCounts: new Map() }) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith("<!--")) {
      while (index < lines.length && !lines[index].includes("-->")) index += 1;
      index += 1;
      continue;
    }

    const admonition = line.trimStart().match(/^(?:!!!|\?\?\?)\s+(\w+)(?:\s+"([^"]+)")?/);
    if (admonition) {
      const content = [];
      index += 1;
      while (index < lines.length && (!lines[index].trim() || /^\s{4}/.test(lines[index]))) {
        content.push(lines[index].replace(/^\s{4}/, ""));
        index += 1;
      }
      const kind = admonition[1].replace(/[^a-zA-Z0-9_-]/g, "");
      const label = admonition[2] || admonition[1][0].toUpperCase() + admonition[1].slice(1);
      const admonitionContent = content.join("\n");
      const visualizationUrl = kind === "pythontutor" && admonitionContent.trim().match(/^https:\/\/pythontutor\.com\/\S+$/)?.[0];
      const visualizationLabel = sourcePath.startsWith("vi/")
        ? "Mở trực quan hóa mã tương tác ↗"
        : sourcePath.startsWith("ko/") ? "대화형 코드 시각화 열기 ↗" : "Open interactive code visualization ↗";
      const renderedContent = visualizationUrl
        ? `<p><a class="visualization-link" href="${escapeHtml(visualizationUrl)}" target="_blank" rel="noreferrer">${visualizationLabel}</a></p>`
        : renderMarkdown(admonitionContent, sourcePath, tabState);
      output.push(`<aside class="admonition admonition-${kind}"><strong>${escapeHtml(label)}</strong>${renderedContent}</aside>`);
      continue;
    }

    if (/^===\s+"([^"]+)"/.test(line)) {
      const tabs = [];
      while (index < lines.length) {
        const tab = lines[index].match(/^===\s+"([^"]+)"/);
        if (!tab) break;
        const content = [];
        index += 1;
        while (index < lines.length && (lines[index] === "" || /^\s{4}/.test(lines[index]))) {
          content.push(lines[index].replace(/^\s{4}/, ""));
          index += 1;
        }
        tabs.push({ label: tab[1], markdown: content.join("\n") });
      }
      if (tabs.length < 2) throw new Error(`A tab group in ${sourcePath} contains fewer than two choices`);

      tabState.count += 1;
      const groupId = `content-tabs-${tabState.count}`;
      const synchronized = tabs.every((tab) => programmingLanguages.has(tab.label));
      const tabButtons = tabs.map((tab, tabIndex) => {
        const selected = tabIndex === 0;
        return `<button type="button" role="tab" id="${groupId}-tab-${tabIndex + 1}" aria-controls="${groupId}-panel-${tabIndex + 1}" aria-selected="${selected}" tabindex="${selected ? "0" : "-1"}" data-tab-label="${escapeHtml(tab.label)}">${escapeHtml(tab.label)}</button>`;
      }).join("");
      const tabPanels = tabs.map((tab, tabIndex) => {
        const selected = tabIndex === 0;
        return `<div class="content-tabpanel" role="tabpanel" tabindex="0" id="${groupId}-panel-${tabIndex + 1}" aria-labelledby="${groupId}-tab-${tabIndex + 1}"${selected ? "" : " hidden"}>${renderMarkdown(tab.markdown, sourcePath, tabState)}</div>`;
      }).join("");
      output.push(`<section class="content-tabs" data-content-tabs${synchronized ? ' data-tab-sync="language"' : ""}><div class="content-tablist" role="tablist" aria-label="${tabListLabel(sourcePath, synchronized)}">${tabButtons}</div><div class="content-tabpanels">${tabPanels}</div></section>`);
      continue;
    }

    const codeFence = line.match(/^```([^\s`]*)/);
    if (codeFence) {
      const language = codeFence[1].replace(/[^a-zA-Z0-9_-]/g, "");
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trimStart().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index >= lines.length) throw new Error(`Unclosed code fence in ${sourcePath}`);
      index += 1;
      output.push(`<pre><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (line.trim() === "$$") {
      const expression = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== "$$") {
        expression.push(lines[index].trim());
        index += 1;
      }
      if (index >= lines.length) throw new Error(`Unclosed display math in ${sourcePath}`);
      index += 1;
      const rawExpression = expression.join("\n");
      output.push(`<div class="math-block" role="math" data-math="${encodeMath(rawExpression)}">${escapeHtml(formatMath(rawExpression))}</div>`);
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const id = uniqueHeadingId(heading[2], tabState);
      const anchorLabel = sourcePath.startsWith("vi/")
        ? "Liên kết đến mục này"
        : sourcePath.startsWith("ko/") ? "이 절로 연결" : "Link to this section";
      output.push(`<h${level} id="${id}">${renderInline(heading[2])}<a class="heading-anchor" href="#${id}" aria-label="${anchorLabel}">#</a></h${level}>`);
      index += 1;
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\s*\{([^{}]*)\})?$/);
    if (image) {
      output.push(`<figure><img${imageAttributes(image[3])} src="${escapeHtml(assetUrl(sourcePath, image[2]))}" alt="${escapeHtml(image[1])}" loading="lazy"><figcaption>${renderInline(image[1])}</figcaption></figure>`);
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

    if (listItemDescriptor(line)) {
      const list = renderList(lines, index, sourcePath, tabState);
      output.push(list.html);
      index = list.index;
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
      if (!next.trim() || /^(#{1,4})\s+/.test(next) || /^===\s+/.test(next) || /^!\[/.test(next) || next.startsWith(">") || next.startsWith("```") || next.startsWith("~~~") || next.trim() === "$$" || listItemDescriptor(next)) break;
      if (next.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;
      paragraph.push(next.trim());
      index += 1;
    }
    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return output.join("\n");
}
