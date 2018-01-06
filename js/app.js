"use strict";

// Parent class of Enemy, Player and Selector
class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite; // Character's image
    }

    // Draw the character on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(x, y, speed, startX, sprite = 'images/enemy-bug.png') {
        super(x, y, sprite);
        this.speed = speed; // Enemy's moving speed
        this.startX = startX; // Use random starting x position to decrease predictability
    }

    render() {
        super.render();
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + dt * this.speed;
        if (this.x > 505) {
            this.x = this.startX;
        }
    }
}

class Player extends Character {
    constructor(x = 202, y = 380, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
    }

    render() {
        super.render();
    }

    /* Change positions according to keyboard input */
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

    /* Check if the player collides with any enemy. */
    checkCollisions() {
        allEnemies.forEach((enemy) => {
            let xDiff = this.x - enemy.x;
            let yDiff = enemy.y - this.y;
            if (Math.abs(xDiff) < 65 && yDiff < 83 && yDiff > 0) {
                this.reset();
            }
        });
    }

    /* Check if the player touches the water. */
    checkWinning() {
        if (this.y < 48) {
            document.getElementsByClassName('winning-screen')[0].style.display = 'table';
            document.getElementsByClassName('mask')[0].style.display = '';
            document.getElementsByClassName('mask')[0].style.height = '545px';
        }
    }

    /* Reset player's position and other initial settings. */
    reset() {
        this.x = 202;
        this.y = 380;
        document.getElementsByClassName('winning-screen')[0].style.display = 'none';
        document.getElementsByClassName('mask')[0].style.height = '660px';
        document.getElementsByClassName('mask')[0].style.display = '';
        document.getElementsByClassName('start-screen')[0].style.display = 'table';
        isStarted = false;
    }

    /* Update character image according to selector. */
    updateChar() {
        if (selector.x === 0) {
            this.sprite = 'images/char-boy.png';
        } else if (selector.x === 101) {
            this.sprite = 'images/char-cat-girl.png';
        } else if (selector.x === 202) {
            this.sprite = 'images/char-horn-girl.png';
        } else if (selector.x === 303) {
            this.sprite = 'images/char-pink-girl.png';
        } else {
            this.sprite = 'images/char-princess-girl.png';
        }
    }
}

const charImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
class Selector extends Character {
    constructor(x = 0, y = 0, sprite = 'images/Selector.png') {
        super(x, y, sprite);
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
        ctxChar.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x = this.x - 101;
        } else if (direction === 'right' && this.x < 404) {
            this.x = this.x + 101;
        }
    }
}


const allEnemies = [];
const player = new Player();
const selector = new Selector();

// Generate enemies with random number, speed and starting x-coordinate
function generateEnemies() {
    allEnemies.length = 0;
    let enemyNum = Math.floor(Math.random() * 3) + 5;
    for (let i = 0; i < enemyNum; i++) {
        let x = -Math.floor(Math.random() * 1000) - 100,
            y = (i % 3) * 83 + 60,
            speed = Math.floor(Math.random() * 200) + 250;
        allEnemies.push(new Enemy(x, y, speed, x));
    }
}


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
