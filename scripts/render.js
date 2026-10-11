import { todoList, itemsCount, filterButtons } from "./elements.js";
import { getFilteredTodos, getActiveTodoCount } from "./todos.js";

let activeFilter = "all";

function createTodoElement(todo) {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.dataset.js = "todo-item";
  item.dataset.id = todo.id;

  item.draggable = activeFilter === "all";

  const checkbox = document.createElement("input");
  checkbox.className = "todo-item__checkbox";
  checkbox.type = "checkbox";
  checkbox.dataset.js = "todo-checkbox";
  checkbox.checked = todo.completed;
  checkbox.id = `checkbox-${todo.id}`;
  checkbox.setAttribute(
    "aria-label",
    todo.completed
      ? `Mark ${todo.text} as active`
      : `Mark ${todo.text} as completed`,
  );

  const label = document.createElement("label");
  label.className = "todo-item__text";
  label.htmlFor = checkbox.id;
  label.textContent = todo.text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "todo-item__delete";
  deleteButton.type = "button";
  deleteButton.dataset.js = "delete-todo";
  deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
  deleteButton.title = "Delete todo";

  item.append(checkbox, label, deleteButton);
  return item;
}

function renderTodoList() {
  const visibleTodos = getFilteredTodos(activeFilter);
  const fragment = document.createDocumentFragment();

  visibleTodos.forEach((todo) => {
    fragment.appendChild(createTodoElement(todo));
  });

  todoList.replaceChildren(fragment);
}

function renderItemsCount() {
  const count = getActiveTodoCount();
  itemsCount.textContent = `${count} ${count === 1 ? "item" : "items"} left`;
}

function renderFilterButtons() {
  filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === activeFilter),
    );
  });
}

function renderApp() {
  renderTodoList();
  renderItemsCount();
  renderFilterButtons();
}

function setActiveFilter(filter) {
  const validFilters = ["all", "active", "completed"];

  if (validFilters.includes(filter)) {
    activeFilter = filter;
  }
}

function getActiveFilter() {
  return activeFilter;
}

export {
  renderApp,
  renderTodoList,
  renderItemsCount,
  setActiveFilter,
  getActiveFilter,
};
