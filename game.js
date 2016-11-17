/**
 * Created by bryansolomon on 7/26/16.
 */

$(document).ready(function () {

    var DIRECTIONS = {
        LEFT: {value: 1},
        RIGHT: {value: 0},
        DOWN: {value: 1.5},
        UP: {value: .5}
    };

    DIRECTIONS.LEFT.opposite = DIRECTIONS.RIGHT.value;
    DIRECTIONS.RIGHT.opposite = DIRECTIONS.LEFT.value;
    DIRECTIONS.UP.opposite = DIRECTIONS.DOWN.value;
    DIRECTIONS.DOWN.opposite = DIRECTIONS.UP.value;

    renderBoard();
    
    var game = $("#game").get(0);
    console.log("Game width and height:", game.width, game.height);
    
    var gameContext = game.getContext("2d");

    var pacman = new Pacman(15, "Yellow");
    
    var elements = [pacman];

    function renderContent() {
        elements.forEach(function (element) {
            gameContext.beginPath();

            gameContext.fillStyle = element.fillStyle;

            gameContext.translate(element.x, element.y);
            gameContext.rotate(-element.direction.value * Math.PI);
            gameContext.translate(-element.x, -element.y);

            gameContext.arc(element.x, element.y, element.radius, element.startAngle * Math.PI, element.stopAngle * Math.PI, false);
            gameContext.lineTo(element.x, element.y);

            gameContext.fill();

            gameContext.closePath();
        })
    }

    function animationLoop() {
        /* reset the canvas */
        game.width = game.width;
        /* paint the canvas */
        renderContent();

        /* update pacman for next iteration */

        if (pacman.proposedDirection) {
            var updated = false;

            /* is the user trying to turn? */
            if (pacman.proposedDirection.value !== pacman.direction.value) {
                updateMotion(pacman.proposedDirection.value);
                if (isCollision()) {
                    /* can't turn that way, undo the motion */
                    updateMotion(pacman.proposedDirection.opposite);
                } else {
                    pacman.direction = pacman.proposedDirection;
                    updated = true;
                    pacman.isMoving = true;
                }
            }

            /* did the user turn? */
            if (!updated) {
                updateMotion(pacman.direction.value);
                if (isCollision()) {
                    /* can't proceed on in current direction, undo the motion */
                    updateMotion(pacman.direction.opposite);
                    pacman.isMoving = false;
                } else {
                    pacman.isMoving = true;
                }
            }

            /* check wrap around */
            if (pacman.x - pacman.radius > game.width) { // did the user go off the screen left?
                pacman.x = pacman.radius;
                pacman.direction = DIRECTIONS.RIGHT;
                pacman.proposedDirection = DIRECTIONS.RIGHT;
            } else if (pacman.x + pacman.radius < 0) { // did the user go off the screen right?
                pacman.x = game.width - 0;
                pacman.direction = DIRECTIONS.LEFT;
                pacman.proposedDirection = DIRECTIONS.LEFT;
            }

            /* update mouth */
            if (pacman.isMoving) {
                if (pacman.mouthClosing) {
                    pacman.startAngle -= .05;
                    pacman.stopAngle += .05;
                    pacman.mouthClosing = pacman.startAngle > 0.05;
                } else {
                    pacman.startAngle += .05;
                    pacman.stopAngle -= .05;
                    pacman.mouthClosing = pacman.startAngle > .20;
                }
            }
        }

        /* end update pacman */
    }

    function updateMotion(direction) {
        switch (direction) {
            case DIRECTIONS.RIGHT.value:
                pacman.x += 3;
                break;
            case DIRECTIONS.LEFT.value:
                pacman.x -= 3;
                break;
            case DIRECTIONS.DOWN.value:
                pacman.y += 3;
                break;
            case DIRECTIONS.UP.value:
                pacman.y -= 3;
                break;
        }
    }

    /* check collisions */
    function isCollision() {
        /* using a try-catch because there is no break statement in a JS for-each :( */
        try {
            wallPieces.forEach(function (piece) {
                if (!(pacman.x + pacman.radius < piece.x) && // pacman too far right?
                    !(piece.x + piece.width < pacman.x - pacman.radius) && // pacman too far left?
                    !(pacman.y + pacman.radius < piece.y) && // pacman too low?
                    !(piece.y + piece.height < pacman.y - pacman.radius)) { // pacman too high?
                    console.log("Collision!");
                    throw new Error(); // collision
                }
            });
            return false;
        } catch (e) {
            return true;
        }
    }

    window.addEventListener('keydown', doKeyDown, true);

    function doKeyDown(evt) {
        /* want to allow arrow keys or a-s-d-f controls */
        switch (evt.keyCode) {
            case 38:	// UP Arrow Key pressed
                evt.preventDefault();
            case 87:	// W pressed
                pacman.proposedDirection = DIRECTIONS.UP;
                break;
            case 40:	// DOWN Arrow Key pressed
                evt.preventDefault();
            case 83:	// S pressed
                pacman.proposedDirection = DIRECTIONS.DOWN;
                break;
            case 37:	// LEFT Arrow Key pressed
                evt.preventDefault();
            case 65:	// A pressed
                pacman.proposedDirection = DIRECTIONS.LEFT;
                break;
            case 39:	// RIGHT Arrow Key pressed
                evt.preventDefault();
            case 68:	// D pressed
                pacman.proposedDirection = DIRECTIONS.RIGHT;
                break;
            case 32:	// SPACE pressed -> pause
                evt.preventDefault();
                // TODO: pause the game
                break;
        }
    }

    setInterval(animationLoop, 30);

    function Pacman(radius, fillStyle) {
        this.startAngle = .25;
        this.stopAngle = 1.75;
        this.mouthClosing = true;
        this.x = 20 + radius;
        this.y = 20 + radius;
        this.radius = radius;
        this.direction = DIRECTIONS.RIGHT;
        this.proposedDirection = null;
        this.isMoving = false;
        this.fillStyle = fillStyle;
    }

});