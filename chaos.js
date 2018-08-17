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

var strategies = [//
  {
    init: function (canvas) {
      this.anchors = [
        { x: canvas.width / 2, y: 20 },
        { x: 20, y: canvas.height - 20 },
        { x: canvas.width - 2, y: canvas.height - 20 }
      ];
      this.cursor = {
        x: canvas.width / 2, y: canvas.height / 2
      };
    },
    iterate: function (canvas, screen) {
      var anchor = this.anchors[Math.random() * this.anchors.length | 0];

      this.cursor.x += (anchor.x - this.cursor.x) >> 1;
      this.cursor.y += (anchor.y - this.cursor.y) >> 1;

      var color = HSVToRGB(this.cursor.x / canvas.width, this.cursor.y / canvas.height, 0.5);
      screen[this.cursor.x + this.cursor.y * canvas.width] = color;
    }

  },
  //
  {
    init: function (canvas) {
      this.cursor = { x: 0, y: 0 };
    },
    iterate: function (canvas, screen) {
      var nx = 0;
      var ny = 0;
      var r = Math.random();

      if (r <= 0.01) { // F1 (1%)
        nx = 0.00;
        ny = 0.16 * this.cursor.y;
      } else if (r <= 0.86) { // F2 (85%)
        nx = 0.85 * this.cursor.x + 0.04 * this.cursor.y + 0.00;
        ny = -0.04 * this.cursor.x + 0.85 * this.cursor.y + 1.60;
      } else if (r <= 0.94) { // F3 (7%)
        nx = 0.20 * this.cursor.x - 0.26 * this.cursor.y + 0.00;
        ny = 0.23 * this.cursor.x + 0.22 * this.cursor.y + 1.60;
      } else { // F4 (7%)
        nx = -0.15 * this.cursor.x + 0.28 * this.cursor.y + 0.00;
        ny = 0.26 * this.cursor.x + 0.24 * this.cursor.y + 0.44;
      }

      this.cursor.x = nx;
      this.cursor.y = ny;

      var sx = canvas.width / 2 + nx * canvas.width / 5.5 | 0;
      var sy = canvas.height - ny * canvas.height / 10 | 0;

      screen[sx + sy * canvas.width] = 0xCC66CC66;
    }
  },
  //
  {
    init: function (canvas, sides) {
      this.anchors = [];

      var center = { 
        x: canvas.width / 2, y: canvas.height / 2 
      };

      var radius = Math.min(canvas.width, canvas.height) / 2 - 40;
      var theta = - Math.PI / 2;

      for (var i = 0; i <= sides; i++) {
        this.anchors[i] = {
          x: radius * Math.cos(2 * Math.PI * i / sides + theta) + center.x,
          y: radius * Math.sin(2 * Math.PI * i / sides + theta) + center.y
        };
      }

      this.cursor = {
        x: canvas.width / 2, y: canvas.height / 2
      };
    },
    iterate: function (canvas, screen) {
      do {
        var next = Math.random() * this.anchors.length | 0;
      } while (
        (next + 3 + this.anchors.length) % this.anchors.length == this.next ||
        (next - 3 + this.anchors.length) % this.anchors.length == this.next || this.next == next)
      
      this.next = next;

      var anchor = this.anchors[next];

      this.cursor.x += (anchor.x - this.cursor.x) >> 1;
      this.cursor.y += (anchor.y - this.cursor.y) >> 1;

      var color = HSVToRGB(this.cursor.x / canvas.width, this.cursor.y / canvas.height, 0.95);
      screen[this.cursor.x + this.cursor.y * canvas.width] = color;
    }
  }
]

var mode = strategies[1];
mode.init(canvas, 9);

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
