const imgDG = 'https://beta.darkgalaxy.com/images'

let research = {
  metal_1: {
    name: 'Metal 1',
    cost: 24,
    bonus: 0.05,
    affects: 'metal',
    requires: null,
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_2: {
    name: 'Metal 2',
    cost: 40,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_1',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_3: {
    name: 'Metal 3',
    cost: 56,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_2',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_4: {
    name: 'Metal 4',
    cost: 72,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_3',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_5: {
    name: 'Metal 5',
    cost: 88,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_4',
    image: `${imgDG}/units/research/strip_metal_mine.png`
  },
  metal_6: {
    name: 'Metal 6',
    cost: 104,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_5',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_7: {
    name: 'Metal 7',
    cost: 120,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_6',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_8: {
    name: 'Metal 8',
    cost: 136,
    bonus: 0.08,
    affects: 'metal',
    requires: 'metal_7',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_9: {
    name: 'Metal 9',
    cost: 152,
    bonus: 0.08,
    affects: 'metal',
    requires: 'metal_8',
    image: `${imgDG}/units/research/metal_research.png`
  },
  metal_10: {
    name: 'Metal 10',
    cost: 168,
    bonus: 0.15,
    affects: 'metal',
    requires: 'metal_9',
    image: `${imgDG}/units/research/metal_research.png`
  },
  mineral_1: {
    name: 'Mineral 1',
    cost: 24,
    bonus: 0.05,
    affects: 'mineral',
    requires: null,
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_2: {
    name: 'Mineral 2',
    cost: 40,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_1',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_3: {
    name: 'Mineral 3',
    cost: 56,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_2',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_4: {
    name: 'Mineral 4',
    cost: 72,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_3',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_5: {
    name: 'Mineral 5',
    cost: 88,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_4',
    image: `${imgDG}/units/research/strip_mineral_extractor.png`
  },
  mineral_6: {
    name: 'Mineral 6',
    cost: 104,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_5',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_7: {
    name: 'Mineral 7',
    cost: 120,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_6',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_8: {
    name: 'Mineral 8',
    cost: 136,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_7',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_9: {
    name: 'Mineral 9',
    cost: 152,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_8',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  mineral_10: {
    name: 'Mineral 10',
    cost: 168,
    bonus: 0.15,
    affects: 'mineral',
    requires: 'mineral_9',
    image: `${imgDG}/units/research/mineral_research.png`
  },
  pop_1: {
    name: 'Population 1',
    cost: 24,
    bonus: 0.05,
    affects: 'pop',
    requires: null,
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_2: {
    name: 'Population 2',
    cost: 40,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_1',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_3: {
    name: 'Population 3',
    cost: 56,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_2',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_4: {
    name: 'Population 4',
    cost: 72,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_3',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_5: {
    name: 'Population 5',
    cost: 88,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_4',
    image: `${imgDG}/units/research/hydroponics_dome.png`
  },
  pop_6: {
    name: 'Population 6',
    cost: 104,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_5',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_7: {
    name: 'Population 7',
    cost: 120,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_6',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_8: {
    name: 'Population 8',
    cost: 136,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_7',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_9: {
    name: 'Population 9',
    cost: 152,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_8',
    image: `${imgDG}/units/research/population_research.png`
  },
  pop_10: {
    name: 'Population 10',
    cost: 168,
    bonus: 0.15,
    affects: 'pop',
    requires: 'pop_9',
    image: `${imgDG}/units/research/population_research.png`
  },
  planet_limit_8: {
    name: 'Planet Limit 8',
    cost: 24,
    bonus: null,
    affects: 'planet_limit',
    requires: null,
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_10: {
    name: 'Planet Limit 10',
    cost: 36,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_8',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_12: {
    name: 'Planet Limit 12',
    cost: 48,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_10',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_14: {
    name: 'Planet Limit 14',
    cost: 60,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_12',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_16: {
    name: 'Planet Limit 16',
    cost: 72,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_14',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_18: {
    name: 'Planet Limit 18',
    cost: 84,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_16',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_20: {
    name: 'Planet Limit 20',
    cost: 96,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_18',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_22: {
    name: 'Planet Limit 22',
    cost: 108,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_20',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_24: {
    name: 'Planet Limit 24',
    cost: 120,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_22',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_26: {
    name: 'Planet Limit 26',
    cost: 132,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_24',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_28: {
    name: 'Planet Limit 28',
    cost: 144,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_26',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_30: {
    name: 'Planet Limit 30',
    cost: 156,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_28',
    image: `${imgDG}/icons/research_small.png`
  },
  planet_limit_32: {
    name: 'Planet Limit 32',
    cost: 168,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_30',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_4: {
    name: 'Queue Length 4',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: null,
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_5: {
    name: 'Queue Length 5',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_4',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_6: {
    name: 'Queue Length 6',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_5',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_7: {
    name: 'Queue Length 7',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_6',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_8: {
    name: 'Queue Length 8',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_7',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_9: {
    name: 'Queue Length 9',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_8',
    image: `${imgDG}/icons/research_small.png`
  },
  queue_length_10: {
    name: 'Queue Length 10',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_9',
    image: `${imgDG}/icons/research_small.png`
  }
}

export default research
