// Kinetic Dex - Toast Notification Component

export const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "fixed bottom-24 right-6 z-50 flex flex-col gap-2 pointer-events-none";
      document.body.appendChild(this.container);
    }
  },

  show(message, type = "info", duration = 3000) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `toast-item flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0 text-sm font-medium ${
      type === "success"
        ? "bg-surface-container-lowest border-emerald-500/40 text-emerald-800 dark:text-emerald-300 shadow-emerald-900/10"
        : type === "error"
        ? "bg-surface-container-lowest border-red-500/40 text-red-800 dark:text-red-300 shadow-red-900/10"
        : "bg-surface-container-lowest border-primary/30 text-primary dark:text-primary-fixed shadow-primary/10"
    }`;

    const iconName = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
    toast.innerHTML = `
      <span class="material-symbols-outlined text-lg ${type === "success" ? "text-emerald-500" : type === "error" ? "text-red-500" : "text-primary"}">${iconName}</span>
      <span>${message}</span>
    `;

    this.container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    });

    // Remove after duration
    setTimeout(() => {
      toast.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(msg) {
    this.show(msg, "success");
  },

  error(msg) {
    this.show(msg, "error");
  },

  info(msg) {
    this.show(msg, "info");
  }
};
