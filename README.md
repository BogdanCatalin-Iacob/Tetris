## Table of Contents
* [Purpose](#Purpose)
* [User Experience Design (UX)](#User-Experience-Design)
  * [User stories](#User-Stories)
    * [First Time Visitor Goals](#First-Time-Visitor-Goals)
    * [Returning Visitor Goals](#Returning-Visitor-Goals)
    * [Frequent User Goals](#Frequent-User-Goals)
  * [Structure](#Structure)
    * [General Information](#General-Information)
    * [List Of Rules](#list-of-rules)
    * [Game Mechanics](#Game-Mechanics)
      * [Rotation](#rotation)
      * [Wall Kick](#wall-kick)
      * [Movement](#movement)
      * [Scoring System](#scoring-system)
      * [Leveling Up](#leveling-up)
    * [Methods Of Play](#Methods-Of-Play)
    * [Diagram Legend](#Diagram-Legend)
  * [Design](#Design)
    * [Colour Scheme](#Colour-Scheme)
    * [Typography](#Typography)
    * [Imagery](#Imagery)
    * [Wireframes](#Wireframes)
    * [Limitations](#Limitations)
* [Features](#Features)
    * [Existing Features](#Existing-Features)
    * [Future Features](#Features-Left-to-Implement)
* [Technologies](#Technologies)
* [Testing](#Testing)
    * [Test Strategy](#Test-Strategy)
      * [Summary](#Summary)
    * [Test Results](#Test-Results)
    * [Testing Issues](#Issues-and-Resolutions-to-issues-found-during-testing)
* [Deployment](#Deployment)
    * [Project Creation](#Project-Creation)
    * [GitHub Pages](#Using-Github-Pages)
    * [Locally](Run-Locally)
* [Credits](#Credits)
    * [Code](#Code)
    * [Content](#Content)
    * [Media](#Media)
    * [Acknowledgements](#Acknowledgements)
    * [Comments](#Comments)

## Purpose
This Game was created for the sole purpose of completing the second Milestone Project for the Code Institute's Full Stack Developer course. 
It was built using the knowledge gained from the HTML, CSS, User Centric Design and JavaScript modules. A full list of technologies used can be found in the technologies section of this document.

The live website can be found [here]().
![Website Mock Up](/assets/images/)

## User Experience (UX)

-   ### User stories

    -   #### First Time Visitor Goals
        1. I want to view the game and content clearly on my mobile device.
        2. I want to find the game instructions easily

    -   #### Returning Visitor Goals
        1. I want to know what is the highest score

    -   #### Frequent User Goals
        1. I want to be able to fast drop the pieces
        1. I want increased difficulty with each level

-   ### Structure

    -   #### General Information
        - The website will have two pages. The main page will display the Tetris game and the secondary page will be a 404 error page.
        - The largest part of the tetrion consists of the playfield measuring ten spaces across by twenty spaces down. It has other parts explained below.
        - Randomly selected tetrominoes, or shapes consisting of four square blocks, fall from the top of the playfield one at a time. Each tetromino enters the playfield with a given orientation and color depending on its shape. Part of the tetrion, called the piece preview, shows the next pieces that will enter the playfield.
        - The player can rotate the falling tetromino ninety degrees at a time within the plane of the playfield by pressing the clockwise rotation button (Arrow Up) or anti clockwise button (z) if the piece has room to rotate.
        - The player can shift the falling tetromino sideways one space at a time by pressing the left or right arrow. Pieces cannot shift through walls or other blocks.
        - Each tetromino moves downward slowly by itself. Generally a player can use some method to "drop" the tetromino, or make it move downward faster. Once the tetromino lands on the floor or other blocks, the piece will delay shortly before locking in which time the player can move it. After locking, a player can no longer move the tetromino.
        - When a tetromino locks and by doing so fills all empty spaces within one or more rows of the playfield, those full rows will clear. Remaining blocks above will move down by as many rows removed.
        - If the playfield has not filled up with blocks, the next piece enters.

    -   #### List Of Rules
        - A piece / shape / tetromino in Tetris is a geometric shape consisting of a set of blocks that is moved as a unit. A block (or mino) is the part of a piece that fills one unit of the playfield.
        - Playfield is 10 columns x 24 rows.
        - First 4 row are not part of the playing field, they are reserved for minigrid
        - Mini grid is 4 columns x 4 rows
        - Next shape is displayed in the mini grid
        - Tetromino colors are as follows:
            - l shape - Cyan
            - o shape - Yellow
            - t shape - Purple
            - s shape - Green
            - z shape - Red
            - j shape - Blue
            - L shape - Orange
        - Immediately drop one space if no existing Block is in its path
        - The pieces selection will be done random from all available pieces
        - Initial rotation will be selected random from all possible piece rotations
        - Standard mapping for keyboard:
            - Up Arrow - rotate piece 90deg clockwise
            - Left Arrow - move the oiece to left one cell if no obstruction
            - Right Arrow - move the piece to right by one cell if no obstruction
            - Down Arrow - move the piece down faster
            - z - rotate piece 90deg anti clockwise
            - space bar - hard drop
        - Use of half second lock delay
        - Next shape is displayed immediately after the playing tetromino gets out of the top right corner (mini grid)
        - When a row is fully covered / taken it must dissapear and score must be increased (line clear)
        - Top Score will be saved on local storage

    -   #### Game Mechanics
        - ##### Rotation
            - Initial rotation will be selected randomly for each spawned piece
            - Tetrominoes can be rotated clockwise or anti-clockwise
            - If the rotated tetromino overlaps another block, the rotation will be reverted so the shape appears not rotated
            - If the rotated tetromino goes beyond the bottom of the playfield, the rotation will be reverted so the shape appears not rotated
        - ##### Wall Kick
            - A wall kick happens when a player rotates a piece when no space exists in the squares where that tetromino would normally occupy after the rotation.
            To compensate, the game will move the piece one space into the opposite direction of the wall (for left wall position will move towards right and for right wall position will move towards left).
        - ##### Movement
            - The tetrominoes can move / slide towards left or right until they touch a side wall or another brick which occupies the square
            - Moving down is done automatically by the game at a 1000ms initial speed which will get faster when the player level is going up
            - Moving down can be done faster manually by pressing the moving down key (Down Arrow).
            - Hard drop (space bar key) of tetrominoes instant places the shape at the bottom of the playfield (if free) or on top of other blocks (if present) 
            - When the current tetromino touches the bottom of the play field or the top of another brick, the player has 500ms to slide it in a different location before it locks down and a different piece is spawned.

        - ##### Scoring system
            | Level | | | Points for| |
            |:----:| :----:|:----:|:----:|:----:|
            | | 1 line | 2 lines | 3 lines | 4Lines |
            |1| 40 | 100 | 300 | 1200 |
            |2| 80 | 200 | 600 | 2400 |
            |3| 120 | 300 | 900 | 3600 |
            |n| 40 * n | 100 * n | 300 * n | 1200 * n |

        - ##### Leveling Up
            - Player may only level up by clearing lines. Required lines depends on the level.
            The variable goal is set to 5 times the level (5 * level).
            - The lines values for variable goal are:
                - single line = 1 line
                - double lines = 3 line
                - triple lines = 5 lines
                - tetris (4 lines) = 8 lines 

    -   #### Methods Of PLay
        - Stack flat, but not too flat, to allow S and Z tetrominoes to stack without creating gaps. Having a flat field will allow a player to rotate less, which saves time. A player will also have more placement opportunities. The even field will allow a player to think less which results in faster reaction times. Also, stacking flat will also mean keeping middle columns lower to the ground, lessening the risk of a block-out.
        - Try not to build empty columns greater than 2 cells deep, as this will require an I tetromino that can be better used to tetris.
        - Use a T to convert an S/Z field position into a Z/S.
        - Avoid placing a J upright towards the left wall if you don't expect another J to appear soon. The same idea applies to L tetrominoes, either at a wall or at the edge
        - When dealing with a two-deep hole, make room for both J and L instead of blocking one off.
        - When having two open columns, deal with it as soon as possible. Over stacking will make things worse by having to wait on even more l shapes.

    -   #### Diagram Legend



The purpose of this is to fulfill user story:
> 


The purpose of this is to fulfill user story:
> 

Custom CSS will be used to make the Website responsive by the use of media queries.

The website will be responsive and the layouts will change dependant on screen size. This is to ensure content flow is appealing,
images are displayed properly and that the content is not shrunk side by side, so small that it is unreadable.
The purpose of this is to fulfill user story:
> As a First Time user, I want to view the game and content clearly on my mobile device.

The 404.html error page will appear in case the page users are looking for cannot be found. It has an error message to let users know something went wrong and a button linked to the home page index.html.
> This let users know they are still on the same website but the page cannot be loaded and they save the option to go back to the home page.

An icon in made with Favicon will be displayed in the browser's tab.
> This let users easily find the page in the browser.

-   ### Design
    -   #### Colour Scheme
        -   The main colours used are: 

    -   #### Typography
        -   
    -   #### Imagery
        -   

    -   #### Wireframes
Home Page<br>
![Home Page Wireframe](/assets/images/Wireframes/)<br>

-   ### Limitations

***
## Features
 
-   ### Existing Features
    - Initial modal with intructions and Play button
    - Game Over modal
    - Play / Pause button
    - Sounds button
    - Next shape display
    - Top score display
    - Actual score display
    - Level display

- Error page (404) to redirect the user back to home page<br>
    ![error-page](/assets/images/Features-images/)<br>

- Icon in the browser tab<br>
    ![browser-tab-icon](/assets/images/Features-images/)<br>

-   ### Features Left to Implement
    - Ghost piece

***

## Technologies

* HTML
	* This project uses HTML as the main language used to complete the structure of the Website.
* CSS
	* This project uses custom written CSS to style the Website.
* JavaScript
    * This project is interactive with the help of JavaScript
* [Font Awesome](https://fontawesome.com/)
	* Font awesome Icons are used for the Social media links contained in the Footer section of the website and for the benefits found on the index.html page.
* [Google Fonts](https://fonts.google.com/)
	* Google fonts are used throughout the project to import the *Spectral* and *Lora* fonts.
* [Gitpod](https://gitpod.io/)
	* Gitpod is the tool used to develop the Website.
* [GitHub](https://github.com/)
	* GithHub is the hosting site used to store the source code for the Website and [Git Pages](https://pages.github.com/) is used for the deployment of the live site.
* [Git](https://git-scm.com/)
	* Git is used as version control software to commit and push code to the GitHub repository where the source code is stored.
* [Pixlr](https://pixlr.com/)
	* Pixlr is used to reduce the file sizes of images before being deployed to reduce storage and bandwith.
* [Google Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools)
	* Google chromes built in developer tools are used to inspect page elements and help debug issues with the site layout and test different CSS styles.
* [balsamiq Wireframes](https://balsamiq.com/wireframes/)
	* This was used to create wireframes for 'The Skeleton Plane' stage of UX design.
* [Coolors](https://coolors.co/)
    * This was used to select color palette. 
* [Techsini](http://techsini.com/multi-mockup/index.php)
    * tecnisih.com Multi Device Website Mockup Generator was used to create the Mock up image in this README.
* [Favicon](https://favicon.io/)
    * This was used to generate the icon on browser's tab.
* [KeyCode](https://keycode.info/)
    * Keycode website was used to get the arrow key codes to move the tetrominoes on the game board
***

## Testing

-   ### Test Strategy 

    -   #### Summary 

        - shapes hit the floor
        - shapes hit left wall
        - shapes hit right wall
        - shapes hit another shape
        - clocwise rotate
        - anti-clockwise rotate
        - shapes hit walls or another shapes when rotate
        - shape soft drop
        - shape hard drop
        - play / pause
        - modal pop-up
        - modal play button
        - game over modal pop-up
        - score adding up and display
        - top score saved on local storage display
        - top score update
        - level update

    -   ### Test Results

    - All Pages were run through the [W3C HTML Validator](https://validator.w3.org/) and showed no errors.<br>
    ![html-validation](/assets/images/HTML-CSS-Validators/html-validation-1.JPG)<br>
    ![html-validation](/assets/images/HTML-CSS-Validators/html-validation-2.JPG)<br>

    - CSS Stylesheet was run through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) and showed no errors.<br>
    ![css-validation](/assets/images/HTML-CSS-Validators/css-validation.JPG)<br>

    - Website was tested by running locally and tested on the deployed version on three different browsers:
        - Google Chrome: 
        - Opera: 
        - Mozilla Firefox: <br>
    - Test header's logo to redirect to index.html (on all pages) - worked as expected on all tested browsers


*  
### Issues and Resolutions to issues found during testing
- Tetrominoes where passing through the bottom of the board:
    - They were freezing at higher positions if manually set but when the setting was last row of the grid they were just passing down. <br>
    I had to set a flag into freezeTetromino() and pass the return to moveDown() as condition to change the current position.

- Tetromino rotation was changing the randomly selected shape to the same one after first rotation
    - I had to refactor and return three values from the randomTetromino() function:
        - currentTetrominoShape - the piece placed on the gameboard
        - randomShape - the piece randomly selected in the pieces array (theTetrominoes)
        - randomRotation - the rotation of the tetromino when it is spawned
    and destructure this in new variables to be used to redraw the same shape with a different rotation.

- Removing full rows to add score in addScore() function :
    - refactor variable square from const to let and assign an Array.from() grid childNodes to be able to slice() the full rows and add the same number of rows at the top of the grid so it won't appear smaller

- When a tetromino was rotated between a wall and another block, it was kicked away from the wall but overlapped other block and locked in place:
    - isTaken() function was implemented to check overlapping blocks when rotate
    - also the same method was integrated into checkRotatedPosition() function to check overlapping blocks when tetrominoes hit the walls
***
## Deployment

-   ### Project Creation

-   ### Using Github Pages
1.

-   ### Run Locally
1.

***
## Credits
-   ### Code
    - The code for tetromino rotation at the edge of the board (left / right) was taken from [Ania Kubow](https://github.com/kubowania/Tetris-Basic/blob/a5b4d2bb17ca01234f23803c8fe86ee893b4bd45/app.js#L152)
   

-   ### Content
    - The game is developed based on some rules found on [tetris wiki](https://tetris.fandom.com/wiki/Tetris_Wiki):
        - bricks color
        - movement
        - rotation

-   ### Media
    - 

-   ### Acknowledgements
    - I'd like to thank my mentor Daisy McGirr for her guidance throughout my project.<br>
