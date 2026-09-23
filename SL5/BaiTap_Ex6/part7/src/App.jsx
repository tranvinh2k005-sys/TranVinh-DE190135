import { Container, Card, Badge } from 'react-bootstrap';
import CartTable from './components/CartTable';
import { cartItems } from './data/cart';
import { products } from './data/products';
import { formatVND } from './utils/format';

function App() {
  return (
    <Container className="py-5" style={{ maxWidth: '960px' }}>
      <header className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">
          Bài 7: Bảng giỏ hàng có tổng tiền
        </h1>
        <p className="text-muted fs-6 mb-3">
          ES6 Methods: <code>map</code>, <code>filter</code>, <code>sort</code>,{' '}
          <code>reduce</code> và <code>Math.max(...)</code>
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <Badge bg="primary">Array.prototype.map</Badge>
          <Badge bg="success">Array.prototype.filter</Badge>
          <Badge bg="warning" text="dark">
            Array.prototype.sort
          </Badge>
          <Badge bg="danger">Array.prototype.reduce</Badge>
          <Badge bg="info">Math.max(...spread)</Badge>
        </div>
      </header>

      {/* CartTable Component */}
      <section className="mb-4">
        <CartTable items={cartItems} productList={products} />
      </section>

      {/* Verification Card */}
      <Card className="border-success shadow-sm mt-4">
        <Card.Header className="bg-success text-white fw-bold">
          ✅ Kiểm tra tiêu chí hoàn thành
        </Card.Header>
        <Card.Body>
          <ul className="mb-0">
            <li className="mb-2">
              <strong>Thứ tự sắp xếp dòng (Thành tiền giảm dần):</strong>{' '}
              Màn hình (3.490.000 ₫) → Tai nghe (1.180.000 ₫) → Chuột (750.000 ₫) → USB (750.000 ₫).
            </li>
            <li className="mb-2">
              <strong>Thống kê cuối bảng:</strong> Tổng tiền là{' '}
              <span className="badge bg-danger">
                {formatVND(cartItems.reduce((s, { price, quantity }) => s + price * quantity, 0))}
              </span>
              , tổng số lượng là{' '}
              <span className="badge bg-success">
                {cartItems.reduce((s, { quantity }) => s + quantity, 0)}
              </span>
              , đơn giá cao nhất là{' '}
              <span className="badge bg-info text-dark">
                {formatVND(Math.max(...cartItems.map((i) => i.price)))}
              </span>
              .
            </li>
            <li className="mb-2">
              <strong>Danh sách giảm giá và còn hàng:</strong> Có đúng 3 sản phẩm (Tai nghe Bluetooth, Màn hình 24 inch, Ổ cứng SSD 512GB).{' '}
              <em>Loa mini</em> không xuất hiện do <code>inStock: false</code> (hết hàng).
            </li>
            <li>
              <strong>Tính bất biến mảng gốc:</strong> Mảng <code>cartItems</code> vẫn giữ nguyên thứ tự ban đầu sau khi sort:{' '}
              <code>[{cartItems.map((i) => i.name).join(', ')}]</code>.
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
