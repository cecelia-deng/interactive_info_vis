// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(1460, 600);
    p.angleMode(p.DEGREES);
  };
  p.draw = function () {
    p.background(255, 240, 240);
    let cx = p.width / 2;
    let cy = p.height / 2;

    p.noFill();
    p.stroke(255, 150, 150);
    p.strokeWeight(10);
    p.arc(cx, cy, 230, 230, 0, 360);
  };
});




