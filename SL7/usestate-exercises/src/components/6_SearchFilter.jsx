import { useState } from 'react';
import './6_SearchFilter.css';

function SearchFilter() {
  // Danh sách các mục dữ liệu mẫu
  const initialItems = [
    'React JS',
    'JavaScript',
    'TypeScript',
    'HTML & CSS',
    'Node.js',
    'Python',
    'Java Core',
    'C# / .NET',
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách theo từ khóa tìm kiếm (không phân biệt chữ hoa/thường)
  const filteredItems = initialItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter-card">
        <h2 className="search-title">Search Filter</h2>

        {/* Ô tìm kiếm */}
        <div className="search-input-box">
          <input
            type="text"
            className="search-input"
            placeholder="Type to search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Danh sách hiển thị các mục tìm kiếm */}
        <div className="search-results-container">
          {filteredItems.length > 0 ? (
            <ul className="search-list">
              {filteredItems.map((item, index) => (
                <li key={index} className="search-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No items match &quot;{searchTerm}&quot;</p>
          )}
        </div>

        {/* Thống kê số lượng kết quả */}
        <div className="search-footer">
          Showing {filteredItems.length} of {initialItems.length} items
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
