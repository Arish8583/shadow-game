import React from "react";
import "../styles.css";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay-white">
      <div className="modal-content-white">
        <button className="modal-close-x" onClick={onClose}>×</button>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}
