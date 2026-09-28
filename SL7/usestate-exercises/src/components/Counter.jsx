import { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-wrapper">
      <div className="counter-card">
        <div className="counter-buttons">
          <button
            type="button"
            className="counter-btn increment-btn"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            type="button"
            className="counter-btn decrement-btn"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            type="button"
            className="counter-btn reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <h2 className="counter-display">
          Count: {count}
        </h2>
      </div>
    </div>
  );
}

export default Counter;
