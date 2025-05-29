import { saveLocalTasks, getLocalTasks } from "../utils/storage.js";
import { renderTasks } from "./renderTasks.js";

export function setupModal() {
  const modal = document.getElementById("taskModal");
  const form = document.getElementById("taskForm");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = modal.querySelector(".close-btn");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const createTaskBtn = document.getElementById("createTaskBtn");
  const saveChangesBtn = document.getElementById("saveChangesBtn");
  const deleteBtn = document.getElementById("deleteTaskBtn");
  const modalTitle = modal.querySelector(".modal-title");

  // Confirmation dialog elements
  const confirmDialog = document.getElementById("confirmDialog");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  // Open modal for new task
  openBtn.addEventListener("click", () => {
    form.reset();
    statusSelect.value = "todo";
    modalTitle.textContent = "Add New Task";
    createTaskBtn.style.display = "block";
    saveChangesBtn.style.display = "none";
    deleteBtn.style.display = "none";
    modal.showModal();
  });

  // Close modal
  closeBtn.addEventListener("click", () => modal.close());

  // Edit existing task
  document.addEventListener("click", (e) => {
    const taskElement = e.target.closest(".tasks-container li");
    if (!taskElement) return;

    const tasks = getLocalTasks();
    const taskId = Number(taskElement.dataset.taskId);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      titleInput.value = task.title;
      descInput.value = task.description;
      statusSelect.value = task.status;
      form.dataset.taskId = taskId;
      modalTitle.textContent = "Edit Task";
      createTaskBtn.style.display = "none";
      saveChangesBtn.style.display = "block";
      deleteBtn.style.display = "block";
      modal.showModal();
    }
  });

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const status = statusSelect.value;
    const taskId = form.dataset.taskId ? Number(form.dataset.taskId) : null;

    if (!title || !desc) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const submitBtn = form.querySelector(
        ".submit-btn:not([style*='display: none'])"
      );
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";

      const tasks = getLocalTasks() || [];
      let updatedTasks;

      if (taskId) {
        // Update existing task
        updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, title, description: desc, status }
            : task
        );
      } else {
        // Create new task
        updatedTasks = [
          ...tasks,
          {
            id: Date.now(),
            title,
            description: desc,
            status,
          },
        ];
      }

      saveLocalTasks(updatedTasks);
      renderTasks(updatedTasks);
      modal.close();
      form.reset();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task");
    } finally {
      const activeSubmitBtn = form.querySelector(
        '.submit-btn:not([style*="display: none"])'
      );
      activeSubmitBtn.disabled = false;
      activeSubmitBtn.textContent = form.dataset.taskId
        ? "Save Changes"
        : "Create Task";
      delete form.dataset.taskId;
    }
  });

  // Delete task functionality
  deleteBtn.addEventListener("click", () => {
    confirmDialog.showModal();
  });

  // Confirm deletion
  confirmDeleteBtn.addEventListener("click", () => {
    const taskId = Number(form.dataset.taskId);
    if (taskId) {
      const tasks = getLocalTasks() || [];
      const updatedTasks = tasks.filter((task) => task.id !== taskId);

      saveLocalTasks(updatedTasks);
      renderTasks(updatedTasks);
      modal.close();
      confirmDialog.close();
      form.reset();
      delete form.dataset.taskId;
    }
  });

  // Cancel deletion
  cancelDeleteBtn.addEventListener("click", () => {
    confirmDialog.close();
  });
}
