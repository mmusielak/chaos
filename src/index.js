var counter = 0;
var limiter = 5000000;
var iterations = 10000;
var resolution = 2;

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 360 * resolution;
canvas.height = 240 * resolution;
context.imageSmoothingEnabled = true;

var image = context.getImageData(0, 0, canvas.width, canvas.height);
var buffer = new ArrayBuffer(image.data.length);
var uint8 = new Uint8Array(buffer);
var uint32 = new Uint32Array(buffer);

// paint it black (good for screenshots)
for (var i = 0; i < uint32.length; i++) {
  uint32[i] = 0xFF000000;
}

import tri from './fractals/triangle';
tri.init(canvas);
import sq from './fractals/square';
sq.init(canvas);
import fern from './fractals/fern';
fern.init(canvas);
import ngon from './fractals/ngon';
ngon.init(canvas, 5);

var fractal = sq;

function animationFrame() {
  for (var i = 0; i < iterations; i++) {
    var cursor = fractal.iterate(canvas);
    var color = HSVtoRGB(cursor.x / canvas.width, cursor.y / canvas.height, 0.75);

    uint32[cursor.x + cursor.y * canvas.width] = color;
  }

  // update canvas
  image.data.set(uint8);
  context.putImageData(image, 0, 0);

  // if limit was reached stop iterating
  if ((counter += iterations) < limiter) {
    requestAnimationFrame(animationFrame);
  } else {
    console.info(`${counter} pixels were drawn.`);
  }
}

animationFrame();

// -- HELPERS --

function HSVtoRGB(h, s, v) {
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
