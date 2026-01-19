import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If browser history exists, go back
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      ← Back
    </button>
  );
}

export default BackButton;

