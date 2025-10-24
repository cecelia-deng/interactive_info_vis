// Instance-mode sketch for tab 4
// Gradient Ring Clock — Final Refined Edition
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(1460, 600);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    let hr = p.hour();
    let mn = p.minute();
    let sc = p.second();

    // ----- Radial gradient background -----
    let cx = p.width / 2;
    let cy = p.height / 2;
    let g = p.drawingContext.createRadialGradient(cx, cy, 0, cx, cy, p.width * 0.8);
    g.addColorStop(0, p.color(255, 250, 250));
    g.addColorStop(1, p.color(255, 220, 225));
    p.drawingContext.fillStyle = g;
    p.rect(0, 0, p.width, p.height);

    // ----- Clock layout settings -----
    let outerR = 230;
    let innerR = 140;

    // ----- Outer gradient ring -----
    p.noFill();
    p.strokeWeight(14);
    p.strokeCap(p.ROUND);

    for (let i = 0; i < 60; i++) {
      let startAngle = i * 6 - 90;
      let progress = i / 60;
      let c = p.lerpColor(p.color(255, 200, 200), p.color(255, 120, 120), progress);
      p.stroke(c);
      p.drawingContext.shadowBlur = 8;
      p.drawingContext.shadowColor = p.color(255, 150, 150, 120);
      p.arc(cx, cy, outerR, outerR, startAngle, startAngle + 4);
    }

    // ----- Active segment for current second -----
    let activeAngle = (sc / 60) * 360 - 90;
    p.stroke(p.color(255, 90, 100, 220));
    p.drawingContext.shadowBlur = 12;
    p.drawingContext.shadowColor = p.color(255, 120, 120, 150);
    p.arc(cx, cy, outerR, outerR, activeAngle, activeAngle + 10);

    // ----- Moving glowing dot -----
    let dotAngle = (sc / 60) * 360 - 90;
    let dotX = cx + (outerR / 2) * p.cos(dotAngle);
    let dotY = cy + (outerR / 2) * p.sin(dotAngle);
    let pulse = 8 + 3 * p.sin(p.millis() / 300);
    p.noStroke();
    p.fill(255, 80, 90, 230);
    p.drawingContext.shadowBlur = 15;
    p.drawingContext.shadowColor = p.color(255, 150, 150);
    p.ellipse(dotX, dotY, pulse);
    p.drawingContext.shadowBlur = 0;

    // ----- Center circle -----
    p.noStroke();
    p.fill(255, 190, 190, 180);
    p.ellipse(cx, cy, innerR * 1.3);

    // ----- Time text -----
    let h = p.nf(hr, 2);
    let m = p.nf(mn, 2);
    let s = p.nf(sc, 2);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(36);
    p.fill(50, 50, 50, 220);
    p.drawingContext.shadowBlur = 8;
    p.drawingContext.shadowColor = p.color(255, 200, 200, 120);
    p.text(`${h}:${m}:${s}`, cx, cy - 5);
    p.drawingContext.shadowBlur = 0;

    // ----- Date text -----
    p.textSize(16);
    p.fill(100, 90);
    let dateStr = `${p.year()}.${p.nf(p.month(), 2)}.${p.nf(p.day(), 2)}`;
    p.text(dateStr, cx, cy + 40);

    // ----- Footer -----
    p.textSize(18);
    p.fill(100, 80);
    p.text('Gradient Ring Clock', cx, p.height - 30);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});







