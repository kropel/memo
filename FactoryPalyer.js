const Player = require("./Player");

class FactoryPlayer {
  constructor(findingAreas, game) {
    this.game = game;
    this.findingAreas = findingAreas;
  }

  getPlayers(numberPlayers) {
    return [...new Array(numberPlayers)].map(
      (elem, index) =>
        new Player(`Computer${index + 1}`, this.findingAreas, this.game)
    );
  }
}

module.exports = FactoryPlayer;
