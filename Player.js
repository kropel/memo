const { cutElementFromArray, removeFromArray, getRandom } = require("./myUtil");

class Player {
  constructor(name, findingAreas, game) {
    this.name = name;
    this.findingAreas = findingAreas;
    this.game = game;
    this.finded = [];
    this.memory = [];
    this.efficacy = 20;
  }

  foundPair(cards) {
    this.removeFromMemory(cards);
    this.addToFinded(cards);
    this.game.removeFromBoard(cards);
  }

  addToFinded(cards) {
    this.finded = this.finded.concat(cards);
  }

  removeFromMemory(cards) {
    this.memory = removeFromArray(this.memory, cards);
  }

  addToMemory(cards) {
    if (this.efficacy > getRandom(101)) {
      this.memory = Array.from(new Set(this.memory.concat(cards)));
    } else {
      this.findingAreas = this.findingAreas.concat(
        cards.map((card) => card.positionId)
      );
    }
  }

  findInMemory(card) {
    let findedCard = this.memory.filter((item) => item.figure === card.figure);
    if (findedCard.length) {
      return findedCard[0];
    } else {
      return null;
    }
  }

  update() {
    let gameFindingAreas = this.game.getFindingAreas();
    this.findingAreas = this.findingAreas.filter((item) =>
      gameFindingAreas.some((gameItem) => gameItem === item)
    );
    this.memory = this.memory.filter((card) =>
      gameFindingAreas.some((item) => item === card.positionId)
    );
  }

  findPairsInMemory() {
    return this.memory.reduce((pair, current) => {
      let tempPair = this.memory.filter(
        (card) => card.figure === current.figure
      );
      return tempPair.length > 1 ? tempPair : pair;
    }, []);
  }

  move() {
    this.update();
    //czy sa w pamieci pary
    let pairsInMemory = this.findPairsInMemory();

    if (!!pairsInMemory.length) {
      this.foundPair(pairsInMemory);
    } else {
      //po wylosowaniu pierwszej karty sprawdzenie czy w pamici jest druga
      let firstCardIndex = cutElementFromArray(this.findingAreas);
      let firstCard = this.game.getCard(firstCardIndex);
      let secondCard = this.findInMemory(firstCard);
      if (secondCard) {
        this.foundPair([firstCard, secondCard]);
      } else {
        let secondCardIndex = cutElementFromArray(this.findingAreas);
        secondCard = this.game.getCard(secondCardIndex);

        //po wylosowaniu drugiej karty sprawdzenie czy sa takie same
        if (firstCard.figure === secondCard.figure) {
          this.foundPair([firstCard, secondCard]);
        } else {
          //jak karty nie sa para dodanie do paięci
          this.addToMemory([firstCard, secondCard]);
        }
      }
    }
  }
}

module.exports = Player;
