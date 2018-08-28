import Matrix from 'math/matrix';

export default {
  id: 'fern (simplified)',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
  },

  iterate: function (width, height) {
    var random = Math.random();

    var nx, ny;

    if (random <= 0.01) { // F1 (1%)
      nx = 0.00;
      ny = 0.16 * this.cursor.y;
    } else if (random <= 0.86) { // F2 (85%)
      nx = 0.85 * this.cursor.x + 0.04 * this.cursor.y + 0.00;
      ny = -0.04 * this.cursor.x + 0.85 * this.cursor.y + 1.60;
    } else if (random <= 0.94) { // F3 (7%)
      nx = 0.20 * this.cursor.x - 0.26 * this.cursor.y + 0.00;
      ny = 0.23 * this.cursor.x + 0.22 * this.cursor.y + 1.60;
    } else { // F4 (7%)
      nx = -0.15 * this.cursor.x + 0.28 * this.cursor.y + 0.00;
      ny = 0.26 * this.cursor.x + 0.24 * this.cursor.y + 0.44;
    }

    this.cursor.x = nx;
    this.cursor.y = ny;

    // map internal point to the screen space
    //  we know it's oscilating between 
    //   (-2.1818, 2.6556) in x axis 
    //   and (0, 9.958510) in y axis  
    return {
      x: width / 2 + this.cursor.x * width / 5.5 | 0,
      y: height - this.cursor.y * height / 10 | 0
    };
  }
};
