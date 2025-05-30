const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches tasks from the remote API
 * @async
 * @returns {Promise<Array<Object>>} Array of task objects
 * @throws {Error} When network request fails or server responds with error
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
 * Retrieves tasks from localStorage
 * @returns {Array<Object>|null} Parsed task array or null if not found
 */
export function getLocalTasks() {
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? JSON.parse(tasksJson) : null;
}

/**
 * Saves tasks to localStorage
 * @param {Array<Object>} tasks - Array of task objects to save
 */
export function saveLocalTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Loads tasks with network-first strategy (falls back to localStorage)
 * @async
 * @returns {Promise<Array<Object>>} Array of task objects
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
