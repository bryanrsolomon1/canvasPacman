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

    /* top */
    boardPieces.push(new BoardPiece(0, 0, board.width, wall));
    /* chiclet hanging down off top in the middle */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall, 2 * alley, 4 * alley));

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

    /* the bottom of the 'T' in the 'T' right on top of the ghost cage */
    boardPieces.push(new BoardPiece(wall + 12 * alley, wall + 5.1 * alley + 2 * alley, 2 * alley, 3 * alley));

    /* the bottom of the 'T' in the sideways 'T's on the tall 8 alley bricks on the sides */
    boardPieces.push(new BoardPiece(wall + 8 * alley, wall + 5.1 * alley + 3 * alley, 3 * alley, 2 * alley));
    boardPieces.push(new BoardPiece(wall + 15 * alley, wall + 5.1 * alley + 3 * alley, 3 * alley, 2 * alley));

    /* bottom */
    boardPieces.push(new BoardPiece(0, board.height - wall, board.width, wall));

    /* left */
    var sideWall = board.height - 2 * wall;

    // top left
    boardPieces.push(new BoardPiece(0, wall, wall, sideWall / 3));

    //TODO: double check this middle logic is correct after changing wall logic
    // middle left
    // boardPieces.push(new BoardPiece(0, wall + sideWall / 3, board.width / 4, (sideWall / 3 - alley) / 2));
    // boardPieces.push(new BoardPiece(0, wall + sideWall / 3 + (sideWall / 3 - alley) / 2 + alley, board.width / 4, (sideWall / 3 - alley) / 2));

    // bottom left
    // boardPieces.push(new BoardPiece(0, wall + 2 / 3 * sideWall, wall, sideWall / 3));
    // boardPieces.push(new BoardPiece(wall, wall + 5 / 6 * sideWall, board.width / 10, wall));

    /* right  */

    // top right
    boardPieces.push(new BoardPiece(board.width - wall, wall, wall, sideWall / 3));

    // middle right
    // boardPieces.push(new BoardPiece(board.width - board.width / 4, wall + sideWall / 3, board.width / 4, (sideWall / 3 - alley) / 2));
    // boardPieces.push(new BoardPiece(board.width - board.width / 4, wall + sideWall / 3 + (sideWall / 3 - alley) / 2 + alley, board.width / 4, (sideWall / 3 - alley) / 2));

    // bottom right
    // boardPieces.push(new BoardPiece(board.width - wall, wall + 2 / 3 * sideWall, wall, sideWall / 3));
    // boardPieces.push(new BoardPiece(board.width - wall - board.width / 10, wall + 5 / 6 * sideWall, board.width / 10, wall));

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