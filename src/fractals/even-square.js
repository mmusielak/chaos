/**
 *  idea taken from wiki:
 *   a point inside a square repeatedly jumps half of the distance towards
 *   a randomly chosen vertex, but the currently chosen vertex cannot be
 *   two places away from the previously chosen vertex. 
 */

import Polygon from 'math/polygon';

export default {
  id: 'even-square',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.nodes = Polygon.construct(width, height, 4, Math.PI / 4);
  },

  iterate: function (width, height) {
    do {
      var next = Math.random() * this.nodes.length | 0;
    } while (
      (next - 2 + this.nodes.length) % this.nodes.length == this.last ||
      (next + 2 + this.nodes.length) % this.nodes.length == this.last)

    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) / 2;
    this.cursor.y += (node.y - this.cursor.y) / 2;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
