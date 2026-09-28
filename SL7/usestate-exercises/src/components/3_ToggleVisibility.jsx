import { useState } from 'react';
import './3_ToggleVisibility.css';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="toggle-wrapper">
      <div className={`toggle-card ${isVisible ? 'has-content' : ''}`}>
        <button
          type="button"
          className="toggle-btn"
          onClick={handleToggle}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>

        {isVisible && (
          <h2 className="toggle-display">
            Toggle me!
          </h2>
        )}
      </div>
    </div>
  );
}

export default ToggleVisibility;
