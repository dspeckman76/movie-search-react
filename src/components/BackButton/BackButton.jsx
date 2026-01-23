// src/components/BackButton/BackButton.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BackButton.css";

function BackButton({ fallback = "/", className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.fromSearch) {
      navigate(location.state.fromSearch);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      className={className || "back-button"}
      onClick={handleBack}
    >
      ← Back
    </button>
  );
}

export default BackButton;
