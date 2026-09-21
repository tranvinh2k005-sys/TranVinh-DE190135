import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import { productA, productB, productC } from './data/products';

function App() {
  const products = [productA, productB, productC];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">
        Bài 3: ProductCard An Toàn Dữ Liệu
      </h2>

      <Row className="g-4 mb-4">
        {products.map((product) => (
          <Col md={4} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      <Card bg="light" className="p-3 border-info shadow-sm">
        <h6 className="fw-bold text-info mb-2">📌 Ghi chú kiến thức ES6:</h6>
        <ul className="mb-0 small">
          <li className="mb-1">
            <strong>Dùng <code>??</code> thay vì <code>||</code>:</strong> Với productB (giá <code>0</code>), <code>0 ?? 'Liên hệ'</code> hiển thị đúng <code>0 ₫</code>. Nếu dùng <code>||</code>, do <code>0</code> là <em>falsy</em> nên sẽ bị đổi nhầm thành <code>'Liên hệ'</code>.
          </li>
          <li className="mb-1">
            <strong>Optional Chaining (<code>?.</code>):</strong> Giúp truy cập <code>category?.name</code>, <code>rating?.rate</code> an toàn mà không bị crash lỗi <code>TypeError</code> khi thuộc tính thiếu.
          </li>
          <li>
            <strong>Default Parameter:</strong> Cú pháp destructuring <code>name = 'Sản phẩm chưa đặt tên'</code> tự động gắn giá trị mặc định khi <code>name</code> là <code>undefined</code>.
          </li>
        </ul>
      </Card>
    </Container>
  );
}

export default App;
