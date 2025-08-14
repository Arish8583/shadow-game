import { createSlice } from "@reduxjs/toolkit";

const randomPos = () => ({
  x: Math.floor(Math.random() * 15) * 40, // grid spacing
  y: Math.floor(Math.random() * 10) * 40,
});

const initialState = {
  x: 0,
  y: 0,
  shadowX: 0,
  shadowY: 0,
  history: [],
  score: 0,
  orbs: [randomPos()],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    movePlayer: (state, action) => {
      const key = action.payload;
      let newX = state.x;
      let newY = state.y;

      if (key === "ArrowUp") newY -= 40;
      if (key === "ArrowDown") newY += 40;
      if (key === "ArrowLeft") newX -= 40;
      if (key === "ArrowRight") newX += 40;

      // keep player inside bounds
      newX = Math.max(0, Math.min(newX, 600));
      newY = Math.max(0, Math.min(newY, 400));

      // Save history
      state.history.push({ x: newX, y: newY });
      if (state.history.length > 10) state.history.shift();

      // Shadow follows oldest position
      const shadowTarget = state.history[0] || { x: 0, y: 0 };

      // Check player orb collision
      state.orbs = state.orbs.filter((orb) => {
        if (orb.x === newX && orb.y === newY) {
          state.score += 10;
          return false; // remove orb
        }
        return true;
      });

      // Check shadow orb collision
      state.orbs = state.orbs.filter((orb) => {
        if (orb.x === shadowTarget.x && orb.y === shadowTarget.y) {
          state.score -= 5;
          return false;
        }
        return true;
      });

      state.x = newX;
      state.y = newY;
      state.shadowX = shadowTarget.x;
      state.shadowY = shadowTarget.y;
    },
    spawnOrb: (state) => {
      if (state.orbs.length < 5) {
        state.orbs.push(randomPos());
      }
    },
  },
});

export const { movePlayer, spawnOrb } = playerSlice.actions;
export default playerSlice.reducer;
