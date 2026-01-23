import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      Copyright &copy; {new Date().getFullYear()} Daniel Speckman
    </footer>
  );
}

export default Footer;