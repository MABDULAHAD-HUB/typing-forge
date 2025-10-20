/*
 * Settings Page Component - Typing Test Application
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * This component handles test configuration and settings
 */

import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

const defaultSentences = [
  "Success is not final, failure is not fatal. It is the courage to continue that counts.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "In the middle of every difficulty lies opportunity.",
  "Believe you can and you're halfway there.",
  "The best way to predict the future is to create it.",
  "It always seems impossible until it's done.",
  "Dream big and dare to fail.",
  "Happiness is not something ready made. It comes from your own actions.",
  "Don't watch the clock do what it does. Keep going.",
  "Your time is limited, so don't waste it living someone else's life."
];

const SettingsPage = ({ onStartTest }) => {
  const [timer, setTimer] = useState(120);
  const [customSentences, setCustomSentences] = useState('');
  const [error, setError] = useState('');
  const [useCustomSentences, setUseCustomSentences] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedTimer = localStorage.getItem('typingTestTimer');
      const savedSentences = localStorage.getItem('typingTestSentences');
      
      if (savedTimer) {
        setTimer(parseInt(savedTimer, 10));
      }
      
      if (savedSentences) {
        const sentences = JSON.parse(savedSentences);
        if (Array.isArray(sentences) && sentences.length > 0) {
          setCustomSentences(sentences.join('\n'));
          setUseCustomSentences(true);
        }
      }
    } catch (e) {
      console.warn('Failed to load saved settings:', e);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate timer
    if (timer < 30 || timer > 600) {
      setError('Timer must be between 30 and 600 seconds.');
      return;
    }

    let sentences = defaultSentences;
    
    // Use custom sentences if provided
    if (useCustomSentences && customSentences.trim()) {
      const customSentenceArray = customSentences
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      if (customSentenceArray.length === 0) {
        setError('Please enter at least one valid sentence.');
        return;
      }
      
      sentences = customSentenceArray;
    }

    // Save settings to localStorage
    try {
      localStorage.setItem('typingTestTimer', timer.toString());
      if (useCustomSentences) {
        localStorage.setItem('typingTestSentences', JSON.stringify(sentences));
      } else {
        localStorage.removeItem('typingTestSentences');
      }
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }

    // Start the test
    onStartTest({
      timer,
      sentences
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="timer" className="form-label">
              Test Duration
            </label>
            <div className="timer-input-group">
              <input
                type="range"
                id="timer"
                min="30"
                max="600"
                step="30"
                value={timer}
                onChange={(e) => setTimer(parseInt(e.target.value, 10))}
                className="timer-slider"
                aria-label="Test duration in seconds"
              />
              <div className="timer-display">
                {formatTime(timer)} ({timer}s)
              </div>
            </div>
            <div className="timer-presets">
              {[30, 60, 120, 300, 600].map(time => (
                <button
                  key={time}
                  type="button"
                  className={`preset-btn ${timer === time ? 'active' : ''}`}
                  onClick={() => setTimer(time)}
                  aria-label={`Set timer to ${formatTime(time)}`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="useCustom"
                checked={useCustomSentences}
                onChange={(e) => setUseCustomSentences(e.target.checked)}
                className="custom-checkbox"
              />
              <label htmlFor="useCustom" className="checkbox-label">
                Use Custom Sentences
              </label>
            </div>
            
            {useCustomSentences && (
              <div className="textarea-group">
                <label htmlFor="sentences" className="form-label">
                  Custom Sentences (one per line)
                </label>
                <textarea
                  id="sentences"
                  value={customSentences}
                  onChange={(e) => setCustomSentences(e.target.value)}
                  placeholder="Enter your custom sentences here...&#10;Each sentence should be on a new line.&#10;Make sure sentences are challenging but fair!"
                  className="sentences-textarea"
                  rows="6"
                  aria-label="Custom sentences input"
                />
                <div className="sentence-count">
                  {customSentences.split('\n').filter(s => s.trim()).length} sentences
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="error-message" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <button type="submit" className="start-btn">
            <span className="btn-icon">🚀</span>
            Start Typing Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
