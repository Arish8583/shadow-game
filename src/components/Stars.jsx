import React from "react";

const stars = Array.from({ length: 50 }).map(() => ({
  top: Math.random() * 500,
  left: Math.random() * 500,
}));

export default function Stars() {
  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{ top: s.top, left: s.left, position: "absolute" }}
        />
      ))}
    </>
  );
}
