document.addEventListener('DOMContentLoaded', () => {
    saveTopScore();
    openModal();
});

const width = 10; //number of squares on a row
const displayTopScore = document.getElementById("top-score");
const displayScore = document.getElementById("score");
const displayLevel = document.getElementById("level");
const playButton = document.getElementById("play-button");
const soundsButton = document.getElementById("sounds-button");
const instructionsButton = document.getElementById("instructions-button");
const gridContainer = document.getElementById("grid-container");
const modal = document.getElementById("modal");
const modalPlay = document.getElementById("modal-play");

//mouse variable
let initialMousePosition;

//touch variable
let startTouchX;
let startTouchY;
let tapTimeOut;
let isTaplength;

let gameSpeed = 1000; //initial speed of the game
let lockDelay = 500; //initial delay before a tetromino is locked in place

//it has to be an Array to be manipulated
let squares = Array.from(createGridDivs());

//game stats
let score = 0;
let level = 1;
let totalClearedLines = 0;

//colors list to be assigned to tetrominoes
const colors = [
    'orange',
    'blue',
    'green',
    'red',
    'purple',
    'yellow',
    'cyan'
]

let currentPosition = 6; // the tetrominoes will spawn at this index on the grid
let nextShapePosition = 6 //next shape position in the mini grid
let timerId; //will be set to move down the tetrominoes depending on the level
setMiniGrid();

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
 * Open intruction modal when the DOM is loaded
 */
function openModal() {
    modal.style.display = "block";
}

/**
 * Close the intruction modal
 */
function closeModal() {
    modal.style.display = "none";
}

/**
 * Create 200 divs for the grid layout and return an array of divs
 */
function createGridDivs() {
    for (let i = 0; i < 240; i++) {
        gridContainer.innerHTML += `<div class="square"></div>`
    }
    return gridContainer.childNodes;
}

/**
 * Display a mini grid 4x4 in the top right corner of the game board
 */
function setMiniGrid() {
    let miniGrid = [];

    //select only the last 4 squares of the first 4 rows in the main grid
    for (let i = 0; i < 40; i++) {
        let allTrue =
            i >= 6 && i < 10 ||
            i >= 16 && i < 20 ||
            i >= 26 && i < 30 ||
            i >= 36 && i < 40;

        if (allTrue) {
            miniGrid.push(i);
            squares[i].classList.add('mini-grid');
        }
    }
}

//assign the values of a random tetromino
let [currentTetromino, currentShape, currentRotation] = randomTetromino();
let [nextTetromino, nextShape, nextRotation] = randomTetromino();

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
        squares[currentPosition + index].style.backgroundColor = colors[currentShape];
    });
}

/**
 * Draw the next tetromino on the mini grid
 */
function drawNextTetromino() {
    nextTetromino.forEach(index => {
        squares[nextShapePosition + index].classList.add('tetromino');
        squares[nextShapePosition + index].style.backgroundColor = colors[nextShape];
    })
}

/**
 * Undraw the current Tetromino from the grid
 */
function undrawTetromino() {
    currentTetromino.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino");
        squares[currentPosition + index].style.backgroundColor = "";
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

    displayNextShape();
    drawTetromino();
    //gives the chance to move / slide the tetromino before it locks in place
    setTimeout(freezeTetromino, lockDelay);
}

/**
 * Instant move down on the bottom of playfield or
 * on top of another block if positioned under the playing tetromino
 */
function hardDrop() {
    undrawTetromino();
    //check each row from the current possition downwards for empty space 
    for (let i = currentPosition; i < squares.length - 1; i += width) {
        if (currentPosition < 40) {
            currentPosition = 41; //must be over 40 for displayNextShape() to work
            displayNextShape();
        }

        /*
        if the next row has filled in spaces at the same column as any of the current tetromino or
        iteration got to the bottom of the playfield place the tetromino accordingly skipping step by step moving down
        */
        if (currentTetromino.some(index =>
                (i + index + width > squares.length - 1) ||
                (squares[i + index + width].classList.contains("taken")))) {
            currentPosition = i;
            break;
        }
    }
    drawTetromino();
    freezeTetromino();
}

/**
 * Display the next shape in the top right corner (mini grid)
 */
function displayNextShape() {

    //When the current tetromino gets out of the mini grid generate the next shape
    if (currentPosition > 40 && currentPosition < 50) {
        [nextTetromino, nextShape, nextRotation] = randomTetromino(); //generate new shape
        nextShapePosition = 6; //set spawn position
        drawNextTetromino(); //display the tetromino from the first row of the grid
    }
}

/**
 * When the tetromino touches the bottom of the grid or
 * another tetromino already frozen, it will lock in place
 * and generate a new random shape
 */
