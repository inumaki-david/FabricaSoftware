// Kinetic Dex - Trainer Profile & Collection Binder Component (Stitch Fidelity)
import { StorageService } from "../services/storage.js";
import { CARD_DATABASE } from "../data/cards.js";
import { CardModal } from "./cardModal.js";
import { Toast } from "./toast.js";

export const Profile = {
  render(container, onNavigate) {
    const profile = StorageService.getProfile();
    const decks = StorageService.getDecks();
    const collection = StorageService.getCollection();
    const totalCollected = Object.keys(collection).length || CARD_DATABASE.length;
    const winRate = profile.totalGames > 0 ? Math.round((profile.wins / profile.totalGames) * 100) : 68;

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-16">
        <!-- Trainer Card Banner -->
        <section class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div class="absolute -top-12 -right-12 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <!-- Trainer Avatar -->
            <div class="relative group shrink-0">
              <div class="w-28 h-28 rounded-2xl bg-primary-container p-1 shadow-xl overflow-hidden border-2 border-primary">
                <img id="profile-avatar-img" src="${profile.avatarUrl}" alt="${profile.username}" class="w-full h-full object-cover rounded-xl" />
              </div>
              <span class="absolute -bottom-2 -right-2 bg-secondary-container text-on-secondary-container text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
                LVL 45
              </span>
            </div>

            <!-- Profile Info -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1">
                <h1 class="font-display text-2xl md:text-3xl font-extrabold text-on-surface">${profile.username}</h1>
                <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                  ${profile.rank}
                </span>
              </div>
              <p class="text-xs text-on-surface-variant font-medium">${profile.title} • Competitive Player</p>

              <!-- Stats Pill Counter Grid -->
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <div class="bg-surface-container px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                  <p class="text-[10px] text-outline font-bold uppercase tracking-wider">Total Decks</p>
                  <p class="font-display text-lg font-bold text-on-surface mt-0.5">${decks.length}</p>
                </div>
                <div class="bg-surface-container px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                  <p class="text-[10px] text-outline font-bold uppercase tracking-wider">Binder Cards</p>
                  <p class="font-display text-lg font-bold text-on-surface mt-0.5">${totalCollected}</p>
                </div>
                <div class="bg-surface-container px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                  <p class="text-[10px] text-outline font-bold uppercase tracking-wider">Win Rate</p>
                  <p class="font-display text-lg font-bold text-secondary mt-0.5">${winRate}%</p>
                </div>
                <div class="bg-surface-container px-4 py-2.5 rounded-xl text-center min-w-[90px]">
                  <p class="text-[10px] text-outline font-bold uppercase tracking-wider">Record</p>
                  <p class="font-display text-lg font-bold text-on-surface mt-0.5">${profile.wins}W / ${profile.losses}L</p>
                </div>
              </div>
            </div>

            <!-- Match Logger -->
            <div class="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <p class="text-[11px] font-bold text-outline uppercase tracking-wider text-center md:text-right">Log Match</p>
              <div class="flex gap-2">
                <button id="profile-log-win-btn" class="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">emoji_events</span>
                  Win (+1)
                </button>
                <button id="profile-log-loss-btn" class="flex-1 sm:flex-none bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">close</span>
                  Loss
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Binder & Rare Cards Showcase -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-display text-xl font-bold text-on-surface">Collector Binder</h2>
              <p class="text-xs text-on-surface-variant">Your holographic and ultra-rare Pokémon card showcase.</p>
            </div>
            <span class="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Full Binder
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            ${CARD_DATABASE.slice(0, 12).map(card => `
              <div class="relative bg-surface-container-lowest rounded-2xl border border-outline-variant p-2 shadow-sm group card-hover cursor-pointer transition-all" data-inspect-binder="${card.id}">
                <div class="aspect-[0.67] w-full rounded-xl overflow-hidden bg-surface-container-high relative holo-shine-container">
                  <img src="${card.imageUrl}" alt="${card.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="holo-shine absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                </div>
                <div class="mt-2 px-1">
                  <p class="font-display text-xs font-bold text-on-surface truncate">${card.name}</p>
                  <p class="text-[10px] text-on-surface-variant">${card.set}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      </div>
    `;

    this.bindEvents(container, onNavigate);
  },

  bindEvents(container, onNavigate) {
    const profile = StorageService.getProfile();

    container.querySelector("#profile-log-win-btn")?.addEventListener("click", () => {
      profile.wins++;
      profile.totalGames++;
      StorageService.saveProfile(profile);
      Toast.success("Match victory logged!");
      this.render(container, onNavigate);
    });

    container.querySelector("#profile-log-loss-btn")?.addEventListener("click", () => {
      profile.losses++;
      profile.totalGames++;
      StorageService.saveProfile(profile);
      Toast.info("Match loss logged.");
      this.render(container, onNavigate);
    });

    container.querySelectorAll("[data-inspect-binder]").forEach(el => {
      el.addEventListener("click", () => {
        const cardId = el.getAttribute("data-inspect-binder");
        CardModal.open(cardId);
      });
    });
  }
};
