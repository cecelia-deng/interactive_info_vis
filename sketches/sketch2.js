// Instance-mode sketch for tab 2
// Breathing Clock — Gradient Background + Smooth Flow
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(600, 600);
  };

  p.draw = function () {
    let hr = p.hour();

    // background gradient by hour
    let morning = p.color(180, 210, 255);
    let night = p.color(120, 140, 200);
    let t = p.map(hr, 0, 23, 0, 1);
    let bg = p.lerpColor(morning, night, t);
    p.background(bg);

    // smooth breathing
    let cycle = 6000;
    let phase = (p.millis() % cycle) / cycle;
    let ease = (1 - p.cos(phase * p.TWO_PI)) / 2;
    let radius = p.lerp(80, 140, ease);

    let cx = p.width / 2;
    let cy = p.height / 2;

    p.noStroke();
    p.fill(255);
    p.ellipse(cx, cy, radius * 2);
  };
});


