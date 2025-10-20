/*
 * Typing Test Component - TypingForge
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Main typing test logic and interface
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './TypingTest.css';
import VirtualKeyboard from './VirtualKeyboard';
import ResultsPanel from './ResultsPanel';
import Timer from './Timer';

const TypingTest = ({ settings, onBackToSettings }) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(settings.timer);
  const [isActive, setIsActive] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [sentenceCharStates, setSentenceCharStates] = useState([]);

  const typingAreaRef = useRef(null);
  const timerRef = useRef(null);

  const currentSentence = settings.sentences[currentSentenceIndex] || '';

  // Initialize sentence character states
  useEffect(() => {
    const states = currentSentence.split('').map(() => ({ status: 'pending' }));
    setSentenceCharStates(states);
    setCurrentCharIndex(0);
    setCurrentInput('');
  }, [currentSentence]);

  // Timer effect
  useEffect(() => {
    if (startTime && isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setShowFinalResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isActive, timeLeft]);

  // Calculate WPM and accuracy
  const calculateStats = useCallback(() => {
    if (!startTime) return { wpm: 0, accuracy: 100 };
    
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = correctChars / 5;
    const wpm = Math.round(wordsTyped / Math.max(elapsedMinutes, 0.01));
    const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);
    
    return { wpm: Math.max(0, wpm), accuracy: Math.max(0, Math.min(100, accuracy)) };
  }, [correctChars, totalTyped, startTime]);

  // Handle key press
  const handleKeyPress = useCallback((e) => {
    if (!isActive || showFinalResults) return;

    // Prevent default for navigation keys, backspace, delete, ctrl+a, and spacebar
    if (['Backspace', 'Delete', ' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key) || (e.ctrlKey && ['a', 'A'].includes(e.key))) {
      e.preventDefault();
    }

    // Only handle printable characters (including space)
    if (e.key.length !== 1) return;

    // Start timer on first keystroke
    if (!startTime) {
      setStartTime(Date.now());
    }

    const typedChar = e.key.toLowerCase();
    const expectedChar = currentSentence[currentCharIndex]?.toLowerCase();

    // Visual feedback for virtual keyboard
    setActiveKey(typedChar);
    setTimeout(() => setActiveKey(null), 150);

    setTotalTyped(prev => prev + 1);

    // Update character state
    setSentenceCharStates(prev => {
      const newStates = [...prev];
      if (newStates[currentCharIndex]) {
        newStates[currentCharIndex].status = typedChar === expectedChar ? 'correct' : 'incorrect';
      }
      return newStates;
    });

    // Update input and counters
    setCurrentInput(prev => prev + e.key);
    
    if (typedChar === expectedChar) {
      setCorrectChars(prev => prev + 1);
    }

    // Move to next character
    if (currentCharIndex < currentSentence.length - 1) {
      setCurrentCharIndex(prev => prev + 1);
    } else {
      // Sentence completed, move to next
      setTimeout(() => {
        const nextIndex = (currentSentenceIndex + 1) % settings.sentences.length;
        setCurrentSentenceIndex(nextIndex);
      }, 300);
    }
  }, [
    isActive,
    showFinalResults,
    startTime,
    currentCharIndex,
    currentSentence,
    currentSentenceIndex,
    settings.sentences.length
  ]);

  // Handle virtual keyboard click
  const handleVirtualKeyClick = useCallback((key) => {
    if (!isActive || showFinalResults) return;
    
    const event = new KeyboardEvent('keydown', { key });
    handleKeyPress(event);
  }, [handleKeyPress, isActive, showFinalResults]);

  // Focus management
  useEffect(() => {
    if (typingAreaRef.current && isActive) {
      typingAreaRef.current.focus();
    }
  }, [isActive, currentSentenceIndex]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => handleKeyPress(e);
    
    if (isActive && !showFinalResults) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, isActive, showFinalResults]);

  const stats = calculateStats();

  return (
    <div className="typing-test">
      <div className="main-content">
        <div className="typing-section">
          {showFinalResults && (
            <ResultsPanel
              accuracy={stats.accuracy}
              wpm={stats.wpm}
              showFinalResults={showFinalResults}
              finalAccuracy={stats.accuracy}
              finalWpm={stats.wpm}
            />
          )}

          <div className="typing-container">
            <div 
              className="typing-area"
              ref={typingAreaRef}
              tabIndex={0}
              role="textbox"
              aria-label="Typing area"
              aria-live="polite"
            >
              <div className="sentence-display">
                {currentSentence.split(' ').map((word, wordIndex) => {
                  const wordStartIndex = currentSentence.split(' ').slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
                  
                  return (
                    <div key={wordIndex} className="word-container">
                      <span className="word">
                        {word.split('').map((char, charIndex) => {
                          const absoluteIndex = wordStartIndex + charIndex;
                          const state = sentenceCharStates[absoluteIndex];
                          let className = 'char';
                          
                          if (state) {
                            if (state.status === 'correct') className += ' correct';
                            else if (state.status === 'incorrect') className += ' incorrect';
                          }
                          
                          if (absoluteIndex === currentCharIndex) className += ' current';
                          
                          return (
                            <span key={charIndex} className={className}>
                              {char}
                            </span>
                          );
                        })}
                      </span>
                      {wordIndex < currentSentence.split(' ').length - 1 && (
                        <span 
                          className={`space-char ${currentCharIndex === wordStartIndex + word.length ? 'current' : ''} ${sentenceCharStates[wordStartIndex + word.length]?.status === 'correct' ? 'correct' : sentenceCharStates[wordStartIndex + word.length]?.status === 'incorrect' ? 'incorrect' : ''}`}
                        >
                          ⎵
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="progress-info">
                <div className="sentence-progress">
                  Sentence {currentSentenceIndex + 1} of {settings.sentences.length}
                </div>
                <div className="char-progress">
                  {currentCharIndex + 1} / {currentSentence.length} characters
                </div>
              </div>
            </div>

            <VirtualKeyboard 
              activeKey={activeKey}
              onKeyClick={handleVirtualKeyClick}
              disabled={!isActive || showFinalResults}
            />

            {!isActive && !showFinalResults && (
              <div className="test-paused">
                <p>Test Paused</p>
                <button className="action-btn primary" onClick={() => setIsActive(true)}>
                  Resume
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="live-results-panel">
          <div className="results-header">
            <h3>Live Results</h3>
          </div>
          <div className="timer-section">
            <div className="timer-label">Time Remaining</div>
            <Timer timeLeft={timeLeft} />
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-label">Accuracy</div>
              <div 
                className="stat-value"
                style={{ color: stats.accuracy >= 95 ? 'var(--green)' : stats.accuracy >= 85 ? 'var(--yellow)' : stats.accuracy >= 70 ? 'var(--orange)' : 'var(--red)' }}
              >
                {stats.accuracy}%
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Speed</div>
              <div 
                className="stat-value"
                style={{ color: stats.wpm >= 80 ? 'var(--green)' : stats.wpm >= 60 ? 'var(--yellow)' : stats.wpm >= 40 ? 'var(--orange)' : 'var(--red)' }}
              >
                {stats.wpm} <span className="unit">WPM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
