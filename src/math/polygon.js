export default {
  construct: function (width, height, sides, theta) {
    var vertices = [];

    var radius = Math.min(width, height) / 2;

    for (var i = 0; i < sides; i++) {
      vertices[i] = {
        x: radius * Math.cos(2 * Math.PI * i / sides + theta) + width / 2,
        y: radius * Math.sin(2 * Math.PI * i / sides + theta) + height / 2
      };
    }

    return vertices;
  }
};
