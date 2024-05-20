"use strict";

// Display and UI

import {
    TILE_STATUSES,
    createBoard,
    markTile,
    revealTile,
    checkWin,
    checkLose,
} from "./minesweeper.js";

import { startTimer, stopTimer } from "./timer.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const boardElement = document.querySelector("#board");
const minesLeftText = document.querySelector("#mines-left");
const messageText = document.querySelector(".subtext");
const timerElement = document.querySelector("#timer");
const resetButton = document.querySelector("#reset-button");

const init = () => {
    resetBoard();
    const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
    setupBoard(board);
    boardElement.style.setProperty("--size", BOARD_SIZE);
    timerElement.textContent = "0";
    startTimer(timerElement);
}

const resetBoard = () => {
    boardElement.innerHTML = "";
    messageText.textContent = " ";
    minesLeftText.textContent = NUMBER_OF_MINES.toString();
    stopTimer();
}

const setupBoard = (board) => {
    for (let row of board) {
        for (let tile of row) {
            boardElement.append(tile.element);
            tile.element.addEventListener("click", () => {
                revealTile(board, tile);
                checkGameEnd(board);
            });
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault();
                markTile(tile);
                listMinesLeft(board);
            });
        }
    }
}

const listMinesLeft = (board) => {
    const markedTilesCount = board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
        );
    }, 0);

    minesLeftText.textContent = (NUMBER_OF_MINES - markedTilesCount).toString();
}

const checkGameEnd = (board) => {
    const win = checkWin(board);
    const lose = checkLose(board);

    if (win || lose) {
        stopTimer();
        disableBoardInteraction();
    }

    if (win) {
        messageText.textContent = "You win!";
    }
    if (lose) {
        messageText.textContent = "You lose!";
        revealAllMines(board);
    }
}

const revealAllMines = (board) => {
    for (let row of board) {
        for (let tile of row) {
            if (tile.status === TILE_STATUSES.MARKED) {
                markTile(tile);
            }
            if (tile.mine) {
                revealTile(board, tile);
            }
        }
    }
}

const disableBoardInteraction = () => {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
}

const enableBoardInteraction = () => {
    boardElement.removeEventListener("click", stopProp, { capture: true });
    boardElement.removeEventListener("contextmenu", stopProp, { capture: true });
}

const stopProp = (e) => e.stopImmediatePropagation();

resetButton.addEventListener("click", () => {
    enableBoardInteraction();
    init();
});

document.addEventListener("DOMContentLoaded", () => {
    init();
});
