/*
 * Grading Information Component - Typing Test Application
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Displays grading criteria and calculation method
 */

import React, { useState } from 'react';
import './GradingInfo.css';

const GradingInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`grading-info ${isExpanded ? 'expanded' : ''}`}>
      <div className="grading-header" onClick={toggleExpanded}>
        <span className="grading-title">📊 Grading</span>
        <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
      </div>
      
      {isExpanded && (
        <div className="grading-content">
          <div className="grades-section">
            <h4>🏆 Grade Scale</h4>
            <div className="grade-list">
              <div className="grade-item">
                <span className="grade-badge a-plus">A+</span>
                <span className="grade-range">90-100</span>
                <span className="grade-desc">Excellent!</span>
              </div>
              <div className="grade-item">
                <span className="grade-badge a">A</span>
                <span className="grade-range">80-89</span>
                <span className="grade-desc">Great job!</span>
              </div>
              <div className="grade-item">
                <span className="grade-badge b">B</span>
                <span className="grade-range">70-79</span>
                <span className="grade-desc">Good work!</span>
              </div>
              <div className="grade-item">
                <span className="grade-badge c">C</span>
                <span className="grade-range">60-69</span>
                <span className="grade-desc">Keep practicing!</span>
              </div>
              <div className="grade-item">
                <span className="grade-badge d">D</span>
                <span className="grade-range">0-59</span>
                <span className="grade-desc">More practice needed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingInfo;
