import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import './3_BmiCalculator.css';

// 1. Hàm classify(bmi) trả về nhãn và màu Alert theo chuẩn Châu Á
function classify(bmi) {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' };
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' };
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' };
  return { label: 'Béo phì', variant: 'danger' };
}

export default function BmiCalculator() {
  // 2. Đúng 3 state: height (''), weight (''), unit ('cm')
  // Lưu dạng chuỗi để ô có thể để trống hoặc đang gõ dở
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  // 3. Chuyển đổi thành số và quy về mét
  const h = Number(height);
  const w = Number(weight);
  const hInMeter = unit === 'cm' ? h / 100 : h;

  // 4. Kiểm tra hợp lệ: chỉ kiểm tra khi ô không trống
  const errors = {};
  const minHeight = unit === 'cm' ? 50 : 0.5;
  const maxHeight = unit === 'cm' ? 250 : 2.5;

  if (height !== '' && !(h >= minHeight && h <= maxHeight)) {
    errors.height = `Chiều cao từ ${minHeight} đến ${maxHeight} ${unit}`;
  }

  if (weight !== '' && !(w >= 10 && w <= 300)) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg';
  }

  // 5. Biến dẫn xuất (Derived State) - không tạo thêm state
  const ready =
    height !== '' &&
    weight !== '' &&
    !errors.height &&
    !errors.weight &&
    hInMeter > 0;

  const bmi = ready ? (w / (hInMeter * hInMeter)).toFixed(1) : null;
  const result = bmi !== null ? { bmi, ...classify(Number(bmi)) } : null;

  // 7. Hàm đổi đơn vị và quy đổi giá trị chiều cao đang nhập
  const changeUnit = (next) => {
    if (next === unit) return;
    if (height !== '') {
      const val = Number(height);
      if (!isNaN(val)) {
        const converted = next === 'm' ? val / 100 : val * 100;
        setHeight(String(Number(converted.toFixed(2))));
      }
    }
    setUnit(next);
  };

  return (
    <div className="bmi-wrapper">
      <Card className="bmi-card">
        <Card.Header className="bmi-card-header">
          <h3>Bài 3: Máy tính chỉ số BMI</h3>
          <span className="bmi-badge">Chuẩn Châu Á</span>
        </Card.Header>

        <Card.Body>
          <Form>
            {/* Chiều cao kèm nút đổi đơn vị */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Form.Label className="form-label-custom mb-0">
                  Chiều cao ({unit}):
                </Form.Label>
                <ButtonGroup size="sm">
                  <Button
                    variant={unit === 'cm' ? 'primary' : 'outline-secondary'}
                    onClick={() => changeUnit('cm')}
                    type="button"
                  >
                    cm
                  </Button>
                  <Button
                    variant={unit === 'm' ? 'primary' : 'outline-secondary'}
                    onClick={() => changeUnit('m')}
                    type="button"
                  >
                    m
                  </Button>
                </ButtonGroup>
              </div>
              <Form.Control
                type="number"
                placeholder={`Ví dụ: ${unit === 'cm' ? '170' : '1.7'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                isInvalid={!!errors.height}
                className="bmi-input"
                step={unit === 'm' ? '0.01' : '1'}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Cân nặng */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label-custom">
                Cân nặng (kg):
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Ví dụ: 65"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                isInvalid={!!errors.weight}
                className="bmi-input"
                step="0.5"
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>

            {/* 8. Hiển thị kết quả bằng toán tử 3 ngôi */}
            {result ? (
              <Alert variant={result.variant} className="bmi-result-alert mb-0">
                <div className="result-text">
                  BMI = {result.bmi} → {result.label}
                </div>
              </Alert>
            ) : (
              <div className="bmi-placeholder">
                💡 Vui lòng nhập đầy đủ chiều cao và cân nặng hợp lệ để tính chỉ số BMI.
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Bảng tra cứu chuẩn Châu Á */}
      <div className="bmi-reference-card">
        <h5>📊 Phân loại BMI theo chuẩn Châu Á:</h5>
        <div className="bmi-reference-table">
          <div className="ref-row">
            <span className="ref-range">&lt; 18.5</span>
            <span className="ref-label text-info">Thiếu cân</span>
          </div>
          <div className="ref-row">
            <span className="ref-range">18.5 – &lt; 23</span>
            <span className="ref-label text-success">Bình thường</span>
          </div>
          <div className="ref-row">
            <span className="ref-range">23 – &lt; 25</span>
            <span className="ref-label text-warning">Thừa cân</span>
          </div>
          <div className="ref-row">
            <span className="ref-range">≥ 25</span>
            <span className="ref-label text-danger">Béo phì</span>
          </div>
        </div>
      </div>
    </div>
  );
}
