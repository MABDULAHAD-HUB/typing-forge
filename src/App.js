/*
 * TypingForge Application
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * This software is the proprietary information of M ABDUL AHAD.
 * Use is subject to license terms.
 * 
 * Developer: M ABDUL AHAD
 * Version: 1.0.0
 * Created: 2025
 * 
 * TypingForge - Where Typing Skills Are Forged
 */

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SettingsPage from './components/SettingsPage';
import TypingTest from './components/TypingTest';
import Footer from './components/Footer';
import GradingInfo from './components/GradingInfo';

function App() {
  const [currentPage, setCurrentPage] = useState('settings');
  const [testSettings, setTestSettings] = useState(null);

  const handleStartTest = (settings) => {
    setTestSettings(settings);
    setCurrentPage('test');
  };

  const handleBackToSettings = () => {
    setCurrentPage('settings');
    setTestSettings(null);
  };

  const handlePageChange = (page) => {
    if (page === 'settings') {
      handleBackToSettings();
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-app-content">
        {currentPage === 'settings' ? (
          <SettingsPage onStartTest={handleStartTest} />
        ) : (
          <TypingTest 
            settings={testSettings} 
            onBackToSettings={handleBackToSettings}
          />
        )}
      </div>
      <Footer />
      <GradingInfo />
    </div>
  );
}

export default App;
