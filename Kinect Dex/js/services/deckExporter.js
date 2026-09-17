// Kinetic Dex - Pokémon TCG Live (PTCGL) Export & Import Service
import { CARD_DATABASE, CARD_MAP } from "../data/cards.js";

export const DeckExporter = {
  /**
   * Exports a deck to Pokémon TCG Live standard text format
   * @param {Object} deck 
   * @returns {string} PTCGL text format
   */
  exportToPTCGL(deck) {
    const pokemon = [];
    const trainers = [];
    const energies = [];

    deck.cards.forEach(item => {
      const card = CARD_MAP.get(item.cardId);
      if (!card) return;

      const line = `${item.quantity} ${card.name} ${card.set} ${card.number.split("/")[0]}`;
      if (card.supertype === "Pokémon") {
        pokemon.push(line);
      } else if (card.supertype === "Trainer") {
        trainers.push(line);
      } else if (card.supertype === "Energy") {
        energies.push(line);
      }
    });

    let output = `Pokémon: ${pokemon.reduce((sum, _, i) => sum + deck.cards.filter(c => CARD_MAP.get(c.cardId)?.supertype === "Pokémon")[i]?.quantity, 0)}\n`;
    output += pokemon.join("\n") + "\n\n";

    output += `Trainer: ${trainers.reduce((sum, _, i) => sum + deck.cards.filter(c => CARD_MAP.get(c.cardId)?.supertype === "Trainer")[i]?.quantity, 0)}\n`;
    output += trainers.join("\n") + "\n\n";

    output += `Energy: ${energies.reduce((sum, _, i) => sum + deck.cards.filter(c => CARD_MAP.get(c.cardId)?.supertype === "Energy")[i]?.quantity, 0)}\n`;
    output += energies.join("\n") + "\n\n";

    output += `Total Cards: ${deck.cards.reduce((sum, item) => sum + item.quantity, 0)}\n`;

    return output;
  },

  /**
   * Parses PTCGL decklist text and creates a Kinetic Dex deck object
   * @param {string} text 
   * @param {string} deckName 
   * @returns {Object} Deck object
   */
  importFromPTCGL(text, deckName = "Imported Deck") {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const cardMap = new Map();

    for (const line of lines) {
      if (line.startsWith("Pokémon:") || line.startsWith("Trainer:") || line.startsWith("Energy:") || line.startsWith("Total Cards:")) {
        continue;
      }

      // Regex matching: "4 Mew VMAX FST 114" or "4 Mew VMAX Fusion Strike 114" or "4 Mew VMAX"
      const match = line.match(/^(\d+)\s+(.+?)(?:\s+([A-Z0-9]+|\w+[\w\s]*)\s+(\d+))?$/i);
      if (!match) continue;

      const qty = parseInt(match[1], 10);
      const cardName = match[2].trim();

      // Find in database by name matching
      const foundCard = CARD_DATABASE.find(c => 
        c.name.toLowerCase() === cardName.toLowerCase() ||
        c.name.toLowerCase().includes(cardName.toLowerCase()) ||
        cardName.toLowerCase().includes(c.name.toLowerCase())
      );

      if (foundCard) {
        cardMap.set(foundCard.id, (cardMap.get(foundCard.id) || 0) + qty);
      }
    }

    const cards = [];
    cardMap.forEach((quantity, cardId) => {
      cards.push({ cardId, quantity: Math.min(quantity, 4) });
    });

    const firstPokemon = cards.map(c => CARD_MAP.get(c.cardId)).find(c => c && c.supertype === "Pokémon");

    return {
      id: "deck-" + Date.now(),
      name: deckName,
      archetype: firstPokemon ? `${firstPokemon.name} Deck` : "Custom Deck",
      format: "Standard",
      description: `Deck importado em ${new Date().toLocaleDateString("pt-BR")}.`,
      coverCardId: firstPokemon ? firstPokemon.id : "fs-mew-vmax",
      coverImageUrl: firstPokemon ? firstPokemon.imageUrl : "",
      cards: cards
    };
  }
};
