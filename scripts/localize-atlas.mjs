export function localizeAtlas(sourceEnglish, config) {
  const englishSwitch = `<div class="language-switch" aria-label="Choose language">
      <a href="../ko/" lang="ko" hreflang="ko">KO</a>
      <a href="../vi/" lang="vi" hreflang="vi">VI</a>
      <a class="active" href="./" lang="en" hreflang="en" aria-current="page">EN</a>
    </div>`;
  if (!sourceEnglish.includes(englishSwitch)) throw new Error("English language switch markup changed; update the Atlas localizer");

  let html = sourceEnglish
    .replace(englishSwitch, config.languageSwitch)
    .replace('<html lang="en">', `<html lang="${config.code}">`)
    .replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${config.metaDescription}">`)
    .replace('<meta property="og:title" content="Hello Algo Atlas">', `<meta property="og:title" content="${config.title}">`)
    .replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${config.ogDescription}">`)
    .replace('content="https://buicongnguyen.github.io/hello-algo/en/"', `content="https://buicongnguyen.github.io/hello-algo/${config.code}/"`)
    .replace('<title>Hello Algo Atlas</title>', `<title>${config.title}</title>`)
    .replace('href="styles.css', 'href="../styles.css')
    .replaceAll('src="en/docs/', 'src="../en/docs/');

  const translations = Object.entries(config.htmlTranslations).sort(([a], [b]) => b.length - a.length);
  const translate = config.exactOnly
    ? (value) => config.htmlTranslations[value.trim()] ?? config.htmlTranslations[value] ?? value
    : (value) => translations.reduce((result, [source, target]) => result.replaceAll(source, target), value);
  html = html.replace(/>([^<]+)</g, (_, value) => `>${translate(value)}<`);
  html = html.replace(/(aria-label|alt|title)="([^"]+)"/g, (_, attribute, value) => `${attribute}="${translate(value)}"`);

  const localeJson = JSON.stringify(config.interactiveLocale).replaceAll("<", "\\u003c");
  html = html.replace(
    '<script src="app.js?v=20260717a" defer></script>',
    `<script>window.HELLO_ALGO_LOCALE=${localeJson};</script>\n  <script src="../app.js?v=20260718e" defer></script>`
  );
  html = html.replace(
    `<a href="https://www.hello-algo.com/en/" target="_blank" rel="noreferrer">${config.originalBookLabel}</a>`,
    `<a href="learn/">${config.readerLabel}</a>\n      <a href="https://www.hello-algo.com/en/" target="_blank" rel="noreferrer">${config.originalBookLabel}</a>`
  );
  html = html.replace(
    /<div class="footer-links">.*?<\/div>/,
    `<div class="footer-links"><a href="learn/">${config.readerLabel}</a><a href="${config.planUrl}" target="_blank" rel="noreferrer">${config.planLabel}</a><a href="https://github.com/krahets/hello-algo" target="_blank" rel="noreferrer">${config.repositoryLabel}</a></div>`
  );
  if (html.includes('src="app.js') || html.includes('src="en/docs/')) throw new Error(`${config.code} Atlas contains an unadjusted English asset path`);
  return html;
}
