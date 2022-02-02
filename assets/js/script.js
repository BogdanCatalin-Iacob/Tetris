const width = 10; //number of squares on a row
const topScore = document.getElementById("top-score");
const score = document.getElementById("score");
const level = document.getElementById("level");
const playButton = document.getElementById("play-button");
const soundsButton = document.getElementById("sounds-button");
const gridContainer = document.getElementById("grid-container");
const squares = createGridDivs();

/*--------------------
|      Tetrominoes    |
 --------------------*/

const lTetromino = [
    [width + 2, width * 3, width * 3 + 1, width * 3 + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [0, 1, 2, width + 1],
    [1, 2, width + 2, width * 2 + 2]
];

const jTetromino = [
    [0, width, width + 1, width + 2],
    [0, 1, width, width * 2],
    [0, 1, 2, width],
    [2, width + 2, width * 2 + 2]
];

const sTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1]
];

const zTetromino = [
    [1, 2, width + 1, width + 2],
    [1, width, width + 1, width * 2],
    [1, 2, width + 1, width + 2],
    [1, width, width + 1, width * 2]
];

const tTetromino = [
    [1, width + 1, width + 2, width * 2 + 1],
    [0, 1, 2, width + 1],
    [1, width, width + 1, width * 2 + 1],
    [1, width, width + 1, width + 2]
];

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];

const iTetromino = [
    [0, 1, 2, 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [0, 1, 2, 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1]
];

const theTetrominoes = [lTetromino, jTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let current = theTetrominoes[0][0];

console.log(theTetrominoes);

/*--------------------
|      Functions      |
 --------------------*/

/**
 * Create 200 divs for the grid layout
 */
function createGridDivs() {
    for (let i = 0; i < 200; i++) {
        gridContainer.innerHTML += `<div class="square"></div>`
    }
    return gridContainer.childNodes;;
};