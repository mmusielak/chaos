// -- CONFIGURATION --

var counter = 0;
var limiter = 1000000;
var iterations = 50000;
var resolution = 2;

// -- DOM ELEMENTS --

var canvas = document.querySelector('canvas');
var label = document.querySelector('footer');

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

var index = 0;
var fractals = [
  fern, fern_simplified,
  hexagon,
  nonagon, ngon,
  pentagon_diff,
  square, square1, diff, even,
  triangle, triangle_ifs
];

fractals.forEach(f => f.init(canvas.width, canvas.height));

function init(idx) {
  index = idx;
  var fractal = fractals[index];
  fractal.init(canvas.width, canvas.height);
  label.innerHTML = fractal.id.toString();

  // reset
  counter = 0;

  // paint it black (good for screenshots)
  for (var i = 0; i < uint32.length; i++) {
    uint32[i] = 0xFF000000;
  }

  /*
  var vertices = fractal.nodes;
  if (vertices) {
    for (var i = 1; i < vertices.length; i++) {
      line(vertices[i - 1].x, vertices[i - 1].y, vertices[i].x, vertices[i].y);
    }
  }
  */

  requestAnimationFrame(animationFrame);
}

// -- PIXEL BUFFER --

var context = canvas.getContext('2d');

canvas.width = 360 * resolution;
canvas.height = 240 * resolution;
context.imageSmoothingEnabled = true;

var image = context.getImageData(0, 0, canvas.width, canvas.height);
var buffer = new ArrayBuffer(image.data.length);
var uint8 = new Uint8Array(buffer);
var uint32 = new Uint32Array(buffer);

// -- MODES CYCLE --

window.addEventListener('keydown', (e) => {
  if (event.keyCode == 37) {
    init((index - 1 + fractals.length) % fractals.length);
  }
  if (event.keyCode == 39) {
    init((index + 1 + fractals.length) % fractals.length);
  }
});

// -- LOOP --

function animationFrame() {
  var fractal = fractals[index];

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
    //    alert(1)
    console.info(`${counter} pixels were drawn.`);
  }
}

init(0);

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
