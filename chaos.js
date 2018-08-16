var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var resolution = 10;
canvas.width = 360 * resolution;
canvas.height = 240 * resolution;
context.imageSmoothingEnabled = false;

var image = context.getImageData(0, 0, canvas.width, canvas.height);
var buffer = new ArrayBuffer(image.data.length);
var uint8 = new Uint8Array(buffer);
var uint32 = new Uint32Array(buffer);

function animationFrame() {
  requestAnimationFrame(animationFrame);
  mode.iterate(canvas, uint32, 1000)
  image.data.set(uint8);
  context.putImageData(image, 0, 0);
}

var strategies = [{
    init: function (canvas) {
      this.anchors = [{
          x: canvas.width / 2,
          y: 20
        },
        {
          x: 20,
          y: canvas.height - 20
        },
        {
          x: canvas.width - 2,
          y: canvas.height - 20
        }
      ]
      this.cursor = {
        x: canvas.width / 2,
        y: canvas.height / 2
      }
    },
    iterate: function (canvas, screen, iterations) {
      for (var i = 0; i < iterations; i++) {
        var anchor = this.anchors[Math.random() * this.anchors.length | 0];

        this.cursor.x += (anchor.x - this.cursor.x) >> 1;
        this.cursor.y += (anchor.y - this.cursor.y) >> 1;

        screen[this.cursor.x + this.cursor.y * canvas.width] = 0x77FFFFFF;
      }
    }
  },
  {
    init: function (canvas) {
      this.cursor = {
        x: 0,
        y: 0
      }
    },
    iterate: function (canvas, screen, iterations) {
      for (var i = 0; i < iterations; i++) {
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
    }
  },
  // 
  {
    init: function (canvas, sides) {
      this.anchors = [];
      var center = {
        x: canvas.width / 2,
        y: canvas.height / 2
      }
      var radius = Math.min(canvas.width, canvas.height) / 2 - 40;
      var theta = 0;
      for (var i = 0; i <= sides; i++) {
        this.anchors[i] = {
          x: radius * Math.cos(2 * Math.PI * i / sides - Math.PI / 2) + center.x,
          y: radius * Math.sin(2 * Math.PI * i / sides - Math.PI / 2) + center.y
        }
      }
      this.cursor = {
        x: this.anchors[0].x,
        y: this.anchors[0].y
      }
    },
    iterate: function (canvas, screen, iterations) {
      for (var i = 0; i < iterations; i++) {
        do {
          n = Math.random() * this.anchors.length | 0;
        } while (this.n == n);
        this.n = n;
        var anchor = this.anchors[n];

        this.cursor.x += (anchor.x - this.cursor.x) >> 1;
        this.cursor.y += (anchor.y - this.cursor.y) >> 1;

        screen[this.cursor.x + this.cursor.y * canvas.width] = colors[n % colors.length];
      }
    }
  }
];

var colors = [
  0xFF50514F,
  0xFFF25F5C,
  0xFFFFE066,
  0xFF247BA0,
  0xFF70C1B3
];

var mode = strategies[1];
mode.init(canvas, 5)

animationFrame();