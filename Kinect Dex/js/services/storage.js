// Kinetic Dex - Storage Service
import { DEFAULT_DECKS } from "../data/defaultDecks.js";

const DECKS_KEY = "kinetic_dex_decks";
const PROFILE_KEY = "kinetic_dex_profile";
const COLLECTION_KEY = "kinetic_dex_collection";
const SETTINGS_KEY = "kinetic_dex_settings";

export const StorageService = {
  // --- DECKS ---
  getDecks() {
    try {
      const stored = localStorage.getItem(DECKS_KEY);
      if (!stored) {
        // Initialize with default decks
        this.saveDecks(DEFAULT_DECKS);
        return DEFAULT_DECKS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to load decks from storage:", e);
      return DEFAULT_DECKS;
    }
  },

  saveDecks(decks) {
    try {
      localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    } catch (e) {
      console.error("Failed to save decks:", e);
    }
  },

  getDeckById(id) {
    const decks = this.getDecks();
    return decks.find(d => d.id === id) || null;
  },

  saveDeck(deck) {
    const decks = this.getDecks();
    const index = decks.findIndex(d => d.id === deck.id);
    if (index >= 0) {
      decks[index] = { ...deck, updatedAt: new Date().toISOString() };
    } else {
      decks.unshift({
        ...deck,
        id: deck.id || "deck-" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    this.saveDecks(decks);
    return deck;
  },

  deleteDeck(id) {
    const decks = this.getDecks().filter(d => d.id !== id);
    this.saveDecks(decks);
  },

  duplicateDeck(id) {
    const deck = this.getDeckById(id);
    if (!deck) return null;
    const duplicated = {
      ...deck,
      id: "deck-" + Date.now(),
      name: `${deck.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.saveDeck(duplicated);
  },

  // --- TRAINER PROFILE ---
  getProfile() {
    const defaultProfile = {
      username: "Red",
      title: "Master Trainer",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZVU5Afdfr0Sj495oEQM9CwWneZpuq1hygaXxXa4113YHXFVPtNS8cK6JkJFP3tw5iuJFvJ2c4DKpaetKHOPqH--6EaG39NZozCoSYk0M4Up7wH2szlEJAWGLMjL_Mq1u4IQJxeKrkX90ynoMxHjDs5JMwS_iQ9PzS6MHBKL-Chb9cUiiFNKMntbDdUuZnVlHJEmmbwPzQYkeydAen-GJshjxZXjtAE8l4C8hJA1fN3WaDS3hJrKnm",
      rank: "Master League",
      rating: 1850,
      totalGames: 142,
      wins: 97,
      losses: 45
    };
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
  },

  // --- COLLECTION / BINDER ---
  getCollection() {
    try {
      const stored = localStorage.getItem(COLLECTION_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  toggleCardInCollection(cardId) {
    const collection = this.getCollection();
    collection[cardId] = (collection[cardId] || 0) + 1;
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
    return collection[cardId];
  },

  // --- SETTINGS ---
  getSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : { theme: "light", holoAnimation: true };
    } catch {
      return { theme: "light", holoAnimation: true };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  }
};
