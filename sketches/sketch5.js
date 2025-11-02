registerSketch('sk5', function (p) {
  let table;
  let mapImg;
  let points = [];
  let hoverIndex = -1;
  let heatmapLayer;

  p.preload = function () {
    table = p.loadTable('../assets/seoul_starbucks.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(800, 800);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);

    // 🔥 创建独立的热力图图层
    heatmapLayer = p.createGraphics(800, 800);

    mapImg = p.createImg('../assets/Seoul_districts.svg', 'Seoul Map');
    mapImg.size(750, 750);

    const canvasElt = p.canvas;
    const canvasX = canvasElt.offsetLeft;
    const canvasY = canvasElt.offsetTop;
    mapImg.position(canvasX + p.width / 2 - 375, canvasY + p.height / 2 - 375);
    mapImg.style('z-index', '-1');

    // ☕ 从 CSV 读取数据
    for (let r = 0; r < table.getRowCount(); r++) {
      const lat = table.getNum(r, 'Latitude');
      const lon = table.getNum(r, 'Longitude');
      const name = table.getString(r, 'Store Name');

      let x = p.map(lon, 126.8, 127.18, 100, 700);
      let y = p.map(lat, 37.44, 37.68, 700, 100);

      x += p.random(-2, 2);
      y += p.random(-2, 2);
      points.push({ x, y, name });
    }

    // 🔥 预计算每个点的密度
    for (let i = 0; i < points.length; i++) {
      let density = 0;
      for (let j = 0; j < points.length; j++) {
        let d = p.dist(points[i].x, points[i].y, points[j].x, points[j].y);
        if (d < 60) {
          density++;
        }
      }
      points[i].density = density;
    }

    // 🔥 在 setup 中绘制热力图
    drawHeatmap();
  };

  function drawHeatmap() {
    heatmapLayer.clear();
    heatmapLayer.noStroke();
    
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      
      if (pt.density > 3) {
        let hue = p.map(pt.density, 3, 20, 60, 0);
        let alpha = p.map(pt.density, 3, 20, 100, 220);
        
        heatmapLayer.colorMode(p.HSB);
        heatmapLayer.fill(hue, 90, 100, alpha);
        heatmapLayer.noStroke();
        heatmapLayer.circle(pt.x, pt.y, 30);
        heatmapLayer.colorMode(p.RGB);
      }
    }
    
    // ✨ 应用模糊滤镜
    heatmapLayer.filter(p.BLUR, 12);
  }

  p.draw = function () {
    p.clear();

    // 🔥 绘制热力图层（设置透明度并正确定位）
    p.push();
    p.tint(255, 150); // ✅ 透明度 150/255 ≈ 60%
    p.imageMode(p.CORNER); // ✅ 改为 CORNER 模式
    p.image(heatmapLayer, 0, 0); // ✅ 从 (0,0) 开始绘制
    p.pop();

    // ☕ 绘制咖啡杯图标
    p.textSize(14);
    p.fill(0);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      p.text('☕', pt.x, pt.y);
    }

    // 🎯 hover 检测和 tooltip
    hoverIndex = -1;
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (p.dist(p.mouseX, p.mouseY, pt.x, pt.y) < 8) {
        hoverIndex = i;
        break;
      }
    }

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

    // 📝 标题和标签
    p.fill(0);
    p.noStroke();
    p.textSize(18);
    p.text('☕ Seoul Starbucks Density Map ☕', p.width / 2, 40);
    p.textSize(12);
    p.text('Hover over cups to see store names', p.width / 2, 65);
    p.text('Hongdae', 240, 380);
    p.text('Gangnam', 600, 600);
  };

  p.windowResized = function () {
    const canvasElt = p.canvas;
    const canvasX = canvasElt.offsetLeft;
    const canvasY = canvasElt.offsetTop;
    mapImg.position(canvasX + p.width / 2 - 375, canvasY + p.height / 2 - 375);
  };
});


