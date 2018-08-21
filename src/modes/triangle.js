// sierpiński triangle

module.exports = {
  init: function (canvas) {
    this.nodes = [
      { x: canvas.width / 2, y: 20 },
      { x: 20, y: canvas.height - 20 },
      { x: canvas.width - 2, y: canvas.height - 20 }
    ];
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
  },
  iterate: function (canvas, screen) {
    var node = this.nodes[Math.random() * this.nodes.length | 0];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    var color = HSVToRGB(this.cursor.x / canvas.width, this.cursor.y / canvas.height, 0.5);
    screen[this.cursor.x + this.cursor.y * canvas.width] = color;
  }

};
