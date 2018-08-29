import Polygon from 'math/polygon';

export default {
  id: 'ngon',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.vertices = Polygon.construct(width, height, 9, -Math.PI / 2);
  },

  iterate: function (width, height) {
    do {
      var next = Math.random() * this.vertices.length | 0;
    } while (
      (next + 2 + this.vertices.length) % this.vertices.length == this.last ||
      (next - 2 + this.vertices.length) % this.vertices.length == this.last ||
      next == this.last)

    var vertex = this.vertices[this.last = next];

    this.cursor.x += (vertex.x - this.cursor.x) / 2;
    this.cursor.y += (vertex.y - this.cursor.y) / 2;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
