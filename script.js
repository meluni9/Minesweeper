"use strict";

// Display and UI

import {TILE_STATUSES, DIFFICULTY_SETTINGS, createBoard, markTile, revealTile, checkWin, checkLose,} from "./minesweeper.js";
import { startTimer, stopTimer } from "./timer.js";

const boardElement = document.querySelector("#board");
const minesLeftText = document.querySelector("#mines-left");
const messageText = document.querySelector(".subtext");
const timerElement = document.querySelector("#timer");
const resetButton = document.querySelector("#reset-button");
const difficultySelect = document.querySelector("#difficulty");
const bestScoreElement = document.querySelector("#best-score");

const bestScores = {
    easy: Infinity,
    medium: Infinity,
    hard: Infinity,
};

const init = ({ size, mines }) => {
    const board = createBoard(size, mines);
    resetBoard(mines);
    setupBoard(board, size, mines);
    boardElement.style.setProperty("--size", size);
    timerElement.textContent = "0";
    startTimer(timerElement);
}

const resetBoard = (mines) => {
    boardElement.innerHTML = "";
    messageText.textContent = "";
    minesLeftText.textContent = mines.toString();
    stopTimer();
    enableBoardInteraction();
}

const setupBoard = (board, size, mines) => {
    for (let row of board) {
        for (let tile of row) {
            boardElement.append(tile.element);
            tile.element.addEventListener("click", () => {
                revealTile(board, tile);
                checkGameEnd(board, size, mines);
            });
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault();
                markTile(tile);
                listMinesLeft(board, mines);
            });
        }
    }
}

const listMinesLeft = (board, mines) => {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length;
    }, 0);

    minesLeftText.textContent = (mines - markedTilesCount).toString();
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
        updateBestScore();
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

const updateBestScore = () => {
    const selectedDifficulty = difficultySelect.value;
    const elapsedTime = parseInt(timerElement.textContent);
    if (elapsedTime < bestScores[selectedDifficulty]) {
        bestScores[selectedDifficulty] = elapsedTime;
        bestScoreElement.textContent = elapsedTime;
    }
}

const displayBestScore = (difficulty) => {
    const bestScore = bestScores[difficulty];
    if (bestScore === Infinity) {
        bestScoreElement.textContent = "No record";
    } else {
        bestScoreElement.textContent = bestScore;
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

difficultySelect.addEventListener("change", () => {
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    init(settings);
    displayBestScore(selectedDifficulty);
});

resetButton.addEventListener("click", () => {
    enableBoardInteraction();
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    init(settings);
});

document.addEventListener("DOMContentLoaded", () => {
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    init(settings);
});