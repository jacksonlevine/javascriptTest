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

onload = function() {
var levels = new Array(
  "gg",
  "gg",
  "gg",
  "gg",
  "gg",
  "aa",
  "nn",
  "rr",
  "pp",
  "ss",
  "oo",
  "qq",
);
var currentTime = new Date()

let deltaTime = 0;


var playx = 0.0;
var playy = 0.0;

let mobSkins = [];

const defaultSkin = [
  "qqggqq"+
  "ggqqgg"+
  "qqggqq"+
  "ggoogg"+
  "ooggoo",

  "qqgggg"+
  "xxqqgg"+
  "ggooqq"+
  "yyyyyy"+
  "ooggoo",
  
  "ggqqgg"+
  "xxooxx"+
  "ggqqgg"+
  "yyooyy"+
  "ooggoo",

  "ggggqq"+
  "ggqqxx"+
  "qqoogg"+
  "yyyyyy"+
  "ooggoo"
]
const ginkSkin = //w, a, s, d 
[
    "pppppppppppppp" +
    "ppppqqqqqqpppp" +
    "ppqqqqqqqqqqpp" +
    "ppqqqqqqqqqqpp" +
    "ppqqqqqqqqqqpp" +
    "ppqqppqqqqqqpp" +
    "pppppppppppppp",

    "pppppppppppppp" +
    "ppppqqqqqqpppp" +
    "ppggaaqqqqqqpp" +
    "ppqqqqqqqqqqpp" +
    "aaaaqqqqqqqqpp" +
    "ppqqppqqqqqqpp" +
    "pppppppppppppp",

    "pppppppppppppp" +
    "ppppqqqqqqpppp" +
    "ppaaggqqggaapp" +
    "ppqqqqqqqqqqpp" +
    "ppqqaaaaaaqqpp" +
    "ppqqppqqqqqqpp" +
    "pppppppppppppp",

    "pppppppppppppp" +
    "ppppqqqqqqpppp" +
    "ppqqqqqqaaggpp" +
    "ppqqqqqqqqqqpp" +
    "ppqqqqqqqqaaaa" +
    "ppqqppqqqqqqpp" +
    "pppppppppppppp",
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
  
  mobiles.unshift(mob);
}

Mob.prototype.setPosition = function(xa, ya) {
  //mobiles[this.myIndex].x = xa;
  //mobiles[this.myIndex].y = ya;
}

function Player(xa, ya) {
  //Inherits from Mob
  Mob.call(xa, ya);
}

Player.prototype = Object.create(Mob.prototype);

for(let i = 0; i < 1300; i++) {
  let x = (Math.random()*2000)-1000
  let y = (Math.random()*2000)-1000
let rock = {
  x: x,
  y: y,
  width: 8,
  height: 4,
  thing:
  "000qqo00"+
  "0oqqqoo0" +
  "aooqqqoo" +
  "gaaoooqo" 
}
statics.set(parseInt(x)+","+parseInt(y), rock);
}

for(let i = 0; i < 2000; i++) {
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

  for(let i = 0; i < 3000; i++) {
    let x = (Math.random()*2000)-1000
    let y = (Math.random()*2000)-1000
    let tree = {
      x: x,
      y: y,
      width: 25,
      height: 25,
      thing: makeBigTree()
    }
    statics.set(parseInt(x)+","+parseInt(y), tree);
    }

    for(let i = 0; i < 2000; i++) {
      let x = (Math.random()*2000)+1000
      let y = (Math.random()*2000)+500
      let tree = {
        x: x,
        y: y,
        width: 26,
        height: 14,
        thing: makeTree()
      }
      statics.set(parseInt(x)+","+parseInt(y), tree);
      }
    
    for(let i = 0; i < 3000; i++) {
      let x = (Math.random()*2000)+7000
      let y = (Math.random()*2000)+750
      let tree = {
        x: x,
        y: y,
        width: 25,
        height: 25,
        thing: makeBigTree()
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
let statOverscan = 20;
let timerr = 0;

function noiseValueFromCoord(i, j, scale, offset) {
  let heel2 = ImprovedNoise.noise(parseFloat((i)/5.1), parseFloat(j)/5.1, 7.2)*2;
  let heel1 = ImprovedNoise.noise(parseFloat((i)/300.1), parseFloat(j)/300.1, 7.2)*levels.length+2;
  let heel = parseInt((ImprovedNoise.noise(parseFloat((i)/50.1), parseFloat(j)/50.1, 10.2)*levels.length+2) + parseFloat(heel1)+ parseFloat(heel2));
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
let mobSpots = new Map();
let statSpots = new Map();
let waterInterval = 0;
function stringBuild(time) {
  waterInterval = 0
  let isInScreen = false;
  playheight = window.innerHeight/24;
  playwidth = window.innerWidth/24;
  var theString = "";
  mobSpots = new Map();
  statSpots = new Map();
  for(let j = playheight + statOverscan; j > 0; j--) {
    for(let i = -statOverscan; i < playwidth + statOverscan; i+= 19) {
      theString += oneCharStringBuild(i, j);
      theString += oneCharStringBuild(i+1, j);
      theString += oneCharStringBuild(i+2, j);
      theString += oneCharStringBuild(i+3, j);
      theString += oneCharStringBuild(i+4, j);
      theString += oneCharStringBuild(i+5, j);
      theString += oneCharStringBuild(i+6, j);
      theString += oneCharStringBuild(i+7, j);
      theString += oneCharStringBuild(i+8, j);
      theString += oneCharStringBuild(i+9, j);
      theString += oneCharStringBuild(i+10, j);
      theString += oneCharStringBuild(i+11, j);
      theString += oneCharStringBuild(i+12, j);
      theString += oneCharStringBuild(i+13, j);
      theString += oneCharStringBuild(i+14, j);
      theString += oneCharStringBuild(i+15, j);
      theString += oneCharStringBuild(i+16, j);
      theString += oneCharStringBuild(i+17, j);
      theString += oneCharStringBuild(i+18, j);
    }
    if(j < playheight) {
      theString += "\n";
    }
  }
  return theString;
}



function oneCharStringBuild(i, j) {
  waterInterval = 0
  var theString = "";
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
                  statSpots.set(parseInt(iterationX+c)+","+parseInt(iterationY-t),statPixel);
                }
              }
            }
          }

      }
      for(let a = 0; a < mobiles.length; a++) {
        let mobY = ((isWater(mobiles[a].x, mobiles[a].y)) ? Math.min(Math.floor(mobiles[a].y+noiseValueFromCoord(mobiles[a].x, mobiles[a].y, 1, 0)), mobiles[a].y) : (mobiles[a].y+noiseValueFromCoord(mobiles[a].x, mobiles[a].y, .5, 0))) + mobiles[a].height;
        let mobX = mobiles[a].x-Math.floor(mobiles[a].width/2)
        if(parseInt(mobX) === parseInt(iterationX) && parseInt(mobY) === parseInt(iterationY)) {
          let mobID = mobiles[a].id;
          let mobWidth = mobiles[a].width;
          let isInWater = isWater(mobiles[a].x, mobiles[a].y)
          let mobHeight = (isInWater) ? Math.floor(Math.min(mobiles[a].height+(noiseValueFromCoord(mobiles[a].x, mobiles[a].y, 1, -1)), mobiles[a].height)) : mobiles[a].height

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
                    mobPixel.brick = "gg";
                  }
                }
                if(o === 0 && m === mobHeight-1) {
                  if(!mobiles[a].leftfoot) {
                    mobPixel.brick = "gg";
                  }
                }
              }
              if(!mobSpots.has(parseInt(iterationX + o)+","+parseInt(iterationY-m))) {
                mobSpots.set(parseInt(iterationX + o)+","+parseInt(iterationY-m), mobPixel);
              }
            }
          }
          
        }
      }
      let mobPix = {}
      let rightnowbrick = ""
      if(mobSpots.has(coordChar)) {
        mobPix = mobSpots.get(coordChar)
        rightnowbrick = mobPix.brick;
        isMob = true;
      }
      if(statSpots.has(coordChar)) {
        let statPix = statSpots.get(coordChar)
          if(isMob) {
            if(Object.hasOwn(mobPix, 'mobY')) {
              if(mobPix.mobY-5 > statPix.statY - statPix.sHeight) {
                rightnowbrick = statPix.brick;
              }
            }
          } else {
          rightnowbrick = statPix.brick;
          }
          isStat = true;
      }
      if(i > 0 && i < playwidth && j > 0 && j < playheight) {
        isInScreen = true;
        if(isMob || isStat) {
          theString = rightnowbrick;
        }else  {
          if(heel <= levels.length-1 && heel > 0) {
            theString = levels[heel];
          } else {
            if(heel > levels.length-1) {
              theString = levels[levels.length-1]
            } else {
              let date = new Date()
              if(parseInt(ImprovedNoise.noise(parseFloat(iterationX)/10, parseFloat(iterationY)/10, date.getTime()/10000)*10) === 0 && parseInt((iterationY*playwidth)+iterationX)%4 === 0) {
                theString = levels[0]
              } else {
                theString = "gg"
              }
            }
          }
        }
      }
  return theString;
}

