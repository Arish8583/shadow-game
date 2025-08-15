import React from "react";
import "../styles.css";

export default function Cell({ isPlayer, isEnemy, isOrb }) {
  let className = "";
  if (isPlayer) className = "player";
  else if (isEnemy) className = "enemy";
  else if (isOrb) className = "orb";

  return <div className={className} />;
}
