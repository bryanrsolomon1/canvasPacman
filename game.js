/**
 * Created by bryansolomon on 7/26/16.
 */

var game;

$(document).ready(function () {
    game = new Game();
});

function Game() {

    var self = this;

    this.Sound = {
        play: function (sound) {
            var audio = document.getElementById(sound);
            (audio !== null) ? audio.play() : console.error(sound + " not found");
        }
    };

    board.init();

    var $game = $("#game").get(0);

    var gameContext = $game.getContext("2d");

    this.paused = false;

    this.width = $game.width;

    this.togglePause = function() {
        self.paused = !self.paused;
    };

    var characters = [pacman, blinky, inky, clyde, pinky];

    function renderContent() {
        characters.forEach(function (element) {
            gameContext.save();
            element.paint(gameContext);
            gameContext.restore();
        })
    }

    function animationLoop() {
        if (!self.paused) {
            /* reset the canvas */
            $game.width = $game.width;
            /* paint the canvas */
            renderContent();

            characters.forEach(function (character) {
                character.move();
            });
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
                self.togglePause();
                break;
        }
    }

    setInterval(animationLoop, 30);
    // self.showMessage("Testing", "Seriously just testing");

    this.reset = function () {
        characters.forEach(function (character) {
            character.reset();
        });
        board.init();
    };

    this.showMessage = function (title, text) {
        // this.timer.stop();
        self.paused = true;
        $('#canvas-overlay-container').fadeIn(200);
        // if ($('.controls').css('display') != "none") $('.controls').slideToggle(200);
        $('#canvas-overlay-content #title').text(title);
        $('#canvas-overlay-content #text').html(text);
    };

    this.closeMessage = function () {
        $('#canvas-overlay-container').fadeOut(200);
        // $('.controls').slideToggle(200);
    };
}