import React from "react";
import Cell from "./Cell";

const GRID_SIZE = 10;

export default function Board({ player, enemy, orb, enemyVisible }) {
  return (
    <div className="board">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
        const row = Math.floor(idx / GRID_SIZE);
        const col = idx % GRID_SIZE;
        const isPlayer = player.x === col && player.y === row;
        const isEnemy = enemyVisible && enemy.x === col && enemy.y === row;
        const isOrb = orb && orb.x === col && orb.y === row;

        return <Cell key={idx} isPlayer={isPlayer} isEnemy={isEnemy} isOrb={isOrb} />;
      })}
    </div>
  );
}
