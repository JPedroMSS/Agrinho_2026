// ===============================
// 007: CARBON CHASE - FINAL VISUAL VERSION
// Endless Runner Sustentável
// ===============================

let gameState = "start";

let player;
let obstacles = [];
let tokens = [];
let gadgetsPickups = [];

let score = 0;
let ecoScore = 0;
let distance = 0;

let gameSpeed = 4;

let gadgets = {
  shield: 1,
  pulse: 1,
  turbo: 1
};

let shieldActive = false;
let shieldTimer = 0;

let turboActive = false;
let turboTimer = 0;

// ===============================
function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);

  player = {
    x: width / 2,
    y: height - 80,
    speed: 5
  };
}

// ===============================
function draw() {
  background(15);

  if (gameState === "start") return drawStartScreen();
  if (gameState === "story") return drawStoryScreen();

  runGame();
}

// ===============================
// START SCREEN
// ===============================
function drawStartScreen() {
  fill(255);

  textSize(30);
  text("007: CARBON CHASE", width / 2, height / 3);

  textSize(14);
  text("← → mover o Aston Martin sustentável", width / 2, height / 3 + 60);
  text("Z escudo | X pulso | C turbo", width / 2, height / 3 + 85);

  text("Colete energia limpa e evite poluição", width / 2, height / 3 + 120);

  textSize(18);
  text("Clique para iniciar a missão", width / 2, height / 2 + 80);
}

// ===============================
function mousePressed() {
  if (gameState === "start") gameState = "story";
  else if (gameState === "story") startGame();
}

function keyPressed() {
  if (gameState === "story") startGame();
  if (gameState !== "playing") return;

  if (key === "z") useShield();
  if (key === "x") usePulse();
  if (key === "c") useTurbo();
}

function startGame() {
  gameState = "playing";
}

// ===============================
// STORY (MELHORADA)
// ===============================
function drawStoryScreen() {
  fill(255);
  textSize(14);

  text(
`AGENTE 007,

O planeta entrou em colapso ambiental.

Mega corporações estão destruindo florestas,
poluindo oceanos e acelerando o caos climático.

Seu Aston Martin foi equipado especialmente com tecnologia limpa
e energia sustentável para combater essa adversidade.

MISSÃO: CARBON CHASE

Colete energia limpa 🌱
Evite poluição ☠️
Mantenha o equilíbrio do planeta.`,
    width / 2,
    height / 2
  );

  textSize(12);
  text("Clique ou pressione qualquer tecla para iniciar", width / 2, height - 60);
}

// ===============================
function runGame() {
  drawRoad();

  updateDifficulty();

  distance += gameSpeed;

  movePlayer();
  drawPlayer();

  if (obstacles.length < 2) spawnInitialObjects();
  if (tokens.length < 2) spawnInitialTokens();

  spawnObjects();
  spawnGadgets();

  updateObstacles();
  updateTokens();
  updateGadgetPickups();

  updateGadgets();
  drawHUD();
}

// ===============================
function spawnInitialObjects() {
  for (let i = 0; i < 2; i++) {
    obstacles.push({
      x: random(width / 4, 3 * width / 4),
      y: random(-200, -50),
      size: 25
    });
  }
}

function spawnInitialTokens() {
  for (let i = 0; i < 2; i++) {
    tokens.push({
      x: random(width / 4, 3 * width / 4),
      y: random(-200, -50),
      size: 16
    });
  }
}

// ===============================
function updateDifficulty() {
  gameSpeed += turboActive ? 0.02 : 0.002;
  gameSpeed = constrain(gameSpeed, 4, 12);
}

// ===============================
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;

  player.x = constrain(player.x, width / 4 + 20, 3 * width / 4 - 20);
}

// ===============================
// CARRO (MELHOR VISUAL)
// ===============================
function drawPlayer() {
  push();
  translate(player.x, player.y);

  if (shieldActive) {
    noFill();
    stroke(0, 180, 255);
    strokeWeight(2);
    ellipse(0, 0, 65, 45);
  }

  // corpo
  noStroke();
  fill(0, 100, 200);
  beginShape();
  vertex(-22, 10);
  vertex(-18, -8);
  vertex(-10, -15);
  vertex(10, -15);
  vertex(18, -8);
  vertex(22, 10);
  endShape(CLOSE);

  // cabine
  fill(200);
  rect(-8, -8, 16, 7, 3);

  // rodas
  fill(30);
  ellipse(-14, 10, 8);
  ellipse(14, 10, 8);

  // faróis
  fill(255, 255, 150);
  ellipse(-18, 4, 4);
  ellipse(18, 4, 4);

  pop();
}

