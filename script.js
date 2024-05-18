"use strict"

// Display and UI

import {
    createBoard,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;


const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");

console.log(board)

for (let row of board) {
    for (let tile of row) {
        boardElement.append(tile.element);
    }
}

boardElement.style.setProperty("--size", BOARD_SIZE);
