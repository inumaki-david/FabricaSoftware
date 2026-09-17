// Kinetic Dex - Default Meta Decks (60 cards each)

export const DEFAULT_DECKS = [
  {
    id: "deck-mew-vmax",
    name: "Mew VMAX Fusion Strike",
    archetype: "Fusion Strike",
    format: "Standard",
    description: "A high-speed aggressive deck focused on utilizing Genesect V's Fusion Strike System to rapidly draw through the deck and power up Mew VMAX's Cross Fusion Strike.",
    coverCardId: "fs-mew-vmax",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HD9hhf4oGjI3e-Arm15eNom98t98ZS_Tmy-TTL4LMz9y87vXqgFQf7BJ2-iCwGuHgD8Ph_KRWbO_T5dWzIzk-39vzD9xTKC19i8n9AuW9iOczSuyRQl0W45H7UwRFqi05sgTQ0RsWIFZfGlB2rFoVNiTB6D7HCYdEmB6B-lcqJiDGVj2HOvaJv5AhQF82hPfTlM30ahR8id1TqEvdvsj4B9tvf-ivR0DdrsYG6PyMgzz99hVtMlU",
    energyTypes: ["Psychic", "Colorless"],
    winRate: 72,
    createdAt: "2026-08-15T10:00:00.000Z",
    updatedAt: "2026-09-01T12:00:00.000Z",
    cards: [
      // Pokémon (14)
      { cardId: "fs-mew-vmax", quantity: 4 },
      { cardId: "fs-mew-v", quantity: 4 },
      { cardId: "fs-genesect-v", quantity: 4 },
      { cardId: "fs-meloetta", quantity: 2 },
      // Trainers (39)
      { cardId: "tr-elesa-sparkle", quantity: 3 },
      { cardId: "tr-boss-orders", quantity: 3 },
      { cardId: "tr-iono", quantity: 2 },
      { cardId: "tr-prof-research", quantity: 2 },
      { cardId: "tr-battle-vip-pass", quantity: 4 },
      { cardId: "tr-ultra-ball", quantity: 4 },
      { cardId: "tr-nest-ball", quantity: 3 },
      { cardId: "tr-power-tablet", quantity: 4 },
      { cardId: "tr-cram-o-matic", quantity: 4 },
      { cardId: "tr-choice-belt", quantity: 2 },
      { cardId: "tr-prime-catcher", quantity: 1 },
      { cardId: "tr-super-rod", quantity: 2 },
      { cardId: "tr-path-to-the-peak", quantity: 3 },
      { cardId: "tr-rare-candy", quantity: 2 },
      // Energy (7)
      { cardId: "en-fusion-strike", quantity: 4 },
      { cardId: "en-double-turbo", quantity: 3 }
    ]
  },
  {
    id: "deck-charizard-turbo",
    name: "Charizard ex Turbo",
    archetype: "Darkness / Fire Turbo",
    format: "Standard",
    description: "Fast setup fire acceleration engine featuring Pidgeot ex for consistent setup and massive late-game damage scaling.",
    coverCardId: "of-charizard-ex",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG9EaFYyYH4ErdmB3I5OR7iE8gI65UYacM0QQ_gMz7l7xRrJOfFbSMfsqZAYBRSHlY9MKcI_Gfn4UARcSmOdcXE5kaiTKGEEs1peDmGHUxTBNdQ8Ma5nq_kTU9TUTVtcZO5aMq9WftCUQCUSJpGF7ZEjbRuYHMBi7JskR3tQok0CWyYtY1y0O40-uHX26qZSSpZuqT-0LiToqKycHpk_LvSIi5d-xGpX3RGp-qpC3CcNjfbo_hfrv9",
    energyTypes: ["Fire", "Darkness"],
    winRate: 68,
    createdAt: "2026-08-20T14:30:00.000Z",
    updatedAt: "2026-08-31T09:15:00.000Z",
    cards: [
      // Pokémon (16)
      { cardId: "of-charizard-ex", quantity: 3 },
      { cardId: "me-charmeleon", quantity: 1 },
      { cardId: "me-charmander", quantity: 4 },
      { cardId: "me-pidgeot-ex", quantity: 2 },
      { cardId: "me-pidgey", quantity: 2 },
      { cardId: "me-radiant-greninja", quantity: 1 },
      { cardId: "sv-roaring-moon-ex", quantity: 1 },
      { cardId: "sv-gengar", quantity: 2 },
      // Trainers (34)
      { cardId: "tr-arven", quantity: 4 },
      { cardId: "tr-iono", quantity: 3 },
      { cardId: "tr-boss-orders", quantity: 2 },
      { cardId: "tr-prof-research", quantity: 2 },
      { cardId: "tr-rare-candy", quantity: 4 },
      { cardId: "tr-ultra-ball", quantity: 4 },
      { cardId: "tr-nest-ball", quantity: 4 },
      { cardId: "tr-battle-vip-pass", quantity: 4 },
      { cardId: "tr-super-rod", quantity: 2 },
      { cardId: "tr-prime-catcher", quantity: 1 },
      { cardId: "tr-choice-belt", quantity: 2 },
      { cardId: "tr-path-to-the-peak", quantity: 2 },
      // Energy (10)
      { cardId: "en-fire-basic", quantity: 8 },
      { cardId: "en-darkness-basic", quantity: 2 }
    ]
  },
  {
    id: "deck-miraidon-control",
    name: "Miraidon Control",
    archetype: "Electric Aggro",
    format: "Standard",
    description: "Disrupt opponent strategies while setting up powerful electric attackers like Raikou V and Iron Hands ex on turn 1.",
    coverCardId: "sv-miraidon-ex",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Klwi5L11qTKZWUmHxj0O1cYCohGbjBoi-Eh30ng72rlbz7Af2Z5LuuLew7m-I0GoxvcV7ftB7sZ7Uz-RFaScvNn_oJl3IGK0aHfZiFAHlkMBXRUihVCJDTRDpa7c7RE0QGH83h9FLqPqApBYmxk4W5CqvMbA3t8MmMu8wTUdr0t-TA-4CTvgoIRzRQ9ehqIRkDl_2U2wCTQrJYTQqqp49nfMXrEHmwzP4L4mou9mQz78Rc4-0_Zk",
    energyTypes: ["Lightning"],
    winRate: 64,
    createdAt: "2026-08-25T18:00:00.000Z",
    updatedAt: "2026-08-30T16:45:00.000Z",
    cards: [
      // Pokémon (12)
      { cardId: "sv-miraidon-ex", quantity: 3 },
      { cardId: "sv-raikou-v", quantity: 2 },
      { cardId: "sv-iron-hands-ex", quantity: 2 },
      { cardId: "me-radiant-greninja", quantity: 1 },
      { cardId: "sv-blastoise-ex", quantity: 2 },
      { cardId: "sv-venusaur-ex", quantity: 2 },
      // Trainers (34)
      { cardId: "tr-prof-research", quantity: 4 },
      { cardId: "tr-boss-orders", quantity: 3 },
      { cardId: "tr-iono", quantity: 3 },
      { cardId: "tr-arven", quantity: 2 },
      { cardId: "tr-ultra-ball", quantity: 4 },
      { cardId: "tr-nest-ball", quantity: 4 },
      { cardId: "tr-battle-vip-pass", quantity: 4 },
      { cardId: "tr-super-rod", quantity: 2 },
      { cardId: "tr-prime-catcher", quantity: 1 },
      { cardId: "tr-choice-belt", quantity: 3 },
      { cardId: "tr-path-to-the-peak", quantity: 4 },
      // Energy (14)
      { cardId: "en-lightning-basic", quantity: 12 },
      { cardId: "en-double-turbo", quantity: 2 }
    ]
  }
];
