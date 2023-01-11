//  JAVSCRIPT IMPLEMENTATION OF IMPROVED NOISE   -   COPYRIGHT 2002 KEN PERLIN.
const p = new Array(512);
const permutation = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
];

for (let i = 0; i < 256; i++) {
  p[256 + i] = p[i] = permutation[i];
}

const fade = (t) => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

const lerp = (t, a, b) => {
  return a + t * (b - a);
};

const grad = (hash, x, y, z) => {
  const h = hash & 15;
  const u = h < 8 ? x : y,
    v = h < 4 ? y : h == 12 || h == 14 ? x : z;
  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
};

class ImprovedNoise {
  static noise(x, y, z) {
    const X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x),
      v = fade(y),
      w = fade(z);
    const A = p[X] + Y,
      AA = p[A] + Z,
      AB = p[A + 1] + Z,
      B = p[X + 1] + Y,
      BA = p[B] + Z,
      BB = p[B + 1] + Z;

    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
        lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
      ),
      lerp(
        v,
        lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
        lerp(
          u,
          grad(p[AB + 1], x, y - 1, z - 1),
          grad(p[BB + 1], x - 1, y - 1, z - 1)
        )
      )
    );
  }
}

var levels = new Array(
  "  ",
  "..",
  "::",
  "--",
  "==",
  "##",
  "@@",
  "&&",
  "&&",
  "&&",
  "&&"
);
var currentTime = new Date()
var firsttime = currentTime.getTime()
function initial() {
  currentTime = new Date()
  firsttime = currentTime.getTime()
}

var playx = 0.0;
var playy = 0.0;

var width = 100;
function stringBuild(time) {
  var theString = "";
  for(let j = window.innerHeight/32; j > 0; j--) {
    for(let i = 0; i < window.innerWidth/32; i++) {
      theString += levels[parseInt((10.0 + parseInt(ImprovedNoise.noise(parseFloat((i + playx)/25.1), parseFloat(j + playy)/25.1, 10.2)*10))/2)];
    }
    theString += "\n";
  }
  return theString;

}

var deltaTime = 0;

function updateTime(){

  var currentTime = new Date()
  var time = currentTime.getTime()
  
  deltaTime += time - firsttime;
  var smallstep = 10;
  while(deltaTime > smallstep) {
    deltaTime -= smallstep;
  }

  
  
  
  document.getElementById('time_span').innerHTML = "<pre><strong>" + stringBuild(time) + "</strong></pre>";

  if(key != "null") {
    switch (key) {
      case "ArrowDown": case "s": case "S":
        playy-= 1.1*(deltaTime/8);
        break;
      case "ArrowUp": case "w": case "W":
        playy+= 1.1*(deltaTime/8);
        break;
      case "ArrowLeft": case "a": case "A":
        playx-= 1.1*(deltaTime/8);
        break;
      case "ArrowRight": case "d": case "D":
        playx += 1.1*(deltaTime/8);
        break;
      default:
        key = "null"; // Quit when this doesn't handle the key event.
    }
  }
  
}


var key = "";

var currTouchX = 0;
var currTouchY = 0;

window.addEventListener("touchstart", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  for(var i = 0; i < event.touches.length; i++) {
    currTouchX = event.touches[i].pageX;
    currTouchY = event.touches[i].pageY;
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

window.addEventListener("touchmove", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  for(var i = 0; i < event.changedTouches.length; i++) {
    playx += (event.changedTouches[i].pageX - currTouchX)/16;
    playy += (event.changedTouches[i].pageY - currTouchY)/16;
    currTouchX = event.changedTouches[i].pageX;
    currTouchY = event.changedTouches[i].pageY;
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  key = event.key;

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window

initial();
setInterval(updateTime, 0);