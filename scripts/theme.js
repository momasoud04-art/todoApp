import { themeToggleButton } from "./elements.js";
import { loadTheme, saveTheme } from "./storage.js";

let currentTheme = "light";

function applyTheme(theme, shouldSave = true) {
  if (theme !== "light" && theme !== "dark") {
    return currentTheme;
  }

  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;

  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${nextTheme} theme`;
  themeToggleButton.setAttribute("aria-label", label);
  themeToggleButton.title = label;

  if (shouldSave) {
    saveTheme(theme);
  }

  return currentTheme;
}

function initializeTheme() {
  const savedTheme = loadTheme();
  const pageTheme = document.body.dataset.theme;
  const initialTheme = savedTheme ?? (pageTheme === "dark" ? "dark" : "light");

  return applyTheme(initialTheme, false);
}

function toggleTheme() {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  return applyTheme(nextTheme);
}

function getCurrentTheme() {
  return currentTheme;
}

export { initializeTheme, toggleTheme, getCurrentTheme, applyTheme };
