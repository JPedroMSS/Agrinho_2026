# Agrinho_2026
# 🌱 007: Carbon Chase

> An endless runner game focused on sustainability, built with p5.js  
> Collect clean energy, avoid pollution, and maintain planetary balance.

---

## 📌 Overview

**007: Carbon Chase** is a 2D endless runner game where the player controls a sustainable version of the iconic agent vehicle. The mission is to collect renewable energy tokens while avoiding environmental hazards.

The game combines arcade mechanics with an environmental awareness narrative.

---

## 🎮 Gameplay

- 🌱 Collect clean energy tokens to increase your score
- ☠️ Avoid pollution obstacles that reduce your ecological impact
- ⚡ Use special gadgets strategically:
  - 🛡️ Shield — protects from collisions
  - 💥 Pulse — clears obstacles
  - 🚀 Turbo — increases speed temporarily

---

## 🧠 Core Mechanics

### 🌍 Scoring System
- **Score** → general points
- **EcoScore** → environmental impact metric
- **Distance** → progression tracking
- **Speed** → dynamic difficulty scaling

### 🏆 Eco Ranking
| EcoScore | Rank |
|----------|------|
| ≥ 100 | 🟢 Guardian of the Planet |
| ≥ 0 | 🟡 Neutral Agent |
| < 0 | 🔴 Polluting Agent |

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| ⬅️ / ➡️ | Move vehicle |
| Z | Activate Shield 🛡️ |
| X | Activate Pulse 💥 |
| C | Activate Turbo 🚀 |

---

## 🧩 Game States

- `start` → Main menu
- `story` → Narrative intro
- `playing` → Active gameplay

---

## ⚙️ Technical Features

- Built with **p5.js**
- Procedural obstacle & token generation
- Increasing difficulty over time
- Dynamic speed scaling system
- Simple physics-based collision detection
- HUD with real-time stats
- Environmental theme-based scoring system

---

## 🧱 Project Structure

Key functions:

- `setup()` → initializes game
- `draw()` → main loop
- `runGame()` → gameplay controller
- `spawnObjects()` → generates obstacles & tokens
- `updateObstacles()` → handles collisions
- `updateTokens()` → manages collectibles
- `updateGadgetPickups()` → power-up system
- `drawHUD()` → interface rendering

---

## 🌍 Theme & Concept

This project explores the intersection between **gaming and environmental awareness**, encouraging players to reflect on sustainability through interactive mechanics.

> “Every action in the game reflects an impact on the planet.”

---

## 🚀 Getting Started

### ▶️ Run Locally

1. Open the [p5.js Editor](https://editor.p5js.org/)
2. Create a new sketch
3. Paste the code into `sketch.js`
4. Click **Play**

---

## 📈 Future Improvements

- 🔊 Sound effects and ambient soundtrack
- 🎬 Intro cutscene animation
- 🏁 Game Over screen with stats summary
- 📊 Persistent high score (localStorage)
- 🎨 Enhanced vehicle animations
- 🌎 Additional levels / environments
- 🤖 Smarter obstacle behavior

---

## 🛠️ Built With

- [p5.js](https://p5js.org/) — creative coding library

---

## 👨‍💻 Author

Project developed as a creative coding exercise combining **game design + environmental awareness**.

---

## 📜 License

This project is open-source for educational and creative purposes.
