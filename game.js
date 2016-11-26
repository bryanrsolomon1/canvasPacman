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

    this.Lives = new Lives();

    this.newGame = newGame;
    this.gameOver = gameOver;

    board.init();

    var $game = $("#game").get(0);

    var gameContext = $game.getContext("2d");

    this.paused = true;

    this.width = $game.width;

    this.togglePause = togglePause;

    var characters = [pacman, blinky, inky, clyde, pinky];

    renderContent(); // paint the characters once in the beginning manually

    showModal("Welcome", function () {
        self.newGame();
    });

    function renderContent() {
        characters.forEach(function (element) {
            gameContext.save();
            element.paint(gameContext);
            gameContext.restore();
        })
    }

    function animationLoop() {
        /* reset the canvas */
        $game.width = $game.width;
        /* paint the canvas */
        renderContent();

        characters.forEach(function (character) {
            character.move();
        });
    }

    var run;

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
    };

    this.showMessage = function (title, text) {
        $('#canvas-overlay-container').fadeIn(200);
        $('#canvas-overlay-content #title').text(title);
        $('#canvas-overlay-content #text').html(text);
    };

    this.closeMessage = function () {
        $('#canvas-overlay-container').fadeOut(200);
    };

    this.closeMessage(); // start the game with message hidden

    function newGame() {
        self.Score.set(0); // init
        self.Lives.set(3); // init
        self.Sound.play("theme");
        self.themeSong = true;
        setTimeout(function () {
            self.themeSong = false;
            self.togglePause();
        }, 4000);
    }

    function gameOver() {
        self.togglePause("Game over", "Final score: " + self.Score.score +
            "<br><br>Press Space Bar to Play Again");
        self.Score.set(0);
        self.Lives.set(3);
        self.reset();
        board.init();
    }

    function togglePause(title, text) {
        if (!modalShowing && !self.themeSong) {
            self.paused = !self.paused;
            if (self.paused) {
                clearInterval(run);
                self.showMessage(title ? title : "Paused", text ? text :"Press Space bar to resume");
            } else {
                run = setInterval(animationLoop, 30);
                self.closeMessage();
            }
        }
    }

    function Sound() {
        var self = this;
        this.muted = false;
        this.play = function (sound) {
            if (!self.muted) {
                var audio = document.getElementById(sound);
                (audio !== null) ? audio.play() : console.error(sound, "not found");
            }
        };
        $("#mute-button").on('click', function () {
            if (self.muted) {
                self.muted = false;
                $(this).removeClass("fa-volume-off");
                $(this).addClass("fa-volume-up");
            } else {
                self.muted = true;
                $(this).removeClass("fa-volume-up");
                $(this).addClass("fa-volume-off");
            }
        });
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

    function Lives() {
        this.lives = 0;
        this.set = function (i) {
            this.lives = i;
            var html = "";
            for (var j = 0; j < i; j++) {
                html += "<i class='fa fa-heart fa-2x'></i>";
            }
            $("#lives").html(html);
            if (i === 0) {
                self.gameOver();
            }
        };
        this.add = function (i) {
            this.set(this.lives + i);
        };
    }
}