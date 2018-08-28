/**
 *  A traditional transformation matrix is represented as:
 *   [ a c e ]
 *   [ b d f ]
 *   [ u v w ]
 * 
 *  Since this matrix only operates in two dimensions we can assume,
 *   that u and v have always value of 0, while w has always value of 1.
 *  Additionally e and f components are often referred as tx and ty
 *   as their main purpose in two dimensional tranformations is translation.
 */
export default function Matrix(a, b, c, d, e, f) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
}

Matrix.prototype.apply = function (point) {
  return {
    x: point.x * this.a + point.y * this.c + this.e,
    y: point.x * this.b + point.y * this.d + this.f
  };
}
