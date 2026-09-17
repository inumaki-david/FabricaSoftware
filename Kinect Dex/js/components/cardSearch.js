// Kinetic Dex - Card Search & Catalog Component (Stitch Fidelity)
import { CARD_DATABASE } from "../data/cards.js";
import { CardModal } from "./cardModal.js";

export const CardSearch = {
  searchQuery: "",
  selectedType: "all",
  selectedSupertype: "all",

  render(container, onNavigate) {
    const filteredCards = this.getFilteredCards();

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-16">
        <!-- Search Input Section (Stitch Layout) -->
        <section>
          <div class="relative max-w-2xl mx-auto md:mx-0">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
            <input 
              type="text" 
              id="search-input" 
              value="${this.searchQuery}" 
              placeholder="Search Pokémon, attacks, or abilities..." 
              class="w-full bg-surface-container-lowest border-2 border-surface-container-highest rounded-2xl py-4 pl-12 pr-10 text-sm md:text-base text-on-surface focus:border-primary focus:ring-0 transition-colors shadow-sm placeholder:text-on-surface-variant" 
            />
            ${this.searchQuery ? `
              <button id="search-clear-btn" class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            ` : ""}
          </div>

          <!-- Types Section (Stitch Layout) -->
          <div class="mt-6">
            <h2 class="font-display text-lg font-bold text-on-surface mb-3">Types</h2>
            <div class="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full border-2 border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-colors shrink-0 text-xs font-bold ${this.selectedType === "all" ? "ring-2 ring-primary border-primary" : ""}" data-type="all">
                <span class="material-symbols-outlined text-on-surface-variant text-[18px]">filter_list</span>
                <span class="text-on-surface">All</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-fire shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Fire" ? "ring-2 ring-red-500 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Fire">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
                <span>Fire</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-water shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Water" ? "ring-2 ring-blue-500 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Water">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">water_drop</span>
                <span>Water</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-grass shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Grass" ? "ring-2 ring-emerald-500 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Grass">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">eco</span>
                <span>Grass</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-lightning shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Lightning" ? "ring-2 ring-amber-500 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Lightning">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span>Lightning</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-psychic shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Psychic" ? "ring-2 ring-purple-500 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Psychic">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">visibility</span>
                <span>Psychic</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-darkness shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Darkness" ? "ring-2 ring-slate-800 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Darkness">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">dark_mode</span>
                <span>Darkness</span>
              </button>

              <button class="type-filter-chip flex items-center gap-2 px-4 py-2 rounded-full type-metal shrink-0 shadow-sm text-xs font-bold transition-all ${this.selectedType === "Metal" ? "ring-2 ring-slate-400 scale-105" : "opacity-90 hover:opacity-100"}" data-type="Metal">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">shield</span>
                <span>Metal</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Results Header (Stitch Layout) -->
        <div class="flex justify-between items-end mb-4 pt-4 border-t border-outline-variant">
          <h2 class="font-display text-xl font-bold text-on-surface">Top Results</h2>
          <span class="text-xs text-on-surface-variant font-bold">Showing ${filteredCards.length} of ${CARD_DATABASE.length}</span>
        </div>

        <!-- Results Grid (Bento / Stitch TCG Cards) -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          ${filteredCards.length > 0 ? filteredCards.map(card => {
            const firstType = card.types?.[0];
            const typeClass = firstType ? `type-${firstType.toLowerCase()}` : "type-colorless";
            const typeIcon = firstType === "Fire" ? "local_fire_department" :
              firstType === "Water" ? "water_drop" :
              firstType === "Grass" ? "eco" :
              firstType === "Lightning" ? "bolt" :
              firstType === "Psychic" ? "visibility" :
              firstType === "Darkness" ? "dark_mode" :
              firstType === "Metal" ? "shield" : "star";

            return `
              <div class="tcg-card group relative bg-surface-container-lowest rounded-2xl p-2.5 border border-outline-variant shadow-sm flex flex-col h-full cursor-pointer hover:border-primary transition-all" data-card-id="${card.id}">
                <!-- Card Image & Holo -->
                <div class="relative w-full aspect-[0.67] rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/60 holo-shine-container">
                  <img src="${card.imageUrl}" alt="${card.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="holo-shine absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                  
                  <!-- Type Badge Overlay (Top Right) -->
                  ${firstType ? `
                    <div class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full ${typeClass} flex items-center justify-center shadow-md border border-white/20">
                      <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">${typeIcon}</span>
                    </div>
                  ` : ""}
                </div>

                <!-- Info -->
                <div class="mt-3 px-1 flex-grow flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start mb-1 gap-1">
                      <h3 class="font-display text-sm font-bold text-on-surface leading-tight truncate pr-2 group-hover:text-primary transition-colors" title="${card.name}">
                        ${card.name}
                      </h3>
                      ${card.hp ? `<span class="text-xs font-extrabold text-on-surface-variant shrink-0">${card.hp} HP</span>` : ""}
                    </div>
                    <p class="text-xs text-on-surface-variant mb-2">${card.set}</p>
                  </div>

                  <div class="mt-auto pt-2 border-t border-outline-variant flex justify-between items-center">
                    <span class="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded">
                      ${card.stage || card.supertype}
                    </span>
                    <button class="w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors shadow-sm active:scale-95" title="Add / View Details">
                      <span class="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join("") : `
            <div class="col-span-full py-16 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant">
              <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
              <p class="text-base font-bold text-on-surface">No Pokémon or cards found</p>
              <p class="text-xs text-on-surface-variant mt-1">Try searching for other Pokémon like Charizard, Mew, Miraidon, Blastoise, or Venusaur.</p>
            </div>
          `}
        </div>
      </div>
    `;

    this.bindEvents(container, onNavigate);
  },

  getFilteredCards() {
    return CARD_DATABASE.filter(card => {
      const query = this.searchQuery.toLowerCase();
      const matchesSearch = !query ||
        card.name.toLowerCase().includes(query) ||
        card.set.toLowerCase().includes(query) ||
        (card.attacks && card.attacks.some(a => a.name.toLowerCase().includes(query) || a.text?.toLowerCase().includes(query))) ||
        (card.abilities && card.abilities.some(a => a.name.toLowerCase().includes(query) || a.text?.toLowerCase().includes(query))) ||
        (card.text && card.text.toLowerCase().includes(query));

      const matchesType = this.selectedType === "all" || (card.types && card.types.includes(this.selectedType));
      return matchesSearch && matchesType;
    });
  },

  bindEvents(container, onNavigate) {
    const searchInput = container.querySelector("#search-input");
    searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value;
      this.render(container, onNavigate);
      const newInput = container.querySelector("#search-input");
      newInput?.focus();
      newInput?.setSelectionRange(newInput.value.length, newInput.value.length);
    });

    container.querySelector("#search-clear-btn")?.addEventListener("click", () => {
      this.searchQuery = "";
      this.render(container, onNavigate);
    });

    container.querySelectorAll(".type-filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        this.selectedType = chip.getAttribute("data-type");
        this.render(container, onNavigate);
      });
    });

    container.querySelectorAll("[data-card-id]").forEach(cardEl => {
      cardEl.addEventListener("click", () => {
        const cardId = cardEl.getAttribute("data-card-id");
        CardModal.open(cardId);
      });
    });
  }
};
