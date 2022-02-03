const width = 10; //number of squares on a row
const topScore = document.getElementById("top-score");
const score = document.getElementById("score");
const level = document.getElementById("level");
const playButton = document.getElementById("play-button");
const soundsButton = document.getElementById("sounds-button");
const gridContainer = document.getElementById("grid-container");
const squares = createGridDivs();

let currentPosition = 4; // the tetrominoes will spawn at this index on the grid
let timerId;

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

let [currentTetromino, currentShape, currentRotation] = randomTetromino();
/**
 * Returns a random Tetromino shape at a random rotation
 */
function randomTetromino() {
    let randomShape = Math.floor(Math.random() * theTetrominoes.length);
    let randomRotation = Math.floor(Math.random() * theTetrominoes[randomShape].length);
    let currentTetrominoShape = theTetrominoes[randomShape][randomRotation];

    return [currentTetrominoShape, randomShape, randomRotation];
}

/*
FIX: Had to take out current tetromino from draw function due to randomly displaying
 different shapes every time it move down
 */
/**
 * Draw the current Tetromino on the grid
 */
function drawTetromino() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino");
    });
}

/**
 * Undraw the current Tetromino from the grid
 */
function undrawTetromino() {
    currentTetromino.forEach(index => {
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
    if (currentTetromino.some(index =>
            (currentPosition + index + width > 199) ||
            (squares[currentPosition + index + width].classList.contains("taken")))) {
        freeze = true;
        currentTetromino.forEach(index => squares[currentPosition + index].classList.add("taken"));
        [currentTetromino, currentShape, currentRotation] = randomTetromino();
        currentPosition = 4;
        drawTetromino(); //display the tetromino from the first row of the grid
    }
    return freeze;
}

/**
 * Moves the tetromino left if no wall or other tetromino is taking the square
 */
function moveLeft() {
    undrawTetromino();

    const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) {
        currentPosition -= 1;
    }

    //if the left square is taken, move the tetromino back 1 square so it appears not moved
    if (currentTetromino.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition += 1;
    }
    drawTetromino();
}

/**
 * Moves the tetromino right if no wall or other tetromino is taking the square
 */
function moveRight() {
    undrawTetromino();

    const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) {
        currentPosition += 1;
    }

    //if the right square is taken, move the tetromino back 1 square so it appears not moved
    if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }
    drawTetromino();
}

function rotate() {
    undrawTetromino();

    currentRotation++;

    if (currentRotation === currentTetromino.length) {
        currentRotation = 0;
    }
    currentTetromino = theTetrominoes[currentShape][currentRotation];
    drawTetromino();
}

/*--------------------
|   Event Listener    |
 --------------------*/

function controls(event) {
    if (event.keyCode === 37) {
        moveLeft();
    } else if (event.keyCode === 38) {
        rotate();
    } else if (event.keyCode === 39) {
        moveRight();
    } else if (event.keyCode === 40) {
        moveDown();
    }
}

document.addEventListener("keyup", controls);

playButton.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            drawTetromino();
            timerId = setInterval(moveDown, 1000);
        }
    }
);