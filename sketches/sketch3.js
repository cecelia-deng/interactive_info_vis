// Instance-mode sketch for tab 3
// Water Wave Clock — Base Setup
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(900, 600);
  };

  p.draw = function () {
    let hr = p.hour() % 12;
    let mn = p.minute();
    let sc = p.second();

    // background
    let dawn = p.color(150, 200, 255);
    let noon = p.color(190, 230, 255);
    let dusk = p.color(160, 160, 220);
    let night = p.color(60, 80, 140);
    let hour24 = p.hour();
    if (hour24 < 6) p.background(night);
    else if (hour24 < 12) p.background(p.lerpColor(dawn, noon, (hour24 - 6) / 6));
    else if (hour24 < 18) p.background(p.lerpColor(noon, dusk, (hour24 - 12) / 6));
    else p.background(p.lerpColor(dusk, night, (hour24 - 18) / 6));

    // waves
    p.noFill();
    p.strokeWeight(2);
    let baseY = 200;

    for (let i = 0; i < 3; i++) {
      let y = baseY + i * 100;
      let t = p.millis() / 1000 + i;
      p.beginShape();
      for (let x = 0; x <= p.width; x += 10) {
        let yPos = y + p.sin(t + x / 60) * (8 + i * 4);
        p.vertex(x, yPos);
      }
      p.endShape();
    }
  };
});
