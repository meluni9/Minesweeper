"use strict"

// Logic

export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MARKED: "marked",
    MINE: "mine",
    NUMBER: "number",
}

export const createBoard = (boardSize, numberOfMines) => {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);

    for (let x= 0; x < boardSize; x++) {
        const row = [];
        for (let y= 0; y < boardSize; y++) {
            const element = document.createElement("div");
            element.dataset.status = TILE_STATUSES.HIDDEN;

            const tile = {
                element,
                x,
                y,
                mine: minePositions.some(positionsMatch.bind(null, {x, y})),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                },
            };
            row.push(tile);
        }
        board.push(row);
    }

    return board;
}

export const markTile = (tile)  => {
    if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
        return;
    }
    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN;
    }
    else {
        tile.status = TILE_STATUSES.MARKED;
    }
}

export const revealTile = (board, tile) => {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    }
    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE;
        return;
    }

    tile.status = TILE_STATUSES.NUMBER;
    const neighborTiles = nearbyTiles(board, tile);
    const neighborMines = neighborTiles.filter(t => t.mine);
    if (neighborMines.length === 0) {
        for (const tile of neighborTiles) {
            revealTile(board, tile);
        }
    }
    else {
        tile.element.textContent = neighborMines.length;
    }
}

export const checkWin = (board) => {
    for (const row of board) {
        for (const tile of row) {
            const isNumberTile = tile.status === TILE_STATUSES.NUMBER;
            const isHiddenOrMarkedMine = tile.mine &&
                (tile.status === TILE_STATUSES.HIDDEN ||
                    tile.status === TILE_STATUSES.MARKED);
            if (!isNumberTile && !isHiddenOrMarkedMine) {
                return false;
            }
        }
    }
    return true;
}

export const checkLose = (board) => {
    for (const row of board) {
        for (const tile of row) {
            if (tile.status === TILE_STATUSES.MINE) {
                return true;
            }
        }
    }
    return false;
}

const getMinePositions = (boardSize, numberOfMines) => {
    const positions = [];

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize),
        };

        if (!positions.some(positionsMatch.bind(null, position))) {
            positions.push(position);
        }
    }

    return positions;
}

const positionsMatch = (a, b) => a.x === b.x && a.y === b.y;

const randomNumber = size => Math.floor(Math.random() * size);

const nearbyTiles = (board, {x, y}) => {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset];
            if (tile) {
                tiles.push(tile);
            }
        }
    }
    return tiles;
}