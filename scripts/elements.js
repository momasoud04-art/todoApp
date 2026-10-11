const todoForm = document.querySelector('[data-js="todo-form"]');
const todoInput = document.querySelector('[data-js="todo-input"]');
const todoList = document.querySelector('[data-js="todo-list"]');
const itemsCount = document.querySelector('[data-js="items-count"]');
const filterButtons = document.querySelectorAll('[data-js="filter"]');
const clearCompletedButton = document.querySelector(
  '[data-js="clear-completed"]',
);
const themeToggleButton = document.querySelector('[data-js="theme-toggle"]');

const getTodoItemFrom = (target) => {
  return target instanceof Element
    ? target.closest('[data-js="todo-item"]')
    : null;
};

const getCheckboxFrom = (target) => {
  return target instanceof Element
    ? target.closest('[data-js="todo-checkbox"]')
    : null;
};

const getDeleteButtonFrom = (target) => {
  return target instanceof Element
    ? target.closest('[data-js="delete-todo"]')
    : null;
};

const getFilterButtonFrom = (target) => {
  return target instanceof Element
    ? target.closest('[data-js="filter"]')
    : null;
};

const validateRequiredElements = () => {
  const requiredElements = {
    todoForm,
    todoInput,
    todoList,
    itemsCount,
    clearCompletedButton,
    themeToggleButton,
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    throw new Error(
      `عناصر HTML التالية غير موجودة: ${missingElements.join(", ")}`,
    );
  }
};

export {
  todoForm,
  todoInput,
  todoList,
  itemsCount,
  filterButtons,
  clearCompletedButton,
  themeToggleButton,
  getTodoItemFrom,
  getCheckboxFrom,
  getDeleteButtonFrom,
  getFilterButtonFrom,
  validateRequiredElements,
};
