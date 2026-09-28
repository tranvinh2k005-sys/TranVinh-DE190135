import { useState } from 'react';
import './2_ControlledInput.css';

function ControlledInput() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="controlled-input-wrapper">
      <div className="controlled-input-card">
        <div className="input-container">
          <input
            type="text"
            className="text-input"
            value={text}
            onChange={handleChange}
            placeholder="Type something..."
          />
          {text && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              title="Clear input"
            >
              ×
            </button>
          )}
        </div>

        <h2 className="input-display">
          Input text: {text}
        </h2>
      </div>
    </div>
  );
}

export default ControlledInput;
