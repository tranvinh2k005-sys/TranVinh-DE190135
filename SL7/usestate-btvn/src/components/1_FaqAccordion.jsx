import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './1_FaqAccordion.css';

// 1. Mảng dữ liệu FAQ
const faqs = [
  {
    id: 1,
    question: 'React là gì?',
    answer: 'Thư viện JavaScript để xây dựng giao diện người dùng theo component.',
  },
  {
    id: 2,
    question: 'State khác props thế nào?',
    answer: 'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.',
  },
  {
    id: 3,
    question: 'Vì sao phải dùng setState?',
    answer: 'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.',
  },
];

// 2. Component con FaqItem (Tự quản lý state riêng isOpen ở chế độ mở độc lập nhiều câu)
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="faq-card">
      <Card.Header
        role="button"
        onClick={() => setIsOpen((open) => !open)}
        className="d-flex justify-content-between align-items-center"
      >
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </Card.Header>
      {isOpen && <Card.Body>{answer}</Card.Body>}
    </Card>
  );
}

// Component chính FaqAccordion
function FaqAccordion() {
  // 5. Thêm hai state vào cha để quản lý chế độ và nâng state lên
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);

  // 6. Hàm handleToggle dùng functional update
  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="faq-wrapper">
      {/* Thanh điều khiển: Công tắc Single Mode & Nút Đóng tất cả */}
      <div className="faq-control-panel">
        <div>
          {/* 8. Công tắc Form.Check type="switch" */}
          <Form.Check
            type="switch"
            id="single-mode-switch"
            label={
              <span>
                Chỉ mở một câu tại một thời điểm
                <span className={`faq-mode-badge ${singleMode ? 'badge-single' : 'badge-multi'}`}>
                  {singleMode ? 'Bật (Single)' : 'Tắt (Multi)'}
                </span>
              </span>
            }
            checked={singleMode}
            onChange={(e) => {
              // Hai lệnh set được React tự động gộp (batching) thành một lần render duy nhất
              setSingleMode(e.target.checked);
              setOpenId(null);
            }}
          />
        </div>

        {/* 9. Nút Đóng tất cả: chỉ bấm được khi singleMode bật và đang có câu mở */}
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={!singleMode || openId === null}
          onClick={() => setOpenId(null)}
        >
          Đóng tất cả
        </Button>
      </div>

      {/* Danh sách các câu hỏi FAQ */}
      <div className="faq-list">
        {singleMode
          ? /* 7. Khi singleMode bật: Render Card trực tiếp trong cha, điều kiện mở là openId === id */
            faqs.map((faq) => (
              <Card key={faq.id} className="faq-card">
                <Card.Header
                  role="button"
                  onClick={() => handleToggle(faq.id)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openId === faq.id ? '−' : '+'}</span>
                </Card.Header>
                {openId === faq.id && <Card.Body>{faq.answer}</Card.Body>}
              </Card>
            ))
          : /* 3. Khi singleMode tắt: map faqs ra các FaqItem (mỗi item có state isOpen riêng) */
            faqs.map((faq) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
      </div>

      {/* 10. Phần ghi chú giải thích cơ chế React State & Nâng State */}
      <div className="faq-explanation-box">
        <h5>💡 Giải thích cơ chế React State trong bài:</h5>
        <ul>
          <li>
            <strong>Mỗi instance giữ state riêng:</strong> Ở chế độ thường (công tắc tắt), mỗi <code>&lt;FaqItem&gt;</code> nắm giữ một hook <code>useState(false)</code> độc lập, không chia sẻ với nhau nên có thể mở đồng thời cả 3 câu.
          </li>
          <li>
            <strong>Vì sao phải nâng state lên cha?</strong> Vì các <code>&lt;FaqItem&gt;</code> ngang hàng không thể can thiệp vào state của nhau. Để chỉ mở 1 câu tại một thời điểm, cha (<code>FaqAccordion</code>) phải nắm quyền kiểm soát <code>openId</code> và truyền trạng thái xuống.
          </li>
          <li>
            <strong>Vì sao bật/tắt công tắc thì các câu đang mở bị đóng?</strong> Khi chuyển đổi giữa hai nhánh điều kiện trong JSX, các component <code>&lt;FaqItem&gt;</code> cũ bị <strong>gỡ khỏi cây giao diện (Unmount)</strong>, dẫn đến toàn bộ state bên trong chúng bị xóa sạch khỏi bộ nhớ. Khi mount trở lại, chúng nhận lại giá trị khởi tạo ban đầu là <code>false</code>.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FaqAccordion;
