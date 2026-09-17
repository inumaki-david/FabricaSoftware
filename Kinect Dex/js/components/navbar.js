// Kinetic Dex - Navigation Component (Stitch Fidelity)
import { StorageService } from "../services/storage.js";

export const Navbar = {
  activeRoute: "dashboard",
  onNavigate: null,

  init(onNavigate) {
    this.onNavigate = onNavigate;
    this.setupThemeToggle();
    this.bindEvents();
    this.updateActiveNav(this.activeRoute);
  },

  setupThemeToggle() {
    const settings = StorageService.getSettings();
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
    themeToggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        const newSettings = { ...StorageService.getSettings(), theme: isDark ? "dark" : "light" };
        StorageService.saveSettings(newSettings);
        this.updateThemeIcons(isDark);
      });
    });

    this.updateThemeIcons(settings.theme === "dark");
  },

  updateThemeIcons(isDark) {
    const icons = document.querySelectorAll(".theme-icon");
    icons.forEach(icon => {
      icon.textContent = isDark ? "light_mode" : "dark_mode";
    });
  },

  bindEvents() {
    const navLinks = document.querySelectorAll("[data-route]");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const route = link.getAttribute("data-route");
        if (route && this.onNavigate) {
          this.onNavigate(route);
        }
      });
    });
  },

  updateActiveNav(route) {
    this.activeRoute = route;

    // Desktop Nav Items
    const desktopNavLinks = document.querySelectorAll("header nav .nav-item");
    desktopNavLinks.forEach(link => {
      const linkRoute = link.getAttribute("data-route");
      if (linkRoute === route) {
        link.className = "nav-item text-primary dark:text-primary-fixed font-bold px-4 py-1.5 rounded-full bg-primary-container/10 transition-colors text-sm";
      } else {
        link.className = "nav-item text-on-surface-variant hover:text-on-surface font-semibold px-4 py-1.5 rounded-full hover:bg-primary-container/10 transition-colors text-sm";
      }
    });

    // Mobile Bottom Nav Items
    const mobileNavLinks = document.querySelectorAll("nav.mobile-nav a[data-route]");
    mobileNavLinks.forEach(link => {
      const linkRoute = link.getAttribute("data-route");
      const icon = link.querySelector(".material-symbols-outlined");

      if (linkRoute === route) {
        link.className = "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1.5 active:scale-90 duration-200";
        if (icon) icon.style.fontVariationSettings = "'FILL' 1";
      } else {
        link.className = "flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all rounded-full px-4 py-1 active:scale-90 duration-200";
        if (icon) icon.style.fontVariationSettings = "'FILL' 0";
      }
    });
  }
};
