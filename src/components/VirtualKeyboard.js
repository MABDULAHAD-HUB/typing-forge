/*
 * Virtual Keyboard Component - Typing Test Application
 * Copyright (c) 2025 M ABDUL AHAD. All rights reserved.
 * 
 * Developer: M ABDUL AHAD
 * Interactive virtual keyboard with visual feedback
 */

import React from 'react';
import './VirtualKeyboard.css';

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const VirtualKeyboard = ({ activeKey, onKeyClick, disabled }) => {
  const handleKeyClick = (key) => {
    if (disabled) return;
    onKeyClick(key);
  };

  const isKeyActive = (key) => {
    return activeKey && activeKey.toLowerCase() === key.toLowerCase();
  };

  return (
    <div className="virtual-keyboard" aria-label="Virtual Keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${isKeyActive(key) ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => handleKeyClick(key)}
              disabled={disabled}
              aria-label={`Type ${key}`}
              tabIndex={disabled ? -1 : 0}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
      
      <div className="keyboard-spacebar-row">
        <button
          className={`key spacebar ${isKeyActive(' ') ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleKeyClick(' ')}
          disabled={disabled}
          aria-label="Space bar"
          tabIndex={disabled ? -1 : 0}
        >
          SPACE
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
