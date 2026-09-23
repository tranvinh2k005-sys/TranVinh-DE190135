import { Form, Card, Row, Col } from 'react-bootstrap';
import InputField from './InputField';
import AppButton from './AppButton';
import { fields, genders, majors } from '../data/registerConfig';

const RegisterForm = ({ customFields }) => {
  const formFields = customFields || fields;

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="card-title text-center mb-4 fw-bold text-primary">
              Đăng ký tài khoản
            </h3>

            {/* Chặn tải lại trang bằng arrow function trên thẻ form */}
            <Form onSubmit={(event) => event.preventDefault()}>
              {/* Sinh các ô nhập: spread object thành props */}
              {formFields.map((field) => (
                <InputField key={field.id} {...field} />
              ))}

              {/* Sinh radio giới tính: id tạo bằng template literal */}
              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">Giới tính</Form.Label>
                {genders.map((gender) => (
                  <Form.Check
                    inline
                    key={gender}
                    type="radio"
                    name="gender"
                    id={`gender-${gender}`}
                    label={gender}
                  />
                ))}
              </Form.Group>

              {/* Sinh ô chọn chuyên ngành */}
              <Form.Group className="mb-3" controlId="major">
                <Form.Label className="fw-semibold">Chuyên ngành</Form.Label>
                <Form.Select>
                  <option>-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major}>{major}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Checkbox Tôi đồng ý điều khoản */}
              <Form.Group className="mb-4" controlId="terms">
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý điều khoản"
                />
              </Form.Group>

              {/* Nút Đăng ký chiếm hết chiều ngang */}
              <AppButton type="submit" className="w-100">
                Đăng ký
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
