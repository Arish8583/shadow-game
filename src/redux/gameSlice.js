import { createSlice } from "@reduxjs/toolkit";

const BOARD_SIZE = 10;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const initialState = {
  player: { x: 0, y: 0 },
  enemy: { x: 9, y: 9 },
  orb: null,
  score: 0,
  timeSurvived: 0,
  difficulty: 1,
  gameOver: false,
  gameStarted: false,
  enemyVisible: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state) {
      state.gameStarted = true;
      state.timeSurvived = 0;
      state.score = 0;
      state.difficulty = 1;
      state.enemyVisible = false;
      state.gameOver = false;
      state.player = { x: 0, y: 0 };
      state.enemy = { x: 9, y: 9 };
      state.orb = null;
    },
    resetGame: () => initialState,
    movePlayer(state, action) {
      const { x, y } = action.payload;
      if (!state.gameOver) {
        state.player.x = Math.max(0, Math.min(BOARD_SIZE - 1, x));
        state.player.y = Math.max(0, Math.min(BOARD_SIZE - 1, y));
      }
    },
    spawnEnemy(state) {
      state.enemyVisible = true;
    },
    moveEnemy(state) {
      if (state.enemyVisible && !state.gameOver) {
        if (state.enemy.x < state.player.x) state.enemy.x += 1;
        else if (state.enemy.x > state.player.x) state.enemy.x -= 1;

        if (state.enemy.y < state.player.y) state.enemy.y += 1;
        else if (state.enemy.y > state.player.y) state.enemy.y -= 1;

        // Check collision
        if (state.enemy.x === state.player.x && state.enemy.y === state.player.y) {
          state.gameOver = true;
        }
      }
    },
    spawnOrb(state) {
      state.orb = getRandomPosition();
    },
    removeOrb(state) {
      state.orb = null;
    },
    collectOrb(state) {
      if (state.orb && state.orb.x === state.player.x && state.orb.y === state.player.y) {
        state.score += 10;
        state.orb = null;
      }
    },
    tick(state) {
      if (!state.gameOver && state.gameStarted) {
        state.timeSurvived += 1;
        if (state.timeSurvived % 5 === 0) {
          state.difficulty += 1;
        }
        state.score += 1; // 1 point per second survived
      }
    },
  },
});

export const {
  startGame,
  resetGame,
  movePlayer,
  spawnEnemy,
  moveEnemy,
  spawnOrb,
  removeOrb,
  collectOrb,
  tick,
} = gameSlice.actions;

export default gameSlice.reducer;