let water2 = false;
let waterTimer = 0;

function updateTime(){

  let coordShower = document.getElementById("afterward");
  let coords = "" + playx + ", " + playy;

  coordShower.innerText = coords;

  var currentTime = new Date()
  var firsttime = currentTime.getTime()
  
  var smallstep = 10;
  mobiles[player.myIndex].x = parseInt(playx) + parseInt(playwidth/2) + parseInt(mobiles[player.myIndex].width/5);
  mobiles[player.myIndex].y = parseInt(playy) + parseInt(playheight/2) - (mobiles[player.myIndex].height);
  while(deltaTime > smallstep) {
    deltaTime -= smallstep;
  }

  if(waterTimer > 100) {
    waterTimer = 0;
    water2 = !water2;
  } else {
    waterTimer += deltaTime;
  }
  if(water2) {
    levels[0] = "gx"
  } else {
    levels[0] = "xg"
  }
  
  if(isMyTouchDown) {
    playx += parseInt(xdifferential);
    playy -= parseInt(ydifferential);
    if(Math.abs(ydifferential) > Math.abs(xdifferential)) {
    if(ydifferential > 0) {
      mobiles[player.myIndex].direction = 2;
      mobiles[player.myIndex].isWalking = true;
    } else
    if(ydifferential < 0) {
      mobiles[player.myIndex].direction = 0;
      mobiles[player.myIndex].isWalking = true;
    }
    } else {
      if(xdifferential < 0) {
        mobiles[player.myIndex].direction = 1;
        mobiles[player.myIndex].isWalking = true;
      } else
      if(xdifferential > 0) {
        mobiles[player.myIndex].direction = 3;
        mobiles[player.myIndex].isWalking = true;
      }
    }
  } else {
    if(key === "null") {
    mobiles[player.myIndex].isWalking = false;
    }
  }
  
  document.getElementById('time_span').textContent = "" + stringBuild(time)

  if((document.activeElement).getAttribute("type") != "text") {
    if(key != "null") {
      switch (key) {
        case "ArrowDown": case "s": case "S":
          playy-= 1;
          mobiles[player.myIndex].direction = 2;
          mobiles[player.myIndex].isWalking = true;
          break;
        case "ArrowUp": case "w": case "W":
          playy+= 1;
          mobiles[player.myIndex].direction = 0;
          mobiles[player.myIndex].isWalking = true;
          break;
        case "ArrowLeft": case "a": case "A":
          playx-= 1;
          mobiles[player.myIndex].direction = 1;
          mobiles[player.myIndex].isWalking = true;
          break;
        case "ArrowRight": case "d": case "D":
          playx += 1;
          mobiles[player.myIndex].direction = 3;
          mobiles[player.myIndex].isWalking = true;
          break;
        default:
          mobiles[player.myIndex].isWalking = false;
          key = "null"; 
      }
    }
  }
  currentTime = new Date();
  var time = currentTime.getTime()
  
  deltaTime += time - firsttime;
}


