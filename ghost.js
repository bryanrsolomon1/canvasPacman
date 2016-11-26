/**
 * Created by bryansolomon on 11/18/16.
 */
function Ghost(name, x, y, myAlgorithm, myCircle, myTerritoryFunc) {
    var self = this;
    this.startX = board.grid.length * x;
    this.startY = board.grid.length * y;
    this.x = this.startX;
    this.y = this.startY;
    this.height = 30;
    this.width = 30;
    this.name = name;
    this.image = document.getElementById(name);
    this.type = "Ghost";
    // this.startGrid = myCircle[0];
    // this.nextGrid = this.startGrid;
    this.direction = DIRECTIONS.UP;
    this.myAlgorithm = myAlgorithm;
    this.myCircle = myCircle;
    this.isMyTerritory = myTerritoryFunc;
    
    this.paint = function (context) {
        context.drawImage(self.image, self.x, self.y, self.width, self.height);
    };
    
    this.move = function () {
        if (!Motion.isInFlight(self)) {
            var myGrid = calculateGrid(self);
            var pacmanGrid = calculateGrid(pacman);
            if (!self.isMyTerritory(pacmanGrid)) {
                pacmanGrid = doMyCircle(myGrid);
            }
            var path = new self.myAlgorithm().findPath(myGrid[0], myGrid[1], pacmanGrid[0], pacmanGrid[1], new PF.Grid(boardMatrix));
            self.nextGrid = path[1];
            self.direction = calculateMyNextMove(myGrid, self.nextGrid);
        }

        if (self.direction) {
            Motion.moveGhost(self, self.direction);
        }

        function doMyCircle(myGrid) {
            var currentStep = calculateStep(myGrid);
            /* are we somewhere on the circle path already? */
            if (currentStep !== -1) {
                /* if last step of the circle, reset */
                if (currentStep === self.myCircle.length - 1) {
                    return self.myCircle[0];
                } else {
                    return self.myCircle[currentStep + 1];
                }
            } else {
                /* not on the circle, lets start at the top */
                return self.myCircle[0];
            }
        }

        function calculateStep(myGrid) {
            var result = -1;
            try {
                self.myCircle.forEach(function (step, index) {
                    if (myGrid[0] === step[0] && myGrid[1] === step[1]) {
                        result = index;
                    }
                })
            } catch (e) {
                // do nothing
            }
            return result;
        }
    };

    this.reset = function () {
        self.x = self.startX;
        self.y = self.startY;
        self.nextGrid = null;
        // this.ghostHouse = true;
        // this.undazzle();
    }
}