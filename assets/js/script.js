const gridContainer = document.getElementById("grid-container");

/**
 * Create 200 divs for the grid layout
 */
function createGridDivs (){
    for (let i = 0; i < 200; i++) {
        gridContainer.innerHTML += `<div class="square"></div>`
    }
};

createGridDivs();