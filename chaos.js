var counter = 0;
var limiter = 5000000;
var iterations = 1000;
var resolution = 10;

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 360 * resolution;
canvas.height = 240 * resolution;
context.imageSmoothingEnabled = true;

var image = context.getImageData(0, 0, canvas.width, canvas.height);
var buffer = new ArrayBuffer(image.data.length);
var uint8 = new Uint8Array(buffer);
var uint32 = new Uint32Array(buffer);

function animationFrame () {
  for (var i = 0; i < iterations; i++) {
    mode.iterate(canvas, uint32);
  }

  image.data.set(uint8);
  context.putImageData(image, 0, 0);

  if ((counter += iterations) < limiter) {
    requestAnimationFrame(animationFrame);
  }
}

// -- TRI --

var tri = {

  init: function (canvas) {
    this.nodes = [
      { x: canvas.width / 2, y: 20 },
      { x: 20, y: canvas.height - 20 },
      { x: canvas.width - 2, y: canvas.height - 20 }
    ];
    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };
  },

  iterate: function (canvas, screen) {
    var node = this.nodes[Math.random() * this.nodes.length | 0];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    var color = HSVToRGB(this.cursor.x / canvas.width, this.cursor.y / canvas.height, 0.75);
    screen[this.cursor.x + this.cursor.y * canvas.width] = color;
  }
};

// -- E O F --

// -- NGON --

var ngon = {

  init: function (canvas, sides) {
    this.nodes = [];

    this.cursor = {
      x: canvas.width / 2, y: canvas.height / 2
    };

    var radius = Math.min(canvas.width, canvas.height) / 2 - 40;
    var theta = - Math.PI / 2;

    for (var i = 0; i <= sides; i++) {
      this.nodes[i] = {
        x: radius * Math.cos(2 * Math.PI * i / sides + theta) + this.cursor.x,
        y: radius * Math.sin(2 * Math.PI * i / sides + theta) + this.cursor.y
      };
    }
  },

  iterate: function (canvas, screen) {
    do {
      var next = Math.random() * this.nodes.length | 0;
      if (this.neighbours) break; // just skip it
    } while ( (this.different && this.last == next)
      || (next + 1 + this.nodes.length) % this.nodes.length == this.last
      || (next - 1 + this.nodes.length) % this.nodes.length == this.last)
    
    var node = this.nodes[this.last = next];

    this.cursor.x += (node.x - this.cursor.x) >> 1;
    this.cursor.y += (node.y - this.cursor.y) >> 1;

    var color = HSVToRGB(this.cursor.x / canvas.width, this.cursor.y / canvas.height, 0.95);
    screen[this.cursor.x + this.cursor.y * canvas.width] = color;
  }
};

// -- FERN --

var fern = {

  init: function (canvas) {
    this.cursor = { x: 0, y: 0 };
    this.internal = { x: 0, y: 0 };

    this.matrices = [
      [ 0.0000,  0.0000,  0.0000,  0.1600,  0.0000,  0.0000,  1],
      [ 0.8500,  0.0400, -0.0400,  0.8500,  0.0000,  1.6000, 85],
      [ 0.2000, -0.2600,  0.2300,  0.2200,  0.0000,  1.6000,  7],
      [-0.1500,  0.2800,  0.2600,  0.2400,  0.0000,  0.4400,  7]
    ];
  },

  iterate: function (canvas, screen) {
    var random = Math.random() * 100 | 0;

    // select random transformation based on their probabilities
    for (var total = 0, i = 0; i < this.matrices.length; i ++) {
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

    screen[this.cursor.x + this.cursor.y * canvas.width] = 0xCC66CC66;
  }
};

function transform(point, matrix) {
  return {
    x: point.x * matrix[0] + point.y * matrix[1] + matrix[4],
    y: point.x * matrix[2] + point.y * matrix[3] + matrix[5]
  };
}

// -- E O F --

// -- INIT --

// choose one:
var mode = fern;

// or:
//var mode = fern;

/* or
var mode = ngon;
// determines if next node can be a neighbour
ngon.neighbours = false;
// determines if same node can be chosen twice in a row
ngon.different = true;
//*/

// launch
mode.init(canvas, 5);
animationFrame();

// -- HELPERS --

function HSVToRGB (h, s, v) {
  var i = h * 6 | 0;
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return 0xFF << 24 | v * 0xFF << 16 | t * 0xFF << 8 | p * 0xFF;
    case 1: return 0xFF << 24 | q * 0xFF << 16 | v * 0xFF << 8 | p * 0xFF;
    case 2: return 0xFF << 24 | p * 0xFF << 16 | v * 0xFF << 8 | t * 0xFF;
    case 3: return 0xFF << 24 | p * 0xFF << 16 | q * 0xFF << 8 | v * 0xFF;
    case 4: return 0xFF << 24 | t * 0xFF << 16 | p * 0xFF << 8 | v * 0xFF;
    case 5: return 0xFF << 24 | v * 0xFF << 16 | p * 0xFF << 8 | q * 0xFF;
  }
}
