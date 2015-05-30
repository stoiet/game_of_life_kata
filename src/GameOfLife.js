"use strict";

var Coordinates = require("./Coordinates.js");
var Cell = require("./Cell.js");

var GameOfLife = (function () {

    var AliveNeighbourCellsNumber = {
        TWO: 2,
        THREE: 3
    };

    function _GameOfLife (height, width) {
        this.height = height;
        this.width = width;
        this.cells = this._initializeCells();
    }

    _GameOfLife.fromTableSizes = function (sizes) {
        return new _GameOfLife(sizes.height || 1, sizes.width || 1);
    };

    _GameOfLife.prototype = {
        get Cells() { return this.cells; },
        nextGeneration: function () {
            var newCells = this._initializeCells();
            for (var i = 0; i < this.height; ++i) {
                for (var j = 0; j < this.width; ++j) {
                    this._setNewCellStatusFromOldCell(newCells[i][j], this.cells[i][j]);
                }
            }
            this.cells = newCells;
        },
        addAliveCellsCoordinates: function (coordinatesArray) {
            coordinatesArray.forEach((function (coordinates) {
                this._addAliveCellCoordinates(coordinates);
            }).bind(this));
        },
        _initializeCells: function () {
            var newCells = [];
            for (var i = 0; i < this.height; ++i) {
                newCells.push([]);
                for (var j = 0; j < this.width; ++j) {
                    newCells[i].push(Cell.fromCoordinates(new Coordinates(i, j)));
                }
            }
            return newCells;
        },
        _setNewCellStatusFromOldCell: function (newCell, oldCell) {
            var aliveNeighbourCellsCount = this._getAliveNeighbourCellsCountOfCell(oldCell);
            if (oldCell.isAlive()) {
                switch (aliveNeighbourCellsCount) {
                    case AliveNeighbourCellsNumber.TWO:
                    case AliveNeighbourCellsNumber.THREE:
                        newCell.makeAlive();
                        break;
                    default:
                        newCell.makeDead();
                        break;
                }
            }
            else if (aliveNeighbourCellsCount === AliveNeighbourCellsNumber.THREE) {
                newCell.makeAlive();
            }
        },
        _getAliveNeighbourCellsCountOfCell: function (cell) {
            return cell.Neighbours.reduce((function (previousValue, coordinates) {
                if (this._isValidCoordinates(coordinates)) {
                    if (this.cells[coordinates.X][coordinates.Y].isAlive()) {
                        return previousValue + 1;
                    }
                }
                return previousValue;
            }).bind(this), 0);
        },
        _addAliveCellCoordinates: function (coordinates) {
            if (this._isValidCoordinates(coordinates)) {
                this.cells[coordinates.X][coordinates.Y].makeAlive();
            }
        },
        _isValidCoordinates: function (coordinates) {
            return this._isXCoordinateInTable(coordinates.X) && this._isYCoordinateInTable(coordinates.Y);
        },
        _isXCoordinateInTable: function (x) {
            return (x >= 0 && this.height > x);
        },
        _isYCoordinateInTable: function (y) {
            return (y >= 0 && this.width > y);
        }
    };

    return _GameOfLife;
})();

module.exports = GameOfLife;
