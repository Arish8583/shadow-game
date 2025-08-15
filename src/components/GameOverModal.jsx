import React from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { resetGame, startGame } from "../redux/gameSlice";

export default function GameOverModal({ score, timeSurvived }) {
  const dispatch = useDispatch();

  return (
    <Modal title="💀 Game Over">
      <p>Score: {score}</p>
      <p>Time Survived: {timeSurvived}s</p>
      <button onClick={() => { dispatch(resetGame()); dispatch(startGame()); }}>
        Restart
      </button>
    </Modal>
  );
}
