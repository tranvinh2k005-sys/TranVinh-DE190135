import React from 'react';
import { Container, Row, Col, Card, Alert, Table } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import { productA, productB, productC } from './data/products';

function App() {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">
        Bài 3: ProductCard an toàn dữ liệu (default params, ?., ??)
      </h2>

      {/* Danh sách ProductCard */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <ProductCard product={productA} />
        </Col>
        <Col md={4}>
          <ProductCard product={productB} />
        </Col>
        <Col md={4}>
          <ProductCard product={productC} />
        </Col>
      </Row>

      {/* Phần giải thích chi tiết */}
      <Card className="shadow-sm border-0 bg-light">
        <Card.Header className="bg-primary text-white fw-bold fs-5">
          📖 Giải thích kiến thức ES6 & Tiêu chí bài tập
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <h5 className="fw-bold text-dark">
              1. Vì sao chỗ này phải dùng toán tử <code>??</code> (Nullish Coalescing) chứ không dùng <code>||</code> (Logical OR)?
            </h5>
            <Alert variant="warning" className="mb-3">
              <strong>Vấn đề của toán tử <code>||</code>:</strong> Toán tử <code>||</code> coi tất cả các giá trị <em>falsy</em> (<code>0</code>, <code>""</code>, <code>false</code>, <code>NaN</code>, <code>null</code>, <code>undefined</code>) là điều kiện để nhảy sang giá trị mặc định.
              <br />
              👉 Nếu dùng <code>price?.toLocaleString(...) || 'Liên hệ'</code> với <strong>productB (giá = 0)</strong>: số <code>0</code> bị coi là falsy, kết quả sẽ hiển thị sai thành <strong>"Liên hệ"</strong> thay vì <strong>"0 ₫"</strong>.
            </Alert>
            <Alert variant="success">
              <strong>Giải pháp với <code>??</code>:</strong> Toán tử <code>??</code> chỉ nhận <code>null</code> hoặc <code>undefined</code> là điều kiện gán giá trị mặc định.
              <br />
              👉 Với <strong>productB</strong>: <code>price = 0</code> là giá trị số hợp lệ (không phải null hay undefined), nên vẫn hiển thị chính xác là <strong>0 ₫</strong>.
              <br />
              👉 Với <strong>productC</strong>: <code>price</code> là <code>undefined</code>, nên sẽ kích hoạt giá trị mặc định là <strong>"Liên hệ"</strong>.
            </Alert>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark">
              2. Vai trò của toán tử <code>?.</code> (Optional Chaining):
            </h5>
            <p>
              Đối với <strong>productB</strong> và <strong>productC</strong>, các thuộc tính lồng nhau như <code>category</code> hay <code>rating</code> không tồn tại (giá trị là <code>undefined</code>).
            </p>
            <ul>
              <li>
                Nếu viết trực tiếp <code>category.name</code>: Trình duyệt sẽ quăng lỗi đỏ gây crash giao diện: <code>TypeError: Cannot read properties of undefined (reading 'name')</code>.
              </li>
              <li>
                Khi dùng <code>category?.name</code>: JavaScript kiểm tra an toàn, nếu <code>category</code> là <code>undefined</code> thì lập tức trả về <code>undefined</code> mà không báo lỗi, sau đó kết hợp với <code>?? 'Chưa phân loại'</code> để lấy nhãn mặc định an toàn.
              </li>
            </ul>
          </div>

          <div>
            <h5 className="fw-bold text-dark">
              3. Bảng so sánh trực quan giữa <code>||</code> và <code>??</code>:
            </h5>
            <Table bordered hover responsive className="bg-white">
              <thead className="table-secondary">
                <tr>
                  <th>Biểu thức kiểm tra</th>
                  <th>Dùng <code>||</code> (Logical OR)</th>
                  <th>Dùng <code>??</code> (Nullish Coalescing)</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>productB (price: 0)</code></td>
                  <td className="text-danger fw-bold">"Liên hệ" (Sai)</td>
                  <td className="text-success fw-bold">"0 ₫" (Đúng)</td>
                  <td>0 bị <code>||</code> coi là falsy, nhưng <code>??</code> giữ lại vì là số hợp lệ.</td>
                </tr>
                <tr>
                  <td><code>productC (price: undefined)</code></td>
                  <td>"Liên hệ"</td>
                  <td className="text-success fw-bold">"Liên hệ"</td>
                  <td>Cả hai đều fallback khi gặp <code>undefined</code>.</td>
                </tr>
                <tr>
                  <td><code>rating.count: 0</code></td>
                  <td className="text-danger fw-bold">0 lượt bị fallback</td>
                  <td className="text-success fw-bold">0 lượt</td>
                  <td>0 lượt đánh giá là dữ liệu hợp lệ, cần dùng <code>??</code>.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