var key = "";

var currTouchX = 0;
var currTouchY = 0;

window.addEventListener("touchstart", touchStartMethod, true);

function touchStartMethod(event) {
  if (event.defaultPrevented) {
    return;
  }

  for(var i = 0; i < event.touches.length; i++) {
    currTouchX = event.touches[i].pageX;
    currTouchY = event.touches[i].pageY;

  }
  isMyTouchDown = true;

  event.preventDefault();
}

var isMyTouchDown = false;
window.addEventListener("touchend", touchEndMethod, true);

function touchEndMethod(event) {
  if (event.defaultPrevented) {
    return; 
  }

  isMyTouchDown = false;


  event.preventDefault();
}

var ydifferential = 0;
var xdifferential = 0;

window.addEventListener("touchmove", touchMoveMethod, true);

function touchMoveMethod(event) {
  if (event.defaultPrevented) {
    return;
  }

  
  for(var i = 0; i < event.changedTouches.length; i++) {
    xdifferential = parseInt(Math.min(Math.max((event.changedTouches[i].pageX - currTouchX)/16, -1), 1));
    ydifferential = parseInt(Math.min(Math.max((event.changedTouches[i].pageY - currTouchY)/16, -1), 1));
    if(currTouchY > event.changedTouches[i].pageY) {
      event.preventDefault();
    }
  }
  event.preventDefault();
}

