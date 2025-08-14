import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

export default function HUD() {
  const { score, timeSurvived, difficulty } = useSelector(
    (state) => state.game
  );

  return (
    <div className="hud">
      <div><strong>Score:</strong> {score}</div>
      <div><strong>Time:</strong> {timeSurvived}s</div>
      <div><strong>Difficulty:</strong> {difficulty}</div>
    </div>
  );
}
