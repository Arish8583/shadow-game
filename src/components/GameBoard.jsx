import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  movePlayer,
  spawnEnemy,
  moveEnemy,
  spawnOrb,
  removeOrb,
  collectOrb,
  tick,
  resetGame,
  startGame,
} from "../redux/gameSlice";
import HUD from "./HUD";
import Modal from "./Modal";
import "../styles.css";

const GRID_SIZE = 10;

// Generate random stars positions for the universe background
const stars = Array.from({ length: 50 }).map(() => ({
  top: Math.random() * 500,
  left: Math.random() * 500,
}));

export default function GameBoard() {
  const dispatch = useDispatch();
  const {
    player,
    enemy,
    orb,
    gameOver,
    gameStarted,
    enemyVisible,
    timeSurvived,
  } = useSelector((state) => state.game);

  // Keyboard controls for player movement
  useEffect(() => {
    const handleKey = (e) => {
      if (!gameStarted || gameOver) return;
      let x = player.x;
      let y = player.y;

      if (e.key === "ArrowUp" || e.key === "w") y--;
      if (e.key === "ArrowDown" || e.key === "s") y++;
      if (e.key === "ArrowLeft" || e.key === "a") x--;
      if (e.key === "ArrowRight" || e.key === "d") x++;

      dispatch(movePlayer({ x, y }));
      dispatch(collectOrb());
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dispatch, player, gameStarted, gameOver]);

  // Main game loop
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      dispatch(tick());

      if (timeSurvived === 10) dispatch(spawnEnemy());

      if (enemyVisible) dispatch(moveEnemy());

      if (timeSurvived % 20 === 0 && timeSurvived !== 0) dispatch(spawnOrb());

      if (timeSurvived % 20 === 10) dispatch(removeOrb());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, gameStarted, enemyVisible, timeSurvived]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <HUD />

      {/* Universe stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{ top: s.top, left: s.left, position: "absolute" }}
        />
      ))}

      {/* Game board */}
      <div className="board">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const row = Math.floor(idx / GRID_SIZE);
          const col = idx % GRID_SIZE;
          const isPlayer = player.x === col && player.y === row;
          const isEnemy = enemyVisible && enemy.x === col && enemy.y === row;
          const isOrb = orb && orb.x === col && orb.y === row;

          let className = "";
          if (isPlayer) className = "player";
          else if (isEnemy) className = "enemy";
          else if (isOrb) className = "orb";

          return <div key={idx} className={className} />;
        })}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <Modal title="💀 Game Over">
          <p>Score: {player.score}</p>
          <p>Time Survived: {timeSurvived}s</p>
          <button
            onClick={() => {
              dispatch(resetGame());
              dispatch(startGame());
            }}
          >
            Restart
          </button>
        </Modal>
      )}

      {/* Initial Start Button */}
      {!gameStarted && !gameOver && (
        <button
          style={{ marginTop: "20px", padding: "12px 25px", fontSize: "18px" }}
          onClick={() => dispatch(startGame())}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
