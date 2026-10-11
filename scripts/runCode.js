import { validateRequiredElements } from "./elements.js";
import { getDefaultTodos, initializeTodos, getTodos } from "./todos.js";
import { loadTodos, saveTodos } from "./storage.js";
import { initializeTheme } from "./theme.js";
import { renderApp, setActiveFilter } from "./render.js";
import { registerEventListeners } from "./eventListeners.js";

export default function () {
  validateRequiredElements();

  const savedTodos = loadTodos();
  initializeTodos(savedTodos ?? getDefaultTodos());

  saveTodos(getTodos());

  initializeTheme();
  setActiveFilter("all");

  renderApp();
  registerEventListeners();
}
