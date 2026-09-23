import { Card, Badge, Button } from 'react-bootstrap';

const ProductCard = ({ product = {}, style, ...rest }) => {
  // ES6: Destructuring với giá trị mặc định
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock,
    discount = 0,
  } = product;

  // ES6: Nullish Coalescing (??) và Optional Chaining (?.)
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // ES6: Tính giá sau giảm
  const finalPrice = price !== undefined ? price * (1 - discount / 100) : 0;

  // Định dạng tiền tệ VND
  const formattedOriginalPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';
  const formattedFinalPrice =
    finalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';

  return (
    // ES6: Template literals và toán tử 3 ngôi
    <Card
      className={`h-100 position-relative shadow-sm ${inStock ? '' : 'opacity-75'}`}
      style={style}
      {...rest}
    >
      {/* ES6: Toán tử logic && */}
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="info">{categoryName}</Badge>
          {inStock !== undefined && (
            <Badge bg={inStock ? 'success' : 'secondary'}>
              {inStock ? 'Còn hàng' : 'Hết hàng'}
            </Badge>
          )}
        </div>

        <Card.Title className="fs-6 fw-bold mb-2">{name}</Card.Title>

        {/* ES6: Toán tử 3 ngôi */}
        <Card.Text className="fs-5 mb-2">
          {discount > 0 ? (
            <>
              <span className="text-danger fw-bold me-2">{formattedFinalPrice}</span>
              <del className="text-muted fs-6">{formattedOriginalPrice}</del>
            </>
          ) : (
            <span className="text-primary fw-bold">{formattedOriginalPrice}</span>
          )}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
          <small className="text-muted">
            ⭐ {ratingRate} {typeof ratingRate === 'number' ? `(${ratingCount})` : ''}
          </small>
          {rating?.rate >= 4.5 && (
            <Badge bg="warning" text="dark">
              Bán chạy
            </Badge>
          )}
        </div>

        <Button variant="primary" disabled={!inStock} className="w-100">
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
