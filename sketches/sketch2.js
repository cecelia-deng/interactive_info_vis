// Instance-mode sketch for tab 2
// Breathing Clock — Base Structure
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(600, 600);
  };

  p.draw = function () {
    p.background(230, 240, 255);

    // center circle
    let cx = p.width / 2;
    let cy = p.height / 2;
    p.noStroke();
    p.fill(255);
    p.ellipse(cx, cy, 200, 200);
  };
});

