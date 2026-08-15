/**
 * 坦克大战 · 浪尖儿 RST 竞赛训练营附加题
 * 作者：陈博皓
 *
 * 设计说明：
 * 1. 地图中央区域的砖墙摆放为本人姓名拼音首字母缩写「CBH」，证明原创性；
 * 2. 底图为代码绘制的原创校园绿主题（与个人简历站点同一套配色）；
 * 3. 玩法：方向键 / WASD 移动，空格发射炮弹；消灭全部敌方坦克获胜，
 *    我方坦克被击中 3 次则失败；红砖可被炮弹击碎。
 */

// ===================== 基础常量 =====================
const CELL = 32; // 每格像素
const COLS = 20; // 地图列数
const ROWS = 20; // 地图行数
const W = COLS * CELL;
const H = ROWS * CELL;

const TANK = 28; // 坦克边长（略小于格子，方便穿行）
const TANK_SPEED = 130; // 坦克速度 px/s
const BULLET_SPEED = 320; // 炮弹速度 px/s
const BULLET_R = 4; // 炮弹半径
const FIRE_COOLDOWN = 0.35; // 我方开火冷却（秒）
const ENEMY_TOTAL = 10; // 敌方坦克总数
const ENEMY_MAX_ALIVE = 3; // 场上同时存在的敌人上限
const SPAWN_INTERVAL = 3; // 敌人补充间隔（秒）
const PLAYER_LIVES = 3;

// 配色（与简历站点同一套森林绿体系）
const COLOR = {
  bg: "#152411", // 场地底色
  bgLine: "#1e3319", // 场地纹理线
  brick: "#b0563a", // 红砖
  brickDark: "#7d3a26", // 砖缝
  player: "#8fd19a", // 我方坦克
  playerDark: "#2f6b3a",
  enemy: "#e0e4da", // 敌方坦克
  enemyDark: "#6b7566",
  bullet: "#ffd90d",
  text: "#f0f2ec",
};

type Dir = 0 | 1 | 2 | 3; // 上 右 下 左
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

// ===================== 地图：砖墙摆成「CBH」 =====================
/** 5×7 字母点阵，1 = 砖块 */
const LETTERS: Record<string, string[]> = {
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
};

/** 生成地图：0 = 空地，1 = 砖块 */
function buildMap(): number[][] {
  const map: number[][] = Array.from({ length: ROWS }, () =>
    new Array<number>(COLS).fill(0)
  );
  const word = "CBH"; // 姓名缩写：陈博皓
  const top = 6; // 字母起始行（整体居中）
  let col = 1; // 字母起始列
  for (const ch of word) {
    const bitmap = LETTERS[ch];
    bitmap.forEach((row, r) => {
      row.split("").forEach((cell, c) => {
        if (cell === "1") map[top + r][col + c] = 1;
      });
    });
    col += 7; // 5 列字母 + 2 列间距
  }
  // 在我方出生点周围加两块保护砖，增加策略性
  map[ROWS - 3][COLS / 2 - 2] = 1;
  map[ROWS - 3][COLS / 2 + 1] = 1;
  return map;
}

// ===================== 实体 =====================
interface Tank {
  x: number;
  y: number;
  dir: Dir;
  isPlayer: boolean;
  alive: boolean;
  cooldown: number; // 开火冷却剩余时间
  aiTimer: number; // 敌方 AI 转向计时
  invincible: number; // 无敌剩余时间（出生保护）
}

interface Bullet {
  x: number;
  y: number;
  dir: Dir;
  fromPlayer: boolean;
}

// ===================== 游戏状态 =====================
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let map = buildMap();
let player: Tank;
let enemies: Tank[] = [];
let bullets: Bullet[] = [];
let spawned = 0; // 已出场的敌人总数
let lives = PLAYER_LIVES;
let score = 0; // 击毁数
let spawnTimer = 0;
let over = false;
let last = 0;

const keys = new Set<string>();

