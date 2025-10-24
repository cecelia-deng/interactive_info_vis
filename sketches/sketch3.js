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

    // background
    let dawn = p.color(150, 200, 255);
    let noon = p.color(190, 230, 255);
    let dusk = p.color(160, 160, 220);
    let night = p.color(60, 80, 140);
    let hour24 = p.hour();
    if (hour24 < 6) p.background(night);
    else if (hour24 < 12) p.background(p.lerpColor(dawn, noon, (hour24 - 6) / 6));
    else if (hour24 < 18) p.background(p.lerpColor(noon, dusk, (hour24 - 12) / 6));
    else if (hour24 < 24) p.background(p.lerpColor(dusk, night, (hour24 - 18) / 6));

    // waves
    p.noFill();
    let baseY = 180;
    let waveGap = 100;

    let waves = [
      { label: "Hour", value: hr, max: 12, amp: 14, speed: 0.6, col: p.color(60, 100, 220, 220), weight: 4, phaseShift: 40 },
      { label: "Minute", value: mn, max: 60, amp: 10, speed: 1.0, col: p.color(100, 150, 240, 140), weight: 2.5, phaseShift: 80 },
      { label: "Second", value: sc, max: 60, amp: 6, speed: 2.0, col: p.color(160, 200, 255, 120), weight: 1.5, phaseShift: 120 }
    ];

    waves.forEach((w, i) => {
      let y = baseY + i * waveGap;
      let t = p.millis() / 1000 * w.speed;
      p.strokeWeight(w.weight);
      p.stroke(w.col);
      p.beginShape();
      for (let x = 0; x <= p.width; x += 10) {
        let wave = p.sin(t + x / 60);
        let yPos = y + wave * w.amp;
        p.vertex(x, yPos);
      }
      p.endShape();

      let dotX = (p.map(w.value, 0, w.max, 0, p.width) + w.phaseShift) % p.width;
      let waveY = y + p.sin(t + dotX / 60) * w.amp;
      let dotColor = i === 0 ? p.color(50, 90, 220)
                    : i === 1 ? p.color(80, 130, 250)
                    : p.color(120, 170, 255);

      p.noStroke();
      p.drawingContext.shadowBlur = 15;
      p.drawingContext.shadowColor = dotColor;
      p.fill(dotColor);
      p.ellipse(dotX, waveY, 12 + w.weight * 1.5);
      p.drawingContext.shadowBlur = 0;
    });

    // breathing time text
    let h = p.nf(p.hour(), 2);
    let m = p.nf(p.minute(), 2);
    let s = p.nf(p.second(), 2);

    let alpha = 180 + 40 * p.sin(p.millis() / 1500);
    p.fill(50, 100, 150, alpha);
    p.textAlign(p.CENTER);
    p.textSize(32);
    p.text(`${h}:${m}:${s}`, p.width / 2, p.height - 50);

    p.textSize(20);
    p.fill(70);
    p.text('Water Wave Clock', p.width / 2, p.height - 20);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});


