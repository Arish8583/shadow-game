# React Survival Game

A simple **2D survival game** built with **React** and **Redux Toolkit**, where the player moves around a grid, collects orbs, avoids enemies, and tries to survive as long as possible. The game features a universe-themed background and modular components for easy maintenance.

---

## **Features**

- Player movement using **arrow keys** or **WASD**.
- Enemy spawns after a certain time and **chases the player**.
- Orbs appear randomly for the player to **collect points**.
- **Score and time survived** tracking.
- **Difficulty increases** over time.
- **Game Over** modal with restart option.
- Universe-themed board with stars.
- Modular components: `GameBoard`, `HUD`, `Modal`, `GameOverModal`.

---

## **Project Structure**

src/
├─ components/
│ ├─ GameBoard.jsx # Main game board component
│ ├─ Board.jsx # Grid rendering
│ ├─ Cell.jsx # Single grid cell
│ ├─ Stars.jsx # Universe background
│ ├─ HUD.jsx # Score, time, difficulty display
│ ├─ Modal.jsx # Reusable modal component
│ ├─ GameOverModal.jsx # Game Over modal
├─ redux/
│ ├─ store.js # Redux store configuration
│ ├─ gameSlice.js # Game state, actions, reducers
├─ App.jsx # Main container (handles HUD, game board, and modals)
├─ index.js # React entry point
├─ styles.css # Global styles for board, HUD, modal, and stars




How to Play

Click Start Game to begin.

Move the player using Arrow Keys or W, A, S, D.

Collect orbs to gain points.

Avoid the enemy, which spawns after a short time.

Survive as long as possible to increase your score and difficulty.

When caught by the enemy, a Game Over modal appears with your stats. Click Restart to play again.

Technologies Used

React – UI library

Redux Toolkit – State management

JavaScript (ES6+)

CSS – Styling and animations