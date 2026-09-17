// Kinetic Dex - Dashboard Component (Stitch Fidelity)
import { StorageService } from "../services/storage.js";
import { CARD_MAP } from "../data/cards.js";

export const Dashboard = {
  render(container, onNavigate) {
    const profile = StorageService.getProfile();
    const decks = StorageService.getDecks();
    const totalDecks = decks.length;
    const collection = StorageService.getCollection();
    const totalCardsCollected = Object.values(collection).reduce((sum, count) => sum + count, 458);

    const winRate = profile.totalGames > 0 
      ? Math.round((profile.wins / profile.totalGames) * 100) 
      : 68;

    const recentDecks = decks.slice(0, 4);

    container.innerHTML = `
      <div class="space-y-10 animate-fade-in">
        <!-- Welcome Section -->
        <section class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-display text-2xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-1">
              Welcome back, Trainer.
            </h1>
            <p class="text-sm md:text-base text-on-surface-variant">
              Ready to optimize your next strategy?
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button id="dash-new-deck-btn" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-xl hover:bg-primary-fixed-variant transition-all flex items-center gap-2 shadow-md active:scale-95 text-sm">
              <span class="material-symbols-outlined text-base">add</span>
              New Deck
            </button>
            <button id="dash-search-btn" class="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant text-on-surface font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-base">search</span>
              Search Cards
            </button>
          </div>
        </section>

        <!-- Stats Bento Grid (Stitch Layout) -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Total Decks Stat -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between card-hover transition-all">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-primary text-3xl">style</span>
              <span class="text-xs font-bold text-primary-fixed-variant bg-primary-container/20 px-2.5 py-1 rounded">Active</span>
            </div>
            <div>
              <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Total Decks</p>
              <p class="font-display text-4xl font-extrabold text-primary">${totalDecks}</p>
            </div>
          </div>

          <!-- Collection Size Stat -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between card-hover transition-all">
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-tertiary text-3xl">inventory_2</span>
              <span class="text-xs font-bold text-tertiary bg-tertiary-container/10 px-2.5 py-1 rounded">Growth</span>
            </div>
            <div>
              <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Collection Size</p>
              <p class="font-display text-4xl font-extrabold text-on-surface">${totalCardsCollected}</p>
            </div>
          </div>

          <!-- Win Rate Stat (with glowing gradient) -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between card-hover transition-all relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-secondary-container/20 to-transparent pointer-events-none"></div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <span class="material-symbols-outlined text-secondary text-3xl">emoji_events</span>
              <span class="text-xs font-bold text-on-secondary-container bg-secondary-container px-2.5 py-1 rounded">Top Tier</span>
            </div>
            <div class="relative z-10">
              <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Win Rate</p>
              <div class="flex items-baseline gap-2">
                <p class="font-display text-4xl font-extrabold text-secondary">${winRate}%</p>
                <span class="text-xs text-outline font-medium">(${profile.wins}W - ${profile.losses}L)</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Decks Section -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl font-bold text-on-surface">Recent Decks</h2>
            <button id="dash-view-all-decks" class="text-primary font-bold hover:text-primary-fixed-variant transition-colors flex items-center gap-1 text-sm">
              View All <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${recentDecks.map(deck => {
              const coverCard = CARD_MAP.get(deck.coverCardId);
              const coverImg = deck.coverImageUrl || coverCard?.imageUrl || "";
              const primaryType = deck.energyTypes?.[0] || "Fire";

              const typeBgColor = primaryType === "Fire" ? "bg-[#E53E3E]" :
                primaryType === "Lightning" ? "bg-[#ECC94B]" :
                primaryType === "Psychic" ? "bg-[#9C27B0]" :
                primaryType === "Water" ? "bg-[#3182CE]" : "bg-primary";

              const typeIcon = primaryType === "Fire" ? "local_fire_department" :
                primaryType === "Lightning" ? "bolt" :
                primaryType === "Psychic" ? "psychiatry" :
                primaryType === "Water" ? "water_drop" : "star";

              return `
                <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col sm:flex-row group card-hover transition-all cursor-pointer" data-deck-id="${deck.id}">
                  <!-- Card Art Focus with Holo Foil -->
                  <div class="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden bg-surface-container flex items-center justify-center shrink-0">
                    <img src="${coverImg}" alt="${deck.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="holo-shine absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <!-- Energy Type Badge -->
                    <div class="absolute top-3 left-3 w-8 h-8 rounded-full ${typeBgColor} border-2 border-surface flex items-center justify-center shadow-md">
                      <span class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">${typeIcon}</span>
                    </div>
                  </div>

                  <!-- Deck Info -->
                  <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div class="flex justify-between items-start mb-2 gap-2">
                        <h3 class="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors">${deck.name}</h3>
                        <span class="bg-secondary-container text-on-secondary-container text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">${deck.format}</span>
                      </div>
                      <p class="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">${deck.description}</p>
                    </div>

                    <div class="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant">
                      <!-- Energy Tracker Preview -->
                      <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1.5">
                          <div class="w-3 h-3 rounded-full ${typeBgColor}"></div>
                          <span class="text-xs font-bold text-on-surface-variant">${deck.cards.filter(c => CARD_MAP.get(c.cardId)?.supertype === "Energy").reduce((s, i) => s + i.quantity, 0)}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-on-surface-variant text-xs font-bold">
                          <span class="material-symbols-outlined text-sm">content_copy</span>
                          <span>${deck.cards.reduce((s, i) => s + i.quantity, 0)} / 60</span>
                        </div>
                      </div>

                      <button class="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-fixed-variant transition-colors active:scale-95 shadow-sm">
                        Edit Deck
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </section>
      </div>
    `;

    // Event Bindings
    container.querySelector("#dash-new-deck-btn")?.addEventListener("click", () => onNavigate("decks", { openNewModal: true }));
    container.querySelector("#dash-search-btn")?.addEventListener("click", () => onNavigate("search"));
    container.querySelector("#dash-view-all-decks")?.addEventListener("click", () => onNavigate("decks"));

    container.querySelectorAll("[data-deck-id]").forEach(card => {
      card.addEventListener("click", () => {
        const deckId = card.getAttribute("data-deck-id");
        onNavigate("deck-builder", { deckId });
      });
    });
  }
};
