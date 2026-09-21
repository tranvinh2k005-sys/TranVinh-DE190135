import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const ProductCard = ({ product = {} }) => {
  // 1. Destructuring với tham số mặc định cho name
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
  } = product;

  // 2. Xử lý ảnh mặc định bằng Nullish Coalescing (??)
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';

  // 3. Xử lý danh mục bằng Optional Chaining (?.) và Nullish Coalescing (??)
  // Nếu bỏ ?. thành category.name thì với productB (category = undefined) sẽ ném lỗi:
  // TypeError: Cannot read properties of undefined (reading 'name')
  const categoryName = category?.name ?? 'Chưa phân loại';

  // 4. Xử lý rating rate và count
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // 5. Xử lý giá tiền
  // Sử dụng price?.toLocaleString(...) ?? 'Liên hệ'
  // Với productB (price = 0): 0?.toLocaleString(...) -> "0 ₫" (không bị đè thành 'Liên hệ')
  // Với productC (price = undefined): undefined?.toLocaleString(...) -> undefined -> 'Liên hệ'
  // Nếu dùng || thay vì ??: price || 'Liên hệ' thì price = 0 (falsy) sẽ bị biến thành 'Liên hệ' (sai!)
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
          <Badge bg="info">{categoryName}</Badge>
        </div>
        <Card.Title className="fs-5 fw-bold mb-2">{name}</Card.Title>
        <Card.Text className="text-primary fw-bold fs-5 mb-2">
          {formattedPrice}
        </Card.Text>
        <Card.Text className="text-muted mt-auto mb-0">
          ⭐ {ratingRate} {typeof ratingRate === 'number' ? `(${ratingCount} đánh giá)` : ''}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
