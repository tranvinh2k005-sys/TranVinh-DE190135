// ====================================================================
// BÀI 10: TRANG CỬA HÀNG MINI (TỔNG HỢP TOÀN BỘ KIẾN THỨC ES6)
// ====================================================================

// ES6 (11): Module Import (Named export)
import { Card, Row, Col, InputGroup, Form, Alert } from 'react-bootstrap';
import { ProductList, AppButton, InputField } from '../components';
import { products } from '../data/products';
import { APP_NAME } from '../data/menu';

// ES6 (3): Arrow function tạo Functional Component
// ES6 (5): Default parameter cho prop bannerTag
// ES6 (7): Rest parameters (...restProps gom các props còn lại)
const HomePage = ({ bannerTag = 'Hot Deal', ...restProps }) => {
  // ------------------------------------------------------------------
  // 1. TÍNH TOÁN DỮ LIỆU BẰNG CÁC PHƯƠNG THỨC ES6
  // ------------------------------------------------------------------

  // ES6 (1): const cho các biến hằng số
  // ES6 (8): filter() để lọc các sản phẩm có giảm giá
  // ES6 (6): Optional chaining (?.) và Nullish coalescing (??)
  const onSale = products.filter((product) => (product?.discount ?? 0) > 0);

  // ES6 (7): Spread operator (...) để sao chép mảng trước khi sort (tránh mutate mảng gốc)
  // ES6 (8): sort() sắp xếp giảm giá giảm dần, slice(0, 4) lấy 4 sản phẩm giảm sâu nhất
  const deals = [...onSale]
    .sort((a, b) => (b?.discount ?? 0) - (a?.discount ?? 0))
    .slice(0, 4);

  // ES6 (7): Spread operator (...) với Set để lọc danh mục duy nhất không trùng lặp
  // ES6 (8): map() lấy tên danh mục, filter(Boolean) loại bỏ giá trị null/undefined
  const categories = [
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ];

  // ------------------------------------------------------------------
  // 2. THỐNG KÊ (STATS)
  // ------------------------------------------------------------------
  const total = products.length;

  // ES6 (8): filter() đếm số sản phẩm còn hàng
  const inStockCount = products.filter((p) => p.inStock).length;

  // ES6 (8): reduce() tính tổng giá, chia cho số lượng và làm tròn
  const totalPrice = products.reduce((sum, p) => sum + (p?.price ?? 0), 0);
  const avgPrice = Math.round(totalPrice / (products.length || 1));

  // ES6 (10): Object shorthand (tạo object với key và value cùng tên)
  const stats = { total, inStockCount, avgPrice };

  // ES6 (4): Destructuring để tách các thuộc tính từ object stats
  const { total: totalSP, inStockCount: conHang, avgPrice: giaTB } = stats;

  // ES6 (1): let để gán giá trị có thể thay đổi sau này
  // ES6 (2): Template literals tạo chuỗi động
  let heroSubtitle = `Hôm nay có ${onSale.length} sản phẩm đang giảm giá`;

  // ES6 (4): Destructuring trong mảng cấu hình statCards
  // ES6 (2): Template literals nhúng giá trị thống kê
  const statCards = [
    { label: 'Tổng SP', value: `${totalSP} sản phẩm` },
    { label: 'Còn hàng', value: `${conHang} còn hàng` },
    { label: 'Giá TB', value: `${giaTB.toLocaleString('vi-VN')} ₫` },
  ];

  return (
    <div className="home-page-container" {...restProps}>
      {/* ------------------------------------------------------------ */}
      {/* KHỐI 1: HERO - Chào mừng + số sản phẩm đang giảm giá          */}
      {/* ------------------------------------------------------------ */}
      <Card className="bg-primary text-white text-center py-4 mb-4 shadow-sm border-0">
        <Card.Body>
          {/* ES6 (2): Template literals nhúng APP_NAME */}
          <Card.Title className="display-6 fw-bold mb-2">
            {`Chào mừng đến ${APP_NAME}`}
          </Card.Title>
          <Card.Text className="fs-5 mb-0">{heroSubtitle}</Card.Text>
        </Card.Body>
      </Card>

      {/* ------------------------------------------------------------ */}
      {/* KHỐI 2: THỐNG KÊ - [Tổng SP] [Còn hàng] [Giá TB]              */}
      {/* ------------------------------------------------------------ */}
      <Row className="g-3 mb-4">
        {/* ES6 (8): map() duyệt mảng statCards */}
        {/* ES6 (4): Destructuring ngay trong tham số ({ label, value }) */}
        {statCards.map(({ label, value }) => (
          <Col key={label} md={4}>
            <Card className="text-center shadow-sm h-100 border">
              <Card.Body>
                <Card.Subtitle className="text-muted mb-2 fw-semibold">
                  {label}
                </Card.Subtitle>
                <Card.Title className="fs-4 fw-bold text-primary mb-0">
                  {value}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ------------------------------------------------------------ */}
      {/* KHỐI 3: BỘ LỌC - [Ô tìm kiếm......] [Danh mục v] [Tìm]        */}
      {/* ------------------------------------------------------------ */}
      <div className="mb-4">
        <InputGroup>
          <Form.Control placeholder="Tìm sản phẩm..." />
          <Form.Select defaultValue="">
            <option value="">-- Tất cả danh mục --</option>
            {/* ES6 (8): map() render danh sách option từ categories */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
          <AppButton variant="primary">Tìm</AppButton>
        </InputGroup>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* KHỐI 4: ĐANG GIẢM GIÁ (4 thẻ, giảm sâu nhất trước)           */}
      {/* ------------------------------------------------------------ */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold mb-0 text-danger">🔥 Đang giảm giá</h4>
          {/* ES6 (9): Toán tử logic && */}
          {deals.length > 0 && (
            <span className="badge bg-danger fs-6">
              {/* ES6 (2): Template literals nhúng prop bannerTag */}
              {`${bannerTag}: Top ${deals.length} giảm sâu`}
            </span>
          )}
        </div>
        <ProductList products={deals} />
      </section>

      {/* ------------------------------------------------------------ */}
      {/* KHỐI 5: TẤT CẢ SẢN PHẨM (Lưới 4 cột)                         */}
      {/* ------------------------------------------------------------ */}
      <section className="mb-5">
        <h4 className="fw-bold mb-3 text-dark">📦 Tất cả sản phẩm</h4>
        {/* ES6 (9): Toán tử 3 ngôi (ternary operator ? :) */}
        {products.length === 0 ? (
          <Alert variant="info">Chưa có sản phẩm</Alert>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* ------------------------------------------------------------ */}
      {/* KHỐI 6: NHẬN TIN - [Email............] [Đăng ký]             */}
      {/* ------------------------------------------------------------ */}
      <section className="mb-5">
        <Card className="shadow-sm bg-light border-0">
          <Card.Body className="p-4">
            <Card.Title className="fw-bold fs-5 mb-2">
              📬 Đăng ký nhận tin
            </Card.Title>
            <Card.Text className="text-muted mb-3">
              {/* ES6 (2): Template literals */}
              {`Nhận thông báo về các ưu đãi mới nhất từ ${APP_NAME}.`}
            </Card.Text>
            {/* ES6 (3): Arrow function trong event handler */}
            <Form onSubmit={(e) => e.preventDefault()}>
              <InputField
                id="newsletter-email"
                label="Địa chỉ Email"
                type="email"
                placeholder="name@example.com"
                required
              />
              <AppButton type="submit" variant="primary">
                Đăng ký
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

// ES6 (11): Module Export (Export default)
export default HomePage;
