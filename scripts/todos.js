let todos = [];

const defaultTodos = [
  { id: "todo-1", text: "Complete online JavaScript course", completed: true },
  { id: "todo-2", text: "Jog around the park 3x", completed: false },
  { id: "todo-3", text: "10 minutes meditation", completed: false },
  { id: "todo-4", text: "Read for 1 hour", completed: false },
  { id: "todo-5", text: "Pick up groceries", completed: false },
  {
    id: "todo-6",
    text: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

function getDefaultTodos() {
  return defaultTodos.map((todo) => ({ ...todo }));
}

function initializeTodos(initialTodos = []) {
  todos = initialTodos.map((todo) => ({
    id: String(todo.id),
    text: String(todo.text),
    completed: Boolean(todo.completed),
  }));
}

function getTodos() {
  return todos.map((todo) => ({ ...todo }));
}

function createTodoId() {
  if (globalThis.crypto?.randomUUID) {
    return `todo-${globalThis.crypto.randomUUID()}`;
  }

  return `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addTodo(text) {
  const normalizedText = String(text ?? "").trim();

  if (!normalizedText) {
    return null;
  }

  const newTodo = {
    id: createTodoId(),
    text: normalizedText,
    completed: false,
  };

  todos.unshift(newTodo);
  return { ...newTodo };
}

function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return false;
  }

  todo.completed = !todo.completed;
  return true;
}

function deleteTodo(id) {
  const originalLength = todos.length;
  todos = todos.filter((todo) => todo.id !== id);
  return todos.length !== originalLength;
}

function clearCompletedTodos() {
  const originalLength = todos.length;
  todos = todos.filter((todo) => !todo.completed);
  return originalLength - todos.length;
}

function getFilteredTodos(filter = "all") {
  if (filter === "active") {
    return getTodos().filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return getTodos().filter((todo) => todo.completed);
  }

  return getTodos();
}

function getActiveTodoCount() {
  return todos.filter((todo) => !todo.completed).length;
}

function moveTodo(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) {
    return false;
  }

  const sourceIndex = todos.findIndex((todo) => todo.id === sourceId);
  const targetIndex = todos.findIndex((todo) => todo.id === targetId);

  if (sourceIndex === -1 || targetIndex === -1) {
    return false;
  }

  const [movedTodo] = todos.splice(sourceIndex, 1);

  const updatedTargetIndex = todos.findIndex((todo) => todo.id === targetId);
  todos.splice(updatedTargetIndex, 0, movedTodo);
  return true;
}

export {
  getDefaultTodos,
  initializeTodos,
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompletedTodos,
  getFilteredTodos,
  getActiveTodoCount,
  moveTodo,
};
