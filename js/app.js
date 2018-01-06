// Enemies our player must avoid
var Enemy = function(x, y, speed, startX) {
    this.x = x || -100; // Initial position
    this.y = y || 60;
    this.speed = speed || 50; // Enemy moving speed
    // Use random starting x position to decrease predictability
    this.startX = startX || -100;
    this.sprite = 'images/enemy-bug.png'; // Enemy image
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt * this.speed;
    if (this.x > 505) { this.x = this.startX; }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player {
    constructor(person = 'images/char-boy.png') {
        this.x = 202; // Initial position
        this.y = 380;
        this.person = person; // Character's image file name
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.person), this.x, this.y);
    }

    update() {

    }

    // Change positions according to keyboard input
    handleInput(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x = this.x - 101;
        } else if (direction === 'up' && this.y > 0) {
            this.y = this.y - 83;
        } else if (direction === 'right' && this.x < 404) {
            this.x = this.x + 101;
        } else if (direction === 'down' && this.y < 380) {
            this.y = this.y + 83;
        }
    }
}

/* Add character and selector images. */
const charImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
const selectImage = 'images/Selector.png';
class Selector {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.img = selectImage;
    }

    render() {
        /* Draw characters images on the screen. */
        if (!isStarted) {
            for (let col = 0; col < 5; col++)
            {
                ctxChar.drawImage(Resources.get(charImages[col]), col * 101, 5);
            }
            /* Draw selector image behind characters. */
            ctxChar.globalCompositeOperation='destination-over';
        }
        ctxChar.drawImage(Resources.get(this.img), this.x, this.y);
    }

    handleInput(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x = this.x - 101;
        } else if (direction === 'right' && this.x < 404) {
            this.x = this.x + 101;
        }
    }
}


// Generate enemies with random number, speed and starting x-coordinate
let allEnemies = [];
let enemyNum = Math.floor(Math.random() * 3) + 5;
for (let i = 0; i < enemyNum; i++) {
    let x = -Math.floor(Math.random() * 1000) - 100,
        y = (i % 3) * 83 + 60,
        speed = Math.floor(Math.random() * 200) + 250;
    allEnemies.push(new Enemy(x, y, speed, x));
}

const player = new Player();
const selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (isStarted) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
});