function freezeTetromino() {
    let freeze = false;

    //Check if the tetromino is touching the bottom of the play field or another block
    if (currentTetromino.some(index =>
            (currentPosition + index + width > squares.length - 1) ||
            (squares[currentPosition + index + width].classList.contains("taken")))) {
        freeze = true;
        currentTetromino.forEach(index => squares[currentPosition + index].classList.add("taken"));

        //assign the next tetromino to the current tetromino
        [currentTetromino, currentShape, currentRotation] = [nextTetromino, nextShape, nextRotation]
        currentPosition = nextShapePosition;
        addScore();
        gameOver();
    }
    return freeze;
}

/**
 * Moves the tetromino left if no wall or other tetromino is taking the square
 */
function moveLeft() {
    undrawTetromino();

    const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);

    /*
    won't allow to move the piece left beyond miniGrid left boundary
    until the tetromino gets out on the play field
    */
    let miniGridTrue =
        (currentPosition > 6 && currentPosition < 10 ||
            currentPosition > 16 && currentPosition < 20 ||
            currentPosition > 26 && currentPosition < 30 ||
            currentPosition > 36) && !isAtLeftEdge;

    miniGridTrue ? currentPosition-- : false;

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

/*
FIX rotation of the tetrominoes at the edge of the board (they were going beyond the wall),
the code was adjusted for the project needs
credit: Ania Kubow (https://github.com/kubowania/Tetris-Basic/blob/a5b4d2bb17ca01234f23803c8fe86ee893b4bd45/app.js#L152)
for isAtLeft(), isAtRight() and checkRotatedPosition(P) methods
*/
/**
 * Check if the tetromino is at the right edge of the board
 */
function isAtRight() {
    return currentTetromino.some(index => (currentPosition + index + 1) % width === 0)
}

/**
 * Check if the tetromino is at the left edge of the board
 */
function isAtLeft() {
    return currentTetromino.some(index => (currentPosition + index) % width === 0)
}

/**
 * Check the position for next rotation of the shape at the edge of the board
 * and collision with other blocks
 * before it is displayed in the new or same position position
 */
function checkRotatedPosition(P) {
    P = P || currentPosition //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) { //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
        if (isAtRight()) { //use actual position to check if it's flipped over to right side
            currentPosition += 1; //if so, add one to wrap it back around

            //reverse the position and rotation so the shape appears as not moved
            if (isTaken()) {
                currentPosition--;
                currentRotation++;
            }
            checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
        }
    } else if (P % width > 5) {
        if (isAtLeft()) {
            currentPosition -= 1;

            //reverse the position and rotation so the shape appears as not moved
            if (isTaken()) {
                currentPosition++;
                currentRotation--;
            }
            checkRotatedPosition(P);
        }
    }
}

/**
 *  Limits the range of index to only to the size of the current tetromino rotation array
 * when rotation happens clockwise or anti-clockwise (acts like an infinite loop)
 */
function adjustRotationLimits(direction) {
    currentRotation += direction;
    if (currentRotation === -1) {
        currentRotation = currentTetromino.length - 1;
    } else if (currentRotation === currentTetromino.length) {
        currentRotation = 0;
    }
}

/**
 * Check if the next rotation is beyond the bottom of the playfield 
 * or taken by other block so the tetromino will not get out of boundaries 
 * or overlap other blocks
 */
function isTaken(direction) {
    let rotated = false;
    let bottom = currentTetromino.some(index => currentPosition + index > squares.length - 1);

    //check if the next rotation of the tetromino is beyond bottom of playfield
    if (!bottom) {
        rotated = currentTetromino.some(index => squares[currentPosition + index].classList.contains("taken"));
    }
    //if next rotation is beyond bottom or overlapping other block the rotation is reverted
    if (bottom || rotated && direction === "clockwise") {
        adjustRotationLimits(-1);
    } else if (bottom || rotated && direction === "anti-clockwise") {
        adjustRotationLimits(1);
    }
    //set the shape accordingly
    currentTetromino = theTetrominoes[currentShape][currentRotation];
}

/**
 * Rotate the tetromino clockwise
 */
function rotate() {
    undrawTetromino();
    let rightRotation = "clockwise";

    adjustRotationLimits(1);

    currentTetromino = theTetrominoes[currentShape][currentRotation];
    isTaken(rightRotation);

    checkRotatedPosition();
    drawTetromino();
}

/**
 * Rotate the tetromino anti clockwise
 */
function rotateAntiClockwise() {
    undrawTetromino();
    let leftRotation = "anti-clockwise";

    adjustRotationLimits(-1);

    currentTetromino = theTetrominoes[currentShape][currentRotation];
    isTaken(leftRotation);

    checkRotatedPosition();
    drawTetromino();
}

