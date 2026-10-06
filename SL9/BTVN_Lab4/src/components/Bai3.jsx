import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { products as defaultProducts } from '../data/products';
import { getFinalPrice, formatVND } from '../utils/format';

const ALL = 'Tất cả';

const sorters = {
  default: () => 0,
  'price-asc': (a, b) => getFinalPrice(a) - getFinalPrice(b),
  'price-desc': (a, b) => getFinalPrice(b) - getFinalPrice(a),
  rating: (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
};

export const ProductCard = ({ product = {}, onAddToCart }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock,
    discount = 0,
  } = product;

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;
  const finalPrice = getFinalPrice(product);

  return (
    <Card className={`h-100 position-relative shadow-sm ${inStock ? '' : 'opacity-75'}`}>
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

        <Card.Text className="fs-5 mb-2">
          {discount > 0 ? (
            <>
              <span className="text-danger fw-bold me-2">{formatVND(finalPrice)}</span>
              <del className="text-muted fs-6">{formatVND(price)}</del>
            </>
          ) : (
            <span className="text-primary fw-bold">{formatVND(price)}</span>
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

        <Button
          variant="primary"
          disabled={!inStock}
          className="w-100"
          onClick={() => onAddToCart?.(product)}
        >
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export const ProductList = ({ products = [], onAddToCart }) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
};

export const ProductFilter = ({ products = defaultProducts, onAddToCart }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState(ALL);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const categories = [ALL, ...new Set(products.map((p) => p.category?.name ?? 'Khác'))];

  // Dữ liệu dẫn xuất: tính lại mỗi lần render, KHÔNG lưu vào state
  const visibleProducts = products
    .filter((p) => p.name.toLowerCase().includes(keyword.trim().toLowerCase()))
    .filter((p) => category === ALL || p.category?.name === category)
    .filter((p) => !onlyInStock || p.inStock)
    .sort(sorters[sortBy]);

  const handleReset = () => {
    setKeyword('');
    setCategory(ALL);
    setOnlyInStock(false);
    setSortBy('default');
  };

  return (
    <>
      <Row className="g-2 align-items-center mb-3">
        <Col md={5}>
          <Form.Control
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="rating">Đánh giá cao</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Check
            type="switch"
            id="only-in-stock"
            label="Còn hàng"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Button variant="outline-secondary" className="w-100" onClick={handleReset}>
            Xóa lọc
          </Button>
        </Col>
      </Row>

      <ButtonGroup className="mb-3 flex-wrap">
        {categories.map((name) => (
          <Button
            key={name}
            size="sm"
            variant={name === category ? 'primary' : 'outline-primary'}
            onClick={() => setCategory(name)}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>

      <p className="text-muted">{`Tìm thấy ${visibleProducts.length}/${products.length} sản phẩm`}</p>

      {visibleProducts.length === 0 ? (
        <Alert variant="warning">Không có sản phẩm phù hợp</Alert>
      ) : (
        <ProductList products={visibleProducts} onAddToCart={onAddToCart} />
      )}
    </>
  );
};

const Bai3 = ({ onAddToCart }) => {
  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-primary fw-bold">
        Bài 3: Tìm kiếm, lọc và sắp xếp sản phẩm (nhiều state, dữ liệu dẫn xuất)
      </h4>
      <ProductFilter products={defaultProducts} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Bai3;
