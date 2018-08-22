/**
 *  as defined on wiki:
 *   A point inside a square repeatedly jumps half of the distance towards a randomly chosen vertex, but the currently chosen vertex cannot be 2 places away from the previously chosen vertex. 
 */

export default {
  init: function (canvas) {
    this.nodes = [
      { x: 20, y: 20 },
      { x: canvas.width - 20, y: 20 },
      { x: canvas.width - 20, y: canvas.height - 20 },
      { x: 20, y: canvas.height - 20 }
    ];
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
  },
  iterate: function (canvas) {
    do {
      var next = Math.random() * this.nodes.length | 0;
    } while (
      (next - 2 + this.nodes.length) % this.nodes.length == this.last||
      (next + 2 + this.nodes.length) % this.nodes.length == this.last)

    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return this.cursor;
  }
};