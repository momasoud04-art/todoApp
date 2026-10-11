const TODOS_STORAGE_KEY = "todo-app:todos:v1";
const THEME_STORAGE_KEY = "todo-app:theme:v1";

function getLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function saveTodos(todos) {
  const storage = getLocalStorage();

  if (!storage) {
    return false;
  }

  try {
    storage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (error) {
    console.error("تعذر حفظ المهام في مساحة التخزين المحلية.", error);
    return false;
  }
}

function loadTodos() {
  const storage = getLocalStorage();

  if (!storage) {
    return null;
  }

  try {
    const savedValue = storage.getItem(TODOS_STORAGE_KEY);

    if (savedValue === null) {
      return null;
    }

    const parsedTodos = JSON.parse(savedValue);

    if (!Array.isArray(parsedTodos)) {
      return null;
    }

    const validTodos = parsedTodos.filter(
      (todo) =>
        todo &&
        typeof todo.id === "string" &&
        typeof todo.text === "string" &&
        todo.text.trim().length > 0 &&
        typeof todo.completed === "boolean",
    );

    return validTodos.map((todo) => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
    }));
  } catch (error) {
    console.error(
      "تعذر قراءة المهام المحفوظة؛ سيتم بدء قائمة افتراضية.",
      error,
    );
    return null;
  }
}

function saveTheme(theme) {
  if (theme !== "light" && theme !== "dark") {
    return false;
  }

  const storage = getLocalStorage();

  if (!storage) {
    return false;
  }

  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch (error) {
    console.error("تعذر حفظ تفضيل الثيم.", error);
    return false;
  }
}

function loadTheme() {
  const storage = getLocalStorage();

  if (!storage) {
    return null;
  }

  try {
    const theme = storage.getItem(THEME_STORAGE_KEY);
    return theme === "light" || theme === "dark" ? theme : null;
  } catch (error) {
    console.error("تعذر قراءة تفضيل الثيم.", error);
    return null;
  }
}

export { saveTodos, loadTodos, saveTheme, loadTheme };
