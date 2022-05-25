import React, { useState } from 'react';

import '../stylesheets/Calculator.css';
import ToasterNotification from './ToasterNotification';
import tryParse from '../core/math/shuntingYardAlgorithm';

function Calculator() {
  const [isWrapperFocused, setIsWrapperFocused] = useState(false);
  const toggleIsWrapperFocused = () => setIsWrapperFocused(!isWrapperFocused);

  const [output, setOutput] = useState('');
  const handleInput = (e) => {
    const input = e.target.value;
    if (!input) {
      setOutput('');
      return;
    }

    const [, result] = tryParse(e.target.value);
    setOutput(result || '');
  };

  const [showNotification, setShowNotification] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="Calculator">
      <div className={`Calculator__wrapper ${isWrapperFocused ? 'Calculator__wrapper--focused' : ''}`}>
        <input
          className="Calculator__input"
          onBlur={toggleIsWrapperFocused}
          onFocus={toggleIsWrapperFocused}
          onInput={handleInput}
          type="text"
        />
        <div className={`Calculator__separator ${output ? '' : 'Calculator__separator--hidden'}`} />
        <div className={`Calculator__output ${output ? '' : 'Calculator__output--hidden'}`}>
          <button
            className="Calculator__icon"
            onClick={copyToClipboard}
            type="button"
          >
            &#128203;
          </button>
          <p className="Calculator__result">{output}</p>
        </div>
      </div>
      {showNotification
        && <ToasterNotification message="Copied to clipboard" />}
    </div>
  );
}

export default Calculator;
