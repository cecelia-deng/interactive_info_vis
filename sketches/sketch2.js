// Instance-mode sketch for tab 2
// Breathing Clock
registerSketch('sk2', function (p) {
  let slowMode = false;

  p.mousePressed = function () {
    slowMode = !slowMode; // toggle normal ↔ slow breathing
  };

  p.setup = function () {
    p.createCanvas(600, 600);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    let hr = p.hour();
    let mn = p.minute();

    // ----- Background hue flow -----
    let dayProgress = (hr * 60 + mn) / (24 * 60);
    let hueShift = p.map(dayProgress, 0, 1, 0, 360);
    p.colorMode(p.HSB, 360, 100, 100);
    p.background((hueShift + 180) % 360, 40, 90);
    p.colorMode(p.RGB, 255);

    // ----- Breathing timing -----
    let cycle = slowMode ? 9000 : 6000;
    let phase = (p.millis() % cycle) / cycle;
    let ease = (1 - p.cos(phase * p.TWO_PI)) / 2;

    let inhale = phase < 0.5;
    let label = inhale ? "Inhale" : "Exhale";

    let offsetY = 10 * p.sin(p.millis() / 2000);
    let baseRadius = 130;
    let radius = p.lerp(baseRadius * 0.7, baseRadius * 1.2, ease);
    let cx = p.width / 2;
    let cy = p.height / 2 + offsetY;

    // ----- Pulsing glow -----
    let glowAlpha = 50 + 30 * p.sin(p.millis() / 1000);
    p.noStroke();
    p.fill(255, 255, 255, glowAlpha);
    p.ellipse(cx, cy, radius * 2.6);

    // ----- Blue-gray breathing color transition -----
    let inhaleColor = p.color(250, 230, 255, 230); // warm pinkish white
    let exhaleColor = p.color(230, 210, 245, 200); // softer lavender tone
    let currentColor = p.lerpColor(exhaleColor, inhaleColor, ease);
    p.fill(currentColor);
    p.ellipse(cx, cy, radius * 2);

    // ----- Time text -----
    let h = p.nf(hr, 2);
    let m = p.nf(mn, 2);
    let s = p.nf(p.second(), 2);

    let alpha = 150 + 50 * p.sin(p.millis() / 1500);
    p.fill(100, alpha);
    p.textSize(48);
    p.text(`${h}:${m}:${s}`, cx, cy - 10);

    // inhale / exhale label
    p.textSize(22);
    p.fill(120, 120);
    p.text(label, cx, cy + 45);

    // footer + hint
    p.textSize(18);
    p.fill(60);
    p.text("Breathing Clock", p.width / 2, p.height - 20);
    p.textSize(14);
    p.fill(80);
    p.text("(click to change breathing pace)", p.width / 2, p.height - 40);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});








