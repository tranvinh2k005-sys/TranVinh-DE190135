import { useState } from 'react';

const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export default function StarRating({ value = 0, onChange, max = 5 }) {
  // State thuần giao diện: chỉ lưu vị trí sao đang được rê chuột
  const [hovered, setHovered] = useState(0);

  // Dữ liệu dẫn xuất: khi rê chuột ưu tiên hovered, rời chuột lấy điểm value đã chọn
  const display = hovered || value;

  return (
    <div className="star-rating-container" onMouseLeave={() => setHovered(0)}>
      <div className="star-group">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= display ? 'active' : ''}`}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(star === value ? 0 : star)}
            aria-label={`${star} sao`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="star-label">
        {display === 0 ? 'Chưa đánh giá' : LABELS[display]}
      </span>
    </div>
  );
}
