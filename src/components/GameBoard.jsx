import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { movePlayer, collectOrb, tick, spawnEnemy, moveEnemy, spawnOrb, removeOrb, startGame } from "../redux/gameSlice";
import HUD from "./HUD";
import Board from "./Board";
import Stars from "./Stars";
import GameOverModal from "./GameOverModal";

export default function GameBoard() {
  const dispatch = useDispatch();
  const { player, enemy, orb, enemyVisible, gameOver, gameStarted, timeSurvived } = useSelector((state) => state.game);

  // Keyboard controls
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
      <Stars />
      <Board player={player} enemy={enemy} orb={orb} enemyVisible={enemyVisible} />
      {gameOver && <GameOverModal score={player.score} timeSurvived={timeSurvived} />}
      {!gameStarted && !gameOver && (
        <button style={{ marginTop: "20px", padding: "12px 25px", fontSize: "18px" }} onClick={() => dispatch(startGame())}>
          Start Game
        </button>
      )}
    </div>
  );
}
