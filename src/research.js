let research = {
  metal_1: {
    name: 'Metal 1',
    cost: 24,
    bonus: 0.05,
    affects: 'metal',
    requires: null
  },
  metal_2: {
    name: 'Metal 2',
    cost: 40,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_1'
  },
  metal_3: {
    name: 'Metal 3',
    cost: 56,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_2'
  },
  metal_4: {
    name: 'Metal 4',
    cost: 72,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_3'
  },
  metal_5: {
    name: 'Metal 5',
    cost: 88,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_4'
  },
  metal_6: {
    name: 'Metal 6',
    cost: 104,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_5'
  },
  metal_7: {
    name: 'Metal 7',
    cost: 120,
    bonus: 0.05,
    affects: 'metal',
    requires: 'metal_6'
  },
  metal_8: {
    name: 'Metal 8',
    cost: 136,
    bonus: 0.08,
    affects: 'metal',
    requires: 'metal_7'
  },
  metal_9: {
    name: 'Metal 9',
    cost: 152,
    bonus: 0.08,
    affects: 'metal',
    requires: 'metal_8'
  },
  metal_10: {
    name: 'Metal 10',
    cost: 168,
    bonus: 0.15,
    affects: 'metal',
    requires: 'metal_9'
  },
  mineral_1: {
    name: 'Mineral 1',
    cost: 24,
    bonus: 0.05,
    affects: 'mineral',
    requires: null
  },
  mineral_2: {
    name: 'Mineral 2',
    cost: 40,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_1'
  },
  mineral_3: {
    name: 'Mineral 3',
    cost: 56,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_2'
  },
  mineral_4: {
    name: 'Mineral 4',
    cost: 72,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_3'
  },
  mineral_5: {
    name: 'Mineral 5',
    cost: 88,
    bonus: 0.05,
    affects: 'mineral',
    requires: 'mineral_4'
  },
  mineral_6: {
    name: 'Mineral 6',
    cost: 104,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_5'
  },
  mineral_7: {
    name: 'Mineral 7',
    cost: 120,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_6'
  },
  mineral_8: {
    name: 'Mineral 8',
    cost: 136,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_7'
  },
  mineral_9: {
    name: 'Mineral 9',
    cost: 152,
    bonus: 0.08,
    affects: 'mineral',
    requires: 'mineral_8'
  },
  mineral_10: {
    name: 'Mineral 10',
    cost: 168,
    bonus: 0.15,
    affects: 'mineral',
    requires: 'mineral_9'
  },
  pop_1: {
    name: 'Pop 1',
    cost: 24,
    bonus: 0.05,
    affects: 'pop',
    requires: null
  },
  pop_2: {
    name: 'Pop 2',
    cost: 40,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_1'
  },
  pop_3: {
    name: 'Pop 3',
    cost: 56,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_2'
  },
  pop_4: {
    name: 'Pop 4',
    cost: 72,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_3'
  },
  pop_5: {
    name: 'Pop 5',
    cost: 88,
    bonus: 0.05,
    affects: 'pop',
    requires: 'pop_4'
  },
  pop_6: {
    name: 'Pop 6',
    cost: 104,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_5'
  },
  pop_7: {
    name: 'Pop 7',
    cost: 120,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_6'
  },
  pop_8: {
    name: 'Pop 8',
    cost: 136,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_7'
  },
  pop_9: {
    name: 'Pop 9',
    cost: 152,
    bonus: 0.08,
    affects: 'pop',
    requires: 'pop_8'
  },
  pop_10: {
    name: 'Pop 10',
    cost: 168,
    bonus: 0.15,
    affects: 'pop',
    requires: 'pop_9'
  },
  planet_limit_8: {
    name: 'Planet Limit 8',
    cost: 24,
    bonus: null,
    affects: 'planet_limit',
    requires: null
  },
  planet_limit_10: {
    name: 'Planet Limit 10',
    cost: 36,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_8'
  },
  planet_limit_12: {
    name: 'Planet Limit 12',
    cost: 48,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_10'
  },
  planet_limit_14: {
    name: 'Planet Limit 14',
    cost: 60,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_12'
  },
  planet_limit_16: {
    name: 'Planet Limit 16',
    cost: 72,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_14'
  },
  planet_limit_18: {
    name: 'Planet Limit 18',
    cost: 84,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_16'
  },
  planet_limit_20: {
    name: 'Planet Limit 20',
    cost: 96,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_18'
  },
  planet_limit_22: {
    name: 'Planet Limit 22',
    cost: 108,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_20'
  },
  planet_limit_24: {
    name: 'Planet Limit 24',
    cost: 120,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_22'
  },
  planet_limit_26: {
    name: 'Planet Limit 26',
    cost: 132,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_24'
  },
  planet_limit_28: {
    name: 'Planet Limit 28',
    cost: 144,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_26'
  },
  planet_limit_30: {
    name: 'Planet Limit 30',
    cost: 156,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_28'
  },
  planet_limit_32: {
    name: 'Planet Limit 32',
    cost: 168,
    bonus: null,
    affects: 'planet_limit',
    requires: 'planet_limit_30'
  },
  queue_length_4: {
    name: 'Queue Length 4',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: null
  },
  queue_length_5: {
    name: 'Queue Length 5',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_4'
  },
  queue_length_6: {
    name: 'Queue Length 6',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_5'
  },
  queue_length_7: {
    name: 'Queue Length 7',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_6'
  },
  queue_length_8: {
    name: 'Queue Length 8',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_7'
  },
  queue_length_9: {
    name: 'Queue Length 9',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_8'
  },
  queue_length_10: {
    name: 'Queue Length 10',
    cost: 48,
    bonus: null,
    affects: 'queue_length',
    requires: 'queue_length_9'
  }
}

export default research
