export default {
  construct: function (width, height, sides, theta) {
    var nodes = [];

    var center = {
      x: width / 2, y: height / 2
    };

    var radius = Math.min(width, height) / 2;

    for (var i = 0; i < sides; i++) {
      nodes[i] = {
        x: radius * Math.cos(2 * Math.PI * i / sides + theta) + center.x,
        y: radius * Math.sin(2 * Math.PI * i / sides + theta) + center.y
      };
    }

    return nodes;
  }
};
