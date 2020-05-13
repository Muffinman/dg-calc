const imgDG = 'https://beta.darkgalaxy.com/images'

let ships = {
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
