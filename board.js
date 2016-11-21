/**
 * Created by bryansolomon on 7/26/16.
 *
 * I break the board out on its own so that I do not repaint its pieces each iteration. Saves major CPU
 */

/* global on the whole window because game.js needs access to this */
var board = {
    init: init,
    removeEdible: removeEdible,
    grid : {length: 33}
};

function init() {

    board.boardPieces = [];

    board.boardPieces.push(blinky, inky, clyde, pinky);

    var wallPieces = initWalls();

    var pills = initPills();

    wallPieces.forEach(function (piece) {
        board.boardPieces.push(piece);
    });

    pills.forEach(function (pill) {
        board.boardPieces.push(pill);
    });

    board.boardPieces.push(new Text(18, 18, "10px 'Press Start 2P'", "Résumé"));
    board.boardPieces.push(new Text(18, 2, "9px 'Press Start 2P'", "Contact"));
    board.boardPieces.push(new Text(1, 18, "10px 'Press Start 2P'", " About"));

    paintBoard();
    paintEdibles();
}

function initWalls() {
    /* Board built from top down read from left to right */
    return convertPrettyMatrixToWalls(prettyBoardMatrix);
}

function initPills() {
    return convertPrettyMatrixToPills(prettyBoardMatrix);
}

function Wall(x, y, width, height) {
    var self = this;
    this.x = x * board.grid.length;
    this.y = y * board.grid.length;
    this.width = width * board.grid.length;
    this.height = height * board.grid.length;
    this.type = "Wall";
    this.paint = function (context) {
        context.fillStyle = "Blue";
        context.fillRect(self.x, self.y, self.width, self.height);
    }
}

function Text(x, y, font, words) {
    var self = this;
    self.x = x * board.grid.length;
    self.y = y * board.grid.length - board.grid.length / 3;
    self.font = font;
    self.words = words;
    var measurement = $("#edibles").get(0).getContext("2d").measureText(words);
    self.width = measurement.width;
    self.height = 20;
    self.type = "Edible.Text";
    self.paint = function(context) {
        context.font = self.font;
        context.fillText(self.words, self.x, self.y);
    }
}

function Pill(x, y) {
    var self = this;
    this.x = x * board.grid.length + board.grid.length / 2;
    this.y = y * board.grid.length + board.grid.length / 2;
    this.radius = 3;
    this.height = this.radius;
    this.width = this.radius;
    this.startAngle = 0;
    this.stopAngle = 2;
    this.type = "Edible.Pill";
    this.paint = function (context) {
        context.fillStyle = "White";
        context.beginPath();
        context.arc(self.x, self.y, self.radius, self.startAngle * Math.PI, self.stopAngle * Math.PI);
        context.fill();
        context.closePath();
    }
}

function paintBoard() {
    var board$ = $("#board").get(0);
    var boardContext = board$.getContext("2d");

    board$.width = board$.width;

    boardContext.strokeStyle = "Black";

    boardContext.fillRect(0, 0, board$.width, board$.height);

    board.boardPieces.forEach(function (piece) {
        if (piece.type === "Wall") {
            piece.paint(boardContext);
        }
    });
}

function paintEdibles() {
    var edibles = $("#edibles").get(0);
    var ediblesContext = edibles.getContext("2d");

    edibles.width = edibles.width;

    board.boardPieces.forEach(function (piece) {
        if (piece.type.indexOf("Edible") !== -1) {
            piece.paint(ediblesContext);
        }
    });
}

function removeEdible(collider) {
    board.boardPieces.splice(board.boardPieces.indexOf(collider), 1);
    paintEdibles();
}

/*
 22 = empty
 88 = wall
 empty string = pill
 */
var prettyBoardMatrix = [
    [88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88],
    [88, 22, 22, '', '', '', '', '', '', '', 88, '', '', '', '', '', '', '', 22, 22, 88],
    [88, '', 88, 88, '', 88, 88, 88, 88, '', 88, '', 88, 88, 88, 88, '', 88, 88, '', 88],
    [88, '', 88, 88, '', '', '', '', '', '', '', '', '', '', '', '', '', 88, 88, '', 88],
    [88, '', '', '', '', 88, '', 88, 88, 88, 88, 88, 88, 88, '', 88, '', '', '', '', 88],
    [88, '', 88, 88, '', 88, '', '', '', '', 88, '', '', '', '', 88, '', 88, 88, '', 88],
    [88, '', '', '', '', 88, 88, 88, '', 88, 88, 88, '', 88, 88, 88, '', '', '', '', 88],
    [88, 88, 88, '', 88, 88, '', '', '', '', '', '', '', '', '', 88, 88, '', 88, 88, 88],
    [88, 88, 88, '', 88, 88, '', 88, 88, 22, 22, 22, 88, 88, '', 88, 88, '', 88, 88, 88],
    [22, 22, 22, '', '', '', '', 88, 22, 22, 22, 22, 22, 88, '', '', '', '', 22, 22, 22],
    [88, 88, 88, '', 88, 88, '', 88, 88, 88, 88, 88, 88, 88, '', 88, 88, '', 88, 88, 88],
    [88, 88, 88, '', 88, '', '', '', '', '', '', '', '', '', '', 88, 88, '', 88, 88, 88],
    [88, '', '', '', '', '', 88, '', '', 88, '', '', 88, 88, '', 88, '', '', '', '', 88],
    [88, '', 88, 88, 88, '', 88, '', 88, '', '', 88, '', '', '', '', '', 88, 88, '', 88],
    [88, '', '', '', 88, '', 88, 88, '', '', '', 88, '', 88, 88, '', 88, '', '', '', 88],
    [88, '', 88, '', '', '', 88, '', 88, '', '', 88, '', '', 88, '', '', '', 88, '', 88],
    [88, '', 88, '', 88, '', 88, '', '', 88, '', '', 88, 88, '', '', 88, '', 88, '', 88],
    [88, 22, 22, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 22, 22, 88],
    [88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88]
];

var boardMatrix = convertPrettyMatrixToPathFindingMatrix(prettyBoardMatrix);

function convertPrettyMatrixToWalls(prettyMatrix) {
    var walls = [];
    for (var i = 0; i < prettyMatrix.length; i++) {
        var runningLengthOfCurrentWall = 0;
        var startOfWall = 0;
        for (var j = 0; j < prettyMatrix[i].length; j++) {
            if (prettyMatrix[i][j] === 88) {
                if (runningLengthOfCurrentWall === 0) {
                    startOfWall = j;
                }
                runningLengthOfCurrentWall++;
                if (!prettyMatrix[i][j+1] || prettyMatrix[i][j+1] !== 88) {
                    walls.push(new Wall(startOfWall, i, runningLengthOfCurrentWall, 1));
                    runningLengthOfCurrentWall = 0;
                    startOfWall = 0;
                }
            }
        }
    }
    return walls;
}

function convertPrettyMatrixToPills(prettyMatrix) {
    var pills = [];
    for (var i = 0; i < prettyMatrix.length; i++) {
        for (var j = 0; j < prettyMatrix[i].length; j++) {
            if (prettyMatrix[i][j] === '') {
                    pills.push(new Pill(j, i));
            }
        }
    }
    return pills;
}

function convertPrettyMatrixToPathFindingMatrix(prettyMatrix) {
    var result = [];
    for (var i = 0; i < prettyMatrix.length; i++) {
        result[i] = [];
        for (var j = 0; j < prettyMatrix[i].length; j++) {
            if (prettyMatrix[i][j] === 88) {
                result[i][j] = 1;
            } else {
                result[i][j] = 0;
            }
        }
    }
    return result;
}