// ===================== 碰撞工具 =====================
/** 矩形是否与砖块重叠 */
function hitBrick(x: number, y: number, size: number): boolean {
  const c0 = Math.floor(x / CELL);
  const c1 = Math.floor((x + size - 1) / CELL);
  const r0 = Math.floor(y / CELL);
  const r1 = Math.floor((y + size - 1) / CELL);
  for (let r = r0; r <= r1; r++)
    for (let c = c0; c <= c1; c++)
      if (map[r]?.[c] === 1) return true;
  return false;
}

/** 矩形是否与另一辆坦克重叠 */
function hitTank(self: Tank, x: number, y: number): boolean {
  const all = [player, ...enemies];
  return all.some(
    (t) =>
      t !== self &&
      t.alive &&
      x < t.x + TANK &&
      x + TANK > t.x &&
      y < t.y + TANK &&
      y + TANK > t.y
  );
}

/** 坦克能否移动到 (x, y) */
function canMove(t: Tank, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x + TANK > W || y + TANK > H) return false;
  if (hitBrick(x, y, TANK)) return false;
  if (hitTank(t, x, y)) return false;
  return true;
}

// ===================== 游戏逻辑 =====================
function makeTank(x: number, y: number, isPlayer: boolean): Tank {
  return {
    x,
    y,
    dir: isPlayer ? 0 : 2,
    isPlayer,
    alive: true,
    cooldown: 0,
    aiTimer: 0,
    invincible: 2, // 出生 2 秒无敌
  };
}

function spawnEnemy() {
  if (spawned >= ENEMY_TOTAL) return;
  const spots = [
    { c: 0, r: 0 },
    { c: COLS - 2, r: 0 },
    { c: Math.floor(COLS / 2) - 1, r: 0 },
  ];
  for (const s of spots) {
    const x = s.c * CELL + 2;
    const y = s.r * CELL + 2;
    if (!hitBrick(x, y, TANK) && !enemies.some((e) => e.alive && Math.abs(e.x - x) < TANK && Math.abs(e.y - y) < TANK) && !(player.alive && Math.abs(player.x - x) < TANK && Math.abs(player.y - y) < TANK)) {
      enemies.push(makeTank(x, y, false));
      spawned++;
      return;
    }
  }
}

function fire(t: Tank) {
  if (t.cooldown > 0) return;
  t.cooldown = t.isPlayer ? FIRE_COOLDOWN : 1.2;
  const cx = t.x + TANK / 2 + (DX[t.dir] * TANK) / 2;
  const cy = t.y + TANK / 2 + (DY[t.dir] * TANK) / 2;
  bullets.push({ x: cx, y: cy, dir: t.dir, fromPlayer: t.isPlayer });
}

function damagePlayer() {
  lives--;
  updateHud();
  if (lives <= 0) {
    player.alive = false;
    endGame(false);
  } else {
    // 回到出生点并短暂无敌
    Object.assign(player, makeTank(((COLS / 2) * CELL - TANK) / 2 + 2, H - CELL - TANK - 4, true));
  }
}

function endGame(w: boolean) {
  over = true;
  const overlay = document.getElementById("overlay")!;
  const title = document.getElementById("overlay-title")!;
  title.textContent = w ? "🎉 胜利！全部敌人已消灭" : "游戏结束";
  overlay.classList.remove("hidden");
}

function updateHud() {
  document.getElementById("hud-lives")!.textContent = String(lives);
  document.getElementById("hud-score")!.textContent = String(score);
  document.getElementById("hud-left")!.textContent = String(
    ENEMY_TOTAL - spawned + enemies.filter((e) => e.alive).length
  );
}

