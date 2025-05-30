/**
 * Renders tasks in their respective columns on the board
 * @param {Array<Object>} tasks - Array of task objects to render
 */
export function renderTasks(tasks = []) {
  const container = document.querySelector(".card-column-main");
  if (!container) return;

  const columns = [
    { id: "todo", name: "To Do", color: "#49c4e5" },
    { id: "doing", name: "Doing", color: "#8471f2" },
    { id: "done", name: "Done", color: "#219c90" },
  ];

  container.innerHTML = columns
    .map((column) => {
      const columnTasks = tasks.filter((task) => task.status === column.id);

      return `
      <div class="column-div">
        <div class="column-head-div">
          <span class="dot" style="background-color: ${column.color}"></span>
          <p class="columnHeader">${column.name} (${columnTasks.length})</p>
        </div>
        <ul class="tasks-container" data-status="${column.id}">
          ${columnTasks
            .map(
              (task) => `
            <li data-task-id="${task.id}">
              <p class="task-title">${task.title}</p>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
    })
    .join("");
}
