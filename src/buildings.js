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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 200,
      research: 1
    },
    storage: {
      pop: 50000
    }
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
      research: 0
    },
    output: {
      metal: 300,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 200,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 300,
      research: 0
    },
    storage: {
      pop: 0
    }
  },
  solar_generator: {
    name: 'Solar Generator',
    turns: 4,
    canBuild: true,
    cost: {
      metal: 1500,
      mineral: 1000,
      pop: 5000,
      energy: 0,
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 100,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 200,
      research: 0
    },
    storage: {
      pop: 125000
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 0
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 50000
    }
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
      research: 0
    },
    output: {
      metal: 0,
      mineral: 0,
      energy: -10,
      pop: 0,
      research: 0
    },
    storage: {
      pop: 75000
    }
  }
}

export default buildings
