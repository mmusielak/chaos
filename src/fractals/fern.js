import Matrix from 'math/matrix';

export default {
  init: function (canvas) {
    this.cursor = { x: 0, y: 0 };

    this.chances = [1, 85, 7, 7];
    this.total = this.chances.reduce((a, b) => a + b, 0);
    this.matrices = [
      new Matrix( 0.0000, 0.0000, 0.0000, 0.1600, 0.0000, 0.0000),
      new Matrix( 0.8500, -0.0400, 0.0400, 0.8500, 0.0000, 1.6000),
      new Matrix( 0.2000, 0.2300, -0.2600, 0.2200, 0.0000, 1.6000),
      new Matrix(-0.1500, 0.2600, 0.2800, 0.2400, 0.0000, 0.4400)
    ];
  },

  iterate: function (canvas) {
    var random = Math.random() * this.total | 0;

    // select random transformation based on their probabilities
    for (var total = 0, i = 0; i < this.chances.length; i++) {
      total += this.chances[i];
      if (total >= random) {
        break;
      }
    }
    
    // apply affine transformation
    this.cursor = this.matrices[i].apply(this.cursor);

    // map internal point to the screen space
    //  we know it's oscilating between 
    //   (-2.1818, 2.6556) in x axis 
    //   and (0, 9.958510) in y axis  
    return {
      x: canvas.width / 2 + this.cursor.x * canvas.width / 5.5 | 0,
      y: canvas.height - this.cursor.y * canvas.height / 10 | 0
    };
  }
}
