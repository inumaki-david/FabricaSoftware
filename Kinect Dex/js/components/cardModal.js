// Kinetic Dex - Card Detail & Inspection Modal Component
import { CARD_MAP } from "../data/cards.js";
import { StorageService } from "../services/storage.js";
import { Toast } from "./toast.js";

export const CardModal = {
  modalEl: null,
  activeCard: null,

  init() {
    if (!this.modalEl) {
      this.modalEl = document.createElement("div");
      this.modalEl.id = "card-detail-modal";
      this.modalEl.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300";
      this.modalEl.innerHTML = `
        <div class="modal-content bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row transform scale-95 transition-transform duration-300">
          <button id="modal-close-btn" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
          
          <!-- Card Image & Holo Container -->
          <div class="p-6 md:w-1/2 flex flex-col items-center justify-center bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant">
            <div id="modal-card-tilt" class="card-tilt-container relative w-64 max-w-full aspect-[0.67] rounded-xl overflow-hidden shadow-xl group cursor-pointer">
              <img id="modal-card-img" src="" alt="Card Art" class="w-full h-full object-cover select-none pointer-events-none" />
              <div class="holo-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p class="text-xs text-on-surface-variant mt-3 text-center flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">touch_app</span> Passe o mouse para efeito holográfico
            </p>
          </div>

          <!-- Card Details Column -->
          <div class="p-6 md:w-1/2 flex flex-col justify-between">
            <div id="modal-card-info" class="space-y-4">
              <!-- Dynamically populated -->
            </div>

            <!-- Actions -->
            <div class="mt-6 pt-4 border-t border-outline-variant flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <select id="modal-deck-select" class="flex-1 bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary">
                  <!-- Populated with decks -->
                </select>
                <button id="modal-add-to-deck-btn" class="bg-primary text-on-primary font-bold px-4 py-2 rounded-xl hover:bg-primary-fixed-variant transition-colors flex items-center gap-1 text-sm shadow-md active:scale-95">
                  <span class="material-symbols-outlined text-sm">add</span>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.modalEl);

      // Setup close events
      const closeBtn = this.modalEl.querySelector("#modal-close-btn");
      closeBtn.addEventListener("click", () => this.close());
      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) this.close();
      });

      // Keyboard Esc close
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen()) this.close();
      });

      // 3D Parallax Holo-Tilt on mouse move
      const tiltBox = this.modalEl.querySelector("#modal-card-tilt");
      tiltBox.addEventListener("mousemove", (e) => {
        const rect = tiltBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        tiltBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      tiltBox.addEventListener("mouseleave", () => {
        tiltBox.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });

      // Add to deck button event
      const addBtn = this.modalEl.querySelector("#modal-add-to-deck-btn");
      addBtn.addEventListener("click", () => {
        if (!this.activeCard) return;
        const deckSelect = this.modalEl.querySelector("#modal-deck-select");
        const deckId = deckSelect.value;
        if (!deckId) {
          Toast.error("Selecione ou crie um deck primeiro!");
          return;
        }

        const deck = StorageService.getDeckById(deckId);
        if (!deck) return;

        const currentTotal = deck.cards.reduce((sum, item) => sum + item.quantity, 0);
        if (currentTotal >= 60) {
          Toast.error("O deck já possui o limite de 60 cartas!");
          return;
        }

        const existing = deck.cards.find(c => c.cardId === this.activeCard.id);
        const maxCopies = (this.activeCard.supertype === "Energy" && this.activeCard.subtypes?.includes("Basic")) ? 59 : 4;

        if (existing && existing.quantity >= maxCopies) {
          Toast.error(`Limite de ${maxCopies} cópias atingido para ${this.activeCard.name}!`);
          return;
        }

        if (existing) {
          existing.quantity++;
        } else {
          deck.cards.push({ cardId: this.activeCard.id, quantity: 1 });
        }

        StorageService.saveDeck(deck);
        Toast.success(`${this.activeCard.name} adicionado ao deck "${deck.name}"!`);
        window.dispatchEvent(new CustomEvent("deck-updated", { detail: { deckId } }));
      });
    }
  },

  isOpen() {
    return this.modalEl && !this.modalEl.classList.contains("pointer-events-none");
  },

  open(cardOrId) {
    this.init();
    const card = typeof cardOrId === "string" ? CARD_MAP.get(cardOrId) : cardOrId;
    if (!card) return;

    this.activeCard = card;
    const imgEl = this.modalEl.querySelector("#modal-card-img");
    imgEl.src = card.imageUrl;
    imgEl.alt = card.name;

    // Populate deck selection
    const decks = StorageService.getDecks();
    const deckSelect = this.modalEl.querySelector("#modal-deck-select");
    deckSelect.innerHTML = decks.length > 0
      ? decks.map(d => `<option value="${d.id}">${d.name} (${d.cards.reduce((s, c) => s + c.quantity, 0)}/60)</option>`).join("")
      : `<option value="">Nenhum deck encontrado</option>`;

    // Build details info
    const infoContainer = this.modalEl.querySelector("#modal-card-info");
    let typeBadges = (card.types || []).map(t => `<span class="type-badge type-${t.toLowerCase()} px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">${t}</span>`).join(" ");

    let attacksHtml = "";
    if (card.abilities && card.abilities.length > 0) {
      attacksHtml += card.abilities.map(ab => `
        <div class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
            <span class="material-symbols-outlined text-sm">flare</span>
            <span>Habilidade: ${ab.name}</span>
          </div>
          <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">${ab.text}</p>
        </div>
      `).join("");
    }

    if (card.attacks && card.attacks.length > 0) {
      attacksHtml += card.attacks.map(att => `
        <div class="p-3 bg-surface-container rounded-xl">
          <div class="flex items-center justify-between font-bold text-sm text-on-surface">
            <div class="flex items-center gap-2">
              <span class="text-xs text-outline font-normal">[${att.cost.join(", ")}]</span>
              <span>${att.name}</span>
            </div>
            <span class="text-primary font-bold">${att.damage || ""}</span>
          </div>
          ${att.text ? `<p class="text-xs text-on-surface-variant mt-1 leading-relaxed">${att.text}</p>` : ""}
        </div>
      `).join("");
    }

    if (card.text) {
      attacksHtml += `
        <div class="p-3 bg-surface-container rounded-xl">
          <p class="text-xs text-on-surface-variant leading-relaxed">${card.text}</p>
        </div>
      `;
    }

    infoContainer.innerHTML = `
      <div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-outline">${card.supertype} ${card.subtypes ? "• " + card.subtypes.join(" • ") : ""}</span>
          ${card.hp ? `<span class="text-lg font-extrabold text-primary">${card.hp} HP</span>` : ""}
        </div>
        <h2 class="text-2xl font-bold text-on-surface mt-1">${card.name}</h2>
        <div class="flex items-center gap-2 mt-2">
          ${typeBadges}
          <span class="text-xs text-outline bg-surface-container px-2 py-0.5 rounded">${card.set} #${card.number}</span>
        </div>
      </div>

      <div class="space-y-2">
        ${attacksHtml}
      </div>

      ${card.weaknesses ? `
        <div class="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant">
          <span>Fraqueza: <strong class="text-on-surface">${card.weaknesses.map(w => w.type + " " + w.value).join(", ")}</strong></span>
          <span>Recuo: <strong class="text-on-surface">${card.retreatCost || 0}</strong></span>
          <span>Raridade: <strong class="text-on-surface">${card.rarity || "Comum"}</strong></span>
        </div>
      ` : ""}
    `;

    // Show modal
    this.modalEl.classList.remove("pointer-events-none", "opacity-0");
    const content = this.modalEl.querySelector(".modal-content");
    content.classList.remove("scale-95");
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.add("opacity-0", "pointer-events-none");
    const content = this.modalEl.querySelector(".modal-content");
    content.classList.add("scale-95");
  }
};
