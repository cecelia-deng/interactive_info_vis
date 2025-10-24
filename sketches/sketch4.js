// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(1460, 600);
    p.angleMode(p.DEGREES);
  };
  p.draw = function () {
    let cx = p.width / 2;
    let cy = p.height / 2;

    // background
    let g = p.drawingContext.createRadialGradient(cx, cy, 0, cx, cy, p.width * 0.8);
    g.addColorStop(0, p.color(255, 250, 250));
    g.addColorStop(1, p.color(255, 220, 225));
    p.drawingContext.fillStyle = g;
    p.rect(0, 0, p.width, p.height);

    // moving arc
    let sc = p.second();
    let activeAngle = (sc / 60) * 360 - 90;
    p.noFill();
    p.stroke(255, 120, 120);
    p.strokeWeight(14);
    p.arc(cx, cy, 230, 230, activeAngle, activeAngle + 8);
  };
});





