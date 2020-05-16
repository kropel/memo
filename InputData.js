const { getNumberAllElemArray, cutElementFromArray } = require("./myUtil");
const FactoryCard = require("./FactoryCard");
const { board, figures } = require("./MemoryInput");

class InputData {
  constructor(board, figures) {
    this.boardFlatLength = getNumberAllElemArray(board);
    this.check(this.boardFlatLength, figures);
    this.findingAreas = this.setFindingAreas(board);
    this.figures = figures;
    this.factoryCard = new FactoryCard(
      [...this.figures],
      [...this.findingAreas]
    );
    this.board = this.setBoard();
  }

  check(boardFlatLength, figures) {
    if (boardFlatLength > figures.length * 2) {
      throw new Error(
        `Figures array is too small, should be more than ${
          boardFlatLength / 2
        } length.`
      );
    }
    if (boardFlatLength % 2) {
      throw new Error("The array should be even");
    }
  }

  setFindingAreas(board) {
    let tempBoard = board
      .map((row, indexRow) =>
        row.map((elem, indexColumn) => indexRow + "" + indexColumn)
      )
      .flat();
    let randomBoard = [];
    while (tempBoard.length > 0) {
      randomBoard.push(cutElementFromArray(tempBoard));
    }
    return randomBoard;
  }

  setBoard() {
    let tempBoard = [];
    let halfBoardLength = this.boardFlatLength / 2;
    while (halfBoardLength-- > 0) {
      tempBoard = tempBoard.concat(this.factoryCard.getRandomSiblingsCards());
    }
    return tempBoard;
  }

  getGameOptions() {
    return [this.board, this.findingAreas];
  }
}

module.exports = InputData;
