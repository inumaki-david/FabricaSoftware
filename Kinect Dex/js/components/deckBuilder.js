// Kinetic Dex - Deck Details & Builder Component (Stitch Fidelity)
import { StorageService } from "../services/storage.js";
import { CARD_DATABASE, CARD_MAP } from "../data/cards.js";
import { DeckExporter } from "../services/deckExporter.js";
import { HandSimulator } from "./handSimulator.js";
import { CardModal } from "./cardModal.js";
import { Toast } from "./toast.js";

export const DeckBuilder = {
  activeDeck: null,
  activeTab: "pokemon", // 'pokemon' | 'trainers' | 'energy'
  drawerOpen: false,
  drawerFilter: "all",
  drawerSearchQuery: "",
  onNavigate: null,

  render(container, onNavigate, options = {}) {
    this.onNavigate = onNavigate;
    const deckId = options.deckId || (StorageService.getDecks()[0]?.id);
    this.activeDeck = StorageService.getDeckById(deckId);

    if (!this.activeDeck) {
      container.innerHTML = `
        <div class="text-center py-20">
          <p class="text-on-surface-variant mb-4">Deck not found.</p>
          <button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm" id="back-to-decks-btn">Back to Decks</button>
        </div>
      `;
      container.querySelector("#back-to-decks-btn")?.addEventListener("click", () => onNavigate("decks"));
      return;
    }

    const totalCards = this.activeDeck.cards.reduce((sum, item) => sum + item.quantity, 0);

    const pokemonCards = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Pokémon");
    const trainerCards = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Trainer");
    const energyCards = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Energy");

    const pokemonCount = pokemonCards.reduce((s, i) => s + i.quantity, 0);
    const trainerCount = trainerCards.reduce((s, i) => s + i.quantity, 0);
    const energyCount = energyCards.reduce((s, i) => s + i.quantity, 0);

    // Energy distribution calculation
    const energyBreakdown = {};
    energyCards.forEach(item => {
      const card = CARD_MAP.get(item.cardId);
      if (card) {
        const type = card.types?.[0] || (card.subtypes?.includes("Fusion Strike") ? "Fusion Strike" : "Special");
        energyBreakdown[type] = (energyBreakdown[type] || 0) + item.quantity;
      }
    });

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-16 relative">
        <!-- Breadcrumb / Back Link -->
        <div class="flex items-center justify-between">
          <button id="builder-back-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-xs md:text-sm font-bold">
            <span class="material-symbols-outlined text-base">arrow_back</span>
            Back to Decks
          </button>
          <button id="builder-add-cards-btn" class="bg-primary text-on-primary text-xs md:text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary-fixed-variant transition-colors flex items-center gap-2 shadow-md active:scale-95">
            <span class="material-symbols-outlined text-base">add</span>
            Add Cards
          </button>
        </div>

        <!-- Deck Header Area (Stitch Exact Layout) -->
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, #1e30b2 1px, transparent 0); background-size: 24px 24px;"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div class="flex-1">
              <!-- Archetype & Format Badges -->
              <div class="flex items-center gap-2.5 mb-3">
                <span class="px-3.5 py-1 bg-[#ff4a86]/20 text-[#d81b60] rounded-full text-xs font-bold flex items-center gap-1.5 border border-[#ff4a86]/30">
                  <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">psychiatry</span>
                  ${this.activeDeck.archetype || "Fusion Strike"}
                </span>
                <span class="px-3.5 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-bold border border-outline-variant">
                  ${this.activeDeck.format}
                </span>
              </div>

              <!-- Title & Description -->
              <h1 class="font-display text-2xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                ${this.activeDeck.name}
              </h1>
              <p class="text-xs md:text-sm text-on-surface-variant max-w-3xl leading-relaxed mb-6">
                ${this.activeDeck.description || "High-speed competitive strategy engineered for high damage output and rapid bench setup."}
              </p>

              <!-- Meta Stats Counter Row -->
              <div class="flex flex-wrap items-center gap-6 pt-4 border-t border-outline-variant">
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">Total Cards</span>
                  <span class="font-display text-xl font-extrabold text-primary font-bold">${totalCards} / 60</span>
                </div>
                <div class="w-px h-8 bg-outline-variant hidden sm:block"></div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">Pokémon</span>
                  <span class="font-display text-xl font-bold text-on-surface">${pokemonCount}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">Trainers</span>
                  <span class="font-display text-xl font-bold text-on-surface">${trainerCount}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-outline uppercase tracking-wider mb-1">Energy</span>
                  <span class="font-display text-xl font-bold text-on-surface">${energyCount}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons (Stitch Layout) -->
            <div class="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <button id="builder-test-hand-btn" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim transition-colors px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-sm active:scale-95">
                <span class="material-symbols-outlined text-base">playing_cards</span>
                Test Hand
              </button>
              <button id="builder-export-btn" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface text-primary border-2 border-primary hover:bg-primary-container/10 transition-colors px-6 py-3 rounded-xl text-xs md:text-sm font-bold active:scale-95">
                <span class="material-symbols-outlined text-base">share</span>
                Export
              </button>
            </div>
          </div>

          <!-- Energy Tracker Bar (Stitch Layout) -->
          <div class="mt-6 pt-6 border-t border-outline-variant relative z-10">
            <span class="text-[11px] font-bold text-outline uppercase tracking-wider mb-2 block">Energy Distribution</span>
            <div class="flex h-3 w-full rounded-full overflow-hidden bg-surface-container shadow-inner">
              ${energyCount > 0 ? Object.entries(energyBreakdown).map(([type, qty]) => {
                const pct = Math.round((qty / energyCount) * 100);
                const bgGradient = type === "Fusion Strike" ? "bg-gradient-to-r from-[#ff4a86] to-[#9c27b0]" :
                  type === "Fire" ? "bg-[#E53E3E]" :
                  type === "Lightning" ? "bg-[#ECC94B]" :
                  type === "Water" ? "bg-[#3182CE]" : "bg-[#9e9e9e]";
                return `<div class="${bgGradient} h-full transition-all duration-500" style="width: ${pct}%" title="${type} (${qty})"></div>`;
              }).join("") : `<div class="bg-[#9e9e9e] h-full w-full opacity-30"></div>`}
            </div>
            <div class="flex justify-between text-xs mt-1.5 text-on-surface-variant font-bold">
              ${Object.entries(energyBreakdown).map(([type, qty]) => `<span>${type} (${qty})</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- Content Tabs (Stitch Layout) -->
        <div class="flex gap-1 border-b-2 border-outline-variant mb-6 overflow-x-auto pb-1 hide-scrollbar">
          <button class="builder-tab-btn px-6 py-3 border-b-4 ${this.activeTab === "pokemon" ? "border-primary text-primary bg-primary-container/5" : "border-transparent text-on-surface-variant hover:text-on-surface"} font-display text-sm md:text-base font-bold rounded-t-xl transition-colors whitespace-nowrap" data-tab="pokemon">
            Pokémon (${pokemonCount})
          </button>
          <button class="builder-tab-btn px-6 py-3 border-b-4 ${this.activeTab === "trainers" ? "border-primary text-primary bg-primary-container/5" : "border-transparent text-on-surface-variant hover:text-on-surface"} font-display text-sm md:text-base font-bold rounded-t-xl transition-colors whitespace-nowrap" data-tab="trainers">
            Trainers (${trainerCount})
          </button>
          <button class="builder-tab-btn px-6 py-3 border-b-4 ${this.activeTab === "energy" ? "border-primary text-primary bg-primary-container/5" : "border-transparent text-on-surface-variant hover:text-on-surface"} font-display text-sm md:text-base font-bold rounded-t-xl transition-colors whitespace-nowrap" data-tab="energy">
            Energies (${energyCount})
          </button>
        </div>

        <!-- Cards Gallery Grid (Stitch Layout) -->
        <div id="builder-cards-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 min-h-[320px]">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- Slide-Out Card Drawer -->
      <div id="card-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-container-lowest border-l border-outline-variant shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col">
        <div class="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">library_add</span>
            <h3 class="text-sm font-bold text-on-surface">Add to Deck</h3>
          </div>
          <button id="drawer-close-btn" class="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div class="p-4 border-b border-outline-variant space-y-3">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input type="text" id="drawer-search-input" placeholder="Search Pokémon, Trainer, Energy..." class="w-full bg-surface-container border border-outline-variant rounded-xl pl-9 pr-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary" />
          </div>
          <div class="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            <button class="drawer-filter-btn px-3 py-1 rounded-full text-[11px] font-bold bg-primary text-on-primary" data-supertype="all">All</button>
            <button class="drawer-filter-btn px-3 py-1 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant hover:bg-surface-container-high" data-supertype="Pokémon">Pokémon</button>
            <button class="drawer-filter-btn px-3 py-1 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant hover:bg-surface-container-high" data-supertype="Trainer">Trainer</button>
            <button class="drawer-filter-btn px-3 py-1 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant hover:bg-surface-container-high" data-supertype="Energy">Energy</button>
          </div>
        </div>

        <div id="drawer-cards-list" class="flex-1 p-4 overflow-y-auto space-y-3">
          <!-- Populated dynamically -->
        </div>
      </div>
      <div id="drawer-backdrop" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300"></div>
    `;

    this.renderCardsGrid(container);
    this.bindEvents(container);
  },

  renderCardsGrid(container) {
    const grid = container.querySelector("#builder-cards-grid");
    if (!grid) return;

    let itemsToRender = [];
    if (this.activeTab === "pokemon") {
      itemsToRender = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Pokémon");
    } else if (this.activeTab === "trainers") {
      itemsToRender = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Trainer");
    } else if (this.activeTab === "energy") {
      itemsToRender = this.activeDeck.cards.filter(item => CARD_MAP.get(item.cardId)?.supertype === "Energy");
    } else {
      itemsToRender = this.activeDeck.cards;
    }

    if (itemsToRender.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant">
          <span class="material-symbols-outlined text-4xl text-outline mb-2">style</span>
          <p class="text-sm font-bold text-on-surface">No cards in this category.</p>
          <p class="text-xs text-on-surface-variant mt-1">Click "Add Cards" above to include cards in your deck.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = itemsToRender.map(item => {
      const card = CARD_MAP.get(item.cardId);
      if (!card) return "";

      return `
        <div class="flex flex-col group">
          <!-- Card Container (Stitch Layout) -->
          <div class="relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest holo-foil card-lift aspect-[0.67] mb-2.5 cursor-pointer" data-inspect-card="${card.id}">
            <img src="${card.imageUrl}" alt="${card.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            
            <!-- Quantity Badge (Stitch Style) -->
            <div class="absolute -bottom-1 -right-1 bg-surface border-2 border-primary text-primary font-display font-bold text-sm rounded-tl-xl rounded-br-lg px-3 py-0.5 shadow-sm z-10">
              ${item.quantity}x
            </div>

            <!-- Hover Stepper Overlay -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-20">
              <button class="w-7 h-7 rounded-lg bg-surface/90 text-primary hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-colors text-xs" data-qty-change="increase" data-card-id="${card.id}" title="Add copy">
                <span class="material-symbols-outlined text-xs">add</span>
              </button>
              <button class="w-7 h-7 rounded-lg bg-surface/90 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow-md transition-colors text-xs" data-qty-change="decrease" data-card-id="${card.id}" title="Remove copy">
                <span class="material-symbols-outlined text-xs">remove</span>
              </button>
            </div>
          </div>

          <!-- Card Name & Subtype -->
          <div class="px-1">
            <h3 class="font-bold text-xs text-on-surface truncate" title="${card.name}">${card.name}</h3>
            <p class="text-[11px] text-on-surface-variant truncate">${card.subtypes ? card.subtypes.join(" • ") : card.supertype}</p>
          </div>
        </div>
      `;
    }).join("");

    // Steppers
    grid.querySelectorAll("[data-qty-change]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = btn.getAttribute("data-qty-change");
        const cardId = btn.getAttribute("data-card-id");
        this.updateCardQuantity(cardId, action === "increase" ? 1 : -1, container);
      });
    });

    // Inspect Card
    grid.querySelectorAll("[data-inspect-card]").forEach(imgContainer => {
      imgContainer.addEventListener("click", () => {
        const cardId = imgContainer.getAttribute("data-inspect-card");
        CardModal.open(cardId);
      });
    });
  },

  updateCardQuantity(cardId, delta, container) {
    const existing = this.activeDeck.cards.find(c => c.cardId === cardId);
    if (!existing && delta < 0) return;

    const totalCards = this.activeDeck.cards.reduce((sum, item) => sum + item.quantity, 0);
    const card = CARD_MAP.get(cardId);
    const isBasicEnergy = card?.supertype === "Energy" && card?.subtypes?.includes("Basic");
    const maxLimit = isBasicEnergy ? 59 : 4;

    if (delta > 0) {
      if (totalCards >= 60) {
        Toast.error("Maximum 60 cards limit reached in this deck!");
        return;
      }
      if (existing && existing.quantity >= maxLimit) {
        Toast.error(`Maximum copy limit of ${maxLimit} reached for ${card.name}!`);
        return;
      }
    }

    if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        this.activeDeck.cards = this.activeDeck.cards.filter(c => c.cardId !== cardId);
      }
    } else if (delta > 0) {
      this.activeDeck.cards.push({ cardId, quantity: 1 });
    }

    StorageService.saveDeck(this.activeDeck);
    this.render(container, this.onNavigate, { deckId: this.activeDeck.id });
  },

  bindEvents(container) {
    // Back
    container.querySelector("#builder-back-btn")?.addEventListener("click", () => this.onNavigate("decks"));

    // Test Hand Simulator
    container.querySelector("#builder-test-hand-btn")?.addEventListener("click", () => {
      HandSimulator.open(this.activeDeck);
    });

    // Export PTCGL
    container.querySelector("#builder-export-btn")?.addEventListener("click", () => {
      const ptcgl = DeckExporter.exportToPTCGL(this.activeDeck);
      navigator.clipboard.writeText(ptcgl).then(() => {
        Toast.success("PTCGL decklist copied to clipboard!");
      }).catch(() => {
        alert(ptcgl);
      });
    });

    // Tab Navigation
    const tabBtns = container.querySelectorAll(".builder-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeTab = btn.getAttribute("data-tab");
        tabBtns.forEach(b => {
          if (b === btn) {
            b.className = "builder-tab-btn px-6 py-3 border-b-4 border-primary text-primary bg-primary-container/5 font-display text-sm md:text-base font-bold rounded-t-xl transition-colors whitespace-nowrap";
          } else {
            b.className = "builder-tab-btn px-6 py-3 border-b-4 border-transparent text-on-surface-variant hover:text-on-surface font-display text-sm md:text-base font-bold rounded-t-xl transition-colors whitespace-nowrap";
          }
        });
        this.renderCardsGrid(container);
      });
    });

    // Drawer Toggle
    const drawer = container.querySelector("#card-drawer");
    const backdrop = container.querySelector("#drawer-backdrop");
    const openDrawerBtn = container.querySelector("#builder-add-cards-btn");
    const closeDrawerBtn = container.querySelector("#drawer-close-btn");

    const openDrawer = () => {
      drawer?.classList.remove("translate-x-full");
      backdrop?.classList.remove("opacity-0", "pointer-events-none");
      this.renderDrawerList(container);
    };

    const closeDrawer = () => {
      drawer?.classList.add("translate-x-full");
      backdrop?.classList.add("opacity-0", "pointer-events-none");
    };

    openDrawerBtn?.addEventListener("click", openDrawer);
    closeDrawerBtn?.addEventListener("click", closeDrawer);
    backdrop?.addEventListener("click", closeDrawer);

    // Drawer Search & Filter
    const searchInput = container.querySelector("#drawer-search-input");
    searchInput?.addEventListener("input", (e) => {
      this.drawerSearchQuery = e.target.value.toLowerCase().trim();
      this.renderDrawerList(container);
    });

    const filterBtns = container.querySelectorAll(".drawer-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.drawerFilter = btn.getAttribute("data-supertype");
        filterBtns.forEach(b => {
          b.className = `drawer-filter-btn px-3 py-1 rounded-full text-[11px] font-bold ${
            b === btn ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`;
        });
        this.renderDrawerList(container);
      });
    });
  },

  renderDrawerList(container) {
    const list = container.querySelector("#drawer-cards-list");
    if (!list) return;

    let filtered = CARD_DATABASE.filter(c => {
      const matchesSearch = !this.drawerSearchQuery || 
        c.name.toLowerCase().includes(this.drawerSearchQuery) ||
        (c.attacks && c.attacks.some(a => a.name.toLowerCase().includes(this.drawerSearchQuery)));
      
      const matchesType = this.drawerFilter === "all" || c.supertype === this.drawerFilter;
      return matchesSearch && matchesType;
    });

    list.innerHTML = filtered.map(card => {
      const inDeck = this.activeDeck.cards.find(c => c.cardId === card.id);
      const currentQty = inDeck ? inDeck.quantity : 0;

      return `
        <div class="flex items-center gap-3 p-2.5 bg-surface-container rounded-xl border border-outline-variant hover:border-primary transition-colors">
          <img src="${card.imageUrl}" alt="${card.name}" class="w-12 h-16 object-cover rounded-lg shrink-0 shadow-sm" />
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-bold text-on-surface truncate">${card.name}</h5>
            <p class="text-[10px] text-outline">${card.supertype} • ${card.set}</p>
            ${currentQty > 0 ? `<span class="text-[10px] text-primary font-bold">In deck: ${currentQty}x</span>` : ""}
          </div>
          <button class="bg-primary text-on-primary text-xs font-bold w-8 h-8 rounded-xl flex items-center justify-center hover:bg-primary-fixed-variant transition-colors shrink-0 shadow-sm active:scale-95" data-drawer-add="${card.id}">
            <span class="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      `;
    }).join("");

    list.querySelectorAll("[data-drawer-add]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cardId = btn.getAttribute("data-drawer-add");
        this.updateCardQuantity(cardId, 1, container);
        this.renderDrawerList(container);
      });
    });
  }
};
