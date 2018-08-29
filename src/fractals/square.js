import Polygon from 'math/polygon';

export default {
  id: 'square',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.vertices = [
      { x: 20, y: 20 },
      { x: width / 2, y: 20 },
      { x: width - 20, y: 20 },
      { x: width - 20, y: height / 2 },
      { x: width - 20, y: height - 20 },
      { x: width / 2, y: height - 20 },
      { x: 20, y: height - 20 },
      { x: 20, y: height / 2 }
    ];
  },

  iterate: function (width, height) {
    var random = Math.random() * this.vertices.length | 0;
    var vertex = this.vertices[random];

    this.cursor.x += (vertex.x - this.cursor.x) * .6666666;
    this.cursor.y += (vertex.y - this.cursor.y) * .6666666;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
