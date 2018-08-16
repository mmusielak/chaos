var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 240;
context.imageSmoothingEnabled = false;

var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

var buf = new ArrayBuffer(imageData.data.length);
var buf8 = new Uint8ClampedArray(buf);
var pixels = new Uint32Array(buf);

var anchors = [
  {x: 180, y: 20}, 
  {x: 20, y: 220}, 
  {x: 340, y: 220}
]

var cursor = {x: 180, y: 20}

function animationFrame() {
  requestAnimationFrame(animationFrame);

  for (var i = 0; i < 1; i ++) {
    var target = anchors [Math.random() * 3 | 0];
    
    cursor.x += (target.x - cursor.x) >> 1;
    cursor.y += (target.y - cursor.y) >> 1;

    pixels [cursor.x + cursor.y * canvas.width] = 0x77FFFFFF;
  }
  
  imageData.data.set(buf8);

  context.putImageData(imageData, 0, 0);
}

animationFrame();
