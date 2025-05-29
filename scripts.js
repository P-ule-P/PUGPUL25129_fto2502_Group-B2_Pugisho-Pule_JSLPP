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
 * Initializes the application
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
 * Handles initialization errors
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
 * Updates network status UI
 */
function updateNetworkStatus() {
  offlineEl.hidden = navigator.onLine;
}

/**
 * Sets up event listeners
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

// Start the application
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  initializeApp();

  // Initialize sidebar functionality
  setupSidebarToggle();
  setupThemeToggle();
  setupMobileMenu(); // Add this line to activate mobile menu
});
