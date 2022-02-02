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
    [2, width, width + 1, width + 2],
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

let startPosition = 4; // the tetrominoes will spawn at this index on the grid

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
};

/**
 * Returns a random Tetromino shape at a random rotation
 */
function randomTetromino(){
    let randomShape = Math.floor(Math.random() * theTetrominoes.length);
    let randomRotation = Math.floor(Math.random() * theTetrominoes[randomShape].length);
    let currentTetromino = theTetrominoes[randomShape][randomRotation];

    return currentTetromino;
}

/**
 * Draw the tetrominoes at the top of the grid 
 */
 function drawTetromino(){
    let current = randomTetromino();
    current.forEach(index => {
        squares[startPosition + index].classList.add("tetromino")
    });
};

drawTetromino();