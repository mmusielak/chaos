// https://en.wikipedia.org/wiki/R%C3%B6ssler_attractor

// TODO: only works with resolution 10
// TODO: projection matrix

import Polygon from 'math/polygon';

export default {
  id: 'roessler',

  init: function (width, height) {
    this.a = 0.2;
    this.b = 0.2;
    this.c = 5.7;
    /*
        this.a = 0.1;
        this.b = 0.1;
        this.c = 14;
    */
    this.cursor = { x: 1, y: 0, z: 1 };
  },

  iterate: function (width, height) {
    var nx = - (this.cursor.y + this.cursor.z);
    var ny = (this.cursor.x + this.a * this.cursor.y);
    var nz = (this.b + this.cursor.x * this.cursor.z - this.c * this.cursor.z);

    this.cursor.x += nx * 0.008;
    this.cursor.y += ny * 0.008;
    this.cursor.z += nz * 0.008;

    var scale = 40;

    return {
      x: width / 2 + this.cursor.x * scale + this.cursor.z * scale | 0,
      y: height / 2 + this.cursor.y * scale + this.cursor.z * scale | 0
    };
  }
};
