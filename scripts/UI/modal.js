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
  const submitBtn = form.querySelector(".submit-btn");

  // Open modal for new task
  openBtn.addEventListener("click", () => {
    form.reset();
    statusSelect.value = "todo";
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
      submitBtn.disabled = false;
      submitBtn.textContent = "Create Task";
      delete form.dataset.taskId;
    }
  });
}
