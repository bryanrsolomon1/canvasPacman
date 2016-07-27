/**
 * Created by bryansolomon on 7/26/16.
 *
 * I break the board out on its own so that I do not repaint its pieces each iteration. Saves major CPU
 */

/* global on the whole window because game.js needs access to this */
var boardPieces = [];

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

    var alley = (board.height - 2 * wall) / 29;

    var pacmanRadius = alley / 2.25;

    board.width = 2 * wall + 26 * alley;
    container.width(board.width);

    /* Board built from top down read from left to right */

    var sideWall = board.height - 2 * wall; // account for top and bottom border


    /* top */
    boardPieces.push(new BoardPiece(0, 0, board.width, wall));
    /* chiclet hanging down off top in the middle */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall, 2 * alley, 4 * alley));

    /* top 1/2 left and right walls */
    boardPieces.push(new BoardPiece(0, wall, wall, 13 * alley));
    boardPieces.push(new BoardPiece(board.width - wall, wall, wall, 13 * alley));

    /* first row (4 squares across the top) */
    boardPieces.push(new BoardPiece(wall + alley, wall + alley, 4 * alley, 3 * alley));
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + alley, 5 * alley, 3 * alley));
    boardPieces.push(new BoardPiece(wall + 15 * alley, wall + alley, 5 * alley, 3 * alley));
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + alley, 4 * alley, 3 * alley));

    /* next set of shapes starting at (wall + 5 * alley) from the top */
    /* had to do 5.1 because somewhere I'm missing something and pacman won't fit if just plain 5 */
    /* possibly just floating point crap? */
    boardPieces.push(new BoardPiece(wall + alley, wall + 5.1 * alley, 4 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + 5.1 * alley, 2 * alley, 8 * alley));
    boardPieces.push(new BoardPiece(wall + 9 * alley, wall + 5.1 * alley, 8 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 18 * alley, wall + 5.1 * alley, 2 * alley, 8 * alley));
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 5.1 * alley, 4 * alley, 2 * alley));

    /* the bottom of the 'T' in the 'T' just above the ghost cage */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall + 5.1 * alley + 2 * alley, 2 * alley, 3 * alley));

    /* the next row which includes:
     * (1) the width-wise chunks of land that jet out from the sides
     * (2) and the bottom of the 'T' in the sideways 'T's on the tall 8 alley bricks that stare at each other

     /* (1) */
    boardPieces.push(new BoardPiece(wall, wall + 8.1 * alley, 5 * alley, 5 * alley));
    /* (2) */
    boardPieces.push(new BoardPiece(wall + 8 * alley, wall + 8.1 * alley, 3 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 15 * alley, wall + 8.1 * alley, 3 * alley, 2 * alley));
    /* (1) */
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 8.1 * alley, 5 * alley, 5 * alley));

    /* bottom */
    boardPieces.push(new BoardPiece(0, board.height - wall, board.width, wall));
    
    (function () {
        boardContext.strokeStyle = "Black";

        boardContext.fillRect(0, 0, board.width, board.height);

        boardContext.save();

        boardContext.strokeStyle = "Blue";
        boardContext.lineWidth = 5;

        boardPieces.forEach(function (piece) {
            boardContext.strokeRect(piece.x, piece.y, piece.width, piece.height);
        });

        boardContext.restore();

    })();

    return pacmanRadius;

    function BoardPiece(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
};