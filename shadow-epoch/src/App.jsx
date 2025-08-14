import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { movePlayer, spawnOrb } from "./features/player/playerSlice";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const { x, y, shadowX, shadowY, orbs, score } = useSelector(
    (state) => state.player
  );

  // Spawn orbs every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(spawnOrb());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#111",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
      tabIndex={0}
      onKeyDown={(e) => dispatch(movePlayer(e.key))}
    >
      {/* Score HUD */}
      <div style={{ padding: 20, fontSize: 24 }}>Score: {score}</div>

      {/* Orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          animate={{ x: orb.x, y: orb.y }}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "gold",
            position: "absolute",
          }}
        />
      ))}

      {/* Player */}
      <motion.div
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "cyan",
          position: "absolute",
        }}
      />

      {/* Shadow Clone */}
      <motion.div
        animate={{ x: shadowX, y: shadowY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "purple",
          opacity: 0.5,
          position: "absolute",
        }}
      />
    </div>
  );
}
