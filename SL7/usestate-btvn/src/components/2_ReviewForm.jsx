import { useState } from 'react';
import StarRating from './2_StarRating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './2_ReviewForm.css';

export default function ReviewForm() {
  // 5. Ba state: rating (0), comment (''), reviews ([])
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  // 7. Dữ liệu dẫn xuất (Derived State)
  const canSubmit = rating > 0 && comment.trim().length >= 5;

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  // 8. Xử lý gửi đánh giá
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
    };

    // Thêm vào đầu danh sách và reset form
    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setComment('');
  };

  return (
    <div className="review-wrapper">
      <Card className="review-card">
        <Card.Header className="review-card-header">
          <h3>Bài 2: Đánh giá sản phẩm</h3>
          <div className="rating-summary-badge">
            Trung bình {average}/5 ({reviews.length} lượt)
          </div>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* 6. Truyền value và onChange (setRating) như một Controlled Component */}
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Đánh giá của bạn:</Form.Label>
              <StarRating value={rating} onChange={setRating} />
            </Form.Group>

            {/* Ô nhận xét ít nhất 5 ký tự */}
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">
                Nhận xét (ít nhất 5 ký tự):
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nhận xét của bạn về trải nghiệm..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-textarea"
              />
              <span className="char-count">
                Đã nhập: {comment.trim().length}/5 ký tự
                {comment.trim().length > 0 && comment.trim().length < 5 && (
                  <span className="text-warning ms-2">
                    (cần thêm {5 - comment.trim().length} ký tự)
                  </span>
                )}
              </span>
            </Form.Group>

            {/* Nút gửi đánh giá: chỉ bấm được khi canSubmit hợp lệ */}
            <Button
              type="submit"
              variant="primary"
              className="submit-review-btn"
              disabled={!canSubmit}
            >
              Gửi đánh giá
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* 9. Hiển thị danh sách đánh giá */}
      <div className="reviews-list-section">
        <h4 className="reviews-title">
          Danh sách nhận xét ({reviews.length})
        </h4>

        {reviews.length === 0 ? (
          <div className="no-reviews">Chưa có đánh giá nào. Hãy gửi đánh giá đầu tiên!</div>
        ) : (
          <div className="reviews-list">
            {reviews.map((r) => (
              <div key={r.id} className="review-item">
                <div className="review-item-header">
                  <span className="stars-render">
                    <span className="stars-gold">{'★'.repeat(r.rating)}</span>
                    <span className="stars-gray">{'★'.repeat(5 - r.rating)}</span>
                  </span>
                  <span className="review-time">#{r.id.toString().slice(-4)}</span>
                </div>
                <p className="review-comment">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
