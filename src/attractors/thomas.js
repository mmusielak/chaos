// https://en.wikipedia.org/wiki/Thomas%27_cyclically_symmetric_attractor

// TODO: only works with resolution 10
// TODO: projection matrix

import Polygon from 'math/polygon';

export default {
  id: 'thomas',

  init: function (width, height) {
    this.b = 0.208186;
    this.cursor = { x: 1, y: 0, z: 1 };
  },

  iterate: function (width, height) {
    var nx = Math.sin(this.cursor.y) - this.b * this.cursor.x;
    var ny = Math.sin(this.cursor.z) - this.b * this.cursor.y;
    var nz = Math.sin(this.cursor.x) - this.b * this.cursor.z;

    this.cursor.x += nx * 0.008;
    this.cursor.y += ny * 0.008;
    this.cursor.z += nz * 0.008;

    var scale = 200;

    return {
      x: width / 2 + this.cursor.x * scale + this.cursor.z * scale | 0,
      y: height / 2 + this.cursor.y * scale + this.cursor.z * scale | 0
    };
  }
};
