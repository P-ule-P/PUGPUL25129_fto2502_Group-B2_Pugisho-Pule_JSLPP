const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches tasks from the API
 * @returns {Promise<Array>}
 * @throws {Error}
 */
export async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch failed:", error);
    throw new Error("Failed to fetch tasks from server");
  }
}

/**
 * Gets tasks from localStorage
 * @returns {Array|null}
 */
export function getLocalTasks() {
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? JSON.parse(tasksJson) : null;
}

/**
 * Saves tasks to localStorage
 * @param {Array} tasks
 */
export function saveLocalTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Loads tasks (API first, falls back to local)
 * @returns {Promise<Array>}
 */
export async function loadTasks() {
  // Try API first if online
  if (navigator.onLine) {
    try {
      const tasks = await fetchTasks();
      saveLocalTasks(tasks);
      return tasks;
    } catch (error) {
      console.warn("Using cached tasks due to:", error.message);
    }
  }

  // Fallback to local storage
  const localTasks = getLocalTasks();
  if (localTasks) {
    return localTasks;
  }

  // If no local tasks, return empty array
  return [];
}
