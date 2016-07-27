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
    boardPieces.push(new BoardPiece(wall + alley, wall + 5 * alley, 4 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + 5 * alley, 2 * alley, 8 * alley));
    boardPieces.push(new BoardPiece(wall + 9 * alley, wall + 5 * alley, 8 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 18 * alley, wall + 5 * alley, 2 * alley, 8 * alley));
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 5 * alley, 4 * alley, 2 * alley));

    /* the bottom of the 'T' in the 'T' just above the ghost cage */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall + 7 * alley, 2 * alley, 3 * alley));

    /* the next row includes:
     * (1) the top width-wise chunks of land that jet out from the sides
     * (2) and the bottom of the 'T' in the sideways 'T's on the tall 8 alley bricks that stare at each other
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, wall + 8 * alley, 5 * alley, 5 * alley));
    /* (2) */
    boardPieces.push(new BoardPiece(wall + 8 * alley, wall + 8 * alley, 3 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 15 * alley, wall + 8 * alley, 3 * alley, 2 * alley));
    /* (1) */
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 8 * alley, 5 * alley, 5 * alley));

    /* ghost box */
    boardPieces.push(new BoardPiece(wall + 9 * alley, wall + 11 * alley, 8 * alley, 5 * alley));

    /* bottom 1/2 left and right walls */
    boardPieces.push(new BoardPiece(0, wall + 14 * alley, wall, 15 * alley));
    boardPieces.push(new BoardPiece(board.width - wall, wall + 14 * alley, wall, 15 * alley));

    /* the next row includes:
     * (1) the bottom width-wise chunks of land that jet out from the sides
     * (2) and the matching floating tall bricks between them
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, wall + 14 * alley, 5 * alley, 5 * alley));
    /* (2) */
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + 14 * alley, 2 * alley, 5 * alley));
    boardPieces.push(new BoardPiece(wall + 18 * alley, wall + 14 * alley, 2 * alley, 5 * alley));
    /* (1) */
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 14 * alley, 5 * alley, 5 * alley));

    /* the top of the 'T' underneath the ghost box */
    boardPieces.push(new BoardPiece(wall + 9 * alley, wall + 17 * alley, 8 * alley, 2 * alley));

    /* the bottom of the 'T' in the 'T' underneath the ghost cage */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall + 19 * alley, 2 * alley, 3 * alley));

    /* row full of straight flat lines that either float alone or are apart of the upside-down 'L's */
    boardPieces.push(new BoardPiece(wall + alley, wall + 20 * alley, 4 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + 20 * alley, 5 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 15 * alley, wall + 20 * alley, 5 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 20 * alley, 4 * alley, 2 * alley));

    /* the row that houses the dangling segments in the two upside-down 'L's */
    boardPieces.push(new BoardPiece(wall + 3 * alley, wall + 22 * alley, 2 * alley, 3 * alley));
    boardPieces.push(new BoardPiece(wall + 21 * alley, wall + 22 * alley, 2 * alley, 3 * alley));

    /* (1) chiclets sprouting from the side of the walls
     * (2) the bottoms of the upside-down mushrooms (shape equal to --> ____|_ & _|_____
     * (3) top of the right side up 'T'
     *
     * (1) */
    boardPieces.push(new BoardPiece(wall, wall + 23 * alley, 2 * alley, 2 * alley));
    /* (2) */
    boardPieces.push(new BoardPiece(wall + 6 * alley, wall + 23 * alley, 2 * alley, 3 * alley));
    /* (3) */
    boardPieces.push(new BoardPiece(wall + 9 * alley, wall + 23 * alley, 8 * alley, 2 * alley));
    /* (2) */
    boardPieces.push(new BoardPiece(wall + 18 * alley, wall + 23 * alley, 2 * alley, 3 * alley));
    /* (1) */
    boardPieces.push(new BoardPiece(board.width - wall - 2 * alley, wall + 23 * alley, 2 * alley, 2 * alley));

    /* bottom of the 'T' */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall + 25 * alley, 2 * alley, 3 * alley));

    /* the bottom of the upside-down mushrooms (shape equal to --> ____|_ & _|_____    */
     boardPieces.push(new BoardPiece(wall + alley, wall + 26 * alley, 10 * alley, 2 * alley));
     boardPieces.push(new BoardPiece(wall + 15 * alley, wall + 26 * alley, 10 * alley, 2 * alley));

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