import { Card, Badge } from 'react-bootstrap';

function ProductCard({ product }) {
  // 1. Destructuring với giá trị mặc định cho name
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
  } = product || {};

  // 2. Ảnh mặc định nếu thiếu
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';

  // 3. Danh mục an toàn bằng Optional Chaining (?.) và Nullish Coalescing (??)
  const categoryName = category?.name ?? 'Chưa phân loại';

  // 4. Điểm đánh giá và số lượt đánh giá
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // 5. Định dạng giá tiền bằng toLocaleString an toàn
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
        <Card.Text className="text-danger fw-bold fs-5 my-2">
          {formattedPrice}
        </Card.Text>
        <Card.Text className="text-muted mt-auto mb-0">
          ⭐ Đánh giá: <strong>{ratingRate}</strong> ({ratingCount} lượt)
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
