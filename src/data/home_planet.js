let homePlanet = {
  home: true,
  colonisation_turn: 1,
  name: 'Planet',
  constructed: {
    outpost: 1,
    metal_mine: 3,
    mineral_extractor: 3,
    solar_generator: 2
  },
  stored: {
    metal: 30000,
    mineral: 20000,
    energy: 1000,
    pop: 20000,
    pop_busy: 0,
    research: 0,
    ground_space: 40,
    orbit_space: 30
  },
  abundances: {
    metal: 70,
    mineral: 70,
    energy: 70,
    pop: 100,
    research: 100
  }
}

export default homePlanet