function update(dt: number) {
  // ---- 我方移动与开火 ----
  if (player.alive) {
    player.cooldown = Math.max(0, player.cooldown - dt);
    player.invincible = Math.max(0, player.invincible - dt);
    let dir: Dir | null = null;
    if (keys.has("ArrowUp") || keys.has("w")) dir = 0;
    else if (keys.has("ArrowRight") || keys.has("d")) dir = 1;
    else if (keys.has("ArrowDown") || keys.has("s")) dir = 2;
    else if (keys.has("ArrowLeft") || keys.has("a")) dir = 3;
    if (dir !== null) {
      player.dir = dir;
      const nx = player.x + DX[dir] * TANK_SPEED * dt;
      const ny = player.y + DY[dir] * TANK_SPEED * dt;
      if (canMove(player, nx, player.y)) player.x = nx;
      if (canMove(player, player.x, ny)) player.y = ny;
    }
    if (keys.has(" ")) fire(player);
  }

  // ---- 敌方 AI：随机转向 + 随机开火 ----
  spawnTimer += dt;
  if (
    spawnTimer >= SPAWN_INTERVAL &&
    enemies.filter((e) => e.alive).length < ENEMY_MAX_ALIVE
  ) {
    spawnTimer = 0;
    spawnEnemy();
  }
  for (const e of enemies) {
    if (!e.alive) continue;
    e.cooldown = Math.max(0, e.cooldown - dt);
    e.invincible = Math.max(0, e.invincible - dt);
    e.aiTimer -= dt;
    if (e.aiTimer <= 0) {
      e.aiTimer = 0.8 + Math.random() * 1.5;
      // 30% 概率朝我方大致方向转，否则随机转向
      if (player.alive && Math.random() < 0.3) {
        e.dir = Math.abs(player.x - e.x) > Math.abs(player.y - e.y)
          ? player.x > e.x ? 1 : 3
          : player.y > e.y ? 2 : 0;
      } else {
        e.dir = Math.floor(Math.random() * 4) as Dir;
      }
      if (Math.random() < 0.6) fire(e);
    }
    const nx = e.x + DX[e.dir] * TANK_SPEED * 0.7 * dt;
    const ny = e.y + DY[e.dir] * TANK_SPEED * 0.7 * dt;
    if (canMove(e, nx, e.y)) e.x = nx;
    else e.aiTimer = 0; // 撞墙立即重新决策
    if (canMove(e, e.x, ny)) e.y = ny;
    else e.aiTimer = 0;
  }

  // ---- 炮弹飞行与碰撞 ----
  const deadBullets = new Set<Bullet>();
  for (const b of bullets) {
    b.x += DX[b.dir] * BULLET_SPEED * dt;
    b.y += DY[b.dir] * BULLET_SPEED * dt;
    // 出界
    if (b.x < 0 || b.x > W || b.y < 0 || b.y > H) {
      deadBullets.add(b);
      continue;
    }
    // 击中砖块：砖块与炮弹一起消失
    const c = Math.floor(b.x / CELL);
    const r = Math.floor(b.y / CELL);
    if (map[r]?.[c] === 1) {
      map[r][c] = 0;
      deadBullets.add(b);
      continue;
    }
    // 击中坦克
    if (b.fromPlayer) {
      for (const e of enemies) {
        if (e.alive && e.invincible <= 0 &&
            b.x > e.x && b.x < e.x + TANK && b.y > e.y && b.y < e.y + TANK) {
          e.alive = false;
          score++;
          deadBullets.add(b);
          updateHud();
          break;
        }
      }
    } else if (
      player.alive && player.invincible <= 0 &&
      b.x > player.x && b.x < player.x + TANK &&
      b.y > player.y && b.y < player.y + TANK
    ) {
      deadBullets.add(b);
      damagePlayer();
    }
  }
  bullets = bullets.filter((b) => !deadBullets.has(b));

  // ---- 胜负判定 ----
  if (!over && spawned >= ENEMY_TOTAL && enemies.every((e) => !e.alive)) {
    endGame(true);
  }
}

