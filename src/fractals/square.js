import Polygon from 'math/polygon';

export default {
  init: function (canvas) {
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
    this.nodes = [
      { x: 20, y: 20 },
      { x: canvas.width / 2, y: 20 },
      { x: canvas.width - 20, y: 20 },
      { x: canvas.width - 20, y: canvas.height / 2 },
      { x: canvas.width - 20, y: canvas.height - 20 },
      { x: canvas.width / 2, y: canvas.height - 20 },
      { x: 20, y: canvas.height - 20 },
      { x: 20, y: canvas.height / 2 }
    ];
  },
  iterate: function (canvas) {
    var node = this.nodes[Math.random() * this.nodes.length | 0];

    if (window) { // I like it better but it seems to produce artifacts
      this.cursor.x += (node.x - this.cursor.x) * .66 | 0;
      this.cursor.y += (node.y - this.cursor.y) * .66 | 0;
    } else {
      this.cursor.x = (2 * node.x + this.cursor.x) / 3 | 0;
      this.cursor.y = (2 * node.y + this.cursor.y) / 3 | 0;
    }

    return this.cursor;
  }
};
