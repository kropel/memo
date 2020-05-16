"use strict";
const FactoryPalyer = require("./FactoryPalyer");
const Game = require("./Game");
const InputData = require("./InputData");
const { board, figures } = require("./MemoryInput");

const inputData = new InputData(board, figures);
let [boardGame, findingAreas] = inputData.getGameOptions();
const game = new Game(boardGame, findingAreas);
const factoryPalyer = new FactoryPalyer(findingAreas, game);
game.setPlayers(factoryPalyer.getPlayers(2));
game.start();
game.showResults();
