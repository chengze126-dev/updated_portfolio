const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d", { alpha: false });
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = 0;
let height = 0;
let running = false;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (reduced) draw(0);
}

function project(x, y, z) {
  const focus = 2.2;
  const scale = focus / (focus + z);
  return [
    width * 0.5 + x * scale * width * 0.55,
    height * 0.46 + y * scale * height * 0.55,
    scale,
  ];
}

const stars = Array.from({ length: 160 }, () => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  z: Math.random(),
  size: 0.7 + Math.random() * 1.8,
}));

const phi = (1 + Math.sqrt(5)) / 2;
const ico = [
  [-1, phi, 0],
  [1, phi, 0],
  [-1, -phi, 0],
  [1, -phi, 0],
  [0, -1, phi],
  [0, 1, phi],
  [0, -1, -phi],
  [0, 1, -phi],
  [phi, 0, -1],
  [phi, 0, 1],
  [-phi, 0, -1],
  [-phi, 0, 1],
].map((vertex) => {
  const length = Math.hypot(vertex[0], vertex[1], vertex[2]);
  return vertex.map((value) => value / length);
});

const edges = [];
for (let i = 0; i < ico.length; i += 1) {
  for (let j = i + 1; j < ico.length; j += 1) {
    const distance = Math.hypot(
      ico[i][0] - ico[j][0],
      ico[i][1] - ico[j][1],
      ico[i][2] - ico[j][2],
    );
    if (distance < 1.1) edges.push([i, j]);
  }
}

function rotateY(point, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [point[0] * c + point[2] * s, point[1], -point[0] * s + point[2] * c];
}

function rotateX(point, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [point[0], point[1] * c - point[2] * s, point[1] * s + point[2] * c];
}

function drawShape(time, originX, originY, originZ, scale, spin, color) {
  const points = ico.map((vertex) => {
    const spun = rotateX(rotateY(vertex, time * spin), time * spin * 0.65);
    return project(
      originX + spun[0] * scale,
      originY + spun[1] * scale,
      originZ + spun[2] * scale,
    );
  });
  ctx.strokeStyle = color;
  ctx.beginPath();
  for (const [a, b] of edges) {
    ctx.moveTo(points[a][0], points[a][1]);
    ctx.lineTo(points[b][0], points[b][1]);
  }
  ctx.stroke();
}

function draw(time) {
  ctx.fillStyle = "#06070d";
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.42,
    0,
    width * 0.5,
    height * 0.46,
    Math.max(width, height) * 0.62,
  );
  glow.addColorStop(0, "rgba(92, 74, 196, 0.55)");
  glow.addColorStop(0.42, "rgba(28, 52, 130, 0.22)");
  glow.addColorStop(1, "rgba(6, 7, 13, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    const travel = (star.z + time * 0.045) % 1;
    const point = project(star.x * 1.85, star.y * 1.2, 0.12 + travel * 2.1);
    ctx.fillStyle = `rgba(198, 214, 255, ${(1 - travel) * 0.8})`;
    ctx.beginPath();
    ctx.arc(point[0], point[1], Math.max(0.6, star.size * point[2] * 2.4), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(156, 176, 255, 0.32)";
  ctx.beginPath();
  const span = 10;
  for (let i = 0; i <= span; i += 1) {
    const x = ((i / span) * 2 - 1) * 1.7;
    const near = project(x, 0.78, 0.18);
    const far = project(x, 0.78, 2.3);
    ctx.moveTo(near[0], near[1]);
    ctx.lineTo(far[0], far[1]);
  }
  const scroll = (time * 0.22) % 1;
  for (let i = 0; i < 18; i += 1) {
    const z = 0.18 + ((i / 18 + scroll) % 1) * 2.12;
    const left = project(-1.7, 0.78, z);
    const right = project(1.7, 0.78, z);
    ctx.moveTo(left[0], left[1]);
    ctx.lineTo(right[0], right[1]);
  }
  ctx.stroke();

  ctx.lineWidth = 1.2;
  const orbit = time * 0.18;
  drawShape(
    time,
    Math.cos(orbit) * 1.35,
    Math.sin(orbit * 0.7) * 0.28,
    0.85,
    0.26,
    0.4,
    "rgba(196, 186, 255, 0.9)",
  );
  drawShape(
    time + 1.6,
    Math.cos(orbit + 2.4) * 1.42,
    Math.sin(orbit * 0.7 + 1.2) * 0.22 - 0.12,
    1.05,
    0.18,
    -0.32,
    "rgba(126, 196, 255, 0.8)",
  );
}

function loop(now) {
  if (!running) return;
  draw(now / 1000);
  requestAnimationFrame(loop);
}

function start() {
  if (running || reduced) return;
  running = true;
  requestAnimationFrame(loop);
}

function stop() {
  running = false;
}

resize();
window.addEventListener("resize", resize);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
  else start();
});

if (reduced) draw(0);
else start();
