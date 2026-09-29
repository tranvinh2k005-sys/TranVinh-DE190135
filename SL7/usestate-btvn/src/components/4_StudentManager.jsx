import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import './4_StudentManager.css';

const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'];

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6, contact: { city: 'TP.HCM' } },
];

export default function StudentManager() {
  // 1. Quản lý 3 state
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  // 2. Thêm sinh viên mới (tên tối thiểu 3 ký tự, điểm 0, thành phố mặc định)
  const addStudent = (e) => {
    e.preventDefault();
    if (newName.trim().length < 3) return;

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      score: 0,
      contact: { city: CITIES[0] },
    };

    setStudents((prev) => [...prev, newStudent]);
    setNewName('');
  };

  // 3. Sửa điểm trực tiếp (kẹp trong 0–10)
  const updateScore = (id, text) => {
    const val = Number(text);
    const clamped = isNaN(val) ? 0 : Math.min(10, Math.max(0, val));

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: clamped } : s))
    );
  };

  // 4. Sửa thành phố: sao chép 2 cấp (deep immutability)
  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, contact: { ...s.contact, city } } : s
      )
    );
  };

  // 5. Xóa sinh viên dùng filter
  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // 5b. Cộng +0.5 điểm cho cả lớp (không vượt quá 10)
  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, Number((s.score + 0.5).toFixed(1))),
      }))
    );
  };

  // 6. Sắp xếp hiển thị bằng dữ liệu dẫn xuất (không thay đổi mảng state gốc)
  const sorted =
    sortBy === 'none'
      ? students
      : [...students].sort((a, b) => {
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name, 'vi');
          }
          if (sortBy === 'score') {
            return b.score - a.score;
          }
          return 0;
        });

  // 7. Thống kê dẫn xuất (tính lại tự động khi render)
  const total = students.length;
  const average =
    total > 0
      ? (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2)
      : '0.00';
  const passed = students.filter((s) => s.score >= 5).length;

  return (
    <div className="student-manager-wrapper">
      <Card className="student-card">
        <Card.Header className="student-card-header">
          <h3>Bài 4: Quản lý điểm sinh viên</h3>
          <span className="badge bg-secondary">Immutability & Nested State</span>
        </Card.Header>

        <Card.Body>
          {/* Thanh công cụ: Thêm sinh viên, Sắp xếp, Nút cộng điểm */}
          <div className="student-toolbar">
            <Form onSubmit={addStudent} className="add-student-form">
              <Form.Control
                type="text"
                placeholder="Nhập họ tên sinh viên (ít nhất 3 ký tự)..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="form-control-dark"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={newName.trim().length < 3}
                style={{ whiteSpace: 'nowrap' }}
              >
                Thêm
              </Button>
            </Form>

            <div className="toolbar-actions">
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select-dark"
                style={{ width: 'auto' }}
              >
                <option value="none">Thứ tự nhập</option>
                <option value="name">Theo tên A → Z</option>
                <option value="score">Điểm cao → thấp</option>
              </Form.Select>

              <Button
                type="button"
                variant="success"
                size="sm"
                onClick={bonusAll}
                disabled={total === 0}
              >
                +0.5 cả lớp
              </Button>
            </div>
          </div>

          {/* Bảng danh sách sinh viên */}
          <div className="student-table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>STT</th>
                  <th>Họ và tên</th>
                  <th style={{ width: '120px' }}>Điểm (0-10)</th>
                  <th style={{ width: '160px' }}>Thành phố</th>
                  <th style={{ width: '120px' }}>Kết quả</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length > 0 ? (
                  sorted.map((s, index) => (
                    <tr key={s.id}>
                      <td style={{ color: '#94a3b8' }}>{index + 1}</td>
                      <td>
                        <strong>{s.name}</strong>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          value={s.score}
                          onChange={(e) => updateScore(s.id, e.target.value)}
                          className="form-control-dark score-input"
                        />
                      </td>
                      <td>
                        <Form.Select
                          value={s.contact.city}
                          onChange={(e) => updateCity(s.id, e.target.value)}
                          className="form-select-dark city-select"
                        >
                          {CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {s.score >= 5 ? (
                          <Badge bg="success">Đạt</Badge>
                        ) : (
                          <Badge bg="danger">Chưa đạt</Badge>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeStudent(s.id)}
                          title="Xóa sinh viên"
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-table-msg">
                      Danh sách sinh viên đang trống. Vui lòng thêm sinh viên mới!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Thống kê chân bảng */}
          <div className="student-summary-bar">
            <div className="summary-stat-group">
              <span>
                Sĩ số: <strong className="stat-highlight">{total}</strong>
              </span>
              <span>·</span>
              <span>
                Điểm trung bình: <strong className="stat-highlight">{average}</strong>
              </span>
              <span>·</span>
              <span>
                Đạt:{' '}
                <strong className="stat-highlight">
                  {passed}/{total}
                </strong>
              </span>
            </div>
            {sortBy !== 'none' && (
              <small className="text-secondary">
                Đang sắp xếp: {sortBy === 'name' ? 'Tên A → Z' : 'Điểm cao → thấp'}
              </small>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
