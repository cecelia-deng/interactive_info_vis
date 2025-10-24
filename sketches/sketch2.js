// Instance-mode sketch for tab 2
// Breathing Clock
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(600, 600);
  };

  p.draw = function () {
    let hr = p.hour();
    let mn = p.minute();
    let sc = p.second();

    // background gradient
    let morning = p.color(180, 210, 255);
    let night = p.color(120, 140, 200);
    let t = p.map(hr, 0, 23, 0, 1);
    let bg = p.lerpColor(morning, night, t);
    p.background(bg);

    // breathing animation
    let cycle = 6000;
    let phase = (p.millis() % cycle) / cycle;
    let ease = (1 - p.cos(phase * p.TWO_PI)) / 2;
    let inhale = phase < 0.5;
    let label = inhale ? "Inhale" : "Exhale";

    let radius = p.lerp(80, 140, ease);
    let cx = p.width / 2;
    let cy = p.height / 2;

    // main circle
    p.noStroke();
    p.fill(255, 230);
    p.ellipse(cx, cy, radius * 2);

    // time text
    p.fill(80);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(40);
    p.text(`${p.nf(hr,2)}:${p.nf(mn,2)}:${p.nf(sc,2)}`, cx, cy - 10);

    // inhale/exhale label
    p.textSize(22);
    p.text(label, cx, cy + 40);
  };
});




