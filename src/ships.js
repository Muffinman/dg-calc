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
    requires: [],
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
    requires: [ 'ship_yard' ],
    image: `${imgDG}/units/main/ships/outpost_ship.gif`
  }
}

export default ships
