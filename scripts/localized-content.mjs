const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function imageReference(line) {
  return line.trim().match(/^!\[[^\]]*\]\(([^)]+)\)(?:\s*\{[^{}]*\})?$/)?.[1] || null;
}

function illustrationTabGroups(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const groups = [];

  for (let index = 0; index < lines.length;) {
    if (!/^===\s+"([^"]+)"\s*$/.test(lines[index])) {
      index += 1;
      continue;
    }

    const tabs = [];
    while (index < lines.length) {
      const tab = lines[index].match(/^===\s+"([^"]+)"\s*$/);
      if (!tab) break;
      index += 1;
      const content = [];
      while (index < lines.length && (!lines[index].trim() || /^\s{4}/.test(lines[index]))) {
        content.push(lines[index].replace(/^\s{4}/, ""));
        index += 1;
      }
      const meaningfulLines = content.filter((line) => line.trim());
      const reference = meaningfulLines.length === 1 ? imageReference(meaningfulLines[0]) : null;
      tabs.push({ label: tab[1], reference });
    }

    if (tabs.length >= 2 && tabs.every((tab) => tab.reference)) groups.push(tabs);
  }

  return groups;
}

function sameReferences(left, right) {
  return left.length === right.length && left.every((reference, index) => reference === right[index]);
}

function standaloneImageSequence(lines, references) {
  for (let start = 0; start < lines.length; start += 1) {
    if (/^\s/.test(lines[start])) continue;
    const panels = [];
    let cursor = start;
    let matched = true;

    for (const reference of references) {
      while (cursor < lines.length && !lines[cursor].trim()) cursor += 1;
      const panel = [];
      if (/^\*\*[^*]{1,60}\*\*$/.test(lines[cursor] || "")) {
        panel.push(lines[cursor].trim(), "");
        cursor += 1;
        while (cursor < lines.length && !lines[cursor].trim()) cursor += 1;
      }
      if (cursor >= lines.length || /^\s/.test(lines[cursor]) || imageReference(lines[cursor]) !== reference) {
        matched = false;
        break;
      }
      panel.push(lines[cursor].trim());
      panels.push(panel);
      cursor += 1;
    }

    if (matched) return { start, end: cursor, panels };
  }
  return null;
}

export function restoreIllustrationTabs(sourceMarkdown, targetMarkdown) {
  const sourceGroups = illustrationTabGroups(sourceMarkdown);
  const existingGroups = illustrationTabGroups(targetMarkdown).map((group) => group.map((tab) => tab.reference));
  const lines = targetMarkdown.replaceAll("\r\n", "\n").split("\n");
  const unresolved = [];
  let restoredGroups = 0;

  for (const group of sourceGroups) {
    const references = group.map((tab) => tab.reference);
    if (existingGroups.some((existing) => sameReferences(existing, references))) continue;
    const sequence = standaloneImageSequence(lines, references);
    if (!sequence) {
      unresolved.push(references);
      continue;
    }

    const replacement = [];
    group.forEach((tab, index) => {
      if (index) replacement.push("");
      replacement.push(`=== "${tab.label}"`, ...sequence.panels[index].map((line) => line ? `    ${line}` : ""));
    });
    lines.splice(sequence.start, sequence.end - sequence.start, ...replacement);
    existingGroups.push(references);
    restoredGroups += 1;
  }

  return {
    markdown: lines.join("\n"),
    sourceGroups: sourceGroups.length,
    restoredGroups,
    unresolved
  };
}

export function addEnglishTerminology(body, englishTitle, locale) {
  if (!englishTitle || !body.includes("</h1>")) return body;
  const label = locale === "vi" ? "Thuật ngữ tiếng Anh" : "영어 용어";
  const note = `<p class="english-term" role="note"><span>${label}</span><strong lang="en">${escapeHtml(englishTitle)}</strong></p>`;
  return body.replace("</h1>", `</h1>${note}`);
}
