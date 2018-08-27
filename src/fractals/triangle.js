import Polygon from 'math/polygon';

export default {
  init: function (canvas) {
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
    this.nodes = Polygon.construct(canvas.width, canvas.height, 3, -Math.PI / 2);
  },
  iterate: function (canvas) {
    var random = Math.random() * this.nodes.length | 0;
    var node = this.nodes[random];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return {
      ...this.cursor
    };
  }
};
