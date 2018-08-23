import Matrix from 'math/matrix';

export default {
  init: function (canvas) {
    this.cursor = { x: 0, y: 0 };
    this.internal = { x: 0, y: 0 };

    this.matrices = [
      new Matrix(0.5, 0, 0, 0.5, 0, 0),
      new Matrix(0.5, 0, 0, 0.5, 1, 0),
      new Matrix(0.5, 0, 0, 0.5, 0, 1)
    ];
  },

  iterate: function (canvas) {
    var random = Math.random() * this.matrices.length | 0;

    // apply affine transformation
    this.internal = this.matrices[random].apply(this.internal);
    // map internal point to the screen space
    this.cursor.x = this.internal.x * (canvas.width) | 0;
    this.cursor.y = this.internal.y * (canvas.height) | 0;

    return this.cursor;
  }
}