let color1 = document.getElementById("foreColor")
let color2 = document.getElementById("backColor")
color1.oninput = setUserColor
color2.oninput = setUserColor

function setUserColor() {
  let html = document.querySelector("html")
  let color1 = document.getElementById("foreColor").value
  let color2 = document.getElementById("backColor").value

  if(color1 != "#000000") {
    html.style.color = color1
  }
  html.style.backgroundColor = color2

}

let terminal = document.querySelector(".terminal");
let form = document.querySelector("form");

form.onsubmit = function(event) {
  event.preventDefault();
  let text = document.getElementById("inputText").value;
  let msg = document.createElement("p");
  msg.textContent = text;
  msg.setAttribute("id", "chatmsg")
  terminal.appendChild(msg);
  form.reset();
}

function removeChatMsg() {
  if(document.querySelector("#chatmsg") != null) {
    terminal.removeChild(document.querySelector("#chatmsg"));
  }
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  key = event.key;

  if((document.activeElement).getAttribute("type") != "text" ) {
  event.preventDefault();
  }
}, true);

let deltaTimes = 0;
let amtToAverage = 50;
for(let i = 0; i < amtToAverage; i++) {
updateTime();
  deltaTimes += deltaTime;
}
deltaTime = deltaTimes/amtToAverage;

setInterval(updateTime, 30);

setInterval(removeChatMsg, 10000);
}

function makeTree() {
  let intString = []
  let width = 26;
  let height = 14;
  let amplitudeX = 3;
    for(let j = 0; j < width; j++) {
      for(let i = 0; i < height; i++) {
        intString.push(0);
      }
    }
    let initialSpot = {
      x: parseInt(width/2),
      y: height-1
    }
    let initialDirection = {
      x: (Math.random()-0.5),
      y: 1
    }
    let trunkheight = Math.min(Math.random()*10, 5);
    let nextSpot = {
      x: 0,
      y: 0
    }
    for(let i = 0; i < trunkheight; i++) {
      intString[(parseInt(initialSpot.y)*width)+parseInt(initialSpot.x)] = 1;
      initialSpot.x += initialDirection.x;
      initialSpot.y -= initialDirection.y;
      nextSpot.x = initialSpot.x;
      nextSpot.y = initialSpot.y;
    }
    let nextSpots = [];
    for(let i = 0; i < 3; i++) {
      let branchlength = Math.min(Math.random()*5, 3);
      let nextSpot2 = {
        x: 0,
        y: 0
      }
      let newDirection = {
        x: (Math.random()-0.5)*amplitudeX,
        y: 1
      }
      for(let b = 0; b < branchlength; b++) {
        intString[(parseInt(nextSpot.y)*width)+parseInt(nextSpot.x)] = 1;
        nextSpot.x += newDirection.x;
        nextSpot.y -= newDirection.y;
        nextSpot2.x = initialSpot.x;
        nextSpot2.y = initialSpot.y;
      }
      nextSpots.push(nextSpot2);
    }
    nextSpotsClone = [...nextSpots];
    let leafspots = [];
    for(let i = 0; i < 3; i++) {
      for(let t = 0; t < 3; t++) {
        let finlength = Math.min(Math.random()*5, 3);
        let newDirection = {
          x: (Math.random()-0.5)*amplitudeX,
          y: 1
        }
        let endOfThisBranch = {
          x: 0,
          y: 0
        }
        for(let b = 0; b < finlength; b++) {
          intString[(parseInt(nextSpots[i].y)*width)+parseInt(nextSpots[i].x)] = 1;
          nextSpots[i].x += newDirection.x;
          nextSpots[i].y -= newDirection.y;
          endOfThisBranch.x = nextSpots[i].x;
          endOfThisBranch.y = nextSpots[i].y;
        }
        leafspots.push(endOfThisBranch);
      }
      nextSpots = [...nextSpotsClone]
    }
    for(let i of leafspots) {
      intString[(parseInt(i.y+1)*width)+parseInt(i.x)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x-1)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x+1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x-1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x+1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x-2)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x+2)] = 2;
    }
    let string = ""
    for(let j = 0; j < height; j++) {
      for(let i = 0; i < width; i++) {
        if(intString[(j*width)+i] === 0) {
          string += "0";
        }
        if(intString[(j*width)+i] === 1) {
          string += "a";
        }
        if(intString[(j*width)+i] === 2) {
          string += "t";
        }
      }
    }
    return string;
}

