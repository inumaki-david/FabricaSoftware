// Kinetic Dex - Opening Hand Test Simulator Component
import { CARD_MAP } from "../data/cards.js";
import { Toast } from "./toast.js";

export const HandSimulator = {
  modalEl: null,
  activeDeck: null,
  currentDeckPool: [],
  hand: [],
  prizes: [],
  mulligans: 0,

  init() {
    if (!this.modalEl) {
      this.modalEl = document.createElement("div");
      this.modalEl.id = "hand-simulator-modal";
      this.modalEl.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300";
      this.modalEl.innerHTML = `
        <div class="modal-content bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative flex flex-col transform scale-95 transition-transform duration-300">
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-outline-variant">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-2xl">playing_cards</span>
              <div>
                <h2 class="text-xl font-bold text-on-surface">Simulador de Mão Inicial</h2>
                <p id="sim-deck-title" class="text-xs text-on-surface-variant">Testando consistência do deck</p>
              </div>
            </div>
            <button id="sim-close-btn" class="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Status Bar & Actions -->
          <div class="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant">
            <div class="flex items-center gap-3">
              <span id="sim-status-badge" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                Mão Válida (Básico Encontrado)
              </span>
              <span id="sim-mulligan-count" class="text-xs font-bold text-outline">Mulligans: 0</span>
              <span id="sim-deck-remaining" class="text-xs text-outline">Deck restante: 47 cartas</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="sim-draw-one-btn" class="bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-sm">add</span> Comprar +1
              </button>
              <button id="sim-redraw-btn" class="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-fixed-variant flex items-center gap-1 transition-colors shadow-sm active:scale-95">
                <span class="material-symbols-outlined text-sm">refresh</span> Reembaralhar (Nova Mão)
              </button>
            </div>
          </div>

          <!-- Hand Cards Area -->
          <div class="py-6 flex-1">
            <h3 class="text-xs font-bold uppercase tracking-wider text-outline mb-3 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">pan_tool</span>
              Sua Mão (<span id="sim-hand-count">7</span> cartas)
            </h3>
            <div id="sim-hand-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 min-h-[160px]">
              <!-- Hand cards rendered here -->
            </div>
          </div>

          <!-- Prize Cards Simulator Area -->
          <div class="pt-4 border-t border-outline-variant">
            <h3 class="text-xs font-bold uppercase tracking-wider text-outline mb-2 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">military_tech</span>
              Cartas de Prêmio (6 cartas viradas para baixo)
            </h3>
            <div id="sim-prizes-grid" class="flex gap-2 overflow-x-auto pb-2">
              <!-- 6 prize slots -->
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.modalEl);

      this.modalEl.querySelector("#sim-close-btn").addEventListener("click", () => this.close());
      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) this.close();
      });

      this.modalEl.querySelector("#sim-redraw-btn").addEventListener("click", () => this.dealNewHand());
      this.modalEl.querySelector("#sim-draw-one-btn").addEventListener("click", () => this.drawCard());
    }
  },

  open(deck) {
    this.init();
    this.activeDeck = deck;
    this.mulligans = 0;
    this.modalEl.querySelector("#sim-deck-title").textContent = `Deck: ${deck.name} (${deck.cards.reduce((s, c) => s + c.quantity, 0)} cartas)`;

    this.dealNewHand();

    this.modalEl.classList.remove("pointer-events-none", "opacity-0");
    const content = this.modalEl.querySelector(".modal-content");
    content.classList.remove("scale-95");
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.add("opacity-0", "pointer-events-none");
    const content = this.modalEl.querySelector(".modal-content");
    content.classList.add("scale-95");
  },

  dealNewHand() {
    if (!this.activeDeck || !this.activeDeck.cards.length) return;

    // Flatten deck pool
    const pool = [];
    this.activeDeck.cards.forEach(item => {
      const card = CARD_MAP.get(item.cardId);
      if (card) {
        for (let i = 0; i < item.quantity; i++) {
          pool.push(card);
        }
      }
    });

    // Shuffle pool (Fisher-Yates algorithm)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Draw 7 cards for hand
    this.hand = pool.splice(0, Math.min(7, pool.length));

    // Draw 6 cards for prizes
    this.prizes = pool.splice(0, Math.min(6, pool.length));

    this.currentDeckPool = pool;

    // Check for Basic Pokémon in hand
    const hasBasic = this.hand.some(c => c.supertype === "Pokémon" && c.stage === "Basic");

    if (!hasBasic) {
      this.mulligans++;
      const badge = this.modalEl.querySelector("#sim-status-badge");
      badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-600 border border-red-500/30 flex items-center gap-1";
      badge.innerHTML = `<span class="material-symbols-outlined text-sm">warning</span> Mulligan! (Nenhum Pokémon Básico na mão)`;
      Toast.error("Mulligan detectado! O oponente compra 1 carta.");
    } else {
      const badge = this.modalEl.querySelector("#sim-status-badge");
      badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 flex items-center gap-1";
      badge.innerHTML = `<span class="material-symbols-outlined text-sm">check_circle</span> Mão Válida (Básico Pronto)`;
    }

    this.modalEl.querySelector("#sim-mulligan-count").textContent = `Mulligans: ${this.mulligans}`;
    this.render();
  },

  drawCard() {
    if (this.currentDeckPool.length === 0) {
      Toast.error("Deck vazio! Não há mais cartas para comprar.");
      return;
    }
    const card = this.currentDeckPool.shift();
    this.hand.push(card);
    this.render();
    Toast.info(`Comprou ${card.name}`);
  },

  render() {
    this.modalEl.querySelector("#sim-deck-remaining").textContent = `Deck restante: ${this.currentDeckPool.length} cartas`;
    this.modalEl.querySelector("#sim-hand-count").textContent = this.hand.length;

    // Render Hand Cards
    const handGrid = this.modalEl.querySelector("#sim-hand-grid");
    handGrid.innerHTML = this.hand.map((card, idx) => `
      <div class="relative bg-surface-container rounded-xl overflow-hidden shadow-sm border border-outline-variant group card-hover cursor-pointer transition-transform flex flex-col" title="${card.name}">
        <div class="aspect-[0.67] w-full relative overflow-hidden bg-surface-container-high">
          <img src="${card.imageUrl}" alt="${card.name}" class="w-full h-full object-cover" />
          <div class="holo-shine absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
        </div>
        <div class="p-1.5 bg-surface-container-lowest">
          <p class="text-[11px] font-bold text-on-surface truncate">${card.name}</p>
          <p class="text-[9px] text-outline truncate">${card.supertype} ${card.stage ? "• " + card.stage : ""}</p>
        </div>
      </div>
    `).join("");

    // Render Prize Cards
    const prizesGrid = this.modalEl.querySelector("#sim-prizes-grid");
    prizesGrid.innerHTML = this.prizes.map((card, idx) => `
      <div class="w-14 h-20 rounded-lg bg-primary-container/20 border-2 border-dashed border-primary/40 flex items-center justify-center text-primary font-bold text-xs shrink-0 select-none shadow-sm" title="Prêmio #${idx + 1}">
        P${idx + 1}
      </div>
    `).join("");
  }
};
