const points = [];
var item;
var curr_time;
var infections = 1;
var radius_point = 4;
const N_POINTS = 80;
const B_COLUMN = 20;
const speed = 0.2;
const T_INFECTION = 500;

var cnv;
var speedFact;
let button = null;
let buttonP = null;
let buttonM = null;
let buttonB = null;
let buttonS = null;

let slider = null;

function setup() {

    curr_time = 0;
    while (points.length > 0) {
      points.pop();
    }
    cnv = createCanvas(900, 600);
    centerCanvas();
    for (var i=0; i<N_POINTS; i++) {
      points.push(new MyPoint(
        createVector(
          random(radius_point, width - 2 * radius_point - B_COLUMN), random(radius_point,height - radius_point)
        )
      ))
    }
    points[round(random(0,N_POINTS-1))].setInfected();
    frameRate(30);
    setupUi();
}


function draw() {
    background(0);
    strokeWeight(0);
    fill(255, 171, 0);
    rect(width - B_COLUMN, height-round(infections * (height / N_POINTS)), B_COLUMN, round(infections * (height / N_POINTS)));
    fill(40,40,40);
    //rect(0, height-round(infections * (height / N_POINTS)), width - B_COLUMN, round(infections * (height / N_POINTS)));
    
    fill(255);
    strokeWeight(0);
    textSize(30);
    text("Infizierte: " + infections + " von " + N_POINTS, 10, 545);
    if (infections < N_POINTS) {
      curr_time = millis() / 1000;
    } else {
      fill(255, 0, 0);
    }
    text(curr_time.toFixed(2) + " sec.", 10, 580);
    fill(255);
    strokeWeight(radius_point*2);
    infections = 0;
    for (let p of points) {

      if (p.infected) {
        pColor = color(255, 171, 0)

        infections++;
        for (let p2 of points) {
          if (distance(p, p2) <= 2*radius_point) {
            p2.setInfected();
          }
        }
        pColor.setAlpha(p.getIntesity());
        stroke(pColor);
        
      } else {
        stroke(255);
      }
      point(p.vec.x, p.vec.y);
      
      p.run();
    }
}

function setupUi() {

  let dist = 10;
  let distH = dist/2;
  let bWidth = 80;
  let bHeight = 30;

  if(button != null) {
    button.remove();
  }
  button = createButton('restart');
  button.class('button');bWidth
  button.position(dist, (distH+bHeight)*3 + distH);
  button.mousePressed(setup);

  if(buttonP != null) {
    buttonP.remove();
  }
  buttonP = createButton('Speed +');
  buttonP.position(dist + bWidth + dist, distH + bHeight + distH);
  buttonP.mousePressed(faster);
  buttonP.class('button');

  if(buttonM != null) {
    buttonM.remove();
  }
  buttonM = createButton('Speed -');
  buttonM.position(dist, distH + bHeight + distH);
  buttonM.mousePressed(slower);
  buttonM.class('button');

  if(buttonB != null) {
    buttonB.remove();
  }
  buttonB = createButton('Size +');
  buttonB.position(dist + bWidth + dist, distH);
  buttonB.mousePressed(bigger);
  buttonB.class('button');

  if(buttonS != null) {
    buttonS.remove();
  }
  buttonS = createButton('Size -');
  buttonS.position(dist, distH);
  buttonS.mousePressed(smaller);
  buttonS.class('button');
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function faster() {
  for (let p of points) {
    p.setSpeed(1.1);
  }
}

function slower() {
  for (let p of points) {
    p.setSpeed(0.9);
  }
}

function bigger() {
  if (radius_point < 20) {
    radius_point *= 1.1;
  }
}

function smaller() {
  if (radius_point >= 0.5) {
    radius_point *=  0.9;
  }
}

function distance(p1, p2) {
    var dx;
    var dy;
    
    dx = p2.vec.x - p1.vec.x;
    dy = p2.vec.y - p1.vec.y;
    
    return Math.sqrt(dy * dy + dx * dx);
}