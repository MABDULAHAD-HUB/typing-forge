/*
 * Footer Component - TypingForge
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 */

import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <div className="developer-section">
          <div className="developer-info">
            <span className="developed-by">Developed by:</span>
            <span className="developer-name">M ABDUL AHAD</span>
          </div>
          <div className="copyright-info">
            © {currentYear} M ABDUL AHAD - All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
