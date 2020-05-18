const Card = require("./Card");
const { cutElementFromArray } = require("./myUtil");

class FactoryCard {
  constructor(figures, findingAreas) {
    this.figures = figures; //["#","$","&",...]
    this.findingAreas = findingAreas; //["00","01","02",...]
  }

  getRandomSiblingsCards() {
    let figure = cutElementFromArray(this.figures);
    let fistCardPosition = cutElementFromArray(this.findingAreas);
    let secondCardPosition = cutElementFromArray(this.findingAreas);

    return [
      new Card(fistCardPosition, figure),
      new Card(secondCardPosition, figure),
    ];
  }
}

module.exports = FactoryCard;
