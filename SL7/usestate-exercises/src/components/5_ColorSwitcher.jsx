import { useState } from 'react';
import './5_ColorSwitcher.css';

function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState('');

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="color-switcher-wrapper">
      <div className="color-switcher-card">
        {/* Dropdown chọn màu sắc */}
        <div className="select-container">
          <select
            className="color-dropdown"
            value={selectedColor}
            onChange={handleChange}
          >
            <option value="">Select a color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>

        {/* Khung div đổi màu nền theo giá trị đã chọn */}
        {selectedColor && (
          <div
            className="color-box"
            style={{ backgroundColor: selectedColor }}
            title={`Selected color: ${selectedColor}`}
          />
        )}
      </div>
    </div>
  );
}

export default ColorSwitcher;
