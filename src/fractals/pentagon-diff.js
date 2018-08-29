/**
 *  idea taken from wiki:
 *   a point inside a pentagon repeatedly jumps half of the distance towards
 *   a randomly chosen vertex, but the same vertex cannot be chosen twice
 *   in a row.
 */

import Polygon from 'math/polygon';

export default {
  id: 'pentagon, next vertex has to be different',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.vertices = Polygon.construct(width, height, 5, -Math.PI / 2);
  },

  iterate: function (width, height) {
    do {
      var next = Math.random() * this.vertices.length | 0;
    } while (next == this.last)

    var vertex = this.vertices[this.last = next];

    this.cursor.x += (vertex.x - this.cursor.x) / 2;
    this.cursor.y += (vertex.y - this.cursor.y) / 2;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