/**
 * Removes full rows, add and display score, top score
 */
function addScore() {
    let clearedlines = 0;
    for (let i = 0; i < squares.length; i += width) {

        //define which are the squares of a row
        const row = [
            i,
            i + 1,
            i + 2,
            i + 3,
            i + 4,
            i + 5,
            i + 6,
            i + 7,
            i + 8,
            i + 9
        ];
        if (row.every(index => squares[index].classList.contains('taken'))) {
            //count the cleared lines at once
            clearedlines += 1;

            //make each cell of the full row hidden and available
            row.forEach(index => {
                squares[index].classList.remove('taken');
                squares[index].classList.remove("tetromino");
                squares[index].style.backgroundColor = "";
            });

            //remove the full rows and add the same number of rows under the mini grid
            const removedSquares = squares.splice(i, width);
            const firstFourRows = squares.splice(0, 40);
            squares = firstFourRows.concat(removedSquares, squares);
            squares.forEach(square => gridContainer.appendChild(square));
        }
    }

    //add score based on the player's level and cleared lines at simultaneously
    switch (clearedlines) {
        case 1:
            score += level * 40;
            break;
        case 2:
            score += level * 100;
            break;
        case 3:
            score += level * 300;
            break;
        case 4:
            score += level * 1200;
            break;
        default:
            score += 0;
            break;
    }
    //display scores
    saveTopScore(score);
    displayScore.innerHTML = score;
    levelUp(clearedlines);
    clearedlines = 0; // reset the number of cleared lines 
}

/**
 * Save, update and display top score value saved on local storage
 */
function saveTopScore(score) {
    let savedTopScore = window.localStorage.getItem('topScore'); //get top score saved on local storage

    if (savedTopScore === null) {
        savedTopScore = 0;
    } else {
        savedTopScore < score ? savedTopScore = score : savedTopScore;
    }

    window.localStorage.setItem('topScore', savedTopScore);

    displayTopScore.innerHTML = savedTopScore;
}

/**
 * Increase the level based on a variable cleared lines on each level
 */
function levelUp(clearedlines) {
    //bonus for cleared lines at once
    switch (clearedlines) {
        case 1:
            totalClearedLines += 1;
            break;
        case 2:
            totalClearedLines += 3;
            break;
        case 3:
            totalClearedLines += 5;
            break;
        case 4:
            totalClearedLines += 8;
            break;
        default:
            totalClearedLines += 0;
            break;
    }

    //variable level up based on cleared lines and bonus
    if (totalClearedLines >= (level * 5)) {
        level++;
        gameSpeed > 0 ? gameSpeed -= (gameSpeed * (1 / 100)) : gameSpeed = 1; //speed up the game by 1%
        lockDelay > 0 ? lockDelay -= (lockDelay * (1 / 100)) : lockDelay = 1; //shorten the lock in place time by 1%
        totalClearedLines = 0;
    }
    displayLevel.innerHTML = level;
}

/**
 * When the tetrominoes touch the top of the game board the game ends
 */
function gameOver() {
    let modalBox = document.getElementById("intructions");

    //check the row under miniGrid (row 5 of the main grid) for any taken square
    for (let i = 40; i <= 49; i++) {
        if (squares[i].classList.contains('taken')) {
            // displayScore.innerHTML = 'end';
            clearInterval(timerId);
            timerId = null;
            undrawTetromino();

            //set Game over message in the modal box and display the score
            modalBox.innerHTML = `<h1>GAME OVER!<br></h1>
                                <h2>Your score: ${score}</h2>
                                <h2>Level: ${level}</h2>
                                <a href="#" onclick="closeModal()" title="Close" class="modal-close">Close</a>`;
            openModal();
        }
    }
}

/**
 * Start or pause the game.
 * When paused a modal will pop-up which contains a resume button
 */
function playPause() {
    closeModal();
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playButton.innerHTML = "Play";
        document.getElementById("intructions").innerHTML = `<h1>Paused</h1>
                                                            <br>
                                                            <div class="center">
                                                                <button class="button modal-button" onclick="playPause()">Resume</button>
                                                            </div>`;
        openModal();
    } else {
        drawTetromino();
        timerId = setInterval(moveDown, 1000);
        playButton.innerHTML = "Pause";
    }
}

/**
 * display a modal with a set of how to play instructions
 */
