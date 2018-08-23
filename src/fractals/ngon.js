import Polygon from 'math/polygon';

export default {
  init: function (canvas) {
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
    this.nodes = Polygon.construct(canvas.width, canvas.height, 7, -Math.PI / 2);
  },

  iterate: function (canvas) {
    do {
      var next = Math.random() * this.nodes.length | 0;
    } while (
      (next + 0 + this.nodes.length) % this.nodes.length == this.last ||
      (next - 0 + this.nodes.length) % this.nodes.length == this.last ||
      (next - 2 + this.nodes.length) % this.nodes.length == this.last ||
      (next + 2 + this.nodes.length) % this.nodes.length == this.last ||
      (next + 4 + this.nodes.length) % this.nodes.length == this.last ||
      (next - 4 + this.nodes.length) % this.nodes.length == this.last)

    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return this.cursor;
  }
};