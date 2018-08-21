// sierpiński triangle

export default {
  init: function (canvas) {
    this.nodes = [
      { x: canvas.width / 2, y: 20 },
      { x: 20, y: canvas.height - 20 },
      { x: canvas.width - 20, y: canvas.height - 20 }
    ];
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
  },
  iterate: function (canvas) {
    var node = this.nodes[Math.random() * this.nodes.length | 0];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return this.cursor;
  }
};
