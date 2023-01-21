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
<<<<<<< Updated upstream
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
=======
  "@@",
  "%%",
  "##",
  "==",
  "==",
  "::",
  "..",
  "  ",
  "  ",
  "  ",
  "  ",
  "  ",
);
var currentTime = new Date()

let deltaTime = 0;


var playx = 0.0;
var playy = 0.0;

let mobSkins = [];

const defaultSkin = [
  "@@  @@"+
  "  @@  "+
  "@@  @@"+
  "  ##  "+
  "##  ##",

  "@@    "+
  "()@@  "+
  "  ##@@"+
  "[][][]"+
  "##  ##",
  
  "  @@  "+
  "()##()"+
  "  @@  "+
  "[]##[]"+
  "##  ##",

  "    @@"+
  "  @@()"+
  "@@##  "+
  "[][][]"+
  "##  ##"
]
const ginkSkin = //w, a, s, d 
[
    "%%%%%%%%%%%%%%" +
    "%%%%@@@@@@%%%%" +
    "%%@@@@@@@@@@%%" +
    "%%@@@@@@@@@@%%" +
    "%%@@@@@@@@@@%%" +
    "%%@@%%@@@@@@%%" +
    "%%%%%%%%%%%%%%",

    "%%%%%%%%%%%%%%" +
    "%%%%@@@@@@%%%%" +
    "%%  ::@@@@@@%%" +
    "%%@@@@@@@@@@%%" +
    "::::@@@@@@@@%%" +
    "%%@@%%@@@@@@%%" +
    "%%%%%%%%%%%%%%",

    "%%%%%%%%%%%%%%" +
    "%%%%@@@@@@%%%%" +
    "%%::  @@  ::%%" +
    "%%@@@@@@@@@@%%" +
    "%%@@::::::@@%%" +
    "%%@@%%@@@@@@%%" +
    "%%%%%%%%%%%%%%",

    "%%%%%%%%%%%%%%" +
    "%%%%@@@@@@%%%%" +
    "%%@@@@@@::  %%" +
    "%%@@@@@@@@@@%%" +
    "%%@@@@@@@@::::" +
    "%%@@%%@@@@@@%%" +
    "%%%%%%%%%%%%%%",
];

mobSkins.push(defaultSkin)
mobSkins.push(ginkSkin)

var mobiles = [];
var statics = new Map();

function Mob(xa, ya) {

  var mob = {
    x: xa,
    y: ya,
    myIndex: mobiles.length
  };

  //mob.skin = skin;
  
  mobiles.set(xa+","+ya, mob);
}

Mob.prototype.setPosition = function(xa, ya) {
  //mobiles[this.myIndex].x = xa;
  //mobiles[this.myIndex].y = ya;
>>>>>>> Stashed changes
}

var x = 0.0;
var y = 0.0;

