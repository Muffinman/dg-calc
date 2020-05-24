const imgDG = 'https://beta.darkgalaxy.com/images'

let buildings = {
  wait: {
    name: 'Wait...',
    turns: 1,
    canBuild: true,
    cost: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/small/time.png`
  },
  outpost: {
    name: 'Outpost',
    turns: 0,
    canBuild: false,
    cost: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 200,
      research: 1
    },
    storage: {
      pop: 50000,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/outpost.jpg`
  },
  metal_mine: {
    name: 'Metal Mine',
    turns: 4,
    canBuild: true,
    cost: {
      metal: 600,
      mineral: 2000,
      energy: 0,
      pop: 5000,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 300,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/metal_mine.jpg`
  },
  mineral_extractor: {
    name: 'Mineral Extractor',
    turns: 4,
    canBuild: true,
    cost: {
      metal: 3000,
      mineral: 400,
      energy: 0,
      pop: 5000,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 200,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/mineral_extractor.jpg`
  },
  farm: {
    name: 'Farm',
    turns: 4,
    canBuild: true,
    cost: {
      metal: 1500,
      mineral: 1000,
      energy: 0,
      pop: 5000,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 300,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/farm.jpg`
  },
  solar_generator: {
    name: 'Solar Generator',
    turns: 4,
    canBuild: false,
    cost: {
      metal: 1500,
      mineral: 1000,
      pop: 5000,
      energy: 0,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 100,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/solar_generator.jpg`
  },
  launch_site: {
    name: 'Launch Site',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 15000,
      mineral: 10000,
      pop: 25000,
      energy: 0,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/launch_site.jpg`
  },
  colony: {
    name: 'Colony',
    turns: 24,
    canBuild: true,
    cost: {
      metal: 60000,
      mineral: 40000,
      pop: 80000,
      energy: 0,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 200,
      research: 0
    },
    storage: {
      pop: 125000,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/colony.jpg`
  },
  core_metal_mine: {
    name: 'Core Metal Mine',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 3600,
      mineral: 12000,
      energy: 0,
      pop: 40000,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 900,
      mineral: 0,
      energy: -20,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony'],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/core_metal_mine.jpg`
  },
  core_mineral_extractor: {
    name: 'Core Mineral Extractor',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 18000,
      mineral: 2400,
      energy: 0,
      pop: 40000,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 600,
      energy: -20,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony'],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/core_mineral_extractor.jpg`
  },
  hyrdroponics_lab: {
    name: 'Hydroponics Lab',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 9000,
      mineral: 6000,
      energy: 0,
      pop: 40000,
      research: 0,
      ground_space: 0,
      orbit_space: 2
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -20,
      pop: 900,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony', 'launch_site'],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/hydroponics_lab.jpg`
  },
  solar_array: {
    name: 'Solar Array',
    turns: 8,
    canBuild: false,
    cost: {
      metal: 9000,
      mineral: 6000,
      energy: 0,
      pop: 40000,
      research: 0,
      ground_space: 0,
      orbit_space: 2
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 300,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony', 'launch_site'],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/solar_array.jpg`
  },
  ship_yard: {
    name: 'Ship Yard',
    turns: 12,
    canBuild: true,
    cost: {
      metal: 48000,
      mineral: 32000,
      pop: 25000,
      energy: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 2
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['launch_site'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/ship_yard.jpg`
  },
  comms_satellite: {
    name: 'Comms Satellite',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 33000,
      mineral: 22000,
      pop: 40000,
      energy: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 2
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['launch_site'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/comms_satellite.jpg`
  },
  living_quarters: {
    name: 'Living Quarters',
    turns: 6,
    canBuild: true,
    cost: {
      metal: 2400,
      mineral: 1600,
      pop: 25000,
      energy: 0,
      research: 0,
      ground_space: 1,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 50000,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/living_quarters.jpg`
  },
  habitat: {
    name: 'Habitat',
    turns: 6,
    canBuild: true,
    cost: {
      metal: 4800,
      mineral: 3200,
      pop: 25000,
      energy: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 1
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 75000,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['launch_site'],
      research: []
    },
    unique: false,
    image: `${imgDG}/units/main/structures/habitat.jpg`
  },
  light_weapons_factory: {
    name: 'Light Weapons Factory',
    turns: 12,
    canBuild: true,
    cost: {
      metal: 30000,
      mineral: 20000,
      pop: 50000,
      energy: 0,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/light_weapons_factory.jpg`
  },
  army_barracks: {
    name: 'Army Barracks',
    turns: 8,
    canBuild: true,
    cost: {
      metal: 12000,
      mineral: 8000,
      pop: 25000,
      energy: 0,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['light_weapons_factory'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/army_barracks.jpg`
  },
  space_dock: {
    name: 'Space Dock',
    turns: 24,
    canBuild: true,
    cost: {
      metal: 144000,
      mineral: 96000,
      pop: 240000,
      energy: 0,
      research: 0,
      ground_space: 0,
      orbit_space: 4
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -20,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['metropolis'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/space_dock.jpg`
  },
  heavy_weapons_factory: {
    name: 'Heavy Weapons Factory',
    turns: 24,
    canBuild: true,
    cost: {
      metal: 90000,
      mineral: 60000,
      pop: 200000,
      energy: 0,
      research: 0,
      ground_space: 2,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -30,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['metropolis'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/heavy_weapons_factory.jpg`
  },
  metropolis: {
    name: 'Metropolis',
    turns: 48,
    canBuild: true,
    cost: {
      metal: 120000,
      mineral: 80000,
      pop: 160000,
      energy: 0,
      research: 0,
      ground_space: 4,
      orbit_space: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 200000,
      ground_space: 0,
      orbit_space: 0
    },
    requires: {
      buildings: ['colony'],
      research: []
    },
    unique: true,
    image: `${imgDG}/units/main/structures/metropolis.jpg`
  }
}

export default buildings
