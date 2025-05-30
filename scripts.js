import { loadTasks, saveLocalTasks } from "./scripts/utils/storage.js";
import { renderTasks } from "./scripts/UI/renderTasks.js";
import { setupModal } from "./scripts/UI/modal.js";
import {
  setupSidebarToggle,
  setupThemeToggle,
  setupMobileMenu, // Import the new function
} from "./scripts/UI/sidebarToggleFunctionality.js";

// DOM Elements
const loadingEl = document.getElementById("loading-indicator");
const errorEl = document.getElementById("error-message");
const offlineEl = document.getElementById("offline-alert");
const container = document.querySelector(".container");
const retryBtn = document.getElementById("retry-button");

/**
 * Initializes the application by:
 * 1. Showing loading state
 * 2. Loading tasks from storage
 * 3. Rendering the UI
 * 4. Setting up modal functionality
 * 5. Updating network status
 * 6. Transitioning to ready state
 * @async
 * @function initializeApp
 * @throws {Error} When task loading fails
 */
async function initializeApp() {
  try {
    // Show loading state
    loadingEl.style.display = "flex";
    container.style.display = "none";
    errorEl.style.display = "none";

    // Load tasks
    const tasks = await loadTasks();

    // Render UI
    renderTasks(tasks);
    setupModal();

    // Update network status
    updateNetworkStatus();

    // Hide loading, show content
    loadingEl.style.display = "none";
    container.style.display = "block";
  } catch (error) {
    handleInitializationError(error);
  }
}

/**
 * Handles application initialization errors by:
 * 1. Logging the error
 * 2. Hiding loading indicator
 * 3. Showing error message
 * 4. Providing error details
 * @function handleInitializationError
 * @param {Error} error - The error that occurred during initialization
 */
function handleInitializationError(error) {
  console.error("App initialization failed:", error);
  loadingEl.style.display = "none";
  container.style.display = "none";
  errorEl.style.display = "block";
  document.getElementById("error-detail").textContent =
    error.message || "Failed to load tasks";
}

/**
 * Updates the network status indicator based on navigator.onLine
 * Shows/hides the offline alert accordingly
 * @function updateNetworkStatus
 */
function updateNetworkStatus() {
  offlineEl.hidden = navigator.onLine;
}

/**
 * Sets up global event listeners for:
 * 1. Network status changes (online/offline)
 * 2. Retry button click
 * @function setupEventListeners
 */
function setupEventListeners() {
  // Network status changes
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);

  // Retry button
  retryBtn?.addEventListener("click", () => {
    errorEl.style.display = "none";
    initializeApp();
  });
}

/**
 * Main application entry point that:
 * 1. Waits for DOM content to load
 * 2. Sets up event listeners
 * 3. Initializes the application
 * 4. Sets up sidebar and theme functionality
 */
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  initializeApp();

  // Initialize sidebar functionality
  setupSidebarToggle();
  setupThemeToggle();
  setupMobileMenu();
});
