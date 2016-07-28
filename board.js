/**
 * Created by bryansolomon on 7/26/16.
 *
 * I break the board out on its own so that I do not repaint its pieces each iteration. Saves major CPU
 */

/* global on the whole window because game.js needs access to this */
var boardGrid = [];
var wallPieces = [];

/**
 * Having a lot of trouble with drawing the board to be dynamic based on the user's window. Floating point is making alley
 * ways non-accessible and strange behavior results.
 *
 * Might need to hardcode everything in a little 500 x 500 the way the demo does
 *
 * @param width
 * @param height
 * @returns {number}
 */
var renderBoard = function () {

    var container = $("#body-wrapper");

    var board = $("#board").get(0);
    var boardContext = board.getContext("2d");

    board.height = container.height();

    var wall = 5;

    var gridLength = (board.height - 2 * wall) / 29;

    var pacmanRadius = gridLength / 2.6;

    board.width = 2 * 26;
    container.width(board.width);

    /* Board built from top down read from left to right */
    var boardPieces = [];

    /* top */
    wallPieces.push(new BoardPiece(0, 0, board.width, wall));
    /* chiclet hanging down off top in the middle */
    boardPieces.push(new BoardPiece(12, wall, 2, 4));

    /* top 1/2 left and right walls */
    wallPieces.push(new BoardPiece(0, wall, wall, 13));
    wallPieces.push(new BoardPiece(board.width - wall, wall, wall, 13 * gridLength));

    /* first row (4 squares across the top) */
    boardPieces.push(new BoardPiece(1, 1, 4, 3));
    boardPieces.push(new BoardPiece(6, 1, 5, 3));
    boardPieces.push(new BoardPiece(15, 1, 5, 3));
    boardPieces.push(new BoardPiece(21, 1, 4, 3));

    /* next set of shapes starting at (5 * alley) from the top */
    /* had to do 5.1 because somewhere I'm missing something and pacman won't fit if just plain 5 */
    /* possibly just floating point crap? */
    boardPieces.push(new BoardPiece(1, 5, 4, 2));
    boardPieces.push(new BoardPiece(6, 5, 2, 8));
    boardPieces.push(new BoardPiece(9, 5, 8, 2));
    boardPieces.push(new BoardPiece(18, 5, 2, 8));
    boardPieces.push(new BoardPiece(21, 5, 4, 2));

    /* the bottom of the 'T' in the 'T' just above the ghost cage */
    boardPieces.push(new BoardPiece(12, 7, 2, 3));

    /* the next row includes:
     * (1) the top width-wise chunks of land that jet out from the sides
     * (2) and the bottom of the 'T' in the sideways 'T's on the tall 8 alley bricks that stare at each other
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, 8, 5, 5));
    /* (2) */
    boardPieces.push(new BoardPiece(8, 8, 3, 2));
    boardPieces.push(new BoardPiece(15, 8, 3, 2));
    /* (1) */
    boardPieces.push(new BoardPiece(21, 8, 5, 5));

    /* ghost box */
    boardPieces.push(new BoardPiece(9, 11, 8, 5));

    /* bottom 1/2 left and right walls */
    wallPieces.push(new BoardPiece(0, 14, wall, 15));
    wallPieces.push(new BoardPiece(board.width - wall, 14 * gridLength, wall, 15 * gridLength));

    /* the next row includes:
     * (1) the bottom width-wise chunks of land that jet out from the sides
     * (2) and the matching floating tall bricks between them
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, 14, 5, 5));
    /* (2) */
    boardPieces.push(new BoardPiece(6, 14, 2, 5));
    boardPieces.push(new BoardPiece(18, 14, 2, 5));
    /* (1) */
    boardPieces.push(new BoardPiece(21, 14, 5, 5));

    /* the top of the 'T' underneath the ghost box */
    boardPieces.push(new BoardPiece(9, 17, 8, 2));

    /* the bottom of the 'T' in the 'T' underneath the ghost cage */
    boardPieces.push(new BoardPiece(12, 19, 2, 3));

    /* row full of straight flat lines that either float alone or are apart of the upside-down 'L's */
    boardPieces.push(new BoardPiece(1, 20, 4, 2));
    boardPieces.push(new BoardPiece(6, 20, 5, 2));
    boardPieces.push(new BoardPiece(15, 20, 5, 2));
    boardPieces.push(new BoardPiece(21, 20, 4, 2));

    /* the row that houses the dangling segments in the two upside-down 'L's */
    boardPieces.push(new BoardPiece(3, 22, 2, 3));
    boardPieces.push(new BoardPiece(21, 22, 2, 3));

    /* (1) chiclets sprouting from the side of the walls
     * (2) the bottoms of the upside-down mushrooms (shape equal to --> ____|_ & _|_____
     * (3) top of the right side up 'T'
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, 23, 2, 2));
    /* (2) */
    boardPieces.push(new BoardPiece(6, 23, 2, 3));
    /* (3) */
    boardPieces.push(new BoardPiece(9, 23, 8, 2));
    /* (2) */
    boardPieces.push(new BoardPiece(18, 23, 2, 3));
    /* (1) */
    boardPieces.push(new BoardPiece(board.width - wall - 2, 23, 2, 2));

    /* bottom of the 'T' */
    boardPieces.push(new BoardPiece(12, 25, 2, 3));

    /* the bottom of the upside-down mushrooms (shape equal to --> ____|_ & _|_____    */
     boardPieces.push(new BoardPiece(1, 26, 10, 2));
     boardPieces.push(new BoardPiece(15, 26, 10, 2));

     /* bottom */
    wallPieces.push(new BoardPiece(0, board.height - wall, board.width, wall));

    (function () {
        boardContext.strokeStyle = "Black";

        boardContext.fillRect(0, 0, board.width, board.height);

        boardContext.save();

        boardContext.strokeStyle = "Blue";
        boardContext.lineWidth = 5;

        /* initialize the grid version of the board */
        for (var i = 0; i < 26; i++) {
            boardGrid.push([]);
            for (var j = 0; j < 29; j++) {
                boardGrid[i].push(COMPONENTS.PILL);
            }
        }

        boardPieces.forEach(function (piece) {
            /* paint the object */
            boardContext.strokeRect(wall + piece.xGrid * gridLength, wall + piece.yGrid + gridLength, piece.width * gridLength, piece.height * gridLength);
            /* add the object to the grid */
            // for (var i = piece.xGrid; i < piece.xGrid + piece.width; i++) {
            //     for (var j = piece.yGrid; j < piece.yGrid + piece.height; j++) {
            //         console.log("Setting: (", i, ",",  j, ") as a wall");
            //         boardGrid[i][j] = COMPONENTS.WALL;
            //     }
            // }
        });

        wallPieces.forEach(function (piece) {
            /* paint the wall */
            boardContext.strokeRect(piece.x, piece.y, piece.width, piece.height);
        });

        // for (i = 0; i < 29; i++) {
        //     var print = "";
        //     for (j = 0; j < 26; j++) {
        //         print += boardGrid[j][i] + " | ";
        //     }
        //     console.log(print);
        // }

        boardContext.restore();

    })();

    return pacmanRadius;

    function BoardPiece(xGrid, yGrid, width, height) {
        this.xGrid = xGrid;
        this.yGrid = yGrid;
        this.width = width;
        this.height = height;
    }
};