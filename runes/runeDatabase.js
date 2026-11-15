const RUNE_DATABASE = {
  "Realm 1": {
    packs: {
      "Basic": {
        drops: [
          { name: "Rookie", odds: "1.25", type: "BASIC" },
          { name: "Learner", odds: "6.67", type: "BASIC" },
          { name: "Trained", odds: "33.2", type: "BASIC" },
          { name: "Skilled", odds: "200", type: "BASIC" },
          { name: "Expert", odds: "50K", type: "BASIC" },
          { name: "Master", odds: "1M", type: "BASIC" },
          { name: "Grandmaster", odds: "40M", type: "BASIC" },
          { name: "Celestial", odds: "625B", type: "BASIC" },
          { name: "Immortal", odds: "500Sp", type: "BASIC" },
          { name: "Shadow", odds: "2.5Sx", type: "BASIC" },
          { name: "Phantom", odds: "2.5Oc", type: "NOOBINIAL" },
          { name: "Atomic", odds: "300QdDe", type: "NOOBINIAL" },
          { name: "Chronos Core", odds: "3.5QnDe", type: "NOOBINIAL" }
        ]
      },
      "Super": {
        drops: [
          { name: "Initiate", odds: "1.11", type: "BASIC" },
          { name: "Adept", odds: "13.3", type: "BASIC" },
          { name: "Veteran", odds: "50", type: "BASIC" },
          { name: "Elite", odds: "5K", type: "BASIC" },
          { name: "Champion", odds: "200K", type: "BASIC" },
          { name: "Ascended", odds: "2M", type: "BASIC" },
          { name: "Transcendent", odds: "50M", type: "BASIC" },
          { name: "Universal", odds: "20Qn", type: "BASIC" },
          { name: "Omnipotent", odds: "12.5Oc", type: "BASIC" },
          { name: "Eclipse", odds: "250Sx", type: "NOOBINIAL" },
          { name: "Void", odds: "2.5No", type: "NOOBINIAL" },
          { name: "Primordial", odds: "5UDe", type: "NOOBINIAL" },
          { name: "Oblivion Sigil", odds: "300QnDe", type: "NOOBINIAL" }
        ]
      },
      "Advanced": {
        drops: [
          { name: "Little", odds: "1.01", type: "BASIC" },
          { name: "Lesser", odds: "100K", type: "BASIC" },
          { name: "Standard", odds: "1M", type: "BASIC" },
          { name: "Greater", odds: "50M", type: "BASIC" },
          { name: "Superior", odds: "200M", type: "BASIC" },
          { name: "Prime", odds: "100B", type: "BASIC" },
          { name: "Apex", odds: "1T", type: "BASIC" },
          { name: "Ethereal", odds: "50T", type: "BASIC" },
          { name: "Divine", odds: "200Qd", type: "BASIC" },
          { name: "Infinite", odds: "17.5Oc", type: "BASIC" },
          { name: "Abyss", odds: "25Sp", type: "NOOBINIAL" },
          { name: "Enigma", odds: "2.5De", type: "NOOBINIAL" },
          { name: "Seraphim's Tear", odds: "100TDe", type: "NOOBINIAL" },
          { name: "Aetherion", odds: "12.5SxDe", type: "NOOBINIAL" }
        ]
      },
      "Cosmic Prism": {
        drops: [
          { name: "Luscent", odds: "2.5", type: "BASIC" },
          { name: "Chroma", odds: "4", type: "BASIC" },
          { name: "Fractal", odds: "20", type: "BASIC" },
          { name: "Refraction", odds: "100", type: "BASIC" },
          { name: "Tessellation", odds: "200", type: "BASIC" },
          { name: "Hyperlight", odds: "333", type: "BASIC" },
          { name: "Prism God", odds: "1K", type: "BASIC" },
          { name: "Void Glass", odds: "1M", type: "BASIC" },
          { name: "Godshard", odds: "100M", type: "NOOBINIAL" },
          { name: "Ultimate Shard", odds: "250B", type: "NOOBINIAL" }
        ]
      },
      "Hacker": {
        drops: [
          { name: "Script", odds: "1.01", type: "BASIC" },
          { name: "Protocol", odds: "100Qd", type: "BASIC" },
          { name: "Cypher", odds: "10Sx", type: "BASIC" },
          { name: "Exploit", odds: "1Oc", type: "BASIC" },
          { name: "Kernel", odds: "1No", type: "BASIC" },
          { name: "Root", odds: "10De", type: "BASIC" },
          { name: "Backdoor", odds: "1UDe", type: "BASIC" },
          { name: "Rootkit", odds: "1000Sp", type: "NOOBINIAL" },
          { name: "Masterkey", odds: "20Oc", type: "NOOBINIAL" },
          { name: "Stuxnet", odds: "52.4No", type: "NOOBINIAL" },
          { name: "Glitched", odds: "50Vt", type: "NOOBINIAL" },
          { name: "Firewall", odds: "20TVt", type: "NOOBINIAL" },
          { name: "Connor Hacked It", odds: "75SxVt", type: "NOOBINIAL" },
          { name: "Anti-Cheat", odds: "2OcVt", type: "NOOBINIAL" },
          { name: "Unstoppable Virus", odds: "1Dvt", type: "NOOBINIAL" }
        ]
      },
      "Pro Hacker": {
        drops: [
          { name: "Network", odds: "1.01", type: "BASIC" },
          { name: "Security", odds: "1NoVt", type: "BASIC" },
          { name: "WLAN", odds: "100QnTg", type: "BASIC" },
          { name: "Cryptography", odds: "10Dqg", type: "BASIC" },
          { name: "Encryption", odds: "1Noqg", type: "BASIC" },
          { name: "Decryption", odds: "10QnQg", type: "BASIC" },
          { name: "Ceasar", odds: "1.5SpQg", type: "BASIC" },
          { name: "Affine", odds: "10SpQg", type: "BASIC" },
          { name: "Hill", odds: "75SpQg", type: "BASIC" },
          { name: "Brute Force", odds: "5QnTg", type: "NOOBINIAL" },
          { name: "DDOS Attack", odds: "20QnTg", type: "NOOBINIAL" },
          { name: "SQL Injection", odds: "100QnTg", type: "NOOBINIAL" },
          { name: "Unstoppable Hacker", odds: "500QnTg", type: "NOOBINIAL" }
        ]
      },
      "Awakened": {
        drops: [
          { name: "Potential", odds: "1.01", type: "BASIC" },
          { name: "Limitless", odds: "1QdVt", type: "BASIC" },
          { name: "Incomparable", odds: "1SpVt", type: "BASIC" },
          { name: "Unfathomable", odds: "1000NoVt", type: "BASIC" },
          { name: "Unmatched", odds: "1TTg", type: "BASIC" },
          { name: "Unbelievable", odds: "1SxTg", type: "BASIC" },
          { name: "Untouchable", odds: "1NoTg", type: "BASIC" },
          { name: "Unstoppable", odds: "1Dqg", type: "BASIC" },
          { name: "Unrivaled", odds: "1Qnqg", type: "BASIC" },
          { name: "Unconquerable", odds: "500Spqg", type: "BASIC" },
          { name: "Unforgettable", odds: "500Qg", type: "BASIC" },
          { name: "Otherworldly", odds: "1UTg", type: "NOOBINIAL" },
          { name: "Cosmic Origin", odds: "10QdTg", type: "NOOBINIAL" }
        ]
      }
    }
  },
  "Realm 2": {
    packs: {
      "Snowy": {
        drops: [
          { name: "Snow", odds: "1.01", type: "BASIC" },
          { name: "Frost", odds: "1Qn", type: "BASIC" },
          { name: "Ice", odds: "100Qn", type: "BASIC" },
          { name: "Hail", odds: "2Sx", type: "BASIC" },
          { name: "Glacier", odds: "100Sp", type: "BASIC" },
          { name: "Blizzard", odds: "500DDe", type: "BASIC" },
          { name: "Tundra", odds: "2QdDe", type: "BASIC" },
          { name: "Arctic", odds: "400OcDe", type: "BASIC" },
          { name: "Permafrost", odds: "190Vt", type: "BASIC" },
          { name: "Whiteout", odds: "500SxDe", type: "NOOBINIAL" },
          { name: "Icebound", odds: "500SpDe", type: "NOOBINIAL" },
          { name: "Everfrost", odds: "150OcDe", type: "NOOBINIAL" }
        ]
      },
      "Deepcore": {
        drops: [
          { name: "Dust", odds: "1.01", type: "BASIC" },
          { name: "Pebble", odds: "10Sx", type: "BASIC" },
          { name: "Hollow", odds: "20Sx", type: "BASIC" },
          { name: "Echo", odds: "10Sp", type: "BASIC" },
          { name: "Stalagmite", odds: "200Sp", type: "BASIC" },
          { name: "Cavern", odds: "50Oc", type: "BASIC" },
          { name: "Crystalborn", odds: "10No", type: "BASIC" },
          { name: "Earthshaker", odds: "10De", type: "BASIC" },
          { name: "Golemheart", odds: "100UDe", type: "BASIC" },
          { name: "Stone Titan", odds: "10No", type: "NOOBINIAL" },
          { name: "Cave Guardian", odds: "7.5De", type: "NOOBINIAL" },
          { name: "Deep Spirit", odds: "250De", type: "NOOBINIAL" }
        ]
      },
      "Shard": {
        drops: [
          { name: "Air Shard", odds: "1.01", type: "BASIC" },
          { name: "Water Shard", odds: "1.5QdVt", type: "BASIC" },
          { name: "Earth Shard", odds: "400QnVt", type: "BASIC" },
          { name: "Fire Shard", odds: "75SpVt", type: "BASIC" },
          { name: "Ice Shard", odds: "12NoVt", type: "BASIC" },
          { name: "Poison Shard", odds: "125UTg", type: "BASIC" },
          { name: "Metal Shard", odds: "150TTg", type: "BASIC" },
          { name: "Light Shard", odds: "3.2QdTg", type: "BASIC" },
          { name: "Shadow Shard", odds: "4QnTg", type: "BASIC" },
          { name: "Galactic Shard", odds: "2.5QdVt", type: "NOOBINIAL" },
          { name: "Elemental Shard", odds: "40QdVt", type: "NOOBINIAL" },
          { name: "Dragon Shard", odds: "600QdVt", type: "NOOBINIAL" }
        ]
      }
    }
  },
  "Realm 3": {
    packs: {
      "Dunes": {
        drops: [
          { name: "Marrow", odds: "1.01", type: "BASIC" },
          { name: "Femur", odds: "333K", type: "BASIC" },
          { name: "Skull", odds: "1B", type: "BASIC" },
          { name: "Dune", odds: "375B", type: "BASIC" },
          { name: "Oasis", odds: "43.5Qd", type: "BASIC" },
          { name: "Mirage", odds: "250Qn", type: "BASIC" },
          { name: "Sunspire", odds: "4.29Sp", type: "BASIC" },
          { name: "Eternal Sand", odds: "5.08Oc", type: "BASIC" },
          { name: "Sphinx", odds: "30DDe", type: "NOOBINIAL" },
          { name: "Anubis", odds: "75NoDe", type: "NOOBINIAL" },
          { name: "Ancient Fragment", odds: "35Vt", type: "NOOBINIAL" }
        ]
      },
      "Sunfire": {
        drops: [
          { name: "Ashen", odds: "1.01", type: "BASIC" },
          { name: "Parched", odds: "43.5M", type: "BASIC" },
          { name: "Cactus", odds: "6.9B", type: "BASIC" },
          { name: "Scorch", odds: "3.65T", type: "BASIC" },
          { name: "Spark", odds: "44.6Sx", type: "BASIC" },
          { name: "Flare", odds: "4.34Oc", type: "BASIC" },
          { name: "Desert Jewel", odds: "7.52UDe", type: "BASIC" },
          { name: "Solar Titan", odds: "2.67QdDe", type: "BASIC" },
          { name: "Immortal Sun", odds: "3.94SpDe", type: "BASIC" },
          { name: "Pharaoh", odds: "200NoDe", type: "NOOBINIAL" },
          { name: "Horus", odds: "1.5Vt", type: "NOOBINIAL" },
          { name: "Secrets of Egypt", odds: "300Vt", type: "NOOBINIAL" }
        ]
      },
      "Sunstorm Prism": {
        drops: [
          { name: "Cinderfall", odds: "1.01", type: "BASIC" },
          { name: "Shadowflare", odds: "1.5B", type: "BASIC" },
          { name: "Dawnshard", odds: "75B", type: "BASIC" },
          { name: "Lumina", odds: "1.5T", type: "BASIC" },
          { name: "Pyrestone", odds: "22.5T", type: "BASIC" },
          { name: "Helios", odds: "500T", type: "BASIC" },
          { name: "Starforge", odds: "20Qd", type: "BASIC" },
          { name: "Celestia", odds: "1.5Qn", type: "BASIC" },
          { name: "Eternis", odds: "75T", type: "NOOBINIAL" },
          { name: "Omnira", odds: "1.25Qd", type: "NOOBINIAL" }
        ]
      },
      "Mini Noobinial": {
        drops: [
          { name: "Mini Noob", odds: "1.01", type: "NOOBINIAL" },
          { name: "Noob", odds: "2M", type: "NOOBINIAL" },
          { name: "Big Noob", odds: "25Sp", type: "NOOBINIAL" },
          { name: "Huge Noob", odds: "350QnDe", type: "NOOBINIAL" },
          { name: "Giant Noob", odds: "75QdVt", type: "NOOBINIAL" },
          { name: "Colossal Noob", odds: "400NoVt", type: "NOOBINIAL" },
          { name: "Biggest Noob of all time", odds: "2.5Tg", type: "NOOBINIAL" },
          { name: "The Ultimate Noob", odds: "1QdTg", type: "NOOBINIAL" }
        ]
      }
    }
  },
  "Realm 4": {
    packs: {
      "Starlight": {
        drops: [
          { name: "Moonlight", odds: "1.01", type: "BASIC" },
          { name: "Sunlight", odds: "500De", type: "BASIC" },
          { name: "Invasion", odds: "80DDe", type: "BASIC" },
          { name: "Alien", odds: "225QdDe", type: "BASIC" },
          { name: "Universe", odds: "925SpDe", type: "BASIC" },
          { name: "Gravity", odds: "15UVt", type: "BASIC" },
          { name: "Dimensional", odds: "1QnVt", type: "BASIC" },
          { name: "Meteor", odds: "75UTg", type: "BASIC" },
          { name: "Nebula", odds: "2DTg", type: "BASIC" },
          { name: "Supernova", odds: "125DVt", type: "NOOBINIAL" },
          { name: "Galactic Chaos", odds: "1.25TVt", type: "NOOBINIAL" },
          { name: "Chaotic Destruction", odds: "3QnVt", type: "NOOBINIAL" }
        ]
      },
      "Cosma": {
        drops: [
          { name: "Asteroid", odds: "1.01", type: "BASIC" },
          { name: "Comet", odds: "150UDe", type: "BASIC" },
          { name: "Satellite", odds: "3QdDe", type: "BASIC" },
          { name: "Orbit", odds: "700SxDe", type: "BASIC" },
          { name: "Cluster", odds: "17.5NoDe", type: "BASIC" },
          { name: "Quasar", odds: "525QdVt", type: "BASIC" },
          { name: "Pulsar", odds: "250DTg", type: "BASIC" },
          { name: "Black Hole", odds: "10TTg", type: "BASIC" },
          { name: "Magnetar", odds: "3.75TVt", type: "NOOBINIAL" },
          { name: "Event Horizon", odds: "25TVt", type: "NOOBINIAL" },
          { name: "Elemental Creation", odds: "35QnVt", type: "NOOBINIAL" }
        ]
      },
      "Light": {
        drops: [
          { name: "White", odds: "1.01", type: "BASIC" },
          { name: "Divine Light", odds: "15NoDe", type: "BASIC" },
          { name: "Daylight", odds: "1TVt", type: "BASIC" },
          { name: "Elemental Of Light", odds: "1SpVt", type: "BASIC" },
          { name: "Protected", odds: "1UTg", type: "BASIC" },
          { name: "Creation", odds: "1QnTg", type: "BASIC" },
          { name: "Angelic Goodness", odds: "200OcTg", type: "BASIC" },
          { name: "Absolute Divinity", odds: "12.5SxVt", type: "NOOBINIAL" },
          { name: "Light Genesis", odds: "92.5SxVt", type: "NOOBINIAL" },
          { name: "Ultimate Light", odds: "200SpVt", type: "NOOBINIAL" }
        ]
      },
      "Dark": {
        drops: [
          { name: "Black", odds: "1.01", type: "BASIC" },
          { name: "Infinite Darkness", odds: "1Vt", type: "BASIC" },
          { name: "Midnight", odds: "1TVt", type: "BASIC" },
          { name: "Dark Elemental", odds: "1SpVt", type: "BASIC" },
          { name: "Doomed", odds: "1UTg", type: "BASIC" },
          { name: "Destruction", odds: "1QnTg", type: "BASIC" },
          { name: "Demonic Evil", odds: "200OcTg", type: "BASIC" },
          { name: "Absolute Darkness", odds: "250SxVt", type: "NOOBINIAL" },
          { name: "Dark Genesis", odds: "5SpVt", type: "NOOBINIAL" },
          { name: "Ultimate Darkness", odds: "1.25OcVt", type: "NOOBINIAL" }
        ]
      }
    }
  },
  "Realm 5": {
    packs: {
      "Underwater": {
        drops: [
          { name: "Water", odds: "1.01", type: "BASIC" },
          { name: "Bubbles", odds: "10B", type: "BASIC" },
          { name: "Pond", odds: "10Qd", type: "BASIC" },
          { name: "Lake", odds: "10Sx", type: "BASIC" },
          { name: "River", odds: "1No", type: "BASIC" },
          { name: "Pool", odds: "10DDe", type: "BASIC" },
          { name: "Sea", odds: "10SxDe", type: "BASIC" },
          { name: "Ocean", odds: "100NoDe", type: "BASIC" },
          { name: "Deep Sea", odds: "10UVt", type: "BASIC" },
          { name: "Tidal Wave", odds: "3.33OcVt", type: "NOOBINIAL" },
          { name: "Tsunami", odds: "3.33NoVt", type: "NOOBINIAL" },
          { name: "Infinite Flood", odds: "200NoVt", type: "NOOBINIAL" }
        ]
      },
      "Atlantis": {
        drops: [
          { name: "Underwater", odds: "1.01", type: "BASIC" },
          { name: "Ancient City", odds: "10Qd", type: "BASIC" },
          { name: "Mermaid", odds: "10Sx", type: "BASIC" },
          { name: "Sea Monument", odds: "1No", type: "BASIC" },
          { name: "Fish", odds: "10DDe", type: "BASIC" },
          { name: "Coral", odds: "10SxDe", type: "BASIC" },
          { name: "Sea Shell", odds: "100NoDe", type: "BASIC" },
          { name: "Pearl", odds: "1TVt", type: "BASIC" },
          { name: "Natural Disaster", odds: "10SxVt", type: "BASIC" },
          { name: "Secrets of Atlantis", odds: "222OcVt", type: "NOOBINIAL" },
          { name: "Poseidon", odds: "88NoVt", type: "NOOBINIAL" },
          { name: "Lord of Atlantis", odds: "1.11Tg", type: "NOOBINIAL" }
        ]
      },
      "Aquatic Prism": {
        drops: [
          { name: "Water Molecule", odds: "1.01", type: "BASIC" },
          { name: "Aqua", odds: "350Oc", type: "BASIC" },
          { name: "Atlantic", odds: "3.25No", type: "BASIC" },
          { name: "Take a Shower", odds: "35No", type: "BASIC" },
          { name: "Low Tide", odds: "444No", type: "BASIC" },
          { name: "Underwater Crystal", odds: "5De", type: "BASIC" },
          { name: "Oceanic Wonder", odds: "35De", type: "BASIC" },
          { name: "Submerged", odds: "500De", type: "BASIC" },
          { name: "Water Elemental", odds: "1.25TDe", type: "BASIC" },
          { name: "Whirlpool", odds: "2Sx", type: "NOOBINIAL" },
          { name: "Prismatic Water", odds: "10Sx", type: "NOOBINIAL" },
          { name: "Prismatic Ocean", odds: "40Sx", type: "NOOBINIAL" }
        ]
      },
      "Mini Non Noobinial": {
        drops: [
          { name: "Pro", odds: "1.01", type: "BASIC" },
          { name: "Very Pro", odds: "200OcDe", type: "BASIC" },
          { name: "Insanely Pro", odds: "200OcVt", type: "BASIC" },
          { name: "Dedicated Pro", odds: "200OcTg", type: "BASIC" },
          { name: "Awakened Pro", odds: "50Ocqg", type: "BASIC" },
          { name: "One of the Best", odds: "200Qg", type: "BASIC" },
          { name: "The Best", odds: "4UQg", type: "BASIC" },
          { name: "Infinite Skill", odds: "690SxQg", type: "BASIC" }
        ]
      }
    }
  },
  "Realm 6": {
    packs: {
      "Ares": {
        drops: [
          { name: "Warrior", odds: "1.01", type: "BASIC" },
          { name: "Clash", odds: "1QdVt", type: "BASIC" },
          { name: "Bloodshed", odds: "10DTg", type: "BASIC" },
          { name: "Rage", odds: "100Uqg", type: "BASIC" },
          { name: "Valor", odds: "1Noqg", type: "BASIC" },
          { name: "Carnage", odds: "10Qg", type: "BASIC" },
          { name: "Dominion", odds: "1UQg", type: "BASIC" },
          { name: "Conquest", odds: "100UQg", type: "BASIC" },
          { name: "War Eternal", odds: "10DQg", type: "BASIC" },
          { name: "War Immortal", odds: "2.5DTg", type: "NOOBINIAL" },
          { name: "Wrath Eternal", odds: "15DTg", type: "NOOBINIAL" },
          { name: "Wrath Immortal", odds: "10TTg", type: "NOOBINIAL" }
        ]
      },
      "Apollo": {
        drops: [
          { name: "Whisper", odds: "1.01", type: "BASIC" },
          { name: "Glow", odds: "20QdVt", type: "BASIC" },
          { name: "Lyric", odds: "300DTg", type: "BASIC" },
          { name: "Pulse", odds: "4Uqg", type: "BASIC" },
          { name: "Harmony", odds: "50Noqg", type: "BASIC" },
          { name: "Shine", odds: "100Qg", type: "BASIC" },
          { name: "Oracle", odds: "2DQg", type: "BASIC" },
          { name: "Divinity", odds: "50DQg", type: "BASIC" },
          { name: "Solar Crown", odds: "1TQg", type: "BASIC" },
          { name: "Beyond The Stars", odds: "9.75DTg", type: "NOOBINIAL" },
          { name: "Beyond The Galaxy", odds: "35DTg", type: "NOOBINIAL" },
          { name: "Beyond The Multiverse", odds: "35TTg", type: "NOOBINIAL" }
        ]
      },
      "Zeus": {
        drops: [
          { name: "Bolt", odds: "1.01", type: "BASIC" },
          { name: "Cloud", odds: "10SpVt", type: "BASIC" },
          { name: "Storm", odds: "20DTg", type: "BASIC" },
          { name: "Thunder", odds: "30SpTg", type: "BASIC" },
          { name: "Charge", odds: "50Dqg", type: "BASIC" },
          { name: "Strike", odds: "75Spqg", type: "BASIC" },
          { name: "Tempest", odds: "50TQg", type: "BASIC" },
          { name: "Skyking", odds: "1QdQg", type: "BASIC" },
          { name: "Olympian", odds: "20QdQg", type: "BASIC" },
          { name: "Thunder Lord", odds: "3.5TTg", type: "NOOBINIAL" },
          { name: "Eternal Thunder", odds: "150TTg", type: "NOOBINIAL" },
          { name: "Godlike Lightning", odds: "100QdTg", type: "NOOBINIAL" }
        ]
      },
      "Colloseum": {
        drops: [
          { name: "Strength", odds: "1.01", type: "BASIC" },
          { name: "Health", odds: "10QdTg", type: "BASIC" },
          { name: "Mobility", odds: "15Dqg", type: "BASIC" },
          { name: "Defence", odds: "22.5Qg", type: "BASIC" },
          { name: "Combat", odds: "35OcQg", type: "BASIC" },
          { name: "Battle", odds: "2.75NoQg", type: "BASIC" },
          { name: "Showdown", odds: "200NoQg", type: "BASIC" },
          { name: "Powerful Chakra", odds: "7.5SxTg", type: "NOOBINIAL" },
          { name: "Powerful Aura", odds: "50SxTg", type: "NOOBINIAL" },
          { name: "Powerful Duelist", odds: "350SxTg", type: "NOOBINIAL" }
        ]
      }
    }
  },
  "Events": {
    packs: {
      "Football": {
        drops: [
          { name: "Scuff", odds: "1.12", type: "BASIC" },
          { name: "Fade", odds: "10", type: "BASIC" },
          { name: "Stitch", odds: "1K", type: "BASIC" },
          { name: "Kickoff", odds: "100K", type: "BASIC" },
          { name: "Dribble", odds: "10M", type: "BASIC" },
          { name: "Tackle", odds: "1T", type: "BASIC" },
          { name: "Corner", odds: "100Qd", type: "BASIC" },
          { name: "Volley", odds: "10Sx", type: "BASIC" },
          { name: "Header", odds: "100No", type: "BASIC" },
          { name: "Finale", odds: "1Sx", type: "NOOBINIAL" },
          { name: "Victory", odds: "100Sx", type: "NOOBINIAL" },
          { name: "Iconic", odds: "2.5Sp", type: "NOOBINIAL" }
        ]
      },
      "Spooky": {
        drops: [
          { name: "Creepy", odds: "1.11", type: "BASIC" },
          { name: "Haunted", odds: "10", type: "BASIC" },
          { name: "Ghastly", odds: "5K", type: "BASIC" },
          { name: "Wicked", odds: "75K", type: "BASIC" },
          { name: "Cursed", odds: "1M", type: "BASIC" },
          { name: "Spectral", odds: "15M", type: "BASIC" },
          { name: "Zombie", odds: "500M", type: "BASIC" },
          { name: "Treats", odds: "20B", type: "BASIC" },
          { name: "Spooky", odds: "500B", type: "BASIC" },
          { name: "Revenant", odds: "333Qd", type: "NOOBINIAL" },
          { name: "Lich", odds: "125Qn", type: "NOOBINIAL" },
          { name: "Necromancer", odds: "250Sx", type: "NOOBINIAL" },
          { name: "Banshee", odds: "5UDe", type: "NOOBINIAL" }
        ]
      },
      "Pumpkin": {
        drops: [
          { name: "Nightfall", odds: "1.01", type: "BASIC" },
          { name: "Black Cat", odds: "250M", type: "BASIC" },
          { name: "Raven", odds: "50B", type: "BASIC" },
          { name: "Pumpkin", odds: "10T", type: "BASIC" },
          { name: "Tombstone", odds: "1.25Qd", type: "BASIC" },
          { name: "Graveyard", odds: "35Qd", type: "BASIC" },
          { name: "Coven", odds: "1Qn", type: "BASIC" },
          { name: "Cobweb", odds: "20Qn", type: "BASIC" },
          { name: "Scarecrow", odds: "400Qn", type: "BASIC" },
          { name: "Coffin", odds: "6.5Qn", type: "NOOBINIAL" },
          { name: "Witch Fire", odds: "5Sx", type: "NOOBINIAL" },
          { name: "Ghost Rider", odds: "25Sp", type: "NOOBINIAL" },
          { name: "Headless Horsemen", odds: "200DDe", type: "NOOBINIAL" }
        ]
      },
      "Witch": {
        drops: [
          { name: "Broomstick", odds: "1.01", type: "BASIC" },
          { name: "Cauldron", odds: "100T", type: "BASIC" },
          { name: "Hex Dust", odds: "200Sx", type: "BASIC" },
          { name: "Nightbrew", odds: "400No", type: "BASIC" },
          { name: "Crow", odds: "10UDe", type: "BASIC" },
          { name: "Spellbound", odds: "2.5DDe", type: "BASIC" },
          { name: "Moonhex", odds: "30DDe", type: "BASIC" },
          { name: "Spell Book", odds: "240DDe", type: "BASIC" },
          { name: "Covenmist", odds: "1.75TDe", type: "BASIC" },
          { name: "Hagshadow", odds: "75De", type: "NOOBINIAL" },
          { name: "Witchbane", odds: "750UDe", type: "NOOBINIAL" },
          { name: "Eldritch", odds: "150TDe", type: "NOOBINIAL" }
        ]
      }
    }
  }
};


