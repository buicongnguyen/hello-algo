import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { localizeVietnameseAtlas } from "./localize-vi-atlas.mjs";
import { htmlTranslations, interactiveLocale } from "../vi/atlas-locale.mjs";
import { localizeKoreanAtlas } from "./localize-ko-atlas.mjs";
import { interactiveLocale as koreanInteractiveLocale } from "../ko/atlas-locale.mjs";
import { createTranslationRegistry, markdownStructure, translationReadinessFailures } from "./translation-registry.mjs";
import { createTranslationParityReport } from "./translation-parity.mjs";
import { resolveByteRange, resolveSiteRequest } from "./server-path.mjs";
import { markdownHeadings, renderMarkdown } from "./markdown-renderer.mjs";
import { addEnglishTerminology, restoreIllustrationTabs } from "./localized-content.mjs";
import {
  extractSourceSnippet,
  localizeSourceExamples,
  sourceCodeLanguages,
  sourceDirectiveTabs,
  sourceExampleGroups
} from "./source-code-tabs.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "README.md",
  "styles.css",
  "app.js",
  ".nojekyll",
  ".dockerignore",
  "Dockerfile",
  "docker-compose.yml",
  "vi/atlas-locale.mjs",
  "reader/book.css",
  "reader/book.js",
  "vi/README.md",
  "vi/CONTRIBUTING.md",
  "vi/glossary.md",
  "vi/style-guide.md",
  "vi/translation-status.json",
  "scripts/build-vi-book.mjs",
  "scripts/check-dist.mjs",
  "scripts/localize-vi-atlas.mjs",
  "VIETNAMESE_TRANSLATION_PLAN.md",
  "KOREAN_TRANSLATION_PLAN.md",
  "PR_1935_COMPARISON.md",
  "ko/atlas-locale.mjs", "ko/README.md", "ko/CONTRIBUTING.md", "ko/glossary.md", "ko/style-guide.md", "ko/translation-status.json",
  "scripts/build-en-book.mjs", "scripts/build-ko-book.mjs", "scripts/localize-ko-atlas.mjs", "scripts/localize-atlas.mjs", "scripts/translation-registry.mjs",
  "scripts/source-code-tabs.mjs",
  "scripts/translation-parity.mjs",
  "scripts/compare-vietnamese-refs.mjs",
  "scripts/check-full-book.mjs",
  "scripts/markdown-renderer.mjs",
  "scripts/localized-content.mjs",
  "scripts/server-path.mjs",
  "scripts/serve-site.mjs",
  ".github/workflows/ci.yml",
  ".github/ISSUE_TEMPLATE/ko-translation.yml",
  ".github/PULL_REQUEST_TEMPLATE/ko-translation.md",
  "NEXT_RELEASE_PLAN.md",
  "NEXT_CONTENT_RELEASE_PLAN.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_3.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_4.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_5.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_6.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_7.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_8.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_9.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_10.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_11.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_12.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_13.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_14.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_15.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_16.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_17.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_18.md",
  "NEXT_CONTENT_RELEASE_PLAN_V1_19.md"
];

for (const relativePath of requiredFiles) {
  await access(path.join(projectRoot, relativePath), constants.R_OK);
}

const html = await readFile(path.join(projectRoot, "index.html"), "utf8");
const rootReadme = await readFile(path.join(projectRoot, "README.md"), "utf8");
const css = await readFile(path.join(projectRoot, "styles.css"), "utf8");
const js = await readFile(path.join(projectRoot, "app.js"), "utf8");
const viHtml = localizeVietnameseAtlas(html);
const koHtml = localizeKoreanAtlas(html);
const bookCss = await readFile(path.join(projectRoot, "reader", "book.css"), "utf8");
const bookJs = await readFile(path.join(projectRoot, "reader", "book.js"), "utf8");
const translationStatus = JSON.parse(await readFile(path.join(projectRoot, "vi", "translation-status.json"), "utf8"));
const translationPlan = await readFile(path.join(projectRoot, "VIETNAMESE_TRANSLATION_PLAN.md"), "utf8");
const koreanPlan = await readFile(path.join(projectRoot, "KOREAN_TRANSLATION_PLAN.md"), "utf8");
const vietnameseGlossary = await readFile(path.join(projectRoot, "vi", "glossary.md"), "utf8");
const koreanReadme = await readFile(path.join(projectRoot, "ko", "README.md"), "utf8");
const koreanContributing = await readFile(path.join(projectRoot, "ko", "CONTRIBUTING.md"), "utf8");
const comparisonScript = await readFile(path.join(projectRoot, "scripts", "compare-vietnamese-refs.mjs"), "utf8");
const koreanStatus = JSON.parse(await readFile(path.join(projectRoot, "ko", "translation-status.json"), "utf8"));
const dockerfile = await readFile(path.join(projectRoot, "Dockerfile"), "utf8");
const dockerCompose = await readFile(path.join(projectRoot, "docker-compose.yml"), "utf8");
const translationRegistry = createTranslationRegistry({ vi: translationStatus, ko: koreanStatus });

