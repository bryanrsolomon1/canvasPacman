/**
 * Created by bryansolomon on 11/18/16.
 */
var pacman = new Pacman();

function Pacman() {
    var self = this;
    this.startAngle1 = .25;
    this.startAngle2 = 1.75;
    this.angle1 = this.startAngle1;
    this.angle2 = this.startAngle2;
    this.mouthClosing = true;
    this.radius = 15;
    this.startX = 10 * board.grid.length + this.radius + 2;
    this.startY = 11 * board.grid.length + this.radius + 2;
    this.x = this.startX;
    this.y = this.startY;
    this.startDirection = DIRECTIONS.RIGHT;
    this.direction = this.startDirection;
    this.proposedDirection = null;
    this.isMoving = false;
    this.fillStyle = "Yellow";
    this.move = function () {
        if (self.dead) {
            this.dieAnimation();
        } else {
            var updated = false;
            /* is the user trying to turn? */
            if (self.proposedDirection && self.proposedDirection.value !== self.direction.value) {
                if (Motion.isValidMotion(self, self.proposedDirection)) {
                    Motion.movePacman(self, self.proposedDirection);
                    self.direction = self.proposedDirection;
                    self.proposedDirection = null;
                    updated = true;
                }
            }

            /* did the user turn in the code above? */
            if (!updated) {
                if (Motion.isValidMotion(self, self.direction)) {
                    Motion.movePacman(self, self.direction);
                } else {
                    self.isMoving = false;
                }
            }

            var collider = Motion.collision(self);

            if (collider) {
                switch (collider.type) {
                    case "Wall":
                        break;
                    case "Edible.Pill":
                        game.Sound.play("waka");
                        game.Score.add(10);
                        board.removeEdible(collider);
                        break;
                    case "Edible.PowerPill":
                        // Sound.play("powerpill");
                        break;
                    case "Edible.Text":
                        board.removeEdible(collider);
                        game.togglePause();
                        showModal(collider.words);
                        break;
                    case "Ghost":
                        self.die();
                        break;
                }
            }

            /* update mouth */
            if (self.isMoving) {
                if (self.mouthClosing) {
                    self.angle1 -= .05;
                    self.angle2 += .05;
                    self.mouthClosing = self.angle1 > 0.05;
                } else {
                    self.angle1 += .05;
                    self.angle2 -= .05;
                    self.mouthClosing = self.angle1 > .20;
                }
            }
        }
    };

    this.paint = function (context) {
        context.beginPath();

        context.fillStyle = self.fillStyle;

        context.translate(self.x, self.y);
        context.rotate(-self.direction.value * Math.PI);
        context.translate(-self.x, -self.y);

        context.arc(self.x, self.y, self.radius, self.angle1 * Math.PI, self.angle2 * Math.PI, false);
        context.lineTo(self.x, self.y);

        context.fill();

        context.closePath();
    };

    this.die = function () {
        self.dead = true;
        self.isMoving = false;
        game.Sound.play("die");
        game.Lives.add(-1);
    };

    this.dieAnimation = function () {
        self.angle1 += 0.05;
        self.angle2 -= 0.05;
        if (self.angle1 >= 1 || self.angle2 <= 1) {
            self.dieFinal();
        }
    };

    this.dieFinal = function () {
        game.reset();
        // self.lives--;
        // if (this.lives <= 0) {
        //     var input = "<div id='highscore-form'><span id='form-validater'></span><input type='text' id='playerName'/><span class='button' id='score-submit'>save</span></div>";
        //     game.showMessage("Game over", "Total Score: " + game.score.score + input);
        //     game.gameOver = true;
        //     $('#playerName').focus();
        // }
        // game.drawHearts(this.lives);
    };

    this.reset = function () {
        self.dead = false;
        self.x = self.startX;
        self.y = self.startY;
        self.angle1 = self.startAngle1;
        self.angle2 = self.startAngle2;
        self.mouthClosing = true;
        self.direction = self.startDirection;
    };
}