export default {
  init: function (canvas) {
    var sides = 6;
    this.nodes = [];

    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };

    var radius = Math.min(canvas.width, canvas.height) / 2 - 40;
    var theta = -Math.PI / 2;

    for (var i = 0; i <= sides; i++) {
      this.nodes[i] = {
        x: radius * Math.cos(2 * Math.PI * i / sides + theta) + this.cursor.x,
        y: radius * Math.sin(2 * Math.PI * i / sides + theta) + this.cursor.y
      };
    }
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