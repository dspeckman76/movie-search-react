// src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";

/**
 * Footer
 * - Displays a site footer with copyright information
 * - Automatically updates the year
 */
function Footer() {
  return (
    <footer className="footer">
      Copyright &copy; {new Date().getFullYear()} Daniel Speckman
    </footer>
  );
}

export default Footer;
