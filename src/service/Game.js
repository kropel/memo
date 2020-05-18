const { removeFromArray } = require("./myUtil");

class Game {
  constructor(board, findingAreas) {
    this.board = board;
    this.findingAreas = findingAreas;
    this.cardLeft = this.board.length;
    this.players = [];
    this.playersNumber = 0;
    this.counter = 0;
  }

  getFindingAreas() {
    return this.findingAreas;
  }

  removeFromBoard(cards) {
    this.board = removeFromArray(this.board, cards);
    this.cardLeft = this.board.length;
    let positions = cards.map((card) => card.positionId);
    this.findingAreas = removeFromArray(this.findingAreas, positions);
  }

  getCard(cardIndex) {
    return this.board.find((card) => card.positionId === cardIndex);
  }

  setPlayers(players) {
    this.players = players;
    this.playersNumber = players.length;
  }

  start() {
    while (this.cardLeft > 0) {
      let player = this.players[this.counter++ % this.playersNumber];
      player.move();
    }
  }

  showResults() {
    let resultsTab = this.players.sort(
      (a, b) => b.finded.length - a.finded.length
    );
    console.log(
      `Queues: ${Math.floor((this.counter + 1) / this.playersNumber)}\n`
    );
    resultsTab.forEach((player, index) => {
      let symbols = [
        ...new Set(player.finded.map((card) => '"' + card.figure + '"')),
      ].join(", ");
      console.log(
        `${index + 1}. ${player.name}, found ${
          player.finded.length / 2
        } symols: ${symbols}.`
      );
    });
  }
}

module.exports = Game;
