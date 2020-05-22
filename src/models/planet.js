import HomePlanet from '../data/home_planet.js'

export default class Planet {
  constructor () {
    this.constructed = HomePlanet.constructed
    this.stored = HomePlanet.stored
    this.abundances = HomePlanet.abundances
  }
}
