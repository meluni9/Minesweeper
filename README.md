# Minesweeper Game

A simple Minesweeper game clone built with HTML, CSS, and JavaScript.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Demo
You can play the game [here](https://meluni9.github.io/Minesweeper/).

## Features
- Three difficulty levels: Easy, Medium, Hard.
- Timer to track game duration.
- Best score tracking for each difficulty level.
- Dynamic game board generation.
- Responsive UI.

## Installation
To run this project locally:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/meluni9/Minesweeper.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd Minesweeper
    ```
3. **Open `index.html` in your web browser**:
    ```bash
    open index.html
    ```

## Usage
- Select the difficulty level from the dropdown menu.
- Left-click on tiles to reveal them.
- Right-click on tiles to mark them as mines.
- The game ends when all non-mine tiles are revealed (win) or a mine is revealed (lose).
- Click the **Restart Game** button to initialize the game board again.

## Game Rules
1. **Objective**: Uncover all tiles without mines and mark all the mines.
2. **Tile States**:
    - **Hidden**: Initial state of all tiles.
    - **Revealed**: Shows the number of adjacent mines.
    - **Marked**: Suspected mine tile.
3. **Gameplay**:
    - **Revealing Tiles**: Click to reveal. If it's a mine, you lose. Otherwise, shows the adjacent mines count.
    - **Marking Mines**: Right-click to mark a suspected mine.
4. **Winning**: Uncover all non-mine tiles.
5. **Losing**: Reveal a tile with a mine.

