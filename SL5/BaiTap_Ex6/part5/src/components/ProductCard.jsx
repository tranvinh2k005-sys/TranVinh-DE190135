import { Card, Badge, Button } from 'react-bootstrap';

const ProductCard = ({ product = {} }) => {
  // 1. Destructuring với giá trị mặc định cho name và discount
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock,
    discount = 0,
  } = product;

  // Xử lý ảnh mặc định bằng Nullish Coalescing (??)
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';

  // Xử lý danh mục bằng Optional Chaining (?.) và Nullish Coalescing (??)
  const categoryName = category?.name ?? 'Chưa phân loại';

  // 5. Tính giá sau giảm
  const finalPrice = price * (1 - discount / 100);

  // Định dạng tiền tệ VND
  const formattedOriginalPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';
  const formattedFinalPrice =
    finalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ??
    'Liên hệ';

  return (
    // 7. className của Card ghép bằng template literal: h-100 position-relative ${inStock ? '' : 'opacity-50'}
    <Card className={`h-100 position-relative shadow-sm ${inStock ? '' : 'opacity-50'}`}>
      {/* 3. Nhãn giảm giá: dùng discount > 0 && để tránh in ra số 0 khi discount = 0 */}
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      <Card.Body className="d-flex flex-column">
        {/* Hàng chứa Danh mục, Badge Bán chạy và Trạng thái kho */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex gap-1 flex-wrap">
            <Badge bg="info">{categoryName}</Badge>
            {/* 8. Badge "Bán chạy" khi rating rate >= 4.5 */}
            {rating?.rate >= 4.5 && (
              <Badge bg="warning" text="dark">
                Bán chạy
              </Badge>
            )}
          </div>

          {/* 2. Trạng thái kho bằng toán tử 3 ngôi */}
          {inStock ? (
            <Badge bg="success">Còn hàng</Badge>
          ) : (
            <Badge bg="secondary">Hết hàng</Badge>
          )}
        </div>

        <Card.Title className="fs-5 fw-bold mb-2">{name}</Card.Title>

        {/* 5. Hiển thị giá: Toán tử 3 ngôi kiểm tra discount > 0 để hiển thị giá sau giảm và gạch ngang giá gốc */}
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

        <Card.Text className="text-muted small mt-auto mb-3">
          ⭐ {rating?.rate ?? 'Chưa có'} {rating?.count ? `(${rating.count} đánh giá)` : ''}
        </Card.Text>

        {/* 6. Nút mua: disabled khi hết hàng và đổi nội dung nút */}
        <Button variant="primary" disabled={!inStock} className="w-100">
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
