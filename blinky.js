/**
 * Created by bryansolomon on 11/18/16.
 */

var blinkyCircle = [[19, 1], [19, 2], [19, 3], [19, 4], [19, 5], [19, 6], [18, 6], [17, 6], [16, 6], [16, 5], [16, 4], [16, 3], [15, 3],
    [14, 3], [13, 3], [12, 3], [11, 3], [11, 2], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1]];

var blinky = new Ghost("blinky", 8, 9, PF.DijkstraFinder, blinkyCircle, function (pacmanGrid) {
    return pacmanGrid[0] > 9 && pacmanGrid[1] < 10;
});