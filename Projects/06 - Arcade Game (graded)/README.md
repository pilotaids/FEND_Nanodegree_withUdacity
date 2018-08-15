# Frogger Game: Getting Started
Play my Frogger-Demo game by lunching the `index.html` file in the main game directory.

## Basic Functionality
In this game you control a Player that needs to reach the water without getting caught by the Enemies (the ugly bugs). 

The user can only control the player left, right, up and down movement, but not the speed. Don't worry, directional control should be more than enough for you to reach the water and win.

The enemies will appear at different vertical positions on the pavement with a random initial speed and y-coordinates, but they will be moving always in one direction (left-to-right) and at the constant initial-random speed.

If you happen to crush in one of the bugs, the game will reset, and the player will go back to it's initial position.

Once the player reaches the water, you won, and the game reset to play again.


## Development
The game is controlled by 3 differnt `.js` files handling:
 - The game engine --> `js/engine.js`;
 - The resources allocated for the game --> `js/resources.js`;
 - The OOP classes, functions, and variables related to the characters --> `js/app.js`.

The UI has been implemented with some very basic `html` and `css` in the `index.html` and `css/style.css` files rispectively.

### Developer
Marco Rosa - Udacity FEND student