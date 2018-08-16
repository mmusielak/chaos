var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 240;
context.imageSmoothingEnabled = false;

var image = context.getImageData(0, 0, canvas.width, canvas.height);
var buffer = new ArrayBuffer(image.data.length);
var uint8 = new Uint8Array(buffer);
var uint32 = new Uint32Array(buffer);

function animationFrame() {
  requestAnimationFrame(animationFrame);
  strategies[0].iterate(canvas, uint32, 100)
  image.data.set(uint8);
  context.putImageData(image, 0, 0);
}

var strategies = [
  {
    init: function (canvas) {
      this.anchors = [
        {x: canvas.width / 2, y: 20},
        {x: 20, y: canvas.height - 20},
        {x: canvas.width - 2, y: canvas.height - 20}
      ]
      this.cursor = {
        x: canvas.width/2,
        y: canvas.height/2
      }
    },
    iterate: function (canvas, screen, iterations) {
      for (var i = 0; i < iterations; i ++) {
        var anchor = this.anchors [Math.random() * this.anchors.length | 0];

        this.cursor.x += (anchor.x - this.cursor.x) >> 1;
        this.cursor.y += (anchor.y - this.cursor.y) >> 1;
    
        screen [this.cursor.x + this.cursor.y * canvas.width] = 0x77FFFFFF;
      }
    }
  }
]

strategies[0].init(canvas)

animationFrame();
