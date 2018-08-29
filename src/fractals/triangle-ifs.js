import Matrix from 'math/matrix';

export default {
  id: 'triangle (ifs)',

  init: function (width, height) {
    this.cursor = { x: 0, y: 0 };
    this.matrices = [
      /*
      new Matrix(0.5, 0, 0, 0.5, 0, 0),
      new Matrix(0.5, 0, 0, 0.5, 1, 0),
      new Matrix(0.5, 0, 0, 0.5, 0, 1)*/
      new Matrix(0.5, 0, 0, 0.5, 0, 0),
      new Matrix(0.5, 0, 0, 0.5, 0.5, 0),
      new Matrix(0.5, 0, 0, 0.5, 0.25, Math.sqrt(3) / 4)
    ];
  },

  iterate: function (width, height) {
    // choose random matrix
    var random = Math.random() * this.matrices.length | 0;
    var matrix = this.matrices[random];
    // apply affine transformation
    this.cursor = matrix.apply(this.cursor);
    // map internal point to the screen space
    return {
      x: this.cursor.x * width | 0,
      y: this.cursor.y * height | 0
    };
  }
};
