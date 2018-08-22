export default {
  init: function (canvas) {
    this.cursor = { x: 0, y: 0 };
    this.internal = { x: 0, y: 0 };

    // a c b d tx ty
    this.matrices = [
      [.5, 0, 0, .5, 0, 0, 10],
      [.5, 0, 0, .5, 1, 0, 10],
      [.5, 0, 0, .5, 0, 1, 10]  
    ];
  },

  iterate: function (canvas) {
    var random = Math.random() * 30 | 0;

    // select random transformation based on their probabilities
    for (var total = 0, i = 0; i < this.matrices.length; i++) {
      total += this.matrices[i][6];
      if (total >= random) {
        break;
      }
    }

    // apply affine transformation
    this.internal = transform(this.internal, this.matrices[i]);

    this.cursor.x = this.internal.x * (canvas.width) | 0;
    this.cursor.y = this.internal.y * (canvas.height) | 0;

    return this.cursor;
  }
}

function transform(point, matrix) {
  return {
    x: point.x * matrix[0] + point.y * matrix[1] + matrix[4],
    y: point.x * matrix[2] + point.y * matrix[3] + matrix[5]
  };
}