<<<<<<< Updated upstream
var width = 100;
function stringBuild(time) {
  var theString = "";
  for(let j = window.innerHeight/16; j > 0; j--) {
    for(let i = 0; i < window.innerWidth/16; i++) {
      theString += levels[parseInt((10.0 + parseInt(ImprovedNoise.noise(parseFloat((i + x)/25.1), parseFloat(j + y)/25.1, 10.2)*10))/2)];
=======
for(let i = 0; i < 1300; i++) {
  let x = (Math.random()*2000)-1000
  let y = (Math.random()*2000)-1000
  let rock = {
    x: x,
    y: y,
    width: 8,
    height: 4,
    thing:
    "000@@#00"+
    "0#@@@##0" +
    ":##@@@##" +
    ".::###@#" 
  }
  statics.set(parseInt(x)+","+parseInt(y),rock);
}

for(let i = 0; i < 5000; i++) {
  let x = (Math.random()*2000)-1000
  let y = (Math.random()*2000)-1000
  let tree = {
    x: x,
    y: y,
    width: 26,
    height: 14,
    thing: makeTree()
  }
  statics.set(parseInt(x)+","+parseInt(y), tree);
  }


player = {
  x: 0,
  y: 0,
  myIndex: mobiles.length,
  direction: 0,
  foottimer: 0.0,
  isWalking: false,
  leftfoot: false,
  id: 1,
  width:7,
  height:7
}
mobiles.push(player)

player2 = {
  x: 0,
  y: 0,
  myIndex: mobiles.length,
  direction: 3,
  foottimer: 0.0,
  isWalking: false,
  leftfoot: false,
  id: 0,
  width:3,
  height:5
}
mobiles.push(player2)

player3 = {
  x: 14,
  y: 6,
  myIndex: mobiles.length,
  direction: 2,
  foottimer: 0.0,
  isWalking: false,
  leftfoot: false,
  id: 0,
  width:3,
  height:5
}
mobiles.push(player3)

playheight = window.innerHeight/24;
playwidth = window.innerWidth/18;
let statOverscan = 12;
let timerr = 0;

function noiseValueFromCoord(i, j, scale, offset) {
  let heel1 = ImprovedNoise.noise(parseFloat((i)/200.1), parseFloat(j)/200.1, 7.2)*levels.length+2;
  let heel = parseInt((ImprovedNoise.noise(parseFloat((i)/50.1), parseFloat(j)/50.1, 10.2)*levels.length+2) + parseFloat(heel1));
  if(scale != null && offset === null) {
    return heel*scale;
  } else
  if(scale != null && offset != null) {
    return (heel+offset) * scale;
  } else {
    return heel;
  }
}

function isWater(x, y) {
  return (noiseValueFromCoord(parseInt(x), parseInt(y)) < 1)
}

let waterInterval = 0;
function stringBuild(time) {
  waterInterval = 0
  let isInScreen = false;
  playheight = window.innerHeight/24;
  playwidth = window.innerWidth/18;
  var theString = "";
  let mobSpots = [];
  let statSpots = new Map();
  for(let j = playheight + statOverscan; j > 0; j--) {
    for(let i = -statOverscan; i < playwidth + statOverscan; i++) {
      let iterationX = i+playx;
      let iterationY = j+playy;
      let heel = noiseValueFromCoord(i+playx, j+playy);
      let isMob = false;
      let isStat = false;
      let coordChar = parseInt(iterationX)+","+parseInt(iterationY)
      if(statics.has(coordChar)) {
        let static = statics.get(coordChar)
        let statWidth = static.width;
        let statHeight = static.height;
        for(let t = 0; t < statHeight; t++) {
          for(let c = 0; c < statWidth; c++) {
            let charOfTheStat = static.thing.charAt((t*statWidth)+c) 
            if(charOfTheStat != "0") {
              var statPixel = {
                x: parseInt(iterationX) + c,
                y: parseInt(iterationY) - t,
                brick: "" + charOfTheStat + charOfTheStat,
                statX: iterationX,
                statY: iterationY,
                sHeight: statHeight
              };
              if(!statSpots.has(parseInt(iterationX+c)+","+parseInt(iterationY-t))) {
                statSpots.set(parseInt(iterationX+c)+","+parseInt(iterationY-t), statPixel);
              }
            }
          }
        }

      }
      for(let a = 0; a < mobiles.length; a++) {
        let mobY = ((isWater(mobiles[a].x, mobiles[a].y)) ? Math.min(Math.floor(mobiles[a].y+noiseValueFromCoord(mobiles[a].x, mobiles[a].y, 1, 0)), mobiles[a].y) : mobiles[a].y) + mobiles[a].height;
        let mobX = mobiles[a].x-Math.floor(mobiles[a].width/2)
        if(parseInt(mobX) === parseInt(iterationX) && parseInt(mobY) === parseInt(iterationY)) {
          isMob = true;
          let mobID = mobiles[a].id;
          let mobWidth = mobiles[a].width;
          let isInWater = isWater(mobiles[a].x, mobiles[a].y)
          let mobHeight = (isInWater) ? Math.floor(Math.min(mobiles[a].height+(noiseValueFromCoord(mobiles[a].x, mobiles[a].y, 1, 0)), mobiles[a].height)) : mobiles[a].height


          if(mobiles[a].isWalking) {
            if(mobiles[a].foottimer > 100) {
              mobiles[a].leftfoot = !mobiles[a].leftfoot;
              mobiles[a].foottimer = 0;
            } else {
            mobiles[a].foottimer += deltaTime*5;
            }
          }
          for(let m = 0; m < mobHeight; m++) {
            for(let o = 0; o < mobWidth; o++) {
              var mobPixel = {
                x: parseInt(iterationX) + o,
                y: parseInt(iterationY) - m,
                brick: "" + mobSkins[mobID][mobiles[a].direction].charAt((((m*mobWidth)+o)*2)) + mobSkins[mobID][mobiles[a].direction].charAt((((m*mobWidth)+o)*2) + 1),
                mobX: iterationX,
                mobY: iterationY
              };
              if(!isInWater) {
                if(o === mobWidth-1 && m === mobHeight-1) {
                  if(mobiles[a].leftfoot) {
                    mobPixel.brick = "  ";
                  }
                }
                if(o === 0 && m === mobHeight-1) {
                  if(!mobiles[a].leftfoot) {
                    mobPixel.brick = "  ";
                  }
                }
              }
              mobSpots.unshift(mobPixel);
            }
          }
          
        }
      }
      let rightnowbrick = "";
      let mobPix;
      for(let v = 0; v < mobSpots.length; v++) {
        if(mobSpots[v].x === parseInt(iterationX) && mobSpots[v].y === parseInt(iterationY)) {
          rightnowbrick = mobSpots[v].brick;
          isMob = true;
          mobPix = mobSpots[v];
        }
      }
      if(statSpots.has(coordChar)) {
        let statPix = statSpots.get(coordChar)
          if(isMob) {
            if(mobPix.mobY-3 > statPix.statY - statPix.sHeight) {
              rightnowbrick = statPix.brick;
            }
          } else {
          rightnowbrick = statPix.brick;
          }
          isStat = true;
      }
      if(i > 0 && i < playwidth && j > 0 && j < playheight) {
        isInScreen = true;
        if(isMob || isStat) {
          theString += rightnowbrick;
        }else  {
          if(heel <= levels.length-1 && heel > 0) {
            theString += levels[heel];
          } else {
            if(heel > levels.length-1) {
              theString += "  ";
            } else {
              let date = new Date()
              if(parseInt(ImprovedNoise.noise(parseFloat(iterationX)/10, parseFloat(iterationY)/10, date.getTime()/10000)*10) === 0 && parseInt((iterationY*playwidth)+iterationX)%4 === 0) {
                theString += levels[0]
              } else {
                theString += "@@"
              }
            }
          }
        }
      }
    }
    if(isInScreen) {
      theString += "\n";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  if(waterTimer > 100) {
    waterTimer = 0;
    water2 = !water2;
  } else {
    waterTimer += deltaTime;
  }
  if(water2) {
    levels[0] = "@."
  } else {
    levels[0] = ".@"
  }
>>>>>>> Stashed changes
  
  
  
  document.getElementById('time_span').innerHTML = "<pre><strong>" + stringBuild(time) + "</strong></pre>";

  if(key != "null") {
    switch (key) {
      case "ArrowDown": case "s": case "S":
        y-= 1.1*(deltaTime/8);
        break;
      case "ArrowUp": case "w": case "W":
        y+= 1.1*(deltaTime/8);
        break;
      case "ArrowLeft": case "a": case "A":
        x-= 1.1*(deltaTime/8);
        break;
      case "ArrowRight": case "d": case "D":
        x += 1.1*(deltaTime/8);
        break;
      default:
        key = "null"; // Quit when this doesn't handle the key event.
    }
  }
  
}

<<<<<<< Updated upstream
=======
let color1 = document.getElementById("foreColor")
let color2 = document.getElementById("backColor")
color1.oninput = setUserColor
color2.oninput = setUserColor

let terminal = document.querySelector(".terminal");
let form = document.querySelector("form");

form.onsubmit = function(event) {
  event.preventDefault();
  let text = document.getElementById("inputText").value;
  let msg = document.createElement("p");
  msg.textContent = text;
  msg.setAttribute("id", "chatmsg")
  terminal.appendChild(msg);
  form.reset("#FFFFFF");
}

function setUserColor() {
  let color1 = document.getElementById("foreColor").value
  let color2 = document.getElementById("backColor").value
  let html = document.querySelector("html")
  if(color1 != "#000000") {
    html.style.color = color1
  }
  html.style.backgroundColor = color2
}

function removeChatMsg() {
  if(document.querySelector("#chatmsg") != null) {
    terminal.removeChild(document.querySelector("#chatmsg"));
  }
}
>>>>>>> Stashed changes

var key = "d"
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
<<<<<<< Updated upstream
=======
let deltaTimes = 0;
let amtToAverage = 50;
for(let i = 0; i < amtToAverage; i++) { //get an average delta time to speed the game ticks out
updateTime();
  deltaTimes += deltaTime;
}
deltaTime = deltaTimes/amtToAverage;
//console.log(deltaTime);
setInterval(updateTime, 30);
>>>>>>> Stashed changes

initial();
setInterval(updateTime, 0);