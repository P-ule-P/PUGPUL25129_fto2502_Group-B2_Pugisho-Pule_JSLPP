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

// Mobile Menu Functionality (added exactly as requested)
export function setupMobileMenu() {
  const mobileLogo = document.querySelector(".logo-mobile");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.getElementById("close-mobile-menu");
  const themeToggle = document.getElementById("theme-toggle-checkbox");
  const mobileThemeToggle = document.getElementById(
    "mobile-theme-toggle-checkbox"
  );
  const backdrop = document.getElementById("mobile-menu-backdrop");

  // Toggle mobile menu
  mobileLogo?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.add("visible");
    backdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  const closeMenu = () => {
    mobileMenu.classList.remove("visible");
    backdrop.classList.remove("visible");
    document.body.style.overflow = "";
  };

  closeButton?.addEventListener("click", closeMenu);

  // Sync theme toggles
  themeToggle?.addEventListener("change", (e) => {
    if (mobileThemeToggle) {
      mobileThemeToggle.checked = e.target.checked;
    }
  });

  mobileThemeToggle?.addEventListener("change", (e) => {
    if (themeToggle) {
      themeToggle.checked = e.target.checked;
      themeToggle.dispatchEvent(new Event("change"));
    }
  });
}
