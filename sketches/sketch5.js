registerSketch('sk5', function (p) {
  let table;
  let mapImg;
  let points = [];
  let hoverIndex = -1;

  p.preload = function () {
    // 注意路径：sketches 下的文件要 ../assets/
    table = p.loadTable('../assets/seoul_starbucks.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(800, 800);
    p.imageMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);

    // ✅ 加载 SVG 地图
    mapImg = p.createImg('../assets/Seoul_districts.svg', 'Seoul Map');
    mapImg.size(750, 750);

    // ⚙️ 计算 SVG 相对 canvas 的正确位置
    const canvasElt = p.canvas;
    const canvasX = canvasElt.offsetLeft;
    const canvasY = canvasElt.offsetTop;
    mapImg.position(canvasX + p.width / 2 - 375, canvasY + p.height / 2 - 375);
    mapImg.style('z-index', '-1'); // ✅ 放到后面

    // ☕ 从 CSV 读取数据
    for (let r = 0; r < table.getRowCount(); r++) {
      const lat = table.getNum(r, 'Latitude');
      const lon = table.getNum(r, 'Longitude');
      const name = table.getString(r, 'Store Name');

      // 经纬度 → 坐标（调试版）
      let x = p.map(lon, 126.8, 127.18, 100, 700);
      let y = p.map(lat, 37.44, 37.68, 700, 100);

      x += p.random(-2, 2);
      y += p.random(-2, 2);
      points.push({ x, y, name });
    }
  };

  p.draw = function () {
    p.clear(); // ✅ 保持 SVG 可见

    // ☕ 绘制所有门店
    p.textSize(14);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      p.text('☕', pt.x, pt.y);
    }

    // hover 检测
    hoverIndex = -1;
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (p.dist(p.mouseX, p.mouseY, pt.x, pt.y) < 8) {
        hoverIndex = i;
        break;
      }
    }

    // tooltip
    if (hoverIndex !== -1) {
      const pt = points[hoverIndex];
      p.fill(255, 250);
      p.stroke(120);
      p.strokeWeight(1);
      p.rectMode(p.CENTER);
      p.rect(pt.x, pt.y - 20, p.textWidth(pt.name) + 20, 25, 6);

      p.fill(0);
      p.noStroke();
      p.textSize(12);
      p.text(pt.name, pt.x, pt.y - 20);
    }

    // title + 标签
    p.fill(0);
    p.noStroke();
    p.textSize(18);
    p.text('☕ Seoul Starbucks Density Map ☕', p.width / 2, 40);
    p.textSize(12);
    p.text('Hover over cups to see store names', p.width / 2, 65);
    p.text('Hongdae', 240, 380);
    p.text('Gangnam', 600, 600);
  };

  // 🔁 处理窗口变化（保持地图对齐）
  p.windowResized = function () {
    const canvasElt = p.canvas;
    const canvasX = canvasElt.offsetLeft;
    const canvasY = canvasElt.offsetTop;
    mapImg.position(canvasX + p.width / 2 - 375, canvasY + p.height / 2 - 375);
  };
});


