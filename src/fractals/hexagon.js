import Polygon from 'math/polygon';

export default {
  init: function (canvas) {
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
    this.nodes = Polygon.construct(canvas.width, canvas.height, 6, -Math.PI / 2);
  },
  iterate: function (canvas) {
    var node = this.nodes[Math.random() * this.nodes.length | 0];

    this.cursor.x += (node.x - this.cursor.x) * .66 | 0;
    this.cursor.y += (node.y - this.cursor.y) * .66 | 0;

    return this.cursor;
  }
};