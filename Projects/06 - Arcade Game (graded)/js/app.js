/* 
 * Classes & Functions
 */
// Active Character - Parent class
class ActiveCharacter {
    constructor(sprite, x, y) {
        // Set image and (x,y) coordinates for the character
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Update the character's position
    // Parameter: dt, a time delta between ticks    
    update(dt) {
        // This metod will be implemented directly in each child class since it
        // going o be different between them 
    }

    // Draw the active character on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies the player must avoid - Active Character's child class
class Enemy extends ActiveCharacter {
    constructor(sprite, x, y, speed) {
        // Call parent constructor
        super(sprite, x, y);
        // Set this enemy's speed value (random)
        this.speed = speed;
    }

    // Enermy's position update
    update(dt) {
        if (this.x < (canvas.width * ENEMY_X_CAP_FACTOR))
            this.x += this.speed * dt;
        else{
            // Reset x-coordinate to place the enemy off screen
            this.x = OFF_SCREEN_OFFSET;
            // Calculate a random y-cooridnate reset for this enemy
            this.y = Math.random() * ENEMY_Y_CAP + ENEMY_Y_OFFSET;
        }

        // Check if a collision exists between the player and the enemies characters
        checkCollision();
    }
    
    // Draw the enemy on the screen
    render() {
        super.render();
    }
}

// Player character - Active Character's child class
class Player extends ActiveCharacter {
    constructor(sprite, x, y, speed = PLAYER_SPEED) {
        // Call parent constructor
        super(sprite, x, y);
        // Set the player's speed value (constant)
        this.speed = speed;
    }

    // Player's position update
    update(dt) {
        // The player's position only updates with the canvas, which
        // happens when a change-direction input is given by the user
    }
    
    // Draw the enemy on the screen
    render() {
        super.render();
    }

    // Handle the player's movement based on the change-direction input given by the user
    handleInput(direction) {
        switch (direction) {
            case 'left':
                // Check current x-position, then assign proper new x-coordinate
                if (this.x > 0)
                    this.x -= this.speed;
                else
                    // Allow user to move player along the x-axis without stopping
                    this.x = PLAYER_X_CAP;
                break;
            case 'right':
                // Check current x-position, then assign proper new x-coordinate
                if (this.x < PLAYER_X_CAP)
                    this.x += this.speed;
                else
                    // Allow user to move player along the x-axis without stopping
                    this.x = 0;
                break;
            case 'up':
                // Check current y-position, then assign proper new y-coordinate
                if (this.y < WATER_INIT_Y)
                    // Resets player's to its starting position each time it gets to the water
                    this.reset();
                else
                    this.y -= this.speed;
                break;
            case 'down':
                // Check current y-position, then assign proper new y-coordinate
                if (this.y < PLAYER_INIT_Y)
                    this.y += this.speed;
        }
    }
    
    // Player reset back to original position
    reset() {
        this.x = PLAYER_INIT_X;
        this.y = PLAYER_INIT_Y;
    }
}

// Check for possible collisions between the player and the enemies
var checkCollision = function() {
    // If the player reachs any enemy proximity by 40px in any directions,
    // reset the player to it's initial position (coordinates)
    for (let i = 0; i < allEnemies.length; i++)
        if (Math.abs(player.x - allEnemies[i].x) <= COLLISION_FACTOR)
            if (Math.abs(player.y - allEnemies[i].y) <= COLLISION_FACTOR)
                player.reset();
};




/* 
 * Global variables declaration
 */
 // Constants used to avoid 'magic numbers' within the code
const   OFF_SCREEN_OFFSET = -2,
        NUM_ENEMY_CAP = 6,
        ENEMY_SPEED_CAP = 256,
        ENEMY_Y_CAP = 185,
        ENEMY_X_CAP_FACTOR = 0.99,
        ENEMY_Y_OFFSET = 50,
        PLAYER_SPEED = 50,
        PLAYER_INIT_X = 200,
        PLAYER_INIT_Y = 400,
        WATER_INIT_Y = 40,
        PLAYER_X_CAP = 400,
        COLLISION_FACTOR = 40;

let allEnemies = [];            // Array grouping all the enemies
// Instantiate a player character
let player = new Player('images/char-boy.png', PLAYER_INIT_X, PLAYER_INIT_Y);
// Instantiate all the enemy characters
for (let i = 0; i < NUM_ENEMY_CAP; i++) {
    let enemy = new Enemy('images/enemy-bug.png', OFF_SCREEN_OFFSET, Math.random() * ENEMY_Y_CAP + ENEMY_Y_OFFSET, Math.random() * ENEMY_SPEED_CAP);
    allEnemies.push(enemy);
}




/* 
 * Event Listeners
 */
// This listens for key presses by the user, and it sends the keys to
// the player.handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
