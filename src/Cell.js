"use strict";

var NeighbourCells = require("./NeighbourCells.js");

var Cell = (function () {

    var State = {
        DEAD: 0,
        ALIVE: 1
    };

    function _Cell (coordinates, state) {
        this.coordinates = coordinates;
        this.state = state;
        this.neighbourCells = NeighbourCells.fromCell(this);
    }

    _Cell.fromCoordinates = function (coordinates) {
        return new _Cell(coordinates, State.DEAD);
    };

    _Cell.prototype = {
        get Coordinates() { return this.coordinates; },
        get Neighbours() { return this.neighbourCells.Coordinates; },
        isAlive: function () {
            return this.state === State.ALIVE;
        },
        makeDead: function () {
            this.state = State.DEAD;
        },
        makeAlive: function () {
            this.state = State.ALIVE;
        }
    };

    return _Cell;
})();

module.exports = Cell;
