"use strict";

var Coordinates = require("../src/Coordinates.js");
var GameOfLife = require("../src/GameOfLife.js");
var expect = require("chai").expect;

describe("GameOfLife", function () {

    describe("#nextGeneration", function () {

        var gameOfLife;

        function IsCellAlive (cell) {
            return cell.isAlive();
        }

        function IsCellDead (cell) {
            return !cell.isAlive();
        }

        function expectAliveCellsCount (count) {
            return function (cells) {
                var aliveCellsCount = 0;
                for (var i = 0; i < cells.length; ++i) {
                    aliveCellsCount += cells[i].filter(IsCellAlive).length;
                }
                return aliveCellsCount === count;
            };
        }

        beforeEach(function () {
            gameOfLife = GameOfLife.fromTableSizes({
                height: 3,
                width: 3
            });
        });

        it("should any live cell with fewer than two live neighbours dies", function () {
            gameOfLife.addAliveCellsCoordinates([
                new Coordinates(0, 0),
                new Coordinates(0, 1)
            ]);

            gameOfLife.nextGeneration();

            expect(gameOfLife.Cells).to.satisfy(function (cells) {
                return cells.every(function (_cells) { return _cells.every(IsCellDead); });
            });
        });


        it("should any live cell with two live neighbours lives on to the next generation", function () {
            gameOfLife.addAliveCellsCoordinates([
                new Coordinates(0, 0),
                new Coordinates(1, 1),
                new Coordinates(2, 2)
            ]);

            expect(gameOfLife.Cells[1][1].isAlive()).to.be.true;

            gameOfLife.nextGeneration();

            expect(gameOfLife.Cells).to.satisfy(expectAliveCellsCount(1));
            expect(gameOfLife.Cells[1][1].isAlive()).to.be.true;
        });

        it("should any live cell with three live neighbours lives on to the next generation", function () {
            gameOfLife.addAliveCellsCoordinates([
                new Coordinates(0, 0),
                new Coordinates(1, 1),
                new Coordinates(2, 0),
                new Coordinates(2, 2)
            ]);

            expect(gameOfLife.Cells[1][1].isAlive()).to.be.true;

            gameOfLife.nextGeneration();

            expect(gameOfLife.Cells).to.satisfy(expectAliveCellsCount(3));
            expect(gameOfLife.Cells[1][1].isAlive()).to.be.true;
        });

        it("should any live cell with more than three live neighbours dies", function () {
            gameOfLife.addAliveCellsCoordinates([
                new Coordinates(0, 1),
                new Coordinates(1, 0),
                new Coordinates(1, 1),
                new Coordinates(1, 2),
                new Coordinates(2, 1)
            ]);

            expect(gameOfLife.Cells[1][1].isAlive()).to.be.true;

            gameOfLife.nextGeneration();

            expect(gameOfLife.Cells).to.satisfy(expectAliveCellsCount(8));
            expect(gameOfLife.Cells[1][1].isAlive()).to.be.false;
        });

        it("should any dead cell with exactly three live neighbours becomes a live cell", function () {
            gameOfLife.addAliveCellsCoordinates([
                new Coordinates(0, 0),
                new Coordinates(0, 2),
                new Coordinates(1, 1)
            ]);

            expect(gameOfLife.Cells[0][1].isAlive()).to.be.false;

            gameOfLife.nextGeneration();

            expect(gameOfLife.Cells).to.satisfy(expectAliveCellsCount(2));
            expect(gameOfLife.Cells[0][1].isAlive()).to.be.true;
        });

    });

});
