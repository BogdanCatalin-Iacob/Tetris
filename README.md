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
        1. I want my high score to be saved for next time I play

    -   #### Frequent User Goals
        1. 

-   ### Structure

    -   #### General Information
        - The website will have two pages. The main page will display the Tetris game and the secondary page will be a 404 error page.
        - The largest part of the tetrion consists of the playfield measuring ten spaces across by twenty spaces down. It has other parts explained below.
        - Randomly selected tetrominoes, or shapes consisting of four square blocks, fall from the top of the playfield one at a time. Each tetromino enters the playfield with a given orientation and color depending on its shape. Part of the tetrion, called the piece preview, shows the next pieces that will enter the playfield.
        - The player can rotate the falling tetromino ninety degrees at a time within the plane of the playfield by pressing the clockwise rotation button (Arrow Up) if the piece has room to rotate.
        - The player can shift the falling tetromino sideways one space at a time by pressing the left or right arrow. Pieces cannot shift through walls or other blocks.
        - Each tetromino moves downward slowly by itself. Generally a player can use some method to "drop" the tetromino, or make it move downward faster. Once the tetromino lands on the floor or other blocks, the piece will delay shortly before locking in which time the player can move it. After locking, a player can no longer move the tetromino.
        - When a tetromino locks and by doing so fills all empty spaces within one or more rows of the playfield, those full rows will clear. Remaining blocks above will move down by as many rows removed.
        - If the playfield has not filled up with blocks, the next piece enters.

    -   #### List Of Rules
        - Playfield is 10 columns x 20 rows.
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
        - Use of half second lock delay

    -   #### Game Mechanics

    -   #### Methods Of PLay

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
- 

- Error page (404) to redirect the user back to home page<br>
    ![error-page](/assets/images/Features-images/)<br>

- Icon in the browser tab<br>
    ![browser-tab-icon](/assets/images/Features-images/)<br>

-   ### Features Left to Implement
    - 

***

## Technologies

* HTML
	* This project uses HTML as the main language used to complete the structure of the Website.
* CSS
	* This project uses custom written CSS to style the Website.
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
        - shapes hit walls or another shapes when rotate

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
   

-   ### Content
    - 

-   ### Media
    - 

-   ### Acknowledgements
    - I'd like to thank my mentor Daisy McGirr for her guidance throughout my project.<br>