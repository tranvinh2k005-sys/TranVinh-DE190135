import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppButton from './components/AppButton';
import InputField from './components/InputField';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import { products } from './data/products';

function App() {
  // 6. Spread object khi truyền props
  const product = products[0];
  const modifiedProduct = { ...product, discount: 30 };

  // 7. Spread mảng
  const saleProducts = products.slice(0, 2);
  const newProducts = products.slice(6);
  const featured = [...saleProducts, ...newProducts];

  // 8. Spread style
  const baseStyle = { borderRadius: 12 };
  const highlight = { border: '2px solid gold' };
  const combinedStyle = { ...baseStyle, ...highlight };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center fw-bold">
        Bài 6: AppButton và InputField (spread ... và rest ...)
      </h1>

      {/* Mục 1 & 2: AppButton với ...rest */}
      <section className="mb-5 p-4 border rounded bg-light">
        <h3 className="mb-3 text-primary">1. Thử nghiệm AppButton (...rest)</h3>
        <p className="text-muted">
          Thuộc tính <code>size</code>, <code>disabled</code>, <code>onClick</code> tự động chuyển xuống <code>Button</code> nhờ rest props.
        </p>
        <div className="d-flex gap-3 align-items-center flex-wrap">
          {/* Không truyền gì thêm: dùng variant mặc định 'primary' */}
          <AppButton onClick={() => alert('Nút mặc định đã được click!')}>
            Nút mặc định
          </AppButton>

          {/* variant="danger" và size="sm" */}
          <AppButton variant="danger" size="sm">
            Nút Danger Nhỏ
          </AppButton>

          {/* disabled */}
          <AppButton disabled>
            Nút Vô hiệu
          </AppButton>
        </div>
      </section>

      {/* Mục 3, 4 & 5: InputField với ...inputProps */}
      <section className="mb-5 p-4 border rounded bg-light">
        <h3 className="mb-3 text-primary">2. Thử nghiệm InputField (...inputProps)</h3>
        <p className="text-muted">
          Các thuộc tính như <code>type</code>, <code>placeholder</code>, <code>required</code> được truyền thẳng xuống <code>Form.Control</code>.
        </p>
        <Row>
          <Col md={6}>
            <InputField
              id="contactEmail"
              label="Email"
              type="email"
              placeholder="name@example.com"
              required
              helpText="Chúng tôi không chia sẻ email của bạn"
            />
          </Col>
          <Col md={6}>
            <InputField
              id="fullName"
              label="Họ và tên"
              type="text"
              placeholder="Nguyễn Văn A"
            />
          </Col>
        </Row>
      </section>

      {/* Mục 6: Spread object */}
      <section className="mb-5 p-4 border rounded bg-light">
        <h3 className="mb-3 text-primary">3. Spread Object khi truyền props</h3>
        <p className="text-muted">
          Ghi đè thuộc tính <code>discount: 30</code> của sản phẩm đầu tiên mà không làm thay đổi dữ liệu gốc trong <code>products</code>.
        </p>
        <Row className="g-4">
          <Col md={6}>
            <h5 className="text-secondary">Sản phẩm gốc trong mảng (discount: {product.discount}%)</h5>
            <ProductCard product={product} />
          </Col>
          <Col md={6}>
            <h5 className="text-success">Sản phẩm sau khi spread ghi đè (discount: {modifiedProduct.discount}%)</h5>
            <ProductCard product={modifiedProduct} />
          </Col>
        </Row>
        <div className="mt-3 alert alert-info">
          <strong>Kiểm tra tính bất biến:</strong> <code>products[0].discount</code> vẫn giữ nguyên là{' '}
          <span className="badge bg-secondary">{products[0].discount}%</span>.
        </div>
      </section>

      {/* Mục 8: Spread style */}
      <section className="mb-5 p-4 border rounded bg-light">
        <h3 className="mb-3 text-primary">4. Spread Style cho Card</h3>
        <p className="text-muted">
          Ghép <code>baseStyle = &#123; borderRadius: 12 &#125;</code> và <code>highlight = &#123; border: '2px solid gold' &#125;</code> thành <code>style=&#123;&#123; ...baseStyle, ...highlight &#125;&#125;</code>.
        </p>
        <Row>
          <Col md={6}>
            <ProductCard product={products[1]} style={combinedStyle} />
          </Col>
        </Row>
      </section>

      {/* Mục 7: Spread mảng */}
      <section className="mb-5 p-4 border rounded bg-light">
        <h3 className="mb-3 text-primary">5. Spread Mảng (Featured Products)</h3>
        <p className="text-muted">
          Ghép 2 sản phẩm đầu (<code>saleProducts</code>) và 2 sản phẩm cuối (<code>newProducts</code>) thành mảng <code>featured</code> gồm {featured.length} sản phẩm:
          <code> const featured = [...saleProducts, ...newProducts];</code>
        </p>
        <ProductList products={featured} />
      </section>
    </Container>
  );
}

export default App;