const failures = [];
const codeAwareStructure = markdownStructure("Text $n$\n\n```text\n$not_math$\n```");
if (codeAwareStructure.inlineMath !== 1) {
  failures.push("Translation parity must ignore math-like tokens inside fenced code");
}
function registryAccepts(manifests) {
  try {
    createTranslationRegistry(manifests);
    return true;
  } catch {
    return false;
  }
}

function countMarkdownH1(markdown) {
  let inCodeFence = false;
  let count = 0;
  for (const line of markdown.replaceAll("\r\n", "\n").split("\n")) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (!inCodeFence && line.startsWith("# ")) count += 1;
  }
  return count;
}

const tabFixture = `=== "Python"

    \`\`\`python
    print("one")
    \`\`\`

=== "C++"

    \`\`\`cpp
    std::cout << "one";
    \`\`\``;
const tabFixtureExpectations = [
  ["en/docs/test.md", "Programming language examples"],
  ["vi/docs/test.md", "Ví dụ theo ngôn ngữ lập trình"],
  ["ko/docs/test.md", "프로그래밍 언어 예제"]
];
for (const [sourcePath, ariaLabel] of tabFixtureExpectations) {
  const renderedTabs = renderMarkdown(tabFixture, sourcePath);
  if (!renderedTabs.includes(`role="tablist" aria-label="${ariaLabel}"`) ||
      (renderedTabs.match(/role="tab"/g) || []).length !== 2 ||
      (renderedTabs.match(/role="tabpanel"/g) || []).length !== 2 ||
      (renderedTabs.match(/role="tabpanel" tabindex="0"/g) || []).length !== 2 ||
      (renderedTabs.match(/aria-selected="true"/g) || []).length !== 1 ||
      !renderedTabs.includes('data-tab-sync="language"')) {
    failures.push(`Shared Markdown renderer does not create accessible synchronized tabs for ${sourcePath}`);
  }
}
const illustrationTabs = renderMarkdown(`=== "<1>"

    First step

=== "<2>"

    Second step`, "vi/docs/test.md");
if (!illustrationTabs.includes('aria-label="Các bước minh họa"') || illustrationTabs.includes('data-tab-sync="language"')) {
  failures.push("Shared Markdown renderer does not keep illustration tabs independent");
}

const englishIllustrationFixture = `Before

=== "<1>"
    ![First](steps/step1.png)

=== "<2>"
    ![Second](steps/step2.png)

After`;
const localizedIllustrationFixture = `Trước

![Bước một](steps/step1.png)

![Bước hai](steps/step2.png)

Sau`;
const restoredIllustrations = restoreIllustrationTabs(englishIllustrationFixture, localizedIllustrationFixture);
const restoredIllustrationHtml = renderMarkdown(restoredIllustrations.markdown, "vi/docs/test.md");
if (restoredIllustrations.restoredGroups !== 1 || restoredIllustrations.unresolved.length ||
    (restoredIllustrationHtml.match(/role="tab"/g) || []).length !== 2 ||
    !restoredIllustrationHtml.includes('alt="Bước một"') || !restoredIllustrationHtml.includes('alt="Bước hai"')) {
  failures.push("Localized readers do not restore English illustration tabs while preserving translated captions");
}
const terminologyFixture = addEnglishTerminology('<h1 id="stack">Ngăn xếp</h1><p>Nội dung</p>', "Stack", "vi");
if (!terminologyFixture.includes('<p class="english-term" role="note"><span>Thuật ngữ tiếng Anh</span><strong lang="en">Stack</strong></p>')) {
  failures.push("Localized reader headings do not expose their English terminology");
}

const attributedElements = renderMarkdown(`[LeetCode](https://leetcode.com/problems/number-of-1-bits/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }

![Cover](../assets/covers/chapter_hello_algo.jpg){ class="cover-image" }`, "vi/docs/test.md");
if (!attributedElements.includes('<a href="https://leetcode.com/problems/number-of-1-bits/" class="rounded-button exercise-button" target="_blank" rel="noopener noreferrer">LeetCode</a>') ||
    !attributedElements.includes('<img class="cover-image" src="assets/covers/chapter_hello_algo.jpg"') ||
    attributedElements.includes("{ .rounded-button")) {
  failures.push("Shared Markdown renderer does not safely apply inline link or image attributes");
}
const filteredAttributes = renderMarkdown('[External](https://example.com/){ target="_blank" onclick="alert(1)" }', "en/docs/test.md");
if (!filteredAttributes.includes('<a href="https://example.com/" target="_blank" rel="noopener noreferrer">External</a>') ||
    filteredAttributes.includes("onclick")) {
  failures.push("Shared Markdown renderer does not reject unsafe attributes or secure new-tab links");
}

const nestedListFixture = renderMarkdown(`??? success "Answer"

    1. First:

        - A
        - B

    2. Second`, "en/docs/test.md");
