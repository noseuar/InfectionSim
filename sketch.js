const points = [];
var item;
var curr_time;
var infections = 1;
const R_POINT = 4;
const N_POINTS = 80;
const B_COLUMN = 20;
const P_SPEED = 0.1;
const T_INFECTION = 500;

function setup() {
    createCanvas(800, 600);
    for (var i=0; i<N_POINTS; i++) {
      points.push(new MyPoint(
        createVector(
          random(R_POINT, width - 2 * R_POINT - B_COLUMN), random(R_POINT,height - R_POINT)
        )
      ))
    }
    console.log(round(random(0,N_POINTS-1)));
    points[round(random(0,N_POINTS-1))].setInfected();
    frameRate(30);
    
  }
  
  function draw() {
    background(0);
    strokeWeight(0);
    fill(255, 171, 0);
    rect(width - B_COLUMN, height-round(infections * (height / N_POINTS)), B_COLUMN, round(infections * (height / N_POINTS)));
    fill(40,40,40);
    rect(0, height-round(infections * (height / N_POINTS)), width - B_COLUMN, round(infections * (height / N_POINTS)));
    
    fill(255);
    strokeWeight(0);
    textSize(30);
    text("Infizierte: " + infections + " von " + N_POINTS, 10, 545);
    if (infections < N_POINTS) {
      curr_time = millis() / 1000;
    } else {
      fill(255, 0, 0);
    }
    text(curr_time + " sec.", 10, 580);
    fill(255);
    strokeWeight(R_POINT*2);
    infections = 0;
    for (let p of points) {

      if (p.infected) {
        pColor = color(255, 171, 0)

        infections++;
        for (let p2 of points) {
          if (distance(p, p2) <= 2*R_POINT) {
            p2.setInfected();
          }
        }
        console.log(p.getIntesity()); // .setAlpha(min(255, p.getIntesity()))
        pColor.setAlpha(p.getIntesity());
        stroke(pColor);
        
      } else {
        stroke(255);
      }
      point(p.vec.x, p.vec.y);
      p.run();
    }

    
  }

  function distance(p1, p2) {
    var dx;
    var dy;
    
    dx = p2.vec.x - p1.vec.x;
    dy = p2.vec.y - p1.vec.y;
    
    return Math.sqrt(dy * dy + dx * dx);
  }