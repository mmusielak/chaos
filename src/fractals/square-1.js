/**
 *  idea taken from wiki:
 *   a point inside a square repeatedly jumps half of the distance towards
 *   a randomly chosen vertex, but the currently chosen vertex cannot be
 *   one places away (anti-clockwise) from the previously chosen vertex.
 */

import Polygon from 'math/polygon';

export default {
  id: 'square -1',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.vertices = Polygon.construct(width, height, 4, -Math.PI / 4);
  },

  iterate: function (width, height) {
    do {
      var next = Math.random() * this.vertices.length | 0;
    } while (
      (next - 1 + this.vertices.length) % this.vertices.length == this.last)

    var vertex = this.vertices[this.last = next];

    this.cursor.x += (vertex.x - this.cursor.x) / 2;
    this.cursor.y += (vertex.y - this.cursor.y) / 2;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
