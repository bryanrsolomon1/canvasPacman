/**
 * Created by bryansolomon on 7/26/16.
 *
 * I break the board out on its own so that I do not repaint its pieces each iteration. Saves major CPU
 */

/* global on the whole window because game.js needs access to this */
var board = {
    boardPieces: [],
    init: init,
    remove: remove
};

function init() {

    var grid = {width: 33, height: 33};

    var wallPieces = initWalls();

    var pills = initPills();

    wallPieces.forEach(function (piece) {
        piece.x = piece.x * grid.width;
        piece.y = piece.y * grid.height;
        piece.width = piece.width * grid.width;
        piece.height = piece.height * grid.height;
        board.boardPieces.push(piece);
    });

    pills.forEach(function (pill) {
        pill.x = pill.x * grid.width + grid.width / 2;
        pill.y = pill.y * grid.height + grid.height / 2;
        board.boardPieces.push(pill);
    });

    paint();
}

function initWalls() {
    /* Board built from top down read from left to right */
    var wallPieces = [];
    wallPieces.push(new Wall(0, 0, 21, 1));

    wallPieces.push(new Wall(0, 1, 1, 7));
    wallPieces.push(new Wall(20, 1, 1, 7));

    wallPieces.push(new Wall(2, 2, 2, 1));
    wallPieces.push(new Wall(5, 2, 2, 1));
    wallPieces.push(new Wall(8, 2, 5, 1));
    wallPieces.push(new Wall(14, 2, 2, 1));
    wallPieces.push(new Wall(17, 2, 2, 1));

    wallPieces.push(new Wall(2, 3, 1, 1));
    wallPieces.push(new Wall(6, 3, 1, 1));
    wallPieces.push(new Wall(8, 3, 1, 3));
    wallPieces.push(new Wall(12, 3, 1, 3));
    wallPieces.push(new Wall(14, 3, 1, 1));
    wallPieces.push(new Wall(18, 3, 1, 1));

    wallPieces.push(new Wall(4, 4, 1, 3));
    wallPieces.push(new Wall(10, 4, 1, 2));
    wallPieces.push(new Wall(16, 4, 1, 3));

    wallPieces.push(new Wall(2, 5, 4, 1));
    wallPieces.push(new Wall(7, 5, 1, 1));
    wallPieces.push(new Wall(13, 5, 1, 1));
    wallPieces.push(new Wall(15, 5, 4, 1));

    wallPieces.push(new Wall(2, 7, 1, 1));
    wallPieces.push(new Wall(6, 7, 3, 1));
    wallPieces.push(new Wall(12, 7, 3, 1));
    wallPieces.push(new Wall(18, 7, 1, 1));

    wallPieces.push(new Wall(4, 8, 1, 3));
    wallPieces.push(new Wall(6, 8, 1, 3));
    wallPieces.push(new Wall(14, 8, 1, 3));
    wallPieces.push(new Wall(16, 8, 1, 3));

    wallPieces.push(new Wall(0, 9, 4, 1));
    wallPieces.push(new Wall(17, 9, 4, 1));

    wallPieces.push(new Wall(7, 10, 7, 1));

    wallPieces.push(new Wall(0, 11, 1, 7));
    wallPieces.push(new Wall(20, 11, 1, 7));
    wallPieces.push(new Wall(2, 11, 1, 2));
    wallPieces.push(new Wall(18, 11, 1, 2));

    wallPieces.push(new Wall(2, 12, 3, 1));
    wallPieces.push(new Wall(6, 12, 1, 5));
    wallPieces.push(new Wall(9, 12, 1, 1));
    wallPieces.push(new Wall(12, 12, 2, 1));
    wallPieces.push(new Wall(16, 12, 3, 1));

    wallPieces.push(new Wall(8, 13, 1, 1));
    wallPieces.push(new Wall(11, 13, 1, 3));

    wallPieces.push(new Wall(2, 14, 1, 1));
    wallPieces.push(new Wall(4, 14, 1, 1));
    wallPieces.push(new Wall(7, 14, 1, 1));
    wallPieces.push(new Wall(13, 14, 2, 1));
    wallPieces.push(new Wall(16, 14, 1, 1));
    wallPieces.push(new Wall(18, 14, 1, 1));

    wallPieces.push(new Wall(8, 15, 1, 1));
    wallPieces.push(new Wall(14, 15, 1, 1));

    wallPieces.push(new Wall(2, 16, 1, 1));
    wallPieces.push(new Wall(4, 16, 1, 1));
    wallPieces.push(new Wall(9, 16, 1, 1));
    wallPieces.push(new Wall(12, 16, 2, 1));
    wallPieces.push(new Wall(16, 16, 1, 1));
    wallPieces.push(new Wall(18, 16, 1, 1));

    wallPieces.push(new Wall(0, 18, 21, 1));
    return wallPieces;
}

function initPills() {
    var pillGrid = {
        1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        2: [1, 4, 7, 13, 16, 19],
        3: [1, 3, 4, 5, 7, 9, 10, 11, 13, 15, 16, 17, 19],
        4: [1, 2, 3, 5, 6, 7, 9, 11, 13, 14, 15, 17, 18, 19],
        5: [1, 6, 9, 11, 14, 19],
        6: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19],
        7: [1, 3, 4, 5, 15, 16, 17, 19],
        8: [1, 2, 3, 5, 15, 17, 18, 19],
        9: [5, 15],
        10: [1, 2, 3, 5, 15, 17, 18, 19],
        11: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19],
        12: [1, 5, 7, 8, 10, 11, 14, 15, 19],
        13: [1, 2, 3, 4, 5, 7, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
        14: [1, 3, 5, 8, 9, 10, 12, 15, 17, 19],
        15: [1, 2, 3, 4, 5, 7, 9, 10, 12, 13, 15, 16, 17, 18, 19],
        16: [1, 3, 5, 7, 8, 10, 11, 14, 15, 17, 19],
        17: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    };
    var pills = [];
    for (var i = 1; i < 18; i++) {
        for (var j = 0; j < pillGrid[i].length; j++) {
            pills.push(new Pill(pillGrid[i][j], i));
        }
    }
    return pills;
}

function Wall(x, y, width, height) {
    var self = this;
    self.x = x;
    self.y = y;
    self.width = width;
    self.height = height;
    self.type = "Wall";
    self.paint = function (context) {
        context.fillStyle = "Blue";
        context.fillRect(self.x, self.y, self.width, self.height);
    }
}

function Pill(x, y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.radius = 3;
    self.height = self.radius;
    self.width = self.radius;
    self.startAngle = 0;
    self.stopAngle = 2;
    self.type = "Pill";
    self.paint = function (context) {
        context.fillStyle = "White";
        context.beginPath();
        context.arc(self.x, self.y, self.radius, self.startAngle * Math.PI, self.stopAngle * Math.PI);
        context.fill();
        context.closePath();
    }
}

function paint() {
    var board$ = $("#board").get(0);
    var boardContext = board$.getContext("2d");

    board$.width = board$.width;

    boardContext.strokeStyle = "Black";

    boardContext.fillRect(0, 0, board$.width, board$.height);

    board.boardPieces.forEach(function (piece) {
        piece.paint(boardContext);
    });
}

function remove(collider) {
    board.boardPieces.splice(board.boardPieces.indexOf(collider), 1);
    paint();
}