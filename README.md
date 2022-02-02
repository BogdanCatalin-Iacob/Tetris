## Table of Contents
* [Purpose](#Purpose)
* [User Experience Design (UX)](#User-Experience-Design)
  * [User stories](#User-Stories)
    * [First Time Visitor Goals](#First-Time-Visitor-Goals)
    * [Returning Visitor Goals](#Returning-Visitor-Goals)
    * [Frequent User Goals](#Frequent-User-Goals)
  * [Structure](#Structure)
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
        1. 

    -   #### Returning Visitor Goals
        1. 

    -   #### Frequent User Goals
        1. 

-   ### Structure

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