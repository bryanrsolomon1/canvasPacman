/**
 * Created by bryansolomon on 7/26/16.
 */

var resume = new Resume();

function Resume() {

    var self = this;

    var canvas = $("#resume-animation-canvas").get(0);

    var context = canvas.getContext("2d");

    var resumePacman = new Pacman();
    var resumeBlinky = new Ghost("blinky", 0, 0);
    var resumeInky = new Ghost("inky", 0, 0);
    var resumePinky = new Ghost("pinky", 0, 0);
    var resumeClyde = new Ghost("clyde", 0, 0);
    var powerPill = new Pill(0, 0);

    var characters = [resumePacman, resumeBlinky, resumeInky, resumePinky, resumeClyde, powerPill];

    var run;

    reset(); // initial setup

    function renderContent() {
        characters.forEach(function (element) {
            context.save();
            element.paint(context);
            context.restore();
        });
    }

    function animationLoop() {
        /* reset the canvas */
        canvas.width = canvas.width;
        /* paint the canvas */
        renderContent();

        characters.forEach(function (character) {
            move(character);
        });
    }

    this.start = function () {
        setTimeout(function() {
            run = setInterval(animationLoop, 30);
        }, 10000);
    };

    this.stop = function () {
        clearInterval(run);
        reset();
    };

    var turned = false;
    var turnedGhosts = false;
    var hasReset = false;

    /* crazy animation switch case */
    function move(character) {
        switch (character.type) {
            case "Pacman":
                if (character.x < 525 && !turned) {
                    character.x += 3;
                } else if (character.x > -character.radius) {
                    if (!turned) {
                        turned = true;
                        characters.splice(characters.indexOf(powerPill), 1); // eat the pill
                    }
                    resumePacman.direction = DIRECTIONS.LEFT;
                    character.x -= 4;
                } else {
                    if (!hasReset) {
                        hasReset = true;
                        setTimeout(reset, 10000);
                    }
                }
                /* update mouth */
                if (resumePacman.mouthClosing) {
                    resumePacman.angle1 -= .05;
                    resumePacman.angle2 += .05;
                    resumePacman.mouthClosing = resumePacman.angle1 > 0.05;
                } else {
                    resumePacman.angle1 += .05;
                    resumePacman.angle2 -= .05;
                    resumePacman.mouthClosing = resumePacman.angle1 > .20;
                }
                break;
            case "Ghost":
                if (!turned) {
                    character.x += 3;
                } else {
                    if (!turnedGhosts) {
                        turnGhosts();
                    }
                    character.x -= 3;
                }
                break;
        }
    }

    function turnGhosts() {
        turnedGhosts = true;
        resumeBlinky.image = document.getElementById("dazzled-flipped");
        resumeInky.image = document.getElementById("dazzled-flipped");
        resumePinky.image = document.getElementById("dazzled-flipped");
        resumeClyde.image = document.getElementById("dazzled-flipped");
    }

    function reset() {

        canvas.width = canvas.width;

        turned = false;
        turnedGhosts = false;
        hasReset = false;

        var pacmanSeparator = 100;
        var ghostSeparator = 10;

        resumePacman.direction = DIRECTIONS.RIGHT;
        resumePacman.x = -resumePacman.radius;
        resumePacman.y = resumePacman.radius + 5;

        resumeBlinky.image = document.getElementById(resumeBlinky.name);
        resumeBlinky.x = resumePacman.x - pacmanSeparator - (resumeBlinky.width * 2);
        resumeBlinky.y = resumePacman.y - resumePacman.radius;

        resumeInky.image = document.getElementById(resumeInky.name);
        resumeInky.x = resumeBlinky.x - ghostSeparator - (resumeInky.width * 2);
        resumeInky.y = resumePacman.y - resumePacman.radius;

        resumePinky.image = document.getElementById(resumePinky.name);
        resumePinky.x = resumeInky.x - ghostSeparator - (resumePinky.width * 2);
        resumePinky.y = resumePacman.y - resumePacman.radius;

        resumeClyde.image = document.getElementById(resumeClyde.name);
        resumeClyde.x = resumePinky.x - ghostSeparator - (resumeClyde.width * 2);
        resumeClyde.y = resumePacman.y - resumePacman.radius;

        if (characters.indexOf(powerPill) < 0) {
            characters.push(powerPill);
        }
        powerPill.radius = 5;
        powerPill.x = 535;
        powerPill.y = 18;
    }
}