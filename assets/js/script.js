const width = 10; //number of squares on a row
const topScore = document.getElementById("top-score");
const score = document.getElementById("score");
const level = document.getElementById("level");
const playButton = document.getElementById("play-button");
const soundsButton = document.getElementById("sounds-button");
const gridContainer = document.getElementById("grid-container");

createGridDivs();

const getSquares = () => Array.from(
    document.getElementById("grid-container")
    .getElementsByTagName("div"));

/**
 * Create 200 divs for the grid layout
 */
function createGridDivs() {
    for (let i = 0; i < 200; i++) {
        gridContainer.innerHTML += `<div class="square"></div>`
    }
};

console.log(getSquares());