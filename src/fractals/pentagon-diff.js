/**
 *  as defined on wiki:
 *   A point inside a square repeatedly jumps half of the distance towards a randomly chosen vertex, but the currently chosen vertex cannot be 2 places away from the previously chosen vertex. 
 */

export default {
  init: function (canvas) {
    this.sides = 5;

    this.nodes = [];

    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };

    var radius = Math.min(canvas.width, canvas.height) / 2 - 40;
    var theta = -Math.PI / 2;

    for (var i = 0; i <= this.sides; i++) {
      this.nodes[i] = {
        x: radius * Math.cos(2 * Math.PI * i / this.sides + theta) + this.cursor.x,
        y: radius * Math.sin(2 * Math.PI * i / this.sides + theta) + this.cursor.y
      };
    }
  },
  iterate: function (canvas) {
    do {
      var next = Math.random() * this.nodes.length | 0;
    } while (next == this.last)

    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return this.cursor;
  }
};