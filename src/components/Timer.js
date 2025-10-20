/*
 * Timer Component - Typing Test Application
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Real-time timer with progress visualization
 */

import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (time) => {
    if (time <= 10) return 'var(--red)';
    if (time <= 30) return 'var(--orange)';
    if (time <= 60) return 'var(--yellow)';
    return 'var(--green)';
  };

  const getProgressPercentage = (currentTime, totalTime) => {
    return ((totalTime - currentTime) / totalTime) * 100;
  };

  // Assuming total time for progress calculation (you might want to pass this as a prop)
  const totalTime = 120; // Default, should be passed from parent
  const progress = getProgressPercentage(timeLeft, totalTime);

  return (
    <div className="timer-container" aria-label="Test timer">
      <div className="timer-display">
        <div className="timer-icon">⏱️</div>
        <div 
          className="timer-text"
          style={{ color: getTimeColor(timeLeft) }}
          aria-live="polite"
          aria-atomic="true"
        >
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="timer-progress">
        <div 
          className="timer-progress-bar"
          style={{ 
            width: `${progress}%`,
            backgroundColor: getTimeColor(timeLeft)
          }}
        ></div>
      </div>
      
      <div className="timer-status">
        {timeLeft <= 10 && timeLeft > 0 && (
          <div className="timer-warning" role="alert">
            ⚠️ Time running out!
          </div>
        )}
        {timeLeft === 0 && (
          <div className="timer-finished" role="alert">
            🏁 Time's up!
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
