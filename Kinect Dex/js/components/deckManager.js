// Kinetic Dex - My Decks Component (Stitch Fidelity)
import { StorageService } from "../services/storage.js";
import { CARD_DATABASE, CARD_MAP } from "../data/cards.js";
import { DeckExporter } from "../services/deckExporter.js";
import { Toast } from "./toast.js";

export const DeckManager = {
  activeFormatFilter: "all",
  onNavigate: null,

  render(container, onNavigate, options = {}) {
    this.onNavigate = onNavigate;
    const decks = StorageService.getDecks();

    const filteredDecks = this.activeFormatFilter === "all"
      ? decks
      : decks.filter(d => d.format.toLowerCase() === this.activeFormatFilter.toLowerCase());

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-12">
        <!-- Page Header (Stitch Layout) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-display text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">My Decks</h1>
            <p class="text-xs md:text-sm text-on-surface-variant mt-1">Manage and build your competitive strategies.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="manager-import-btn" class="bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface text-xs md:text-sm font-bold px-4 py-2.5 rounded-full transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-base">file_download</span>
              Import
            </button>
            <button id="manager-new-deck-btn" class="bg-primary text-on-primary text-xs md:text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary-fixed-variant transition-colors flex items-center gap-2 shadow-md active:scale-95">
              <span class="material-symbols-outlined text-base">add</span>
              New Deck
            </button>
          </div>
        </div>

        <!-- Format Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button class="filter-chip px-4 py-1.5 rounded-full text-xs font-bold transition-all ${this.activeFormatFilter === "all" ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}" data-format="all">
            All (${decks.length})
          </button>
          <button class="filter-chip px-4 py-1.5 rounded-full text-xs font-bold transition-all ${this.activeFormatFilter === "Standard" ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}" data-format="Standard">
            Standard (${decks.filter(d => d.format === "Standard").length})
          </button>
          <button class="filter-chip px-4 py-1.5 rounded-full text-xs font-bold transition-all ${this.activeFormatFilter === "Expanded" ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}" data-format="Expanded">
            Expanded (${decks.filter(d => d.format === "Expanded").length})
          </button>
        </div>

        <!-- Decks Grid (Stitch Layout) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filteredDecks.map(deck => {
            const cardCount = deck.cards.reduce((sum, item) => sum + item.quantity, 0);
            const coverCard = CARD_MAP.get(deck.coverCardId);
            const coverImg = deck.coverImageUrl || coverCard?.imageUrl || "";
            const primaryType = deck.energyTypes?.[0] || "Fire";

            const typeBgColor = primaryType === "Fire" ? "bg-[#E53935]" :
              primaryType === "Lightning" ? "bg-[#FBC02D]" :
              primaryType === "Psychic" ? "bg-[#8E24AA]" :
              primaryType === "Water" ? "bg-[#1E88E5]" : "bg-[#607D8B]";

            const typeIcon = primaryType === "Fire" ? "local_fire_department" :
              primaryType === "Lightning" ? "bolt" :
              primaryType === "Psychic" ? "psychiatry" :
              primaryType === "Water" ? "water_drop" : "star";

            return `
              <div class="card-lift relative bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[340px] cursor-pointer group" data-deck-card-id="${deck.id}">
                <!-- Holo Foil Shine on Hover -->
                <div class="absolute inset-0 holo-foil pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>

                <!-- Hero Image Area -->
                <div class="h-44 w-full relative overflow-hidden bg-surface-container" data-action="open-deck" data-deck-id="${deck.id}">
                  <img src="${coverImg}" alt="${deck.name}" class="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent"></div>
                  
                  <!-- Format Badge -->
                  <div class="absolute top-3.5 left-3.5 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-sm border border-outline-variant px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-10">
                    <div class="w-2 h-2 rounded-full ${deck.format === "Standard" ? "bg-secondary-container" : "bg-tertiary-container"}"></div>
                    <span class="text-xs font-bold text-on-surface">${deck.format}</span>
                  </div>

                  <!-- Quick Action Menu -->
                  <div class="absolute top-3.5 right-3.5 z-30">
                    <button class="deck-menu-btn w-8 h-8 rounded-full bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-sm border border-outline-variant text-on-surface hover:bg-surface flex items-center justify-center transition-colors shadow-sm" data-menu-id="${deck.id}">
                      <span class="material-symbols-outlined text-base">more_vert</span>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="menu-dropdown-${deck.id}" class="hidden absolute right-0 top-10 w-44 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-1 z-40 text-xs">
                      <button class="w-full px-4 py-2.5 text-left text-on-surface hover:bg-surface-container flex items-center gap-2" data-menu-action="duplicate" data-deck-id="${deck.id}">
                        <span class="material-symbols-outlined text-sm">content_copy</span> Duplicate Deck
                      </button>
                      <button class="w-full px-4 py-2.5 text-left text-on-surface hover:bg-surface-container flex items-center gap-2" data-menu-action="export" data-deck-id="${deck.id}">
                        <span class="material-symbols-outlined text-sm">share</span> Export PTCGL
                      </button>
                      <button class="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-500/10 flex items-center gap-2" data-menu-action="delete" data-deck-id="${deck.id}">
                        <span class="material-symbols-outlined text-sm">delete</span> Delete Deck
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Deck Info Area -->
                <div class="p-5 flex-1 flex flex-col justify-between z-10 bg-surface-container-lowest relative" data-action="open-deck" data-deck-id="${deck.id}">
                  <div>
                    <h3 class="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-1">${deck.name}</h3>
                    <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${deck.description || "Aggressive competitive deck built for tournaments."}</p>
                  </div>

                  <!-- Meta Info & Energy -->
                  <div class="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between">
                    <div class="flex -space-x-1.5">
                      <div class="w-6 h-6 rounded-full ${typeBgColor} border-2 border-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span class="material-symbols-outlined text-[12px] text-white" style="font-variation-settings: 'FILL' 1;">${typeIcon}</span>
                      </div>
                      <div class="w-6 h-6 rounded-full bg-[#90A4AE] border-2 border-surface-container-lowest flex items-center justify-center shadow-sm">
                        <span class="material-symbols-outlined text-[12px] text-white" style="font-variation-settings: 'FILL' 1;">star</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5 text-on-surface-variant">
                      <span class="material-symbols-outlined text-sm">content_copy</span>
                      <span class="text-xs font-bold">${cardCount} / 60</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join("")}

          <!-- Create New Deck Card (Stitch Layout) -->
          <div id="grid-create-card" class="card-lift bg-surface-container-low border-2 border-dashed border-outline-variant rounded-2xl h-[340px] flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:border-primary hover:bg-primary-container/5 transition-all group">
            <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-sm">
              <span class="material-symbols-outlined text-3xl">add</span>
            </div>
            <h3 class="font-display text-lg font-bold text-on-surface mb-2">Create New Deck</h3>
            <p class="text-xs text-on-surface-variant max-w-[220px]">Start building from scratch or import a decklist.</p>
          </div>
        </div>
      </div>

      <!-- New Deck Modal -->
      <div id="new-deck-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden">
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-outline-variant">
            <h3 class="font-display text-lg font-bold text-on-surface">Create New Deck</h3>
            <button id="new-deck-close" class="text-on-surface-variant hover:text-on-surface">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="new-deck-form" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Deck Name</label>
              <input type="text" id="new-deck-name" required placeholder="e.g. Gardevoir ex Control" class="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Format</label>
              <select id="new-deck-format" class="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none">
                <option value="Standard">Standard (Official Standard)</option>
                <option value="Expanded">Expanded</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Cover Card</label>
              <select id="new-deck-cover" class="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none">
                ${CARD_DATABASE.filter(c => c.supertype === "Pokémon").map(c => `<option value="${c.id}">${c.name} (${c.set})</option>`).join("")}
              </select>
            </div>

            <div class="pt-3 flex gap-3">
              <button type="button" id="new-deck-cancel" class="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold py-2.5 rounded-xl text-xs transition-colors">Cancel</button>
              <button type="submit" class="flex-1 bg-primary text-on-primary font-bold py-2.5 rounded-xl text-xs hover:bg-primary-fixed-variant transition-colors shadow-md">Create Deck</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Import Deck Modal -->
      <div id="import-deck-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden">
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-outline-variant">
            <h3 class="font-display text-lg font-bold text-on-surface">Import Decklist (PTCGL)</h3>
            <button id="import-deck-close" class="text-on-surface-variant hover:text-on-surface">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="import-deck-form" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Deck Name</label>
              <input type="text" id="import-deck-name" placeholder="e.g. My Imported Tournament Deck" required class="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Paste Decklist Text</label>
              <textarea id="import-deck-text" rows="8" placeholder="Pokémon: 4&#10;4 Mew VMAX FST 114&#10;&#10;Trainer: 8&#10;4 Ultra Ball SVI 196&#10;4 Nest Ball SVI 181&#10;&#10;Energy: 4&#10;4 Double Turbo Energy BRS 151" class="w-full font-mono text-xs bg-surface-container border border-outline-variant rounded-xl p-3 text-on-surface focus:border-primary focus:outline-none"></textarea>
            </div>

            <div class="pt-2 flex gap-3">
              <button type="button" id="import-deck-cancel" class="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold py-2.5 rounded-xl text-xs transition-colors">Cancel</button>
              <button type="submit" class="flex-1 bg-primary text-on-primary font-bold py-2.5 rounded-xl text-xs hover:bg-primary-fixed-variant transition-colors shadow-md">Import Deck</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.bindEvents(container);

    if (options.openNewModal) {
      this.openNewDeckModal(container);
    }
  },

  bindEvents(container) {
    // Format Filters
    container.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeFormatFilter = btn.getAttribute("data-format");
        this.render(container, this.onNavigate);
      });
    });

    // Open Deck
    container.querySelectorAll("[data-action='open-deck']").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".deck-menu-btn") || e.target.closest("[data-menu-action]")) return;
        const deckId = el.getAttribute("data-deck-id");
        this.onNavigate("deck-builder", { deckId });
      });
    });

    // Kebab Menu Toggle
    container.querySelectorAll(".deck-menu-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const deckId = btn.getAttribute("data-menu-id");
        const menu = container.querySelector(`#menu-dropdown-${deckId}`);
        container.querySelectorAll("[id^='menu-dropdown-']").forEach(m => {
          if (m !== menu) m.classList.add("hidden");
        });
        menu?.classList.toggle("hidden");
      });
    });

    // Close menus on document click
    document.addEventListener("click", () => {
      container.querySelectorAll("[id^='menu-dropdown-']").forEach(m => m.classList.add("hidden"));
    });

    // Duplicate / Export / Delete Actions
    container.querySelectorAll("[data-menu-action]").forEach(action => {
      action.addEventListener("click", (e) => {
        e.stopPropagation();
        const act = action.getAttribute("data-menu-action");
        const deckId = action.getAttribute("data-deck-id");

        if (act === "duplicate") {
          const dup = StorageService.duplicateDeck(deckId);
          if (dup) {
            Toast.success(`Deck "${dup.name}" duplicated!`);
            this.render(container, this.onNavigate);
          }
        } else if (act === "delete") {
          if (confirm("Are you sure you want to delete this deck?")) {
            StorageService.deleteDeck(deckId);
            Toast.info("Deck deleted.");
            this.render(container, this.onNavigate);
          }
        } else if (act === "export") {
          const deck = StorageService.getDeckById(deckId);
          if (deck) {
            const ptcglText = DeckExporter.exportToPTCGL(deck);
            navigator.clipboard.writeText(ptcglText).then(() => {
              Toast.success("Decklist copied to clipboard!");
            }).catch(() => {
              alert(ptcglText);
            });
          }
        }
      });
    });

    // New Deck Modal
    const newDeckBtn = container.querySelector("#manager-new-deck-btn");
    const gridCreateCard = container.querySelector("#grid-create-card");
    const newDeckModal = container.querySelector("#new-deck-modal");
    const newDeckClose = container.querySelector("#new-deck-close");
    const newDeckCancel = container.querySelector("#new-deck-cancel");
    const newDeckForm = container.querySelector("#new-deck-form");

    const openNewModal = () => newDeckModal?.classList.remove("hidden");
    const closeNewModal = () => newDeckModal?.classList.add("hidden");

    newDeckBtn?.addEventListener("click", openNewModal);
    gridCreateCard?.addEventListener("click", openNewModal);
    newDeckClose?.addEventListener("click", closeNewModal);
    newDeckCancel?.addEventListener("click", closeNewModal);

    newDeckForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = container.querySelector("#new-deck-name").value.trim();
      const format = container.querySelector("#new-deck-format").value;
      const coverCardId = container.querySelector("#new-deck-cover").value;
      const coverCard = CARD_MAP.get(coverCardId);

      const newDeck = {
        id: "deck-" + Date.now(),
        name,
        archetype: `${coverCard?.name || "Custom"} Deck`,
        format,
        description: `Competitive deck created on ${new Date().toLocaleDateString("en-US")}.`,
        coverCardId,
        coverImageUrl: coverCard?.imageUrl || "",
        energyTypes: coverCard?.types || ["Fire"],
        cards: [
          { cardId: coverCardId, quantity: 2 }
        ]
      };

      StorageService.saveDeck(newDeck);
      Toast.success(`Deck "${name}" created!`);
      closeNewModal();
      this.onNavigate("deck-builder", { deckId: newDeck.id });
    });

    // Import Deck Modal
    const importBtn = container.querySelector("#manager-import-btn");
    const importModal = container.querySelector("#import-deck-modal");
    const importClose = container.querySelector("#import-deck-close");
    const importCancel = container.querySelector("#import-deck-cancel");
    const importForm = container.querySelector("#import-deck-form");

    const openImportModal = () => importModal?.classList.remove("hidden");
    const closeImportModal = () => importModal?.classList.add("hidden");

    importBtn?.addEventListener("click", openImportModal);
    importClose?.addEventListener("click", closeImportModal);
    importCancel?.addEventListener("click", closeImportModal);

    importForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const deckName = container.querySelector("#import-deck-name").value.trim();
      const text = container.querySelector("#import-deck-text").value.trim();
      if (!text) {
        Toast.error("Please paste the decklist text.");
        return;
      }

      const imported = DeckExporter.importFromPTCGL(text, deckName);
      StorageService.saveDeck(imported);
      Toast.success(`Deck "${deckName}" imported!`);
      closeImportModal();
      this.onNavigate("deck-builder", { deckId: imported.id });
    });
  },

  openNewDeckModal(container) {
    const newDeckModal = container.querySelector("#new-deck-modal");
    newDeckModal?.classList.remove("hidden");
  }
};
