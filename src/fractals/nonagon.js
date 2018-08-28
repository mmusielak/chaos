import Polygon from 'math/polygon';

export default {
  id: 'nonagon',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.nodes = Polygon.construct(width, height, 9, -Math.PI / 2);
  },

  iterate: function (width, height) {
    var random = Math.random() * this.nodes.length | 0;
    var node = this.nodes[random];

    this.cursor.x += (node.x - this.cursor.x) * .6666666;
    this.cursor.y += (node.y - this.cursor.y) * .6666666;

    return {
      x: this.cursor.x | 0,
      y: this.cursor.y | 0
    };
  }
};
