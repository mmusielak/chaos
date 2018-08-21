// barnsley fern (black spleenwort)

export default {
  init: function (canvas) {
    this.cursor = { x: 0, y: 0 };
    this.internal = { x: 0, y: 0 };

    // a c b d tx ty
    this.matrices = [
      [0.0000, 0.0000, 0.0000, 0.1600, 0.0000, 0.0000, 1],
      [0.8500, 0.0400, -0.0400, 0.8500, 0.0000, 1.6000, 85],
      [0.2000, -0.2600, 0.2300, 0.2200, 0.0000, 1.6000, 7],
      [-0.1500, 0.2800, 0.2600, 0.2400, 0.0000, 0.4400, 7]
    ];
  },

  iterate: function (canvas) {
    var random = Math.random() * 100 | 0;

    // select random transformation based on their probabilities
    for (var total = 0, i = 0; i < this.matrices.length; i++) {
      total += this.matrices[i][6];
      if (total >= random) {
        break;
      }
    }

    // apply affine transformation
    this.internal = transform(this.internal, this.matrices[i]);

    // map internal point to the screen space
    //  we know it's oscilating between 
    //   (-2.1818, 2.6556) in x axis 
    //   and (0, 9.958510) in y axis  
    this.cursor.x = canvas.width / 2 + this.internal.x * canvas.width / 5.5 | 0;
    this.cursor.y = canvas.height - this.internal.y * canvas.height / 10 | 0;

    return this.cursor;
  }
}

function transform(point, matrix) {
  return {
    x: point.x * matrix[0] + point.y * matrix[1] + matrix[4],
    y: point.x * matrix[2] + point.y * matrix[3] + matrix[5]
  };
}