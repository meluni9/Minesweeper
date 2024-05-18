'use strict'

// Logic

export function createBoard(boardSize, numberOfTiles) {
    const board = [];
    for (let x= 0; x < boardSize; x++) {
        const row = [];
        for (let y= 0; y < numberOfTiles; y++) {
            const tile = {
                x,
                y
            }
            row.push(tile)
        }
        board.push(row)
    }

    return board
}