// ===================== 绘制 =====================
function drawTank(t: Tank) {
  if (!t.alive) return;
  // 无敌期闪烁提示
  if (t.invincible > 0 && Math.floor(t.invincible * 8) % 2 === 0) return;
  const main = t.isPlayer ? COLOR.player : COLOR.enemy;
  const dark = t.isPlayer ? COLOR.playerDark : COLOR.enemyDark;
  ctx.fillStyle = main;
  ctx.fillRect(t.x, t.y, TANK, TANK);
  ctx.fillStyle = dark;
  // 两条履带
  if (t.dir === 0 || t.dir === 2) {
    ctx.fillRect(t.x, t.y, 6, TANK);
    ctx.fillRect(t.x + TANK - 6, t.y, 6, TANK);
  } else {
    ctx.fillRect(t.x, t.y, TANK, 6);
    ctx.fillRect(t.x, t.y + TANK - 6, TANK, 6);
  }
  // 炮管
  ctx.fillStyle = dark;
  const cx = t.x + TANK / 2;
  const cy = t.y + TANK / 2;
  const len = TANK / 2 + 6;
  if (t.dir === 0) ctx.fillRect(cx - 3, cy - len, 6, len);
  if (t.dir === 1) ctx.fillRect(cx, cy - 3, len, 6);
  if (t.dir === 2) ctx.fillRect(cx - 3, cy, 6, len);
  if (t.dir === 3) ctx.fillRect(cx - len, cy - 3, len, 6);
}

// ===================== 背景底图 =====================
// 底图素材：浪尖儿大学生社区（浪尖箐英）认证页截图，放在 public/tank-bg.jpg
const bgImage = new Image();
bgImage.src = import.meta.env.BASE_URL + "tank-bg.jpg";
let bgReady = false;
bgImage.onload = () => {
  bgReady = true;
};

function draw() {
  // 底图：优先绘制浪尖儿社区素材（cover 裁剪居中铺满），加载失败则回退纯色
  if (bgReady) {
    const scale = Math.max(W / bgImage.width, H / bgImage.height);
    const dw = bgImage.width * scale;
    const dh = bgImage.height * scale;
    ctx.drawImage(bgImage, (W - dw) / 2, (H - dh) / 2, dw, dh);
    // 半透明暗色遮罩，保证坦克与砖墙在深色截图上清晰可读
    ctx.fillStyle = "rgba(10, 18, 8, 0.45)";
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = COLOR.bg;
    ctx.fillRect(0, 0, W, H);
  }
  // 细网格纹理（叠加在底图之上，帮助判断格子位置）
  ctx.strokeStyle = COLOR.bgLine;
  ctx.lineWidth = 1;
  for (let i = 1; i < COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, H);
    ctx.stroke();
  }
  for (let i = 1; i < ROWS; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(W, i * CELL);
    ctx.stroke();
  }

  // 砖墙（带砖缝纹理）
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (map[r][c] !== 1) continue;
      ctx.fillStyle = COLOR.brick;
      ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
      ctx.fillStyle = COLOR.brickDark;
      ctx.fillRect(c * CELL, r * CELL + CELL / 2 - 1, CELL, 2);
      ctx.fillRect(c * CELL + CELL / 2 - 1, r * CELL, 2, CELL / 2);
      ctx.fillRect(c * CELL + CELL / 4 - 1, r * CELL + CELL / 2, 2, CELL / 2);
    }

  // 我方出生点标记
  ctx.fillStyle = COLOR.text;
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("▼ 出生点", (COLS / 2) * CELL, H - 6);

  for (const e of enemies) drawTank(e);
  drawTank(player);

  ctx.fillStyle = COLOR.bullet;
  for (const b of bullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, BULLET_R, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ===================== 主循环 =====================
function loop(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (!over) update(dt);
  draw();
  requestAnimationFrame(loop);
}

function reset() {
  map = buildMap();
  player = makeTank(((COLS / 2) * CELL - TANK) / 2 + 2, H - CELL - TANK - 4, true);
  enemies = [];
  bullets = [];
  spawned = 0;
  lives = PLAYER_LIVES;
  score = 0;
  spawnTimer = SPAWN_INTERVAL; // 立即刷出第一批敌人
  over = false;
  document.getElementById("overlay")!.classList.add("hidden");
  updateHud();
}

// ===================== 输入 =====================
window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key))
    e.preventDefault(); // 阻止空格 / 方向键滚动页面
  keys.add(e.key.length === 1 ? e.key.toLowerCase() : e.key);
});
window.addEventListener("keyup", (e) => {
  keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key);
});
document.getElementById("restart")!.addEventListener("click", reset);

reset();
requestAnimationFrame((t) => {
  last = t;
  requestAnimationFrame(loop);
});
