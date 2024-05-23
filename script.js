"use strict";

import { TILE_STATUSES, DIFFICULTY_SETTINGS, createBoard, markTile, revealTile, checkWin, checkLose } from "./minesweeper.js";
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
}

const TILE_SETTINGS = {
    easy: { size: 60, fontSize: 38 },
    medium: { size: 45, fontSize: 34 },
    hard: { size: 35, fontSize: 30 },
}

const initGame = ({ size, mines }) => {
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
    for (const row of board) {
        for (const tile of row) {
            setupTileListeners(tile, board, size, mines);
            boardElement.append(tile.element);
        }
    }
}

const setupTileListeners = (tile, board, size, mines) => {
    tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd(board);
    });
    tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        updateMinesLeftCount(board, mines);
    });
}

const updateMinesLeftCount = (board, mines) => {
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
    for (const row of board) {
        for (const tile of row) {
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
    boardElement.addEventListener("click", stopPropagation, { capture: true });
    boardElement.addEventListener("contextmenu", stopPropagation, { capture: true });
}

const enableBoardInteraction = () => {
    boardElement.removeEventListener("click", stopPropagation, { capture: true });
    boardElement.removeEventListener("contextmenu", stopPropagation, { capture: true });
}

const stopPropagation = (e) => e.stopImmediatePropagation();

const setTileSettings = (difficulty) => {
    const { size, fontSize } = TILE_SETTINGS[difficulty] || TILE_SETTINGS.hard;
    document.documentElement.style.setProperty("--tile-size", `${size}px`);
    document.documentElement.style.setProperty("--tile-font-size", `${fontSize}px`);
}

difficultySelect.addEventListener("change", () => {
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    setTileSettings(selectedDifficulty);
    initGame(settings);
    displayBestScore(selectedDifficulty);
});

resetButton.addEventListener("click", () => {
    enableBoardInteraction();
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    setTileSettings(selectedDifficulty);
    initGame(settings);
});

document.addEventListener("DOMContentLoaded", () => {
    const selectedDifficulty = difficultySelect.value;
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    setTileSettings(selectedDifficulty);
    initGame(settings);
});
