import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  resetGame,
  movePlayer,
  spawnEnemy,
  moveEnemy,
  spawnOrb,
  removeOrb,
  collectOrb,
  tick,
} from "./redux/gameSlice";
import Modal from "./components/Modal";

export default function App() {
  const dispatch = useDispatch();
  const {
    player,
    enemy,
    orb,
    score,
    timeSurvived,
    difficulty,
    gameOver,
    gameStarted,
    enemyVisible,
  } = useSelector((state) => state.game);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (!gameStarted || gameOver) return;
      const moves = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      if (moves[e.key]) {
        const [dx, dy] = moves[e.key];
        dispatch(movePlayer({ x: player.x + dx, y: player.y + dy }));
        dispatch(collectOrb());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, gameStarted, gameOver, dispatch]);

  // Game loop
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
  }, [dispatch, gameStarted, timeSurvived, enemyVisible]);

  const renderCell = (row, col) => {
    const isPlayer = player.x === col && player.y === row;
    const isEnemy = enemyVisible && enemy.x === col && enemy.y === row;
    const isOrb = orb && orb.x === col && orb.y === row;
    return (
      <div
        key={`${row}-${col}`}
        style={{
          width: 40,
          height: 40,
          backgroundColor: isPlayer ? "blue" : isEnemy ? "red" : isOrb ? "gold" : "#292930",
        }}
      />
    );
  };

  return (
    <div style={{ textAlign: "center", padding: 20, fontFamily: "Arial" }}>
      <h1>Survival Game</h1>
      {!gameStarted && <button onClick={() => dispatch(startGame())}>Start Game</button>}

      {gameStarted && !gameOver && (
        <>
          <p>Score: {score}</p>
          <p>Time Survived: {timeSurvived}s</p>
          <p>Difficulty: {difficulty}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 40px)",
              gap: 2,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 10 }).map((_, col) => renderCell(row, col))
            )}
          </div>
        </>
      )}

      {gameOver && (
        <Modal title="💀 Game Over" onClose={() => dispatch(resetGame())}>
          <p>Score: {score}</p>
          <p>Time Survived: {timeSurvived}s</p>
        </Modal>
      )}
    </div>
  );
}