function instructions() {
    document.getElementById("intructions").innerHTML = `
        <h1>Instructions!</h1>
                <br>
        <a href="#" onclick="closeModal()" title="Close" class="modal-close">Close</a>
        
        <p>- Stack flat, but not too flat, to allow S and Z tetrominoes to stack without creating gaps. Having a
            flat field will allow a player to rotate less, which saves time. A player will also have more
            placement opportunities. The even field will allow a player to think less which results in faster
             reaction times. Also, stacking flat will also mean keeping middle columns lower to the ground,
             lessening the risk of a block-out.</p>
        <p>- Try not to build empty columns greater than 2 cells deep, as this will require an I tetromino that
            can be better used to tetris.</p>
        <p>- Use a T to convert an S/Z field position into a Z/S.</p>
        <p>- Avoid placing a J upright towards the left wall if you don't expect another J to appear soon. The
            same idea applies to L tetrominoes, either at a wall or at the edge</p>
        <p>- When dealing with a two-deep hole, make room for both J and L instead of blocking one off.</p>
        <p>- When having two open columns, deal with it as soon as possible. Over stacking will make things
            worse by having to wait on even more l shapes.</p>

        <img id="keyboard-controls" src="assets/images/keyboard-layout.PNG"
            alt="image of keyboard controls, left / right arrow keys slide tetrominoes left or right, down arrow key soft drop,
        up arrow key rotate clockwise, z key rotate anti-clockwise, space bar key hard drop the tetromino, esc key pause / resume" width=100% />`;

    openModal();
}

/*--------------------
|   Event Listener    |
 --------------------*/
/**
 * Assign keyboard buttons to control the tetrominoes
 */
function controls(event) {
    if (event.keyCode === 37) {
        moveLeft();
    } else if (event.keyCode === 38) {
        rotate();
    } else if (event.keyCode === 90) {
        rotateAntiClockwise();
    } else if (event.keyCode === 39) {
        moveRight();
    } else if (event.keyCode === 40) {
        moveDown();
    } else if (event.keyCode === 32) {
        hardDrop();
    } else if (event.keyCode === 27) {
        playPause();
    }
}

/**
 * Handle mouse controls, slide left / right and rotate clockwise
 */
function handleEvent(event) {
    event.preventDefault();

    switch (event.type) {
        case "mouseenter":
            initialMousePosition = event.clientX;
            break;
        case "mousemove":
            let mousePosition = event.clientX;

            if (mousePosition % 10 === 0) {
                if (mousePosition > initialMousePosition) {
                    moveRight();
                } else {
                    moveLeft();
                }
                freezeTetromino();
            }
            initialMousePosition = mousePosition;
            break;
        case "click":
            rotate();
            break;
        default:
            return;
    }
}

/**
 * Register initial touch point to determine movement direction
 * and set a timeout used for tap detection
 */
function handleTouchStart(event) {
    event.preventDefault();
    startTouchX = event.touches[0].clientX;
    startTouchY = event.touches[0].clientY;
    isTaplength = true;
    if (tapTimeOut) {
        clearTimeout(tapTimeOut);
    }
    tapTimeOut = setTimeout(() => {
        isTaplength = false
    }, 200);
}

/**
 * Move the tetrominoes left, right or down when swipe (use on touch screen devices)
 */
function handleTouchMove(event) {
    event.preventDefault();
    let touchMoveX = event.touches[0].clientX;
    let touchMoveY = event.touches[0].clientY;

    //allows a longer swipe distance with for less travelling distance when divided by 10px
    if (touchMoveX % 10 === 0) {
        touchMoveX < startTouchX ? moveLeft() : moveRight();
        freezeTetromino();
    }

    //allows a longer swipe distance with for less travelling distance when divided by 10px
    if (touchMoveY % 10 === 0) {
        if (touchMoveY > startTouchY) {
            moveDown()
            freezeTetromino();
        }
    }
}

/**
 * Handle the tap event. If the touch is less than 200ms,
 * start touch and end touch are approximately equal(less than 50px between them)
 * a single clockwise rotation will happen (use on touch screen devices)
 */
function handleTouchEnd(event) {
    event.preventDefault();
    let endTouchX = event.changedTouches[0].clientX;
    let endTouchY = event.changedTouches[0].clientY;

    if (isTaplength && ((endTouchX - startTouchX) < 50 || (endTouchY - startTouchY) < 50)) {
        rotate();
    }
}

window.addEventListener("contextmenu", (e) => e.preventDefault);

document.addEventListener("keyup", controls);

playButton.addEventListener("click", playPause);

instructionsButton.addEventListener("click", instructions);

modalPlay.addEventListener("click", playPause);
gridContainer.addEventListener("mouseenter", handleEvent);
gridContainer.addEventListener("mousemove", handleEvent);
gridContainer.addEventListener("click", rotate);
gridContainer.addEventListener("contextmenu", hardDrop);

//touch controls events
gridContainer.addEventListener("touchstart", handleTouchStart);
gridContainer.addEventListener("touchmove", handleTouchMove);
gridContainer.addEventListener("touchend", handleTouchEnd);