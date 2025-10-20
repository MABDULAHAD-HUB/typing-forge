/*
 * Results Panel Component - TypingForge
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Real-time and final results display with analytics and PDF export
 */

import React from 'react';
import './ResultsPanel.css';

const ResultsPanel = ({ 
  accuracy, 
  wpm, 
  showFinalResults, 
  finalAccuracy, 
  finalWpm 
}) => {
  const getAccuracyColor = (acc) => {
    if (acc >= 95) return 'var(--green)';
    if (acc >= 85) return 'var(--yellow)';
    if (acc >= 70) return 'var(--orange)';
    return 'var(--red)';
  };

  const getWpmColor = (speed) => {
    if (speed >= 80) return 'var(--green)';
    if (speed >= 60) return 'var(--yellow)';
    if (speed >= 40) return 'var(--orange)';
    return 'var(--red)';
  };

  const getPerformanceGrade = (acc, speed) => {
    const avgScore = (acc + Math.min(speed * 1.25, 100)) / 2;
    if (avgScore >= 90) return { grade: 'A+', message: 'Excellent!' };
    if (avgScore >= 80) return { grade: 'A', message: 'Great job!' };
    if (avgScore >= 70) return { grade: 'B', message: 'Good work!' };
    if (avgScore >= 60) return { grade: 'C', message: 'Keep practicing!' };
    return { grade: 'D', message: 'More practice needed' };
  };



  const performance = getPerformanceGrade(accuracy, wpm);

  return (
    <div className="results-panel" aria-live="polite" aria-atomic="true">
      {!showFinalResults ? (
        <div className="live-stats">
          <div className="stat-group">
            <div className="stat-label">Accuracy</div>
            <div 
              className="stat-value" 
              style={{ color: getAccuracyColor(accuracy) }}
              aria-label={`Current accuracy: ${accuracy} percent`}
            >
              {accuracy}%
            </div>
          </div>
          
          <div className="stat-group">
            <div className="stat-label">Speed</div>
            <div 
              className="stat-value" 
              style={{ color: getWpmColor(wpm) }}
              aria-label={`Current speed: ${wpm} words per minute`}
            >
              {wpm} <span className="unit">WPM</span>
            </div>
          </div>
          
          <div className="stat-group">
            <div className="stat-label">Grade</div>
            <div className="grade-display">
              <div className="grade">{performance.grade}</div>
              <div className="grade-message">{performance.message}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="final-results" role="region" aria-label="Final test results">
          <div className="final-header">
            <h2>🎉 Test Complete!</h2>
          </div>
          
          <div className="final-stats">
            <div className="final-stat">
              <div className="final-stat-label">Final Accuracy</div>
              <div 
                className="final-stat-value"
                style={{ color: getAccuracyColor(finalAccuracy) }}
              >
                {finalAccuracy}%
              </div>
            </div>
            
            <div className="final-stat">
              <div className="final-stat-label">Final Speed</div>
              <div 
                className="final-stat-value"
                style={{ color: getWpmColor(finalWpm) }}
              >
                {finalWpm} <span className="unit">WPM</span>
              </div>
            </div>
            
            <div className="final-stat">
              <div className="final-stat-label">Overall Grade</div>
              <div className="final-grade">
                <div className="grade large">{getPerformanceGrade(finalAccuracy, finalWpm).grade}</div>
                <div className="grade-message">{getPerformanceGrade(finalAccuracy, finalWpm).message}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
