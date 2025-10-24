// Instance-mode sketch for tab 3
// Water Wave Clock
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(800, 600);
  };

  p.draw = function () {
    let hr = p.hour() % 12;
    let mn = p.minute();
    let sc = p.second();
    let hour24 = p.hour();

    let dawn = p.color(150, 200, 255);
    let noon = p.color(190, 230, 255);
    let dusk = p.color(160, 160, 220);
    let night = p.color(60, 80, 140);
    if (hour24 < 6) p.background(night);
    else if (hour24 < 12) p.background(p.lerpColor(dawn, noon, (hour24 - 6) / 6));
    else if (hour24 < 18) p.background(p.lerpColor(noon, dusk, (hour24 - 12) / 6));
    else p.background(p.lerpColor(dusk, night, (hour24 - 18) / 6));

    let waves = [
      { value: hr, max: 12, amp: 14, speed: 0.6, col: p.color(60, 100, 220, 220), weight: 4 },
      { value: mn, max: 60, amp: 10, speed: 1.0, col: p.color(100, 150, 240, 140), weight: 2.5 },
      { value: sc, max: 60, amp: 6, speed: 2.0, col: p.color(160, 200, 255, 120), weight: 1.5 }
    ];

    p.noFill();
    let baseY = 180;
    let waveGap = 100;

    waves.forEach((w, i) => {
      let y = baseY + i * waveGap;
      let t = p.millis() / 1000 * w.speed;
      p.strokeWeight(w.weight);
      p.stroke(w.col);
      p.beginShape();
      for (let x = 0; x <= p.width; x += 10) {
        let yPos = y + p.sin(t + x / 60) * w.amp;
        p.vertex(x, yPos);
      }
      p.endShape();

      // glowing dot
      let dotX = p.map(w.value, 0, w.max, 0, p.width);
      let waveY = y + p.sin(t + dotX / 60) * w.amp;
      p.noStroke();
      p.drawingContext.shadowBlur = 15;
      p.drawingContext.shadowColor = w.col;
      p.fill(w.col);
      p.ellipse(dotX, waveY, 12 + w.weight);
      p.drawingContext.shadowBlur = 0;
    });
  };
});

