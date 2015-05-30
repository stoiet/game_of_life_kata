"use strict";

function Coordinates (x, y) {
    this.x = x;
    this.y = y;
}

Coordinates.prototype = {
    get X() { return this.x; },
    get Y() { return this.y; }
};

module.exports = Coordinates;
