import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function ProductCard({ product = {} }) {
  // 1. Destructuring với default parameter (chỉ áp dụng khi name là undefined)
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
  } = product;

  // 2. Ảnh mặc định bằng nullish coalescing (??)
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';

  // 3. Danh mục dùng optional chaining (?.) kết hợp nullish coalescing (??)
  const categoryName = category?.name ?? 'Chưa phân loại';

  // 4. Điểm đánh giá và số lượt đánh giá
  const ratingScore = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // 5. Giá định dạng VND với xử lý an toàn
  const formattedPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="info" className="text-dark">
            {categoryName}
          </Badge>
        </div>
        <Card.Title className="fs-5">{name}</Card.Title>
        <Card.Text className="text-primary fw-bold fs-5 mb-2">
          {formattedPrice}
        </Card.Text>
        <Card.Text className="text-muted small mt-auto">
          ⭐ Đánh giá: {ratingScore} ({ratingCount} lượt)
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
