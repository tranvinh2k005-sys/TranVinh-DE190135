import { Card, Badge } from 'react-bootstrap';

const ProductCard = ({ product = {}, style, ...rest }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock,
    discount,
  } = product;

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  const formattedPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';

  return (
    <Card className="h-100 shadow-sm" style={style} {...rest}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            -{discount}%
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="info">{categoryName}</Badge>
          {inStock !== undefined && (
            <Badge bg={inStock ? 'success' : 'secondary'}>
              {inStock ? 'Còn hàng' : 'Hết hàng'}
            </Badge>
          )}
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