function makeBigTree() {
  let intString = []
  let width = 25;
  let height = 25;
  let amplitudeX = 3;
    for(let j = 0; j < width; j++) {
      for(let i = 0; i < height; i++) {
        intString.push(0);
      }
    }
    let initialSpot = {
      x: parseInt(width/2),
      y: height-1
    }
    let initialDirection = {
      x: (Math.random()-0.5),
      y: 1
    }
    let trunkheight = Math.min(Math.random()*12, 5);
    let nextSpot = {
      x: 0,
      y: 0
    }
    for(let i = 0; i < trunkheight; i++) {
      intString[(parseInt(initialSpot.y)*width)+parseInt(initialSpot.x)] = 1;
      initialSpot.x += initialDirection.x;
      initialSpot.y -= initialDirection.y;
      nextSpot.x = initialSpot.x;
      nextSpot.y = initialSpot.y;
    }
    let nextSpots = [];
    for(let i = 0; i < 3; i++) {
      let branchlength = Math.min(Math.random()*8, 6);
      let nextSpot2 = {
        x: 0,
        y: 0
      }
      let newDirection = {
        x: (Math.random()-0.5)*amplitudeX,
        y: 1
      }
      for(let b = 0; b < branchlength; b++) {
        intString[(parseInt(nextSpot.y)*width)+parseInt(nextSpot.x)] = 1;
        nextSpot.x += newDirection.x;
        nextSpot.y -= newDirection.y;
        nextSpot2.x = initialSpot.x;
        nextSpot2.y = initialSpot.y;
      }
      nextSpots.push(nextSpot2);
    }
    nextSpotsClone = [...nextSpots];
    let leafspots = [];
    for(let i = 0; i < 3; i++) {
      for(let t = 0; t < 3; t++) {
        let finlength = Math.min(Math.random()*8, 6);
        let newDirection = {
          x: (Math.random()-0.5)*amplitudeX,
          y: 1
        }
        let endOfThisBranch = {
          x: 0,
          y: 0
        }
        for(let b = 0; b < finlength; b++) {
          intString[(parseInt(nextSpots[i].y)*width)+parseInt(nextSpots[i].x)] = 1;
          nextSpots[i].x += newDirection.x;
          nextSpots[i].y -= newDirection.y;
          endOfThisBranch.x = nextSpots[i].x;
          endOfThisBranch.y = nextSpots[i].y;
        }
        leafspots.push(endOfThisBranch);
      }
      nextSpots = [...nextSpotsClone]
    }
    for(let i of leafspots) {
      intString[(parseInt(i.y+1)*width)+parseInt(i.x)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x-1)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x+1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x-1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x+1)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x-2)] = 2;
      intString[(parseInt(i.y)*width)+parseInt(i.x+2)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x-2)] = 2;
      intString[(parseInt(i.y+1)*width)+parseInt(i.x+2)] = 2;
      intString[(parseInt(i.y+2)*width)+parseInt(i.x-2)] = 2;
      intString[(parseInt(i.y+2)*width)+parseInt(i.x+2)] = 2;
      intString[(parseInt(i.y+2)*width)+parseInt(i.x-2)] = 2;
      intString[(parseInt(i.y+2)*width)+parseInt(i.x+2)] = 2;
      intString[(parseInt(i.y-2)*width)+parseInt(i.x-1)] = 2;
      intString[(parseInt(i.y-2)*width)+parseInt(i.x+1)] = 2;
    }
    let string = ""
    for(let j = 0; j < height; j++) {
      for(let i = 0; i < width; i++) {
        if(intString[(j*width)+i] === 0) {
          string += "0";
        }
        if(intString[(j*width)+i] === 1) {
          string += "a";
        }
        if(intString[(j*width)+i] === 2) {
          string += "t";
        }
      }
    }
    return string;
}