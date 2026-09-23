import { useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import { fields, addressField } from './data/registerConfig';

function App() {
  const [includeAddress, setIncludeAddress] = useState(false);

  // Mảng fields khi có thêm trường Địa chỉ (Bước 8)
  const currentFields = includeAddress ? [...fields, addressField] : fields;

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      {/* Tiêu đề bài tập */}
      <header className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">
          Bài 8: Form đăng ký sinh ra từ mảng cấu hình
        </h1>
        <p className="text-muted fs-6 mb-3">
          ES6 Features: Spread props (<code>&#123;...field&#125;</code>), Template literals (
          <code>`gender-$&#123;gender&#125;`</code>), <code>Array.prototype.map</code>, và Rest props (
          <code>...inputProps</code>)
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">
          <Badge bg="primary">Array.prototype.map</Badge>
          <Badge bg="success">Spread Props (&#123;...field&#125;)</Badge>
          <Badge bg="warning" text="dark">Template Literals (`id`)</Badge>
          <Badge bg="danger">Form onSubmit (preventDefault)</Badge>
          <Badge bg="info">Dynamic Schema Form</Badge>
        </div>

        {/* Nút thử nghiệm Bước 8 */}
        <div className="p-3 bg-light border rounded d-inline-block">
          <span className="me-3 fw-semibold">
            Thử nghiệm Bước 8 (Thêm trường "Địa chỉ"):
          </span>
          <Button
            variant={includeAddress ? 'danger' : 'outline-primary'}
            size="sm"
            onClick={() => setIncludeAddress(!includeAddress)}
          >
            {includeAddress ? '➖ Xóa trường "Địa chỉ"' : '➕ Thêm trường "Địa chỉ" vào fields'}
          </Button>
          <div className="text-muted small mt-1">
            Số lượng ô nhập hiện tại:{' '}
            <strong>{currentFields.length} ô</strong>{' '}
            {includeAddress && '(đã bao gồm ô Địa chỉ)'}
          </div>
        </div>
      </header>

      {/* Form đăng ký */}
      <section className="mb-5">
        <RegisterForm customFields={currentFields} />
      </section>

      {/* Tiêu chí hoàn thành */}
      <Card className="border-success shadow-sm">
        <Card.Header className="bg-success text-white fw-bold">
          ✅ Kiểm tra tiêu chí hoàn thành
        </Card.Header>
        <Card.Body>
          <ul className="mb-0">
            <li className="mb-2">
              <strong>Thành phần form:</strong> Có đủ {currentFields.length} ô nhập (Họ và tên, Email, Mật khẩu, Số điện thoại, Ngày sinh{includeAddress ? ', Địa chỉ' : ''}), 3 radio (Nam, Nữ, Khác), 1 dropdown chuyên ngành (3 lựa chọn), 1 checkbox đồng ý điều khoản và 1 nút "Đăng ký" full width (<code>w-100</code>).
            </li>
            <li className="mb-2">
              <strong>Nhãn bắt buộc:</strong> Các trường <em>Họ và tên</em>, <em>Email</em>, <em>Mật khẩu</em> có dấu <span className="text-danger fw-bold">*</span> đỏ nhờ thuộc tính <code>required: true</code> đi qua rest props.
            </li>
            <li className="mb-2">
              <strong>Chú thích trợ giúp:</strong> Chỉ ô <em>Mật khẩu</em> có dòng chú thích nhỏ (<code>helpText: 'Dùng cả chữ và số'</code>).
            </li>
            <li className="mb-2">
              <strong>Chặn tải lại trang:</strong> Bấm “Đăng ký” không làm tải lại trang nhờ <code>onSubmit=&#123;(event) =&gt; event.preventDefault()&#125;</code>.
            </li>
            <li>
              <strong>Mở rộng linh hoạt (Bước 8):</strong> Thêm <code>&#123; id: 'address', label: 'Địa chỉ', type: 'text' &#125;</code> vào mảng <code>fields</code> thì form tự động sinh ô nhập mới mà không cần chỉnh sửa JSX.
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
