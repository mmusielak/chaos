// https://en.wikipedia.org/wiki/Lorenz_system

// TODO: only works with resolution 10
// TODO: projection matrix

import Polygon from 'math/polygon';

export default {
  id: 'lorenz',

  init: function (width, height) {
    this.cursor = { x: 1, y: 1, z: 1 };
  },

  iterate: function (width, height) {
    this.a = 10; // sigma
    this.b = 28; // rho
    this.c = 8 / 3; // beta

    var nx = this.a * (this.cursor.y - this.cursor.x);
    var ny = this.cursor.x * (this.b - this.cursor.z) - this.cursor.y;
    var nz = this.cursor.x * this.cursor.y - this.c * this.cursor.z;

    this.cursor.x += nx * 0.008;
    this.cursor.y += ny * 0.008;
    this.cursor.z += nz * 0.008;

    var scale = 20;

    return {
      x: width / 2 + this.cursor.x * scale + this.cursor.z * scale | 0,
      y: height / 2 + this.cursor.y * scale + this.cursor.z * scale | 0
    };
  }
};