if (!nestedListFixture.includes("<ol><li>First:<ul><li>A</li><li>B</li></ul></li><li>Second</li></ol>")) {
  failures.push("Shared Markdown renderer does not preserve nested list hierarchy inside admonitions");
}

const searchableHeadings = markdownHeadings(`# Real heading

\`\`\`python
# Not a heading
\`\`\`

~~~text
## Also not a heading
~~~

<!-- # Hidden heading -->

## Also real <!-- editorial note -->`);
if (JSON.stringify(searchableHeadings) !== JSON.stringify(["Real heading", "Also real"])) {
  failures.push("Reader search headings include fenced-code or HTML-comment content");
}

const sourceCodeTabsFixture = await sourceDirectiveTabs({
  projectRoot,
  sourcePath: "en/docs/chapter_array_and_linkedlist/array.md",
  file: "array",
  className: "",
  functionName: "random_access"
});
if ((sourceCodeTabsFixture.match(/^=== "/gm) || []).length !== sourceCodeLanguages.length ||
    !sourceCodeTabsFixture.includes("def random_access(") ||
    !sourceCodeTabsFixture.includes("int randomAccess(") ||
    !sourceCodeTabsFixture.includes('=== "Ruby"')) {
  failures.push("Official source directives do not expand to all 13 programming-language snippets");
}
const arraySourceMarkdown = await readFile(path.join(projectRoot, "en", "docs", "chapter_array_and_linkedlist", "array.md"), "utf8");
const arrayTargetMarkdown = await readFile(path.join(projectRoot, "vi", "docs", "chapter_array_and_linkedlist", "array.md"), "utf8");
const arraySourceGroups = await sourceExampleGroups({
  projectRoot,
  sourcePath: "en/docs/chapter_array_and_linkedlist/array.md",
  sourceMarkdown: arraySourceMarkdown
});
const localizedArrayExamples = await localizeSourceExamples({
  projectRoot,
  sourcePath: "en/docs/chapter_array_and_linkedlist/array.md",
  sourceMarkdown: arraySourceMarkdown,
  targetMarkdown: arrayTargetMarkdown,
  locale: "vi"
});
if (arraySourceGroups.length !== 7 ||
    localizedArrayExamples.sourceGroups !== 7 ||
    localizedArrayExamples.inlineGroups !== 7 ||
    localizedArrayExamples.deferredGroups !== 0 ||
    localizedArrayExamples.markdown.includes("đang chờ đặt vào bản dịch đầy đủ") ||
    (localizedArrayExamples.markdown.match(/^=== "/gm) || []).length !== 7 * sourceCodeLanguages.length) {
  failures.push("Localized readers do not restore both explicit and source-directive code groups inline");
}
const binaryTreeSourceMarkdown = await readFile(path.join(projectRoot, "en", "docs", "chapter_tree", "binary_tree.md"), "utf8");
const binaryTreeTargetMarkdown = await readFile(path.join(projectRoot, "vi", "docs", "chapter_tree", "binary_tree.md"), "utf8");
const localizedBinaryTreeExamples = await localizeSourceExamples({
  projectRoot,
  sourcePath: "en/docs/chapter_tree/binary_tree.md",
  sourceMarkdown: binaryTreeSourceMarkdown,
  targetMarkdown: binaryTreeTargetMarkdown,
  locale: "vi"
});
if (localizedBinaryTreeExamples.sourceGroups !== 3 ||
    localizedBinaryTreeExamples.inlineGroups !== 3 ||
    localizedBinaryTreeExamples.deferredGroups !== 0 ||
    localizedBinaryTreeExamples.markdown.includes("đang chờ đặt vào bản dịch đầy đủ") ||
    (localizedBinaryTreeExamples.markdown.match(/^=== "/gm) || []).length !== 3 * sourceCodeLanguages.length) {
  failures.push("Vietnamese binary-tree content does not place every official code group inline");
}
const dartQuickSort = await readFile(path.join(projectRoot, "en", "codes", "dart", "chapter_sorting", "quick_sort.dart"), "utf8");
const dartLanguage = sourceCodeLanguages.find((language) => language.label === "Dart");
const standardPartition = extractSourceSnippet(dartQuickSort, { className: "quick_sort", functionName: "partition", language: dartLanguage, file: "quick_sort" });
const medianPartition = extractSourceSnippet(dartQuickSort, { className: "quick_sort_median", functionName: "partition", language: dartLanguage, file: "quick_sort" });
if (!standardPartition?.includes("Use nums[left] as the pivot") ||
    !medianPartition?.includes("median of three") ||
    standardPartition === medianPartition) {
  failures.push("Source-code extraction does not respect the requested class when method names repeat");
}

const renderedMath = renderMarkdown(String.raw`Inline $x \ne 0$.

$$
\begin{aligned}
a & \rightarrow b \newline
c & \in \{1, 2\}
\end{aligned}
$$`, "en/docs/test.md");
const mathSources = [...renderedMath.matchAll(/data-math="([^"]+)"/g)].map((match) => Buffer.from(match[1], "base64").toString("utf8"));
if (mathSources.length !== 2 ||
    !mathSources[0].includes(String.raw`\ne`) ||
    !mathSources[1].includes(String.raw`\begin{aligned}`) ||
    mathSources[1].includes(String.raw`\newline`) ||
    !mathSources[1].includes("\\\\") ||
    !renderedMath.includes("→") ||
    renderedMath.includes(" arrow ") ||
    /<(?:span|div) class="(?:math|math-block)"[^>]*>[^<]*\\[A-Za-z]+/.test(renderedMath)) {
  failures.push("Shared Markdown renderer does not preserve complex math for KaTeX with a readable fallback");
}

const renderedTerminology = renderMarkdown("Technical <u>array</u> and <u>big-$O$ notation</u>.", "en/docs/test.md");
if (!renderedTerminology.includes("<u>array</u>") ||
    !renderedTerminology.includes("<u>big-<span class=\"math\"") ||
    renderedTerminology.includes("&lt;u&gt;")) {
  failures.push("Shared Markdown renderer does not safely preserve underlined technical terms");
}

const validServerPath = resolveSiteRequest(path.join(projectRoot, "dist"), "/en/");
const malformedServerPath = resolveSiteRequest(path.join(projectRoot, "dist"), "/%E0%A4%A");
const traversalServerPath = resolveSiteRequest(path.join(projectRoot, "dist"), "/%2e%2e%2fpackage.json");
if (!validServerPath.candidate?.endsWith(path.join("dist", "en", "index.html")) ||
    malformedServerPath.error !== 400 || traversalServerPath.error !== 403) {
  failures.push("Local server path resolution does not safely handle valid, malformed, and traversal URLs");
}
const normalRange = resolveByteRange("bytes=10-19", 100);
const openRange = resolveByteRange("bytes=90-", 100);
const suffixRange = resolveByteRange("bytes=-10", 100);
if (JSON.stringify(normalRange) !== JSON.stringify({ start: 10, end: 19, length: 10 }) ||
    JSON.stringify(openRange) !== JSON.stringify({ start: 90, end: 99, length: 10 }) ||
    JSON.stringify(suffixRange) !== JSON.stringify({ start: 90, end: 99, length: 10 }) ||
    resolveByteRange("bytes=100-", 100)?.error !== 416 ||
    resolveByteRange("bytes=0-1,4-5", 100)?.error !== 416) {
  failures.push("Local media server does not resolve normal, open, suffix, and invalid byte ranges safely");
}
if (!dockerfile.includes("FROM node:24-alpine AS build") ||
    !dockerfile.includes("RUN npm run build") ||
    !dockerfile.includes("ENV HELLO_ALGO_HOST=0.0.0.0") ||
    /COPY (?:docs|overrides|zh-hant|ja|ru)\b/.test(dockerfile) ||
    /^\s*version:/m.test(dockerCompose)) {
  failures.push("Docker workflow is not aligned with the current Node-built trilingual site");
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...ids].filter((id) => html.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate HTML id: ${duplicate}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  if (reference === "../vi/" || reference === "../ko/" || reference === "learn/") continue;
  const localPath = path.join(projectRoot, decodeURIComponent(reference));
  try {
    await access(localPath, constants.R_OK);
  } catch {
    failures.push(`Missing local reference: ${reference}`);
  }
}

const viIds = new Set([...viHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const duplicate of [...viIds].filter((id) => viHtml.match(new RegExp(`id="${id}"`, "g"))?.length > 1)) {
  failures.push(`Duplicate Vietnamese HTML id: ${duplicate}`);
}

for (const match of viHtml.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].split("?")[0].split("#")[0];
  if (!reference || /^(https?:|mailto:|data:)/.test(reference)) continue;
  if (reference.startsWith("learn/")) continue;
  const localPath = path.resolve(projectRoot, "vi", decodeURIComponent(reference));
  try {
    await access(localPath, constants.R_OK);
  } catch {
    failures.push(`Missing Vietnamese local reference: ${reference}`);
  }
}

for (const selector of [
  "roadmap-canvas",
  "structure-visual",
  "traversal-canvas",
  "complexity-canvas",
  "binary-array",
  "binary-target",
  "binary-next",
  "theme-toggle"
]) {
  if (!html.includes(`id="${selector}"`) || !js.includes(`#${selector}`)) {
    failures.push(`Interactive element is not wired: ${selector}`);
  }
}

const motionSources = [...html.matchAll(/<source src="([^"]+\.mp4)"/g)].map((match) => match[1]);
if (motionSources.length !== 3) failures.push(`Expected 3 motion demos, found ${motionSources.length}`);
if (!js.includes("IntersectionObserver") || !js.includes("prefers-reduced-motion")) {
  failures.push("Motion playback does not include visibility and reduced-motion handling");
}
if (!js.includes('["light", "dark"].includes(savedTheme)') || !js.includes("Array.isArray(storedTopics)") || !js.includes("Object.hasOwn(topicData, topic)")) {
  failures.push("Atlas persisted theme and learning-progress state is not validated");
}
if (!html.includes('id="theme-toggle" type="button" aria-label="Light theme" title="Light theme" aria-pressed="false"') ||
    !viHtml.includes('aria-label="Giao diện sáng" title="Giao diện sáng" aria-pressed="false"') ||
    !koHtml.includes('aria-label="밝은 테마" title="밝은 테마" aria-pressed="false"') ||
    !js.includes("syncThemeToggle") ||
    !js.includes('setAttribute("aria-pressed"')) {
  failures.push("Atlas theme control does not expose a synchronized localized pressed state");
}
if (!js.includes("traversedEdges.has(traversalEdgeKey(a, b))") || !js.includes("traversedEdges.add(traversalEdgeKey(current, node))")) {
  failures.push("Traversal visualization does not track the actual BFS/DFS discovery edges");
}
const autoRestartIndex = js.indexOf('if (!frontier.length) resetTraversal();');
const autoPauseIndex = js.indexOf('document.querySelector("#auto-play").textContent = message("pause", "Pause");', autoRestartIndex);
if (autoRestartIndex < 0 || autoPauseIndex < autoRestartIndex) {
  failures.push("Traversal autoplay does not restore its Pause label after restarting");
}

if (!css.includes("@media (max-width: 760px)")) failures.push("Responsive layout breakpoint is missing");
if (!html.includes("Skip to content")) failures.push("Skip link is missing");
if (!html.includes("aria-live=")) failures.push("Live status region is missing");
if (!html.includes('class="language-switch"') || !html.includes('href="../vi/"')) {
  failures.push("English page language switch is missing");
}
if (!viHtml.includes('<html lang="vi">') || !viHtml.includes('href="../en/"')) {
  failures.push("Vietnamese page or English language option is missing");
}
if (!koHtml.includes('<html lang="ko">') || !koHtml.includes('href="../vi/"') || !koHtml.includes('href="../en/"')) failures.push("Korean Atlas or its language options are missing");
const readerLaunchUrls = [
  "https://buicongnguyen.github.io/hello-algo/en/learn/",
  "https://buicongnguyen.github.io/hello-algo/vi/learn/",
  "https://buicongnguyen.github.io/hello-algo/ko/learn/"
];
for (const document of [html, viHtml, koHtml]) {
  if (
    !document.includes('class="book-access"') ||
    (document.match(/class="reader-button /g) || []).length !== 3 ||
    (document.match(/data-reader-source="en\/docs\//g) || []).length !== 20 ||
    readerLaunchUrls.some((url) => !document.includes(`href="${url}"`))
  ) {
    failures.push("Every Atlas must expose the prominent trilingual reader launcher and complete book contents");
  }
}
if (
  !html.includes('href="https://buicongnguyen.github.io/hello-algo/en/learn/book-home.html" data-reader-source="en/docs/index.md"') ||
  !html.includes('href="https://buicongnguyen.github.io/hello-algo/en/learn/" data-reader-source="en/docs/chapter_introduction/index.md"') ||
  !viHtml.includes('href="learn/trang-chu-sach.html" data-reader-source="en/docs/index.md"') ||
  !viHtml.includes('href="learn/tai-lieu-tham-khao.html" data-reader-source="en/docs/chapter_reference/index.md"') ||
  !koHtml.includes('href="learn/book-home.html" data-reader-source="en/docs/index.md"') ||
  !koHtml.includes('href="learn/references.html" data-reader-source="en/docs/chapter_reference/index.md"') ||
  !css.includes(".atlas-layout {\n  width: 100%;\n  margin: 0;") ||
  !css.includes("grid-template-columns: 264px minmax(0, 1fr)") ||
  !css.includes(".reader-button") ||
  !css.includes(".book-access")
) {
  failures.push("Localized Atlas book contents or responsive left-column presentation is incomplete");
}
if (!rootReadme.includes("https://buicongnguyen.github.io/Modern_c_20/vi/")) {
  failures.push("Default README does not link to the Modern C++20 companion");
}
if (!html.includes('href="https://buicongnguyen.github.io/Modern_c_20/en/"') ||
    !viHtml.includes('href="https://buicongnguyen.github.io/Modern_c_20/vi/"') ||
    !viHtml.includes("C++20 hiện đại ↗") ||
    !koHtml.includes('href="https://buicongnguyen.github.io/Modern_c_20/ko/"') ||
    !koHtml.includes("모던 C++20 ↗")) {
  failures.push("Atlas pages do not expose the localized Modern C++20 companion");
}
const englishSectionIds = [...html.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
const vietnameseSectionIds = [...viHtml.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
const koreanSectionIds = [...koHtml.matchAll(/<section[^>]+id="([^"]+)"/g)].map((match) => match[1]);
if (JSON.stringify(englishSectionIds) !== JSON.stringify(vietnameseSectionIds)) {
  failures.push("Vietnamese Atlas does not have section-for-section parity with English");
}
if (JSON.stringify(englishSectionIds) !== JSON.stringify(koreanSectionIds)) failures.push("Korean Atlas does not have section-for-section parity with English");
const translations = Object.entries(htmlTranslations).sort(([a], [b]) => b.length - a.length);
const translateStatic = (value) => translations.reduce((result, [english, vietnamese]) => result.replaceAll(english, vietnamese), value);
const intentionalSharedLabels = new Set([
  "Hello Algo Atlas", "Hello Algo", "Atlas", "learning-path.graph",
  "English reader", "O(log n)", "O(n log n)", "low", "mid", "high"
]);
const untranslatedText = [...html.replace(/<script[\s\S]*?<\/script>/g, "").matchAll(/>([^<]+)</g)]
  .map((match) => match[1].trim())
  .filter((value) => value && /[A-Za-z]{3}/.test(value) && translateStatic(value) === value && !intentionalSharedLabels.has(value));
if (untranslatedText.length) {
  failures.push(`Vietnamese Atlas has untranslated static text: ${[...new Set(untranslatedText)].join(" | ")}`);
}
for (const attribute of ["data-topic", "data-structure", "data-mode", "data-sort-filter", "data-sort-family", "data-choice"]) {
  const values = (document) => [...document.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
  if (JSON.stringify(values(html)) !== JSON.stringify(values(viHtml))) {
    failures.push(`Vietnamese Atlas changed the interactive contract for ${attribute}`);
  }
}
if (!viHtml.includes('href="learn/"') || !viHtml.includes("Bản đồ học tập tương tác")) {
  failures.push("Vietnamese Atlas or pilot reading entry is missing");
}
if ((html.match(/href="learn\/"/g) || []).length < 2 || (viHtml.match(/href="learn\/"/g) || []).length < 2 || (koHtml.match(/href="learn\/"/g) || []).length < 2) failures.push("Every Atlas header and footer must link to its reader");
if (!viHtml.includes("Kế hoạch dịch ↗") || !viHtml.includes("window.HELLO_ALGO_LOCALE=")) {
  failures.push("Vietnamese Atlas supporting links or interactive locale payload is missing");
}
for (const awkwardPhrase of ["truy cập rẻ", "đưa ra phần tử mới nhất", "Gốc có ngay lập tức", "lần đến đầu tiên cho ít cạnh nhất"]) {
  if (viHtml.includes(awkwardPhrase)) failures.push(`Vietnamese Atlas still contains the reviewed phrase: ${awkwardPhrase}`);
}
if (Object.keys(interactiveLocale.topicData).length !== 13 || Object.keys(interactiveLocale.structureData).length !== 6 || Object.keys(interactiveLocale.choiceData).length !== 5) {
  failures.push("Vietnamese interactive datasets are incomplete");
}
if (Object.keys(koreanInteractiveLocale.topicData).length !== 13 || Object.keys(koreanInteractiveLocale.structureData).length !== 6 || Object.keys(koreanInteractiveLocale.choiceData).length !== 5 || !koreanInteractiveLocale.ui) failures.push("Korean interactive datasets are incomplete");
if (koHtml.includes("See the connections.") || koHtml.includes("Learn in dependency order") || !koHtml.includes("window.HELLO_ALGO_LOCALE=")) failures.push("Korean Atlas still contains primary English copy or lacks its locale payload");
for (const [attribute, dataset] of [
  ["data-topic", interactiveLocale.topicData],
  ["data-structure", interactiveLocale.structureData],
  ["data-choice", interactiveLocale.choiceData]
]) {
  const interactionKeys = [...new Set([...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]))].sort();
  if (JSON.stringify(interactionKeys) !== JSON.stringify(Object.keys(dataset).sort())) {
    failures.push(`Vietnamese locale keys do not match ${attribute}`);
  }
}
if (viHtml.includes("See the connections.") || viHtml.includes("Choose the shape that makes the operation cheap")) {
  failures.push("Vietnamese Atlas still contains primary English copy");
}
if (!bookCss.includes("@media (max-width: 820px)") || !bookCss.includes(".rounded-button.exercise-button") || !bookJs.includes("reader-menu")) {
  failures.push("Vietnamese reader responsive navigation is incomplete");
}
if (!bookJs.includes('["light", "dark"].includes(value)') || !bookJs.includes("try {") || !bookJs.includes("catch {")) {
  failures.push("Reader theme state is not validated or storage-safe");
}
if (!bookJs.includes("syncThemeButton") || !bookJs.includes('setAttribute("aria-pressed"') ||
    !bookJs.includes('"Light theme"') || !bookJs.includes('"Giao diện sáng"') ||
    !bookJs.includes('"밝은 테마"')) {
  failures.push("Reader theme control does not expose its current state in all three languages");
}
if (!bookJs.includes("positionActiveNavigation") ||
    !bookJs.includes('querySelector(\'a[aria-current="page"]\')') ||
    !bookJs.includes("sidebar.scrollTop")) {
  failures.push("Reader sidebar does not position the active document in view");
}
if (!bookCss.includes(".content-tablist") || !bookCss.includes(".content-tabpanel[hidden]") ||
    !bookJs.includes("hello-algo-code-language") || !bookJs.includes("aria-selected") ||
    !bookJs.includes("ArrowLeft") || !bookJs.includes("ArrowRight")) {
  failures.push("Reader code tabs are missing accessible styles, persistence, or keyboard navigation");
}
if (!bookCss.includes(".article-outline") || !bookCss.includes(".reader-search") || !bookCss.includes(".heading-anchor") ||
    !bookJs.includes('fetch("search-index.json")') || !bookJs.includes("normalizeSearchText") ||
    !bookJs.includes("reader-search-open")) {
  failures.push("Shared reader assets are missing article outlines, permalinks, or lazy search");
}
if (!bookCss.includes("@media (prefers-reduced-motion: reduce)") ||
    !bookCss.includes("animation-duration: .01ms") ||
    !bookCss.includes("animation-iteration-count: 1")) {
  failures.push("Reader reduced-motion CSS does not suppress both transitions and animations");
}
if (!bookCss.includes(".math-block .katex-display") || !bookJs.includes("globalThis.katex?.render") ||
    !bookJs.includes("TextDecoder") || !bookJs.includes('querySelectorAll("[data-math]")') ||
    !bookJs.includes('output: "htmlAndMathml"')) {
  failures.push("Reader math is missing KaTeX rendering, accessible output, or display styles");
}
if (translationStatus.sourceCommit !== "a3166c201853739213d5a3a31b1e4a237aaf1076") {
  failures.push("Vietnamese translation source commit is not locked to the audited upstream revision");
}
if (translationStatus.documents.length !== 119 || translationStatus.documents.some((document) => !["draft", "pilot", "published"].includes(document.status))) {
  failures.push("Expected 119 source-locked Vietnamese reader documents at draft or later status");
}
if (translationStatus.documents.filter((document) => document.status === "pilot").length !== 0 || translationStatus.documents.filter((document) => document.status === "draft").length !== 119) {
  failures.push("Vietnamese status ledger must keep all 119 documents in draft until generated parity and human review gates pass");
}
for (const document of translationStatus.documents) {
  for (const relativePath of [document.source, document.target]) {
    try {
      await access(path.join(projectRoot, relativePath), constants.R_OK);
    } catch {
      failures.push(`Translation status references a missing file: ${relativePath}`);
    }
  }
  try {
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const targetMarkdown = await readFile(path.join(projectRoot, document.target), "utf8");
    const h1Count = countMarkdownH1(targetMarkdown);
    if (h1Count !== 1) failures.push(`${document.target} must contain exactly one H1`);
    if (/^--8<--/m.test(targetMarkdown)) {
      failures.push(`${document.target} contains unsupported MkDocs snippet syntax`);
    }
    if ((targetMarkdown.match(/^```/gm) || []).length % 2 !== 0) {
      failures.push(`${document.target} contains an unbalanced code fence`);
    }
    if ((targetMarkdown.match(/^\$\$$/gm) || []).length % 2 !== 0) {
      failures.push(`${document.target} contains an unbalanced display-math fence`);
    }
    const narrative = targetMarkdown
      .replace(/```[\s\S]*?```/g, "")
      .replaceAll("chúng ta", "")
      .replaceAll("Chúng ta", "");
    if (/\bta\b/i.test(narrative)) failures.push(`${document.target} uses the disallowed standalone narrator “ta”`);
    if (["pilot", "published"].includes(document.status)) {
      const readinessFailures = translationReadinessFailures(sourceMarkdown, targetMarkdown);
      if (readinessFailures.length) failures.push(`${document.target} cannot be promoted to ${document.status}: ${readinessFailures.join(", ")}`);
    }
  } catch {
    // Missing targets are reported by the existence check above.
  }
}
if (translationRegistry.sourceCommit !== translationStatus.sourceCommit || koreanStatus.documents.length !== 119 || koreanStatus.documents.some((document) => document.status !== "draft")) failures.push("Expected 119 source-locked Korean reader documents at draft status");
const independentReviewManifest = structuredClone(translationStatus);
independentReviewManifest.documents = [independentReviewManifest.documents[0]];
independentReviewManifest.documents[0].reviews = {
  technical: "independently-reviewed",
  language: "independently-reviewed"
};
const independentReviewReport = await createTranslationParityReport({
  projectRoot,
  manifest: independentReviewManifest
});
if (!independentReviewReport.documents[0].structuralParity ||
    !independentReviewReport.documents[0].eligibleForPilot ||
    independentReviewReport.summary.pilotEligible !== 1) {
  failures.push("Independent review is not recognized as satisfying the pilot review gate");
}
const vietnameseSources = [...translationRegistry.byLanguage.vi.keys()].sort();
const koreanSources = [...translationRegistry.byLanguage.ko.keys()].sort();
if (JSON.stringify(vietnameseSources) !== JSON.stringify(koreanSources)) failures.push("Vietnamese and Korean reader manifests do not cover the same English documents");
for (const mutation of [
  (manifests) => { manifests.vi.documents[0].source = "en/docs/not-in-catalog.md"; },
  (manifests) => { manifests.vi.documents[1].target = manifests.vi.documents[0].target; },
  (manifests) => { manifests.vi.documents[0].target = "vi/docs/../../README.md"; },
  (manifests) => { manifests.vi.documents[0].route = "vi/learn/../../escape.html"; },
  (manifests) => { manifests.vi.sourceCommit = "not-a-sha"; manifests.ko.sourceCommit = "not-a-sha"; }
]) {
  const manifests = structuredClone({ vi: translationStatus, ko: koreanStatus });
  mutation(manifests);
  if (registryAccepts(manifests)) failures.push("Translation registry accepted an unsafe or inconsistent manifest mutation");
}
for (const document of koreanStatus.documents) {
  for (const relativePath of [document.source, document.target]) {
    try { await access(path.join(projectRoot, relativePath), constants.R_OK); } catch { failures.push(`Korean status references a missing file: ${relativePath}`); }
  }
  try {
    const sourceMarkdown = await readFile(path.join(projectRoot, document.source), "utf8");
    const markdown = await readFile(path.join(projectRoot, document.target), "utf8");
    if (countMarkdownH1(markdown) !== 1) failures.push(`${document.target} must contain exactly one H1`);
    if ((markdown.match(/^```/gm) || []).length % 2 !== 0) failures.push(`${document.target} contains an unbalanced code fence`);
    if ((markdown.match(/^\$\$$/gm) || []).length % 2 !== 0) failures.push(`${document.target} contains an unbalanced display-math fence`);
    if (/\b(?:TODO|TBD|FIXME)\b/.test(markdown)) failures.push(`${document.target} contains an unresolved marker`);
    if (["pilot", "published"].includes(document.status)) {
      const readinessFailures = translationReadinessFailures(sourceMarkdown, markdown);
      if (readinessFailures.length) failures.push(`${document.target} cannot be promoted to ${document.status}: ${readinessFailures.join(", ")}`);
    }
  } catch { /* Missing files are reported above. */ }
}
if (translationPlan.length < 15000 || !translationPlan.includes("Sáu giai đoạn phát triển")) {
  failures.push("Vietnamese translation plan is not sufficiently detailed");
}
if (koreanPlan.length < 20000 || !koreanPlan.includes("Korean draft `v1.0`")) {
  failures.push("Korean translation plan is not sufficiently detailed");
}
if (
  !comparisonScript.includes("spawnSync(\"git\"") ||
  !comparisonScript.includes("Differences are reported for review only") ||
  !comparisonScript.includes("exercisesOnlyLeft") ||
  !comparisonScript.includes("importantDifferences")
) {
  failures.push("Vietnamese Git-ref comparison must remain read-only and report document, structure, exercise, glossary, and source-revision differences");
}
const koreanReadmeSections = ["## 이 한국어판에서 제공하는 것", "## 번역 상태와 품질 기준", "## 참여 방법", "## 라이선스와 출처"];
const koreanReadmeLinks = [
  "https://buicongnguyen.github.io/hello-algo/ko/",
  "https://buicongnguyen.github.io/hello-algo/ko/learn/",
  "https://buicongnguyen.github.io/hello-algo/en/",
  "https://buicongnguyen.github.io/hello-algo/vi/",
  "../KOREAN_TRANSLATION_PLAN.md",
  "CONTRIBUTING.md",
  "glossary.md",
  "style-guide.md"
];
if (
  koreanReadme.length < 2000 ||
  koreanReadmeSections.some((section) => !koreanReadme.includes(section)) ||
  koreanReadmeLinks.some((link) => !koreanReadme.includes(link)) ||
  !koreanReadme.includes("119/119") ||
  !koreanReadme.includes(koreanStatus.sourceCommit)
) {
  failures.push("Korean README is missing the reader overview, status, comparison links, contribution guidance, or source lock");
}
if (vietnameseGlossary.includes("4935d2d") || koreanContributing.includes("4935d2d") || !vietnameseGlossary.includes(translationStatus.sourceCommit) || !koreanContributing.includes(koreanStatus.sourceCommit)) {
  failures.push("Translation governance files do not use the current locked upstream revision");
}

if (failures.length) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Hello Algo trilingual site passed static checks (${ids.size} English IDs, ${viIds.size} Vietnamese IDs, ${koreanSectionIds.length} Korean sections, ${requiredFiles.length} core files).`);
