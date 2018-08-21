// ngon

export default {
  init: function (canvas, sides) {
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
    do {
      var next = Math.random() * this.nodes.length | 0;

      if (!this.skip_neighbours) {
        break; // this means we're done here
      }
    } while (
      (this.must_be_different && this.last == next) ||
      (next + 3 + this.nodes.length) % this.nodes.length == this.last ||
      (next - 3 + this.nodes.length) % this.nodes.length == this.last)

    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    return this.cursor;
  }
};