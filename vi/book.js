const root = document.documentElement;
const themeButton = document.querySelector("#reader-theme");
const menuButton = document.querySelector("#reader-menu");
const sidebar = document.querySelector("#reader-sidebar");
const savedTheme = localStorage.getItem("hello-algo-theme");
const mobileReader = matchMedia("(max-width: 820px)");

if (savedTheme) root.dataset.theme = savedTheme;

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("hello-algo-theme", nextTheme);
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
