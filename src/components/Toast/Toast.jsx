// src/components/Toast/Toast.jsx
import React, { useEffect, useState } from "react";
import "./Toast.css";

function Toast({ message, type = "info", duration = 2000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className={`toast toast-${type}`}>{message}</div>;
}

export default Toast;
