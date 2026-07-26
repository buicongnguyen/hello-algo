const root = document.documentElement;
const themeButton = document.querySelector("#reader-theme");
const menuButton = document.querySelector("#reader-menu");
const sidebar = document.querySelector("#reader-sidebar");
const readStoredTheme = () => {
  try {
    const value = localStorage.getItem("hello-algo-theme");
    return ["light", "dark"].includes(value) ? value : null;
  } catch {
    return null;
  }
};
const saveTheme = (value) => {
  try {
    localStorage.setItem("hello-algo-theme", value);
  } catch {
    // Theme switching remains available for this page when storage is blocked.
  }
};
const savedTheme = readStoredTheme();
const mobileReader = matchMedia("(max-width: 820px)");

if (savedTheme) root.dataset.theme = savedTheme;

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  saveTheme(nextTheme);
});

function setMenu(open) {
  sidebar.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  sidebar.inert = mobileReader.matches && !open;
}

function syncMenu() {
  if (mobileReader.matches) {
    setMenu(false);
    return;
  }
  sidebar.classList.remove("open");
  sidebar.inert = false;
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton?.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));

sidebar?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar?.classList.contains("open")) {
    setMenu(false);
    menuButton?.focus();
  }
});

mobileReader.addEventListener("change", syncMenu);
syncMenu();

function decodeMath(value) {
  try {
    const bytes = Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function renderMath() {
  if (!globalThis.katex?.render) return;
  for (const element of document.querySelectorAll("[data-math]")) {
    const expression = decodeMath(element.dataset.math);
    if (!expression) continue;
    globalThis.katex.render(expression, element, {
      displayMode: element.classList.contains("math-block"),
      throwOnError: false,
      strict: "ignore",
      trust: false,
      output: "htmlAndMathml"
    });
  }
}

renderMath();

const contentTabGroups = [...document.querySelectorAll("[data-content-tabs]")];
const supportedCodeLanguages = new Set(["Python", "C++", "Java", "C#", "Go", "Swift", "JS", "TS", "Dart", "Rust", "C", "Kotlin", "Ruby"]);
const readStoredCodeLanguage = () => {
  try {
    const value = localStorage.getItem("hello-algo-code-language");
    return supportedCodeLanguages.has(value) ? value : null;
  } catch {
    return null;
  }
};
const saveCodeLanguage = (value) => {
  try {
    localStorage.setItem("hello-algo-code-language", value);
  } catch {
    // Tab selection still works when storage is blocked.
  }
};
const storedCodeLanguage = readStoredCodeLanguage();

function activateContentTab(group, activeTab, { focus = false, synchronize = false } = {}) {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  if (!activeTab || !tabs.includes(activeTab)) return;

  for (const tab of tabs) {
    const selected = tab === activeTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  }

  if (focus) activeTab.focus();
  if (group.dataset.tabSync !== "language") return;

  const label = activeTab.dataset.tabLabel;
  if (!supportedCodeLanguages.has(label)) return;
  saveCodeLanguage(label);
  if (!synchronize) return;

  for (const otherGroup of contentTabGroups) {
    if (otherGroup === group || otherGroup.dataset.tabSync !== "language") continue;
    const matchingTab = [...otherGroup.querySelectorAll('[role="tab"]')].find((tab) => tab.dataset.tabLabel === label);
    if (matchingTab) activateContentTab(otherGroup, matchingTab);
  }
}

for (const group of contentTabGroups) {
  const tabList = group.querySelector('[role="tablist"]');
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const initialTab = group.dataset.tabSync === "language" && storedCodeLanguage
    ? tabs.find((tab) => tab.dataset.tabLabel === storedCodeLanguage) || tabs[0]
    : tabs[0];
  activateContentTab(group, initialTab);

  tabList?.addEventListener("click", (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) activateContentTab(group, tab, { synchronize: true });
  });

  tabList?.addEventListener("keydown", (event) => {
    const currentIndex = tabs.indexOf(event.target.closest('[role="tab"]'));
    if (currentIndex < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : currentIndex;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    activateContentTab(group, tabs[nextIndex], { focus: true, synchronize: true });
  });
}
