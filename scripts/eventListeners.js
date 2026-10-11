import {
  todoForm,
  todoInput,
  todoList,
  filterButtons,
  clearCompletedButton,
  themeToggleButton,
  getTodoItemFrom,
  getCheckboxFrom,
  getDeleteButtonFrom,
} from "./elements.js";

import {
  addTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
  clearCompletedTodos,
  moveTodo,
} from "./todos.js";

import { renderApp, setActiveFilter, getActiveFilter } from "./render.js";
import { saveTodos } from "./storage.js";
import { toggleTheme } from "./theme.js";

let listenersRegistered = false;
let draggedTodoId = null;

function saveAndRender() {
  saveTodos(getTodos());
  renderApp();
}

function registerEventListeners() {
  if (listenersRegistered) {
    return;
  }

  listenersRegistered = true;

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTodo = addTodo(todoInput.value);

    if (!newTodo) {
      todoInput.focus();
      return;
    }

    todoInput.value = "";
    setActiveFilter("all");
    saveAndRender();
    todoInput.focus();
  });

  todoList.addEventListener("change", (event) => {
    const checkbox = getCheckboxFrom(event.target);

    if (!checkbox || event.target !== checkbox) {
      return;
    }

    const todoItem = getTodoItemFrom(checkbox);
    const todoId = todoItem?.dataset.id;

    if (todoId && toggleTodo(todoId)) {
      saveAndRender();
    }
  });

  todoList.addEventListener("click", (event) => {
    const deleteButton = getDeleteButtonFrom(event.target);

    if (!deleteButton) {
      return;
    }

    const todoItem = getTodoItemFrom(deleteButton);
    const todoId = todoItem?.dataset.id;

    if (todoId && deleteTodo(todoId)) {
      saveAndRender();
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      setActiveFilter(selectedFilter);
      renderApp();
    });
  });

  clearCompletedButton.addEventListener("click", () => {
    const deletedCount = clearCompletedTodos();

    if (deletedCount > 0) {
      saveAndRender();
    }
  });

  themeToggleButton.addEventListener("click", () => {
    toggleTheme();
  });

  todoList.addEventListener("dragstart", (event) => {
    const todoItem = getTodoItemFrom(event.target);

    if (!todoItem || getActiveFilter() !== "all") {
      event.preventDefault();
      return;
    }

    draggedTodoId = todoItem.dataset.id;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedTodoId);
    }
  });

  todoList.addEventListener("dragover", (event) => {
    const targetItem = getTodoItemFrom(event.target);

    if (draggedTodoId && targetItem && getActiveFilter() === "all") {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
    }
  });

  todoList.addEventListener("drop", (event) => {
    const targetItem = getTodoItemFrom(event.target);

    if (!draggedTodoId || !targetItem || getActiveFilter() !== "all") {
      draggedTodoId = null;
      return;
    }

    event.preventDefault();
    const targetTodoId = targetItem.dataset.id;

    if (moveTodo(draggedTodoId, targetTodoId)) {
      saveAndRender();
    }

    draggedTodoId = null;
  });

  todoList.addEventListener("dragend", () => {
    draggedTodoId = null;
  });
}

export { registerEventListeners };
