"use strict";

var Coordinates = require("./Coordinates.js");

var NeighbourCells = (function () {

    var CoordinatesFromDirection = {
        TOP_LEFT: function (coordinates) { return new Coordinates(coordinates.X - 1, coordinates.Y - 1); },
        TOP_CENTER: function (coordinates) { return new Coordinates(coordinates.X - 1, coordinates.Y); },
        TOP_RIGHT: function (coordinates) { return new Coordinates(coordinates.X - 1, coordinates.Y + 1); },
        MIDDLE_LEFT: function (coordinates) { return new Coordinates(coordinates.X, coordinates.Y - 1); },
        MIDDLE_RIGHT: function (coordinates) { return new Coordinates(coordinates.X, coordinates.Y + 1); },
        BOTTOM_LEFT: function (coordinates) { return new Coordinates(coordinates.X + 1, coordinates.Y - 1); },
        BOTTOM_CENTER: function (coordinates) { return new Coordinates(coordinates.X + 1, coordinates.Y); },
        BOTTOM_RIGHT: function (coordinates) { return new Coordinates(coordinates.X + 1, coordinates.Y + 1); }
    };

    function _NeighbourCells (neighboursCoordinates) {
        this.neighboursCoordinates = neighboursCoordinates;
    }

    _NeighbourCells.fromCell = function (cell) {
        var neighboursCoordinates = [];
        for (var direction in CoordinatesFromDirection)
            if (CoordinatesFromDirection.hasOwnProperty(direction)) {
                neighboursCoordinates.push(CoordinatesFromDirection[direction](cell.Coordinates));
            }
        return new _NeighbourCells(neighboursCoordinates);
    };

    _NeighbourCells.prototype = {
        get Coordinates() { return this.neighboursCoordinates; }
    };

    return _NeighbourCells;
})();

module.exports = NeighbourCells;
