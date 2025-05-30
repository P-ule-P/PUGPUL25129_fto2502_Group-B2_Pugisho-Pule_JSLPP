/**
 * Sets up the sidebar toggle functionality for both desktop and mobile views.
 * Handles showing/hiding the sidebar and persists the state in localStorage.
 * @function setupSidebarToggle
 * @exports setupSidebarToggle
 */
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

  // Initialize sidebar state from localStorage
  if (localStorage.getItem("sidebarHidden") === "true") {
    sidebar.style.display = "none";
    showSidebarBtn.style.display = "flex";
  }
}

/**
 * Sets up the theme toggle functionality between light and dark modes.
 * Handles theme switching, logo visibility, and updates modal styles.
 * Persists the theme preference in localStorage.
 * @function setupThemeToggle
 * @exports setupThemeToggle
 */
export function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle-checkbox");
  const logoLight = document.getElementById("logo");
  const logoDark = document.getElementById("logo-dark");
  const body = document.body;

  // Only proceed if elements exist
  if (!themeToggle || !logoLight || !logoDark) return;

  /**
   * Updates all modal styles to match the current theme.
   * @param {boolean} isDarkMode - Whether dark mode is enabled
   */
  const updateModalStyles = (isDarkMode) => {
    const modals = document.querySelectorAll(".task-dialog, .confirm-dialog");
    modals.forEach((modal) => {
      if (isDarkMode) {
        modal.classList.add("dark-mode");
      } else {
        modal.classList.remove("dark-mode");
      }
    });
  };

  // Theme change handler
  themeToggle.addEventListener("change", () => {
    const isDarkMode = themeToggle.checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);

    // Toggle logos
    logoLight.style.display = isDarkMode ? "none" : "block";
    logoDark.style.display = isDarkMode ? "block" : "none";

    // Update modal styles
    updateModalStyles(isDarkMode);
  });

  // Initialize theme
  if (localStorage.getItem("darkMode") === "true") {
    themeToggle.checked = true;
    document.body.classList.add("dark-mode");
    logoLight.style.display = "none";
    logoDark.style.display = "block";
    updateModalStyles(true);
  }
}

/**
 * Sets up mobile menu functionality including:
 * - Opening/closing the menu
 * - Handling backdrop clicks
 * - Syncing theme toggle between desktop and mobile
 * - Auto-closing on desktop resize
 * @function setupMobileMenu
 * @exports setupMobileMenu
 */
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

  /**
   * Closes the mobile menu and resets styles.
   */
  const closeMenu = () => {
    mobileMenu.classList.remove("visible");
    backdrop.classList.remove("visible");
    document.body.style.overflow = "";
  };

  closeButton?.addEventListener("click", closeMenu);

  // Close menu when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove("visible");
      if (backdrop) backdrop.classList.remove("visible");
      document.body.style.overflow = "";
    }
  });

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
