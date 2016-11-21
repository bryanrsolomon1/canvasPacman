/**
 * Created by bryansolomon on 7/26/16.
 */

var game;

$(document).ready(function () {
    game = new Game();
});

function Game() {

    var self = this;

    this.Sound = new Sound();

    this.Score = new Score();

    board.init();

    var $game = $("#game").get(0);

    var gameContext = $game.getContext("2d");

    this.paused = true; // start the game paused

    this.width = $game.width;

    this.togglePause = function () {
        self.paused = !self.paused;
        if (self.paused) {
            self.showMessage("Paused", "Press Space bar to resume");
        } else {
            self.closeMessage();
        }
    };

    var characters = [pacman, blinky, inky, clyde, pinky];

    renderContent(); // paint the characters once in the beginning manually

    showModal("Welcome");

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

    setInterval(animationLoop, 30);

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

    function Sound() {
        this.play = function(sound) {
            var audio = document.getElementById(sound);
            (audio !== null) ? audio.play() : console.error(sound, "not found");
        }
    }

    function Score() {
        this.score = 0;
        this.set = function (i) {
            this.score = i;
            $("#score").text(this.score);
        };
        this.add = function (i) {
            this.set(this.score + i);
        };
    }
}