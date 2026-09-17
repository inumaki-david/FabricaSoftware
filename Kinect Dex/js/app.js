// Kinetic Dex - Main Application Orchestrator
import { Navbar } from "./components/navbar.js";
import { Dashboard } from "./components/dashboard.js";
import { DeckManager } from "./components/deckManager.js";
import { DeckBuilder } from "./components/deckBuilder.js";
import { CardSearch } from "./components/cardSearch.js";
import { Profile } from "./components/profile.js";
import { Toast } from "./components/toast.js";

class KineticDexApp {
  constructor() {
    this.currentRoute = "dashboard";
    this.routeParams = {};
    this.mainContent = document.getElementById("main-content");
  }

  init() {
    Toast.init();

    // Initialize Navbar with route callback
    Navbar.init((route, params = {}) => this.navigate(route, params));

    // Handle hash change or direct navigation
    window.addEventListener("hashchange", () => this.handleHashChange());
    window.addEventListener("deck-updated", () => {
      if (this.currentRoute === "deck-builder") {
        this.renderCurrentView();
      }
    });

    this.handleHashChange();
  }

  handleHashChange() {
    const hash = window.location.hash.replace("#", "").trim();
    if (!hash || hash === "") {
      this.navigate("dashboard");
      return;
    }

    const parts = hash.split("?");
    const route = parts[0];
    const params = {};

    if (parts[1]) {
      const searchParams = new URLSearchParams(parts[1]);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    this.navigate(route, params, false);
  }

  navigate(route, params = {}, updateHash = true) {
    this.currentRoute = route;
    this.routeParams = params;

    if (updateHash) {
      const queryString = Object.keys(params).length > 0 
        ? "?" + new URLSearchParams(params).toString() 
        : "";
      window.location.hash = `#${route}${queryString}`;
    }

    Navbar.updateActiveNav(route);
    this.renderCurrentView();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderCurrentView() {
    if (!this.mainContent) return;

    switch (this.currentRoute) {
      case "dashboard":
        Dashboard.render(this.mainContent, (r, p) => this.navigate(r, p));
        break;
      case "decks":
        DeckManager.render(this.mainContent, (r, p) => this.navigate(r, p), this.routeParams);
        break;
      case "deck-builder":
        DeckBuilder.render(this.mainContent, (r, p) => this.navigate(r, p), this.routeParams);
        break;
      case "search":
        CardSearch.render(this.mainContent, (r, p) => this.navigate(r, p));
        break;
      case "profile":
        Profile.render(this.mainContent, (r, p) => this.navigate(r, p));
        break;
      default:
        this.navigate("dashboard");
        break;
    }
  }
}

// Instantiate and initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new KineticDexApp();
  app.init();
});