// ===============================
function drawRoad() {
  fill(30);
  rect(width / 4, 0, width / 2, height);

  stroke(255, 200);
  let offset = frameCount * gameSpeed;

  for (let i = 0; i < height; i += 40) {
    let y = (i + offset) % height;
    line(width / 2, y, width / 2, y + 20);
  }

  noStroke();
}

// ===============================
function spawnObjects() {
  if (frameCount % Math.max(18, 60 - gameSpeed * 5) !== 0) return;

  let x = random(width / 4, 3 * width / 4);

  if (random() < 0.6) {
    obstacles.push({ x, y: -30, size: 25 });
  } else {
    tokens.push({ x, y: -20, size: 16 });
  }
}

// ===============================
function spawnGadgets() {
  if (frameCount % 240 === 0) {
    gadgetsPickups.push({
      x: random(width / 4, 3 * width / 4),
      y: -30,
      type: random(["shield", "pulse", "turbo"])
    });
  }
}

// ===============================
// TOKENS (ENERGIA LIMPA)
// ===============================
function updateTokens() {
  for (let i = tokens.length - 1; i >= 0; i--) {
    let t = tokens[i];
    t.y += gameSpeed;

    push();
    translate(t.x, t.y);

    fill(0, 255, 120);
    ellipse(0, 0, t.size);

    stroke(255, 200);
    for (let a = 0; a < TWO_PI; a += PI / 4) {
      line(0, 0, cos(a) * 10, sin(a) * 10);
    }

    pop();

    if (dist(player.x, player.y, t.x, t.y) < 18) {
      score += 10;
      ecoScore += 10;
      tokens.splice(i, 1);
    }

    if (t.y > height + 50) tokens.splice(i, 1);
  }
}

// ===============================
// POLUIÇÃO (OBSTÁCULOS)
// ===============================
function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.y += gameSpeed;

    push();
    translate(o.x, o.y);

    for (let j = 0; j < 3; j++) {
      fill(255, 0, 0, 120 - j * 30);
      ellipse(random(-10, 10), random(-10, 10), o.size - j * 5);
    }

    pop();

    let hit = dist(player.x, player.y, o.x, o.y) < 18;

    if (hit && !shieldActive) ecoScore -= 15;

    if (hit) obstacles.splice(i, 1);
    if (o.y > height + 50) obstacles.splice(i, 1);
  }
}

// ===============================
// POWER UPS VISUAIS
// ===============================
function updateGadgetPickups() {
  for (let i = gadgetsPickups.length - 1; i >= 0; i--) {
    let g = gadgetsPickups[i];
    g.y += gameSpeed;

    push();
    translate(g.x, g.y);

    if (g.type === "shield") {
      fill(0, 180, 255);
      ellipse(0, 0, 18);
    } else if (g.type === "pulse") {
      fill(255, 230, 0);
      triangle(-8, 8, 0, -10, 8, 8);
    } else {
      fill(255, 120, 0);
      rect(-8, -8, 16, 16);
    }

    pop();

    if (dist(player.x, player.y, g.x, g.y) < 20) {
      gadgets[g.type] = min(gadgets[g.type] + 1, 3);
      gadgetsPickups.splice(i, 1);
    }

    if (g.y > height + 50) gadgetsPickups.splice(i, 1);
  }
}

// ===============================
function useShield() {
  if (gadgets.shield <= 0) return;
  gadgets.shield--;
  shieldActive = true;
  shieldTimer = 120;
}

function usePulse() {
  if (gadgets.pulse <= 0) return;
  gadgets.pulse--;
  obstacles = [];
}

function useTurbo() {
  if (gadgets.turbo <= 0) return;
  gadgets.turbo--;
  turboActive = true;
  turboTimer = 180;
}

// ===============================
function updateGadgets() {
  if (--shieldTimer <= 0) shieldActive = false;
  if (--turboTimer <= 0) turboActive = false;
}

// ===============================
function drawHUD() {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(12);

  text("Score: " + score, 10, 10);
  text("Eco: " + ecoScore, 10, 25);
  text("Dist: " + floor(distance), 10, 40);
  text("Speed: " + gameSpeed.toFixed(1), 10, 55);

  text("Shield: " + gadgets.shield, 10, 75);
  text("Pulse: " + gadgets.pulse, 10, 90);
  text("Turbo: " + gadgets.turbo, 10, 105);

  let rank = "🟡 Agente Neutro";
  if (ecoScore >= 100) rank = "🟢 Guardião do Planeta";
  if (ecoScore < 0) rank = "🔴 Agente Poluente";

  text("Rank: " + rank, 10, 130);
}