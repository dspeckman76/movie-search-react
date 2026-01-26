// src/components/Toast/ToastContainer.jsx

import React, { createContext, useContext, useState } from "react";
import "./ToastContainer.css";

// Toast context
const ToastContext = createContext();

/**
 * useToast
 * - Hook for triggering toast messages globally
 */
export const useToast = () => useContext(ToastContext);

/**
 * ToastProvider
 * - Manages global toast state
 * - Renders toast messages in a fixed container
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
