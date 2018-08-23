/**
 *  as defined on wiki:
 *   A point inside a square repeatedly jumps half of the distance towards a randomly chosen vertex, but the currently chosen vertex cannot be 2 places away from the previously chosen vertex. 
 */

import Polygon from 'math/polygon';

export default {
  init: function (canvas) {
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
    this.nodes = Polygon.construct(canvas.width, canvas.height, 5, -Math.PI / 2);
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