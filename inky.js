/**
 * Created by bryansolomon on 11/18/16.
 */

var inkyCircle = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [9, 2], [9, 3], [8, 3], [7, 3],
    [6, 3], [5, 3], [4, 3], [4, 4], [4, 5], [4, 6], [3, 6], [2, 6], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2]];

var inky = new Ghost("inky", 9, 9, PF.AStarFinder, inkyCircle, function (pacmanGrid) {
    return pacmanGrid[0] < 11 && pacmanGrid[1] < 10;
});