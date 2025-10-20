/*
 * Header Component - TypingForge
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Main application header with branding and navigation
 */

import React from 'react';
import './Header.css';

const Header = ({ currentPage, onPageChange }) => {
  const getPageContent = () => {
    if (currentPage === 'settings') {
      return {
        title: "TYPING FORGE",
        subtitle: "Configure your typing challenge"
      };
    } else {
      return {
        title: "TypingForge",
        subtitle: "Where Typing Skills Are Forged"
      };
    }
  };

  const pageContent = getPageContent();

  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-logo">
            <img 
              src="/logo.svg" 
              alt="TypingForge Logo" 
              className="logo-svg"
              width="200"
              height="60"
            />
            <div className="brand-text">
              <h1 className="brand-title">{pageContent.title}</h1>
              <p className="brand-tagline">{pageContent.subtitle}</p>
            </div>
          </div>
        </div>
        
        <nav className="header-nav" role="navigation">
          <div className="nav-items">
            {/* Navigation items removed for clean interface */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
