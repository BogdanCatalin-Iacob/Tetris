const width = 10; //number of squares on a row
const topScore = document.getElementById("top-score");
const score = document.getElementById("score");
const level = document.getElementById("level");
const playButton = document.getElementById("play-button");
const soundsButton = document.getElementById("sounds-button");
const gridContainer = document.getElementById("grid-container");
const squares = createGridDivs();
let timerId = setInterval(moveDown, 1000);

/*--------------------
|      Tetrominoes    |
 --------------------*/

const lTetromino = [
    [2, width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [0, 1, 2, width],
    [1, 2, width + 2, width * 2 + 2]
];

const jTetromino = [
    [0, width, width + 1, width + 2],
    [0, 1, width, width * 2],
    [0, 1, 2, width + 2],
    [2, width + 2, width * 2 + 1, width * 2 + 2, ]
];

const sTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1]
];

const zTetromino = [
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2],
    [0, 1, width + 1, width + 2],
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

let currentPosition = 4; // the tetrominoes will spawn at this index on the grid
let currentTetromiono = randomTetromino();
/*--------------------
|      Functions      |
 --------------------*/

/**
 * Create 200 divs for the grid layout and return an array of divs
 */
function createGridDivs() {
    for (let i = 0; i < 200; i++) {
        gridContainer.innerHTML += `<div class="square"></div>`
    }
    return gridContainer.childNodes;;
}

/**
 * Returns a random Tetromino shape at a random rotation
 */
function randomTetromino() {
    let randomShape = Math.floor(Math.random() * theTetrominoes.length);
    let randomRotation = Math.floor(Math.random() * theTetrominoes[randomShape].length);
    let currentTetromino = theTetrominoes[randomShape][randomRotation];

    return currentTetromino;
}

/*
FIX: Had to take out current tetromino from draw function due to randomly displaying
 different shapes every time it move down
 */
/**
 * Draw the current Tetromino on the grid
 */
function drawTetromino() {
    currentTetromiono.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino");
    });
}

/**
 * Undraw the current Tetromino from the grid
 */
function undrawTetromino() {
    currentTetromiono.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino");
    });
}

/**
 * Moves the current tetromino down on the grid by 1 row
 */
function moveDown() {
    undrawTetromino();
    if (!freezeTetromino()) {
        currentPosition += width;
    }
    drawTetromino();
    freezeTetromino();
}

/**
 * Returns true if the tetromino touches the bottom of the grid or another tetromino already frozen
 */
function freezeTetromino() {
    let freeze = false;
    if (currentTetromiono.some(index =>
            (currentPosition + index + width > 199) ||
            (squares[currentPosition + index + width].classList.contains("taken")))) {
        freeze = true;
        currentTetromiono.forEach(index => squares[currentPosition + index].classList.add("taken"));
        currentTetromiono = randomTetromino();
        currentPosition = 4;
    }
    return freeze;
}