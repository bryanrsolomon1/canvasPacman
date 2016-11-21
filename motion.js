/**
 * Created by bryansolomon on 11/18/16.
 */

var DIRECTIONS = {
    LEFT: {value: 1},
    RIGHT: {value: 0},
    DOWN: {value: 1.5},
    UP: {value: .5}
};
DIRECTIONS.LEFT.opposite = DIRECTIONS.RIGHT.value;
DIRECTIONS.RIGHT.opposite = DIRECTIONS.LEFT.value;
DIRECTIONS.UP.opposite = DIRECTIONS.DOWN.value;
DIRECTIONS.DOWN.opposite = DIRECTIONS.UP.value;

/* global on the whole window because game.js needs access to this */
var Motion = {
    isValidMotion: function (character, proposedDirection) {
        var result = true;
        updateMotion(character, proposedDirection.value);
        var collider = Motion.collision(character);
        if (collider !== null && collider.type === "Wall") {
            result = false;
        }
        updateMotion(character, proposedDirection.opposite);
        return result;
    },
    isInFlight: function (character) {
        if (!character.nextGrid) {
            return false;
        }
        var allowableCenter = calculateAllowableCenterOfGrid(character.nextGrid);
        var characterCenter = calculateCenterOfCharacter(character);
        if (!(characterCenter.x < allowableCenter.x) && // character too far right?
            !(allowableCenter.x + allowableCenter.width < characterCenter.x) && // character too far left?
            !(characterCenter.y < allowableCenter.y) && // character too low?
            !(allowableCenter.y + allowableCenter.height < characterCenter.y)) { // character too high?
            return false;
        }
        return true;
    },
    // function (character, proposedDirection) {
    // var myGrid = calculateGrid(character);
    // var proposedGrid = calculateProposedGrid(myGrid, proposedDirection);
    // return !isWall(proposedGrid);
    // },
    movePacman: function (character, direction) {
        updateMotion(character, direction.value);
        character.isMoving = true;

        /* check wrap around */
        if (character.x - character.radius > game.width) { // did the user go off the screen right?
            character.x = character.radius + 4;
            character.direction = DIRECTIONS.RIGHT;
            character.proposedDirection = DIRECTIONS.RIGHT;
        } else if (character.x + character.radius < 0) { // did the user go off the screen left?
            character.x = game.width - 1; // strange helper pixel that fixes a lot
            character.direction = DIRECTIONS.LEFT;
            character.proposedDirection = DIRECTIONS.LEFT;
        }
    },
    moveGhost: function (character, direction) {
        updateMotion(character, direction.value);
    },
    collision: function (character) {
        var collider;
        /* using a try-catch because there is no break statement in a JS for-each :( */
        try {
            board.boardPieces.forEach(function (piece) {
                if (!(character.x + character.radius < piece.x) && // character too far right?
                    !(piece.x + piece.width < character.x - character.radius) && // character too far left?
                    !(character.y + character.radius < piece.y) && // character too low?
                    !(piece.y + piece.height < character.y - character.radius)) { // character too high?
                    collider = piece;
                    throw new Exception();
                }
            });
        } catch (e) {
            return collider;
        }
        return null;
    }
};

function updateMotion(character, direction) {
    switch (direction) {
        case DIRECTIONS.RIGHT.value:
            character.x += 3;
            break;
        case DIRECTIONS.LEFT.value:
            character.x -= 3;
            break;
        case DIRECTIONS.DOWN.value:
            character.y += 3;
            break;
        case DIRECTIONS.UP.value:
            character.y -= 3;
            break;
    }
}

function calculateGrid(character) {
    return [Math.floor(character.x / board.grid.length), Math.floor(character.y / board.grid.length)];
}

function calculateProposedGrid(currentGrid, proposedDirection) {
    switch (proposedDirection.value) {
        case DIRECTIONS.RIGHT.value:
            return [currentGrid[0] + 1, currentGrid[1]];
        case DIRECTIONS.LEFT.value:
            return [currentGrid[0] - 1, currentGrid[1]];
        case DIRECTIONS.DOWN.value:
            return [currentGrid[0], currentGrid[1] + 1];
        case DIRECTIONS.UP.value:
            return [currentGrid[0], currentGrid[1] - 1];
    }
}

function isWall(gridToInspect) {
    return prettyBoardMatrix[gridToInspect[1]][gridToInspect[0]] === 88;
}

function calculateAllowableCenterOfGrid(grid) {
    // grid = [1, 1]
    return {
        x: (grid[0] * board.grid.length) + (board.grid.length - 3) / 2,
        y: (grid[1] * board.grid.length) + (board.grid.length - 3) / 2,
        width: 3,
        height: 3
    };
}

function calculateCenterOfCharacter(character) {
    return {x: character.x + character.width/2, y: character.y + character.height/2};
}

function calculateMyNextMove(currentGrid, nextGrid) {
    if (!currentGrid || !nextGrid) {
        return;
    }
    var result;
    if (currentGrid[0] !== nextGrid[0]) {// move in x?
        if (nextGrid[0] < currentGrid[0]) { // move left?
            result = DIRECTIONS.LEFT;
        } else { // no, move right
            result = DIRECTIONS.RIGHT;
        }
    } else if (currentGrid[1] !== nextGrid[1]) { // move in y?
        if (nextGrid[1] < currentGrid[1]) { // move up?
            result = DIRECTIONS.UP;
        } else { // no, move down
            result = DIRECTIONS.DOWN;
        }
    }
    return result;
}