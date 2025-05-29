// Sidebar Toggle
export function setupSidebarToggle() {
  const sidebar = document.querySelector(".side-bar");
  const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
  const showSidebarBtn = document.querySelector(".show-sidebar-btn");
  const mobileLogo = document.querySelector(".logo-mobile");

  // Desktop toggle
  hideSidebarBtn?.addEventListener("click", () => {
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "flex";
    localStorage.setItem("sidebarHidden", "true");
  });

  showSidebarBtn?.addEventListener("click", () => {
    sidebar.style.display = "flex";
    showSidebarBtn.style.display = "none";
    localStorage.setItem("sidebarHidden", "false");
  });

  // Mobile toggle
  mobileLogo?.addEventListener("click", () => {
    sidebar.classList.toggle("visible");
  });

  // Initialize state
  if (localStorage.getItem("sidebarHidden") === "true") {
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "flex";
  }
}

// Theme Toggle
export function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle-checkbox");
  const logoLight = document.getElementById("logo");
  const logoDark = document.getElementById("logo-dark");
  const body = document.body;

  // Only proceed if elements exist
  if (!themeToggle || !logoLight || !logoDark) return;

  // Theme change handler
  themeToggle.addEventListener("change", () => {
    const isDarkMode = themeToggle.checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);

    // Toggle logos
    logoLight.style.display = isDarkMode ? "none" : "block";
    logoDark.style.display = isDarkMode ? "block" : "none";
  });

  // Initialize theme
  if (localStorage.getItem("darkMode") === "true") {
    themeToggle.checked = true;
    document.body.classList.add("dark-mode");
    logoLight.style.display = "none";
    logoDark.style.display = "block";
  }
}
