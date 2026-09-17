// Kinetic Dex - Pokémon TCG Card Database
export const CARD_DATABASE = [
  // --- POKÉMON: FUSION STRIKE ---
  {
    id: "fs-mew-vmax",
    name: "Mew VMAX",
    supertype: "Pokémon",
    subtypes: ["VMAX", "Fusion Strike"],
    hp: 310,
    types: ["Psychic"],
    evolvesFrom: "Mew V",
    stage: "VMAX",
    rules: ["VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."],
    attacks: [
      {
        name: "Cross Fusion Strike",
        cost: ["Colorless", "Colorless"],
        damage: "",
        text: "Choose 1 of your Benched Fusion Strike Pokémon's attacks and use it as this attack."
      },
      {
        name: "Max Miracle",
        cost: ["Psychic", "Psychic"],
        damage: "130",
        text: "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      }
    ],
    weaknesses: [{ type: "Darkness", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 0,
    set: "Fusion Strike",
    number: "114/264",
    rarity: "Ultra Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HD9hhf4oGjI3e-Arm15eNom98t98ZS_Tmy-TTL4LMz9y87vXqgFQf7BJ2-iCwGuHgD8Ph_KRWbO_T5dWzIzk-39vzD9xTKC19i8n9AuW9iOczSuyRQl0W45H7UwRFqi05sgTQ0RsWIFZfGlB2rFoVNiTB6D7HCYdEmB6B-lcqJiDGVj2HOvaJv5AhQF82hPfTlM30ahR8id1TqEvdvsj4B9tvf-ivR0DdrsYG6PyMgzz99hVtMlU"
  },
  {
    id: "fs-genesect-v",
    name: "Genesect V",
    supertype: "Pokémon",
    subtypes: ["Basic", "V", "Fusion Strike"],
    hp: 190,
    types: ["Metal"],
    stage: "Basic",
    rules: ["V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."],
    abilities: [
      {
        name: "Fusion Strike System",
        type: "Ability",
        text: "Once during your turn, you may draw cards until you have as many cards in hand as you have Fusion Strike Pokémon in play."
      }
    ],
    attacks: [
      {
        name: "Techno Blast",
        cost: ["Metal", "Metal", "Colorless"],
        damage: "210",
        text: "During your next turn, this Pokémon can't attack."
      }
    ],
    weaknesses: [{ type: "Fire", value: "×2" }],
    resistances: [{ type: "Grass", value: "-30" }],
    retreatCost: 2,
    set: "Fusion Strike",
    number: "185/264",
    rarity: "Ultra Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF3tS0DHlwiy4HO5qNmq5Hb8nMmFhzfwrgm7p2Ohwg5nn4E67w-ZK-rlJqGwR8yRC7OhMWfoerUTd4D2mcBBaENZqNCMGxk4KY-lE6vSikQTPMxhRIMgKmJ_mIQBOJ8jWnM_pZRnub2w3_k4L7ovWWQ24ydvV2GA6L9hj4EKPW50EQ5AZYwUJSCA4Gm6txKQMRn0jKppQcyx8G0sEedKVOOHplWaC2lJllc3c51YcA9tqAOkpux6Go"
  },
  {
    id: "fs-meloetta",
    name: "Meloetta",
    supertype: "Pokémon",
    subtypes: ["Basic", "Fusion Strike"],
    hp: 90,
    types: ["Psychic"],
    stage: "Basic",
    attacks: [
      {
        name: "Melodious Echo",
        cost: ["Psychic", "Colorless"],
        damage: "70×",
        text: "This attack does 70 damage for each Fusion Strike Energy attached to all of your Pokémon."
      }
    ],
    weaknesses: [{ type: "Darkness", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 1,
    set: "Fusion Strike",
    number: "124/264",
    rarity: "Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf0kXsmkJAgLgsTiY0lgD-hO2pozyjJWiZnudst6g-0tVUjpYWWNDEoHUGlpcIIRerZrLpaN0sOlI7Z3-C2-3-0wxO1_sPQy8D6phCGIaT4idx46zEB9BFZQn16LNDRlJkiAQAdCfRFPudH-rAB9wZxt1OnMkU8YmQ7sE0fj7_Sv2scaY0_npsC8bQNOQRlwzDTaeKES_JMaxvloKUlishV-1VBoyorpIbHk4cYrGIsfjW2hfKAqd6"
  },
  {
    id: "fs-mew-v",
    name: "Mew V",
    supertype: "Pokémon",
    subtypes: ["Basic", "V", "Fusion Strike"],
    hp: 180,
    types: ["Psychic"],
    stage: "Basic",
    rules: ["V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."],
    attacks: [
      {
        name: "Energy Mix",
        cost: ["Psychic"],
        damage: "",
        text: "Search your deck for an Energy card and attach it to 1 of your Fusion Strike Pokémon. Then, shuffle your deck."
      },
      {
        name: "Psychic Leap",
        cost: ["Psychic", "Colorless"],
        damage: "70",
        text: "You may shuffle this Pokémon and all attached cards into your deck."
      }
    ],
    weaknesses: [{ type: "Darkness", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 0,
    set: "Fusion Strike",
    number: "113/264",
    rarity: "Ultra Rare",
    imageUrl: "https://images.pokemontcg.io/swsh8/113_hires.png"
  },

  // --- POKÉMON: CHARIZARD EX ENGINE ---
  {
    id: "of-charizard-ex",
    name: "Charizard ex",
    supertype: "Pokémon",
    subtypes: ["Stage 2", "ex", "Tera"],
    hp: 330,
    types: ["Darkness"],
    evolvesFrom: "Charmeleon",
    stage: "Stage 2",
    rules: ["Tera rule: As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's)."],
    abilities: [
      {
        name: "Infernal Reign",
        type: "Ability",
        text: "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may search your deck for up to 3 Basic Fire Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      }
    ],
    attacks: [
      {
        name: "Burning Darkness",
        cost: ["Fire", "Fire"],
        damage: "180+",
        text: "This attack does 30 more damage for each Prize card your opponent has taken."
      }
    ],
    weaknesses: [{ type: "Grass", value: "×2" }],
    retreatCost: 2,
    set: "Obsidian Flames",
    number: "125/197",
    rarity: "Double Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG9EaFYyYH4ErdmB3I5OR7iE8gI65UYacM0QQ_gMz7l7xRrJOfFbSMfsqZAYBRSHlY9MKcI_Gfn4UARcSmOdcXE5kaiTKGEEs1peDmGHUxTBNdQ8Ma5nq_kTU9TUTVtcZO5aMq9WftCUQCUSJpGF7ZEjbRuYHMBi7JskR3tQok0CWyYtY1y0O40-uHX26qZSSpZuqT-0LiToqKycHpk_LvSIi5d-xGpX3RGp-qpC3CcNjfbo_hfrv9"
  },
  {
    id: "me-charmander",
    name: "Charmander",
    supertype: "Pokémon",
    subtypes: ["Basic"],
    hp: 70,
    types: ["Fire"],
    stage: "Basic",
    attacks: [
      {
        name: "Blazing Destruction",
        cost: ["Fire"],
        damage: "",
        text: "Discard a Stadium in play."
      },
      {
        name: "Steady Firebreathing",
        cost: ["Fire", "Fire"],
        damage: "30",
        text: ""
      }
    ],
    weaknesses: [{ type: "Water", value: "×2" }],
    retreatCost: 1,
    set: "151",
    number: "004/165",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sv3pt5/4_hires.png"
  },
  {
    id: "me-charmeleon",
    name: "Charmeleon",
    supertype: "Pokémon",
    subtypes: ["Stage 1"],
    hp: 90,
    types: ["Fire"],
    evolvesFrom: "Charmander",
    stage: "Stage 1",
    attacks: [
      {
        name: "Combustion",
        cost: ["Fire", "Fire"],
        damage: "50",
        text: ""
      }
    ],
    weaknesses: [{ type: "Water", value: "×2" }],
    retreatCost: 2,
    set: "151",
    number: "005/165",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv3pt5/5_hires.png"
  },
  {
    id: "me-pidgeot-ex",
    name: "Pidgeot ex",
    supertype: "Pokémon",
    subtypes: ["Stage 2", "ex"],
    hp: 280,
    types: ["Colorless"],
    evolvesFrom: "Pidgeotto",
    stage: "Stage 2",
    abilities: [
      {
        name: "Quick Search",
        type: "Ability",
        text: "Once during your turn, you may search your deck for a card and put it into your hand. Then, shuffle your deck. You can't use more than 1 Quick Search Ability each turn."
      }
    ],
    attacks: [
      {
        name: "Blustery Wind",
        cost: ["Colorless", "Colorless"],
        damage: "120",
        text: "You may discard a Stadium in play."
      }
    ],
    weaknesses: [{ type: "Lightning", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 0,
    set: "Obsidian Flames",
    number: "164/197",
    rarity: "Double Rare",
    imageUrl: "https://images.pokemontcg.io/sv3/164_hires.png"
  },
  {
    id: "me-pidgey",
    name: "Pidgey",
    supertype: "Pokémon",
    subtypes: ["Basic"],
    hp: 60,
    types: ["Colorless"],
    stage: "Basic",
    attacks: [
      {
        name: "Call for Family",
        cost: ["Colorless"],
        damage: "",
        text: "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      }
    ],
    weaknesses: [{ type: "Lightning", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 1,
    set: "Obsidian Flames",
    number: "162/197",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sv3/162_hires.png"
  },
  {
    id: "me-radiant-greninja",
    name: "Radiant Greninja",
    supertype: "Pokémon",
    subtypes: ["Basic", "Radiant"],
    hp: 130,
    types: ["Water"],
    stage: "Basic",
    rules: ["Radiant Pokémon rule: You can't have more than 1 Radiant Pokémon in your deck."],
    abilities: [
      {
        name: "Concealed Cards",
        type: "Ability",
        text: "You must discard an Energy card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards."
      }
    ],
    attacks: [
      {
        name: "Moonlight Hurricane",
        cost: ["Water", "Water", "Colorless"],
        damage: "",
        text: "Discard 2 Energy from this Pokémon. This attack does 90 damage to 2 of your opponent's Pokémon."
      }
    ],
    weaknesses: [{ type: "Lightning", value: "×2" }],
    retreatCost: 1,
    set: "Astral Radiance",
    number: "046/189",
    rarity: "Radiant Rare",
    imageUrl: "https://images.pokemontcg.io/swsh10/46_hires.png"
  },

  // --- POKÉMON: MIRAIDON & LIGHTNING ---
  {
    id: "sv-miraidon-ex",
    name: "Miraidon ex",
    supertype: "Pokémon",
    subtypes: ["Basic", "ex"],
    hp: 220,
    types: ["Lightning"],
    stage: "Basic",
    abilities: [
      {
        name: "Tandem Unit",
        type: "Ability",
        text: "Once during your turn, you may search your deck for up to 2 Basic Lightning Pokémon and put them onto your Bench. Then, shuffle your deck."
      }
    ],
    attacks: [
      {
        name: "Photon Blaster",
        cost: ["Lightning", "Lightning", "Colorless"],
        damage: "220",
        text: "During your next turn, this Pokémon can't attack."
      }
    ],
    weaknesses: [{ type: "Fighting", value: "×2" }],
    retreatCost: 1,
    set: "Scarlet & Violet",
    number: "081/198",
    rarity: "Double Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Klwi5L11qTKZWUmHxj0O1cYCohGbjBoi-Eh30ng72rlbz7Af2Z5LuuLew7m-I0GoxvcV7ftB7sZ7Uz-RFaScvNn_oJl3IGK0aHfZiFAHlkMBXRUihVCJDTRDpa7c7RE0QGH83h9FLqPqApBYmxk4W5CqvMbA3t8MmMu8wTUdr0t-TA-4CTvgoIRzRQ9ehqIRkDl_2U2wCTQrJYTQqqp49nfMXrEHmwzP4L4mou9mQz78Rc4-0_Zk"
  },
  {
    id: "sv-raikou-v",
    name: "Raikou V",
    supertype: "Pokémon",
    subtypes: ["Basic", "V"],
    hp: 200,
    types: ["Lightning"],
    stage: "Basic",
    abilities: [
      {
        name: "Fleet-Footed",
        type: "Ability",
        text: "Once during your turn, if this Pokémon is in the Active Spot, you may draw a card."
      }
    ],
    attacks: [
      {
        name: "Lightning Rondo",
        cost: ["Lightning", "Colorless"],
        damage: "20+",
        text: "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
      }
    ],
    weaknesses: [{ type: "Fighting", value: "×2" }],
    retreatCost: 1,
    set: "Brilliant Stars",
    number: "048/172",
    rarity: "Ultra Rare",
    imageUrl: "https://images.pokemontcg.io/swsh9/48_hires.png"
  },
  {
    id: "sv-iron-hands-ex",
    name: "Iron Hands ex",
    supertype: "Pokémon",
    subtypes: ["Basic", "ex", "Future"],
    hp: 230,
    types: ["Lightning"],
    stage: "Basic",
    attacks: [
      {
        name: "Arm Press",
        cost: ["Lightning", "Lightning", "Colorless"],
        damage: "160",
        text: ""
      },
      {
        name: "Amp You Very Much",
        cost: ["Lightning", "Colorless", "Colorless", "Colorless"],
        damage: "120",
        text: "If your opponent's Pokémon is Knocked Out by damage from this attack, take 1 more Prize card."
      }
    ],
    weaknesses: [{ type: "Fighting", value: "×2" }],
    retreatCost: 4,
    set: "Paradox Rift",
    number: "070/182",
    rarity: "Double Rare",
    imageUrl: "https://images.pokemontcg.io/sv4/70_hires.png"
  },

  // --- OTHER ICONIC POKÉMON ---
  {
    id: "sv-blastoise-ex",
    name: "Blastoise ex",
    supertype: "Pokémon",
    subtypes: ["Stage 2", "ex"],
    hp: 330,
    types: ["Water"],
    evolvesFrom: "Wartortle",
    stage: "Stage 2",
    abilities: [
      {
        name: "Solid Shell",
        type: "Ability",
        text: "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      }
    ],
    attacks: [
      {
        name: "Twin Cannons",
        cost: ["Water", "Water"],
        damage: "140×",
        text: "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way."
      }
    ],
    weaknesses: [{ type: "Lightning", value: "×2" }],
    retreatCost: 3,
    set: "151",
    number: "009/165",
    rarity: "Double Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4qOMO51JS6qClel3BZUFMAzR3hYoOHTOetpZBsOQEp9DMH2odmgRxUq7Tv6VuBSaO0PsA663zk5KdMA5e9UNYmIj09oGdDCPJaq7gdimYwzUMxopf7h-S-VLjdDLBaoGNbTXGOqfZWDCG4z9yt3p-2p2aWuDk9lSrnYrpJmKYM7qnJubvJO-iSm_llFx-NzR5s1GYvr_V4Xn228iDVVwXrOI41WsnGMhgtmwEJAiViLCrgIUptLPa"
  },
  {
    id: "sv-venusaur-ex",
    name: "Venusaur ex",
    supertype: "Pokémon",
    subtypes: ["Stage 2", "ex"],
    hp: 340,
    types: ["Grass"],
    evolvesFrom: "Ivysaur",
    stage: "Stage 2",
    abilities: [
      {
        name: "Tranquil Bloom",
        type: "Ability",
        text: "Once during your turn, if this Pokémon is in the Active Spot, you may heal 60 damage from 1 of your Pokémon."
      }
    ],
    attacks: [
      {
        name: "Giant Bloom",
        cost: ["Grass", "Grass", "Colorless"],
        damage: "150",
        text: "Heal 30 damage from this Pokémon."
      }
    ],
    weaknesses: [{ type: "Fire", value: "×2" }],
    retreatCost: 4,
    set: "151",
    number: "003/165",
    rarity: "Double Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYogimudWYYS-VLiIPj4B36r9AyBNKxiMpghSK-604-uA4r-VEYlmNdL2YsL2goglf9HB5avS92HTliZo23h2u24lpjne9QOMgikGABknv5mmcQRUsGV5ocYiRvLB-8nh-KUWIo6mv3rQjnQrrBQBm6ShUkhAjkNTm82_E7U3gRd9eEVodvbpgYUkY6zFzj5Ji8wQUJNtUxtVaAG6_FEtfUmlsSDctb1T4-CoM7dB-tkVLok7lTfOQ"
  },
  {
    id: "sv-gengar",
    name: "Gengar",
    supertype: "Pokémon",
    subtypes: ["Stage 2"],
    hp: 130,
    types: ["Psychic"],
    evolvesFrom: "Haunter",
    stage: "Stage 2",
    abilities: [
      {
        name: "Shadowy Spellbinder",
        type: "Ability",
        text: "Whenever your opponent attaches an Energy card from their hand to 1 of their Pokémon, put 2 damage counters on that Pokémon."
      }
    ],
    attacks: [
      {
        name: "Shadow Step",
        cost: ["Psychic", "Colorless"],
        damage: "90",
        text: "Switch this Pokémon with 1 of your Benched Pokémon."
      }
    ],
    weaknesses: [{ type: "Darkness", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 1,
    set: "Temporal Forces",
    number: "057/162",
    rarity: "Rare",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC847SFbK1FSvLNouWP3pRDB5CDIi2cuMWge-SJ6Sx_yToDaxjAknOTkoERS11HPeLnFHSNpY7oa6GT_N9SNLytHWL7EBQzN2mVUb7D95i71vBrmhzUA7iz9eZSRljwFkEGYzNQ3D3QFqiqqik3jZC2le8LiWF6WexlIhkbTdfuBsEVvMqMg9u_3yDeEuSwG-AvwIv-iGAjQ6Ky4lzuRHE62H1Jf1AUNCGthm1Rh0UsaXjeeCyWsP8v"
  },
  {
    id: "sv-gardevoir-ex",
    name: "Gardevoir ex",
    supertype: "Pokémon",
    subtypes: ["Stage 2", "ex"],
    hp: 310,
    types: ["Psychic"],
    evolvesFrom: "Kirlia",
    stage: "Stage 2",
    abilities: [
      {
        name: "Psychic Embrace",
        type: "Ability",
        text: "As often as you like during your turn, you may attach a Basic Psychic Energy card from your discard pile to 1 of your Psychic Pokémon. If you attached Energy to a Pokémon in this way, put 2 damage counters on that Pokémon. (You can't use this Ability on a Pokémon that would be Knocked Out.)"
      }
    ],
    attacks: [
      {
        name: "Miracle Force",
        cost: ["Psychic", "Psychic", "Colorless"],
        damage: "190",
        text: "This Pokémon recovers from all Special Conditions."
      }
    ],
    weaknesses: [{ type: "Darkness", value: "×2" }],
    resistances: [{ type: "Fighting", value: "-30" }],
    retreatCost: 2,
    set: "Scarlet & Violet",
    number: "086/198",
    rarity: "Double Rare",
    imageUrl: "https://images.pokemontcg.io/sv1/86_hires.png"
  },
  {
    id: "sv-roaring-moon-ex",
    name: "Roaring Moon ex",
    supertype: "Pokémon",
    subtypes: ["Basic", "ex", "Ancient"],
    hp: 230,
    types: ["Darkness"],
    stage: "Basic",
    attacks: [
      {
        name: "Frenzied Gouging",
        cost: ["Darkness", "Darkness", "Colorless"],
        damage: "",
        text: "Knock Out your opponent's Active Pokémon. If your opponent's Active Pokémon is Knocked Out in this way, this Pokémon does 200 damage to itself."
      },
      {
        name: "Calamity Storm",
        cost: ["Darkness", "Darkness", "Colorless"],
        damage: "100+",
        text: "You may discard a Stadium in play. If you do, this attack does 120 more damage."
      }
    ],
    weaknesses: [{ type: "Grass", value: "×2" }],
    retreatCost: 2,
    set: "Paradox Rift",
    number: "124/182",
    rarity: "Double Rare",
    imageUrl: "https://images.pokemontcg.io/sv4/124_hires.png"
  },

  // --- TRAINERS: SUPPORTERS ---
  {
    id: "tr-arven",
    name: "Arven",
    supertype: "Trainer",
    subtypes: ["Supporter"],
    stage: "Supporter",
    rules: ["You may play only 1 Supporter card during your turn."],
    text: "Search your deck for an Item card and a Pokémon Tool card, reveal them, and put them into your hand. Then, shuffle your deck.",
    set: "Scarlet & Violet",
    number: "166/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv1/166_hires.png"
  },
  {
    id: "tr-iono",
    name: "Iono",
    supertype: "Trainer",
    subtypes: ["Supporter"],
    stage: "Supporter",
    rules: ["You may play only 1 Supporter card during your turn."],
    text: "Each player shuffles their hand and puts it on the bottom of their deck. If either player put any cards on the bottom of their deck in this way, each player draws a card for each of their remaining Prize cards.",
    set: "Paldea Evolved",
    number: "185/193",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv2/185_hires.png"
  },
  {
    id: "tr-boss-orders",
    name: "Boss's Orders (Ghetsis)",
    supertype: "Trainer",
    subtypes: ["Supporter"],
    stage: "Supporter",
    rules: ["You may play only 1 Supporter card during your turn."],
    text: "Switch in 1 of your opponent's Benched Pokémon to the Active Spot.",
    set: "Paldea Evolved",
    number: "172/193",
    rarity: "Rare",
    imageUrl: "https://images.pokemontcg.io/sv2/172_hires.png"
  },
  {
    id: "tr-prof-research",
    name: "Professor's Research (Professor Sada)",
    supertype: "Trainer",
    subtypes: ["Supporter"],
    stage: "Supporter",
    rules: ["You may play only 1 Supporter card during your turn."],
    text: "Discard your hand and draw 7 cards.",
    set: "Scarlet & Violet",
    number: "189/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv1/189_hires.png"
  },
  {
    id: "tr-elesa-sparkle",
    name: "Elesa's Sparkle",
    supertype: "Trainer",
    subtypes: ["Supporter", "Fusion Strike"],
    stage: "Supporter",
    rules: ["You may play only 1 Supporter card during your turn."],
    text: "Choose up to 2 of your Fusion Strike Pokémon. For each of those Pokémon, search your deck for a Fusion Strike Energy card and attach it to that Pokémon. Then, shuffle your deck.",
    set: "Fusion Strike",
    number: "233/264",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh8/233_hires.png"
  },

  // --- TRAINERS: ITEMS & TOOLS ---
  {
    id: "tr-ultra-ball",
    name: "Ultra Ball",
    supertype: "Trainer",
    subtypes: ["Item"],
    stage: "Item",
    text: "You can use this card only if you discard 2 other cards from your hand. Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
    set: "Scarlet & Violet",
    number: "196/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv1/196_hires.png"
  },
  {
    id: "tr-nest-ball",
    name: "Nest Ball",
    supertype: "Trainer",
    subtypes: ["Item"],
    stage: "Item",
    text: "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck.",
    set: "Scarlet & Violet",
    number: "181/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv1/181_hires.png"
  },
  {
    id: "tr-battle-vip-pass",
    name: "Battle VIP Pass",
    supertype: "Trainer",
    subtypes: ["Item", "Fusion Strike"],
    stage: "Item",
    text: "You can use this card only during your first turn. Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck.",
    set: "Fusion Strike",
    number: "225/264",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh8/225_hires.png"
  },
  {
    id: "tr-rare-candy",
    name: "Rare Candy",
    supertype: "Trainer",
    subtypes: ["Item"],
    stage: "Item",
    text: "Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it, skipping the Stage 1. You can't use this card during your first turn or on a Basic Pokémon that was put into play this turn.",
    set: "Scarlet & Violet",
    number: "191/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv1/191_hires.png"
  },
  {
    id: "tr-super-rod",
    name: "Super Rod",
    supertype: "Trainer",
    subtypes: ["Item"],
    stage: "Item",
    text: "Shuffle up to 3 in any combination of Pokémon and Basic Energy cards from your discard pile into your deck.",
    set: "Paldea Evolved",
    number: "188/193",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/sv2/188_hires.png"
  },
  {
    id: "tr-prime-catcher",
    name: "Prime Catcher",
    supertype: "Trainer",
    subtypes: ["Item", "ACE SPEC"],
    stage: "Item",
    rules: ["ACE SPEC rule: You can't have more than 1 ACE SPEC card in your deck."],
    text: "Switch in 1 of your opponent's Benched Pokémon to the Active Spot. If you do, switch your Active Pokémon with 1 of your Benched Pokémon.",
    set: "Temporal Forces",
    number: "157/162",
    rarity: "ACE SPEC Rare",
    imageUrl: "https://images.pokemontcg.io/sv5/157_hires.png"
  },
  {
    id: "tr-power-tablet",
    name: "Power Tablet",
    supertype: "Trainer",
    subtypes: ["Item", "Fusion Strike"],
    stage: "Item",
    text: "During this turn, your Fusion Strike Pokémon's attacks do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
    set: "Fusion Strike",
    number: "236/264",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh8/236_hires.png"
  },
  {
    id: "tr-cram-o-matic",
    name: "Cram-o-matic",
    supertype: "Trainer",
    subtypes: ["Item", "Fusion Strike"],
    stage: "Item",
    text: "You can use this card only if you discard another Item card from your hand. Flip a coin. If heads, search your deck for a card and put it into your hand. Then, shuffle your deck.",
    set: "Fusion Strike",
    number: "229/264",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh8/229_hires.png"
  },
  {
    id: "tr-choice-belt",
    name: "Choice Belt",
    supertype: "Trainer",
    subtypes: ["Pokémon Tool"],
    stage: "Tool",
    text: "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Pokémon V (before applying Weakness and Resistance).",
    set: "Brilliant Stars",
    number: "135/172",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh9/135_hires.png"
  },
  {
    id: "tr-path-to-the-peak",
    name: "Path to the Peak",
    supertype: "Trainer",
    subtypes: ["Stadium"],
    stage: "Stadium",
    rules: ["You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play."],
    text: "Pokémon with a Rule Box in play (both yours and your opponent's) have no Abilities. (Pokémon V, Pokémon-GX, etc. have Rule Boxes.)",
    set: "Chilling Reign",
    number: "148/198",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh6/148_hires.png"
  },

  // --- ENERGIES ---
  {
    id: "en-fusion-strike",
    name: "Fusion Strike Energy",
    supertype: "Energy",
    subtypes: ["Special", "Fusion Strike"],
    stage: "Energy",
    text: "This card can only be attached to a Fusion Strike Pokémon. If this card is attached to anything other than a Fusion Strike Pokémon, discard this card. As long as this card is attached to a Pokémon, it provides every type of Energy but provides only 1 Energy at a time. Prevent all effects of your opponent's Pokémon's Abilities done to the Pokémon this card is attached to.",
    set: "Fusion Strike",
    number: "244/264",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh8/244_hires.png"
  },
  {
    id: "en-double-turbo",
    name: "Double Turbo Energy",
    supertype: "Energy",
    subtypes: ["Special"],
    stage: "Energy",
    text: "As long as this card is attached to a Pokémon, it provides 2 Colorless Energy. The attacks of the Pokémon this card is attached to do 20 less damage to your opponent's Pokémon (before applying Weakness and Resistance).",
    set: "Brilliant Stars",
    number: "151/172",
    rarity: "Uncommon",
    imageUrl: "https://images.pokemontcg.io/swsh9/151_hires.png"
  },
  {
    id: "en-fire-basic",
    name: "Basic Fire Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Fire"],
    text: "Basic Fire Energy.",
    set: "Scarlet & Violet Energy",
    number: "2",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/2_hires.png"
  },
  {
    id: "en-lightning-basic",
    name: "Basic Lightning Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Lightning"],
    text: "Basic Lightning Energy.",
    set: "Scarlet & Violet Energy",
    number: "4",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/4_hires.png"
  },
  {
    id: "en-psychic-basic",
    name: "Basic Psychic Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Psychic"],
    text: "Basic Psychic Energy.",
    set: "Scarlet & Violet Energy",
    number: "5",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/5_hires.png"
  },
  {
    id: "en-water-basic",
    name: "Basic Water Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Water"],
    text: "Basic Water Energy.",
    set: "Scarlet & Violet Energy",
    number: "3",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/3_hires.png"
  },
  {
    id: "en-grass-basic",
    name: "Basic Grass Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Grass"],
    text: "Basic Grass Energy.",
    set: "Scarlet & Violet Energy",
    number: "1",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/1_hires.png"
  },
  {
    id: "en-metal-basic",
    name: "Basic Metal Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Metal"],
    text: "Basic Metal Energy.",
    set: "Scarlet & Violet Energy",
    number: "8",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/8_hires.png"
  },
  {
    id: "en-darkness-basic",
    name: "Basic Darkness Energy",
    supertype: "Energy",
    subtypes: ["Basic"],
    stage: "Energy",
    types: ["Darkness"],
    text: "Basic Darkness Energy.",
    set: "Scarlet & Violet Energy",
    number: "7",
    rarity: "Common",
    imageUrl: "https://images.pokemontcg.io/sve/7_hires.png"
  }
];

export const CARD_MAP = new Map(CARD_DATABASE.map(c => [c.id, c]));
