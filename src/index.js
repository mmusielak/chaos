// -- CONFIGURATION --

var counter = 0;
var limiter = 500000;
var iterations = 5000;
var resolution = 8;

var label = document.querySelector('footer');

// -- PIXEL BUFFER --

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

// -- MODES --

import fern from 'fractals/fern';
import fern_simplified from 'fractals/fern-simplified';
import square from 'fractals/square';
import hexagon from 'fractals/hexagon';
import square1 from 'fractals/square-1';
import diff from 'fractals/square-diff';
import even from 'fractals/even-square';
import pentagon_diff from 'fractals/pentagon-diff';
import nonagon from 'fractals/nonagon';
import ngon from 'fractals/ngon';
import triangle from 'fractals/triangle';
import triangle_ifs from 'fractals/triangle-ifs';

var mode = 0;
var fractal = fern;
var fractals = [
  fern, fern_simplified,
  hexagon,
  nonagon, ngon,
  pentagon_diff,
  square, square1, diff, even,
  triangle, triangle_ifs
];

fractals.forEach(f => f.init(canvas.width, canvas.height));

window.addEventListener('keydown', (e) => {
  var delta = 0;
  if (event.keyCode == 37) {
    delta = -1;
  }
  if (event.keyCode == 39) {
    delta = 1;
  }
  if (delta) {
    mode = (fractals.length + mode + delta) % fractals.length;

    fractal = fractals[mode];
    fractal.init(canvas.width, canvas.height);

    counter = 0;

    label.innerHTML = fractal.id.toString();

    for (var i = 0; i < uint32.length; i++) {
      uint32[i] = 0xFF000000;
    }
    requestAnimationFrame(animationFrame);
  }
});

// -- LOOP --

function animationFrame() {
  for (var i = 0; i < iterations; i++) {
    var cursor = fractal.iterate(canvas.width, canvas.height);
    var color = HSVtoRGB(cursor.x / canvas.width, cursor.y / canvas.height, 1);

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
