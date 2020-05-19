const imgDG = 'https://beta.darkgalaxy.com/images'

let ships = {
  wait: {
    name: 'Wait...',
    turns: 1,
    cost: {
      metal: 0,
      mineral: 0,
      energy: 0,
      pop: 0
    },
    requires: {
      buildings: [],
      research: []
    },
    image: `${imgDG}/units/small/time.png`
  },
  outpost_ship: {
    name: 'Outpost Ship',
    turns: 16,
    cost: {
      metal: 30000,
      mineral: 20000,
      energy: 0,
      pop: 50000
    },
    requires: {
      buildings: ['ship_yard'],
      research: []
    },
    image: `${imgDG}/units/main/ships/outpost_ship.gif`
  },
  invasion_ship: {
    name: 'Invasion Ship',
    turns: 16,
    cost: {
      metal: 30000,
      mineral: 20000,
      energy: 0,
      pop: 50000
    },
    requires: {
      buildings: [
        'ship_yard',
        'light_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/invasion_ship.gif`
  },
  freighter: {
    name: 'Freighter',
    turns: 8,
    cost: {
      metal: 24000,
      mineral: 16000,
      energy: 0,
      pop: 20000
    },
    requires: {
      buildings: ['ship_yard'],
      research: []
    },
    image: `${imgDG}/units/main/ships/freighter.gif`
  },
  trader: {
    name: 'Trader',
    turns: 12,
    cost: {
      metal: 72000,
      mineral: 48000,
      energy: 0,
      pop: 60000
    },
    requires: {
      buildings: ['space_dock'],
      research: []
    },
    image: `${imgDG}/units/main/ships/freighter.gif`
  },
  fighter: {
    name: 'Fighter',
    turns: 4,
    cost: {
      metal: 2000,
      mineral: 0,
      energy: 0,
      pop: 500
    },
    requires: {
      buildings: [
        'ship_yard',
        'light_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/fighter.gif`
  },
  bomber: {
    name: 'Bomber',
    turns: 6,
    cost: {
      metal: 0,
      mineral: 4000,
      energy: 0,
      pop: 1500
    },
    requires: {
      buildings: [
        'ship_yard',
        'light_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/bomber.gif`
  },
  frigate: {
    name: 'Frigate',
    turns: 10,
    cost: {
      metal: 12000,
      mineral: 8000,
      energy: 0,
      pop: 5000
    },
    requires: {
      buildings: [
        'ship_yard',
        'light_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/frigate.gif`
  },
  destroyer: {
    name: 'Destroyer',
    turns: 14,
    cost: {
      metal: 40000,
      mineral: 40000,
      energy: 0,
      pop: 25000
    },
    requires: {
      buildings: [
        'ship_yard',
        'heavy_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/destroyer.gif`
  },
  cruiser: {
    name: 'Cruiser',
    turns: 20,
    cost: {
      metal: 120000,
      mineral: 60000,
      energy: 0,
      pop: 50000
    },
    requires: {
      buildings: [
        'ship_yard',
        'light_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/cruiser.gif`
  },
  battleship: {
    name: 'Battleship',
    turns: 26,
    cost: {
      metal: 600000,
      mineral: 400000,
      energy: 0,
      pop: 300000
    },
    requires: {
      buildings: [
        'space_dock',
        'heavy_weapons_factory'
      ],
      research: []
    },
    image: `${imgDG}/units/main/ships/battleship.gif`
  }
}

export default ships
