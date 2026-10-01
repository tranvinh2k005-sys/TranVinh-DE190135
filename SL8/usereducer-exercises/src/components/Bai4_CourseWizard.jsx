import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import {
  COURSES,
  SCHEDULES,
  STEPS,
  initWizard,
  wizardReducer,
} from './wizardReducer';

const CourseWizard = ({ initialCourseId = 'react' }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard);
  const { step, maxVisited, values, errors, submitted } = state;

  const course = COURSES.find((c) => c.id === values.courseId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'CHANGE',
      payload: {
        name,
        value: type === 'checkbox' ? checked : value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === STEPS.length - 1) {
      dispatch({ type: 'SUBMIT' });
    } else {
      dispatch({ type: 'NEXT' });
    }
  };

  // Hàm tiện ích tạo ô nhập ở bước 1
  const field = (name, label, type = 'text') => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={values[name]}
        onChange={handleChange}
        isInvalid={!!errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  if (submitted) {
    return (
      <Card style={{ maxWidth: 580, width: '100%' }} className="shadow-sm">
        <Card.Body className="p-4 text-center">
          <Alert variant="success" className="mb-4">
            <h4 className="alert-heading">Đăng ký thành công!</h4>
            <p className="mb-1">
              Học viên <strong>{values.fullName}</strong> đã đăng ký khóa học{' '}
              <strong>{course?.name}</strong>.
            </p>
            <p className="mb-1">
              Lịch học: <strong>{values.schedule}</strong>
            </p>
            <p className="mb-0">
              Học phí:{' '}
              <strong className="text-danger">
                {course?.fee.toLocaleString('vi-VN')} ₫
              </strong>
            </p>
          </Alert>
          <Button
            variant="primary"
            onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}
          >
            Đăng ký khóa khác
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 580, width: '100%' }} className="shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="text-center fw-bold mb-3">
          Bài 4: Đăng ký khóa học
        </Card.Title>

        {/* Thanh bước: bấm được nếu đã từng tới, chưa tới thì bị mờ */}
        <ButtonGroup className="w-100 mb-4">
          {STEPS.map((s, idx) => (
            <Button
              key={s}
              variant={step === idx ? 'primary' : 'outline-primary'}
              disabled={idx > maxVisited}
              onClick={() => dispatch({ type: 'GO_TO', payload: idx })}
            >
              {s}
            </Button>
          ))}
        </ButtonGroup>

        <Form onSubmit={handleSubmit}>
          {/* Bước 1: Thông tin cá nhân */}
          {step === 0 && (
            <div>
              <h5 className="mb-3">1. Thông tin cá nhân</h5>
              {field('fullName', 'Họ tên')}
              {field('email', 'Email', 'email')}
              {field('phone', 'Số điện thoại', 'tel')}
            </div>
          )}

          {/* Bước 2: Chọn khóa học và lịch học */}
          {step === 1 && (
            <div>
              <h5 className="mb-3">2. Chọn khóa học & Lịch học</h5>
              <Form.Group className="mb-3" controlId="courseId">
                <Form.Label>Khóa học</Form.Label>
                <Form.Select
                  name="courseId"
                  value={values.courseId}
                  onChange={handleChange}
                  isInvalid={!!errors.courseId}
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.fee.toLocaleString('vi-VN')} ₫)
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lịch học</Form.Label>
                <div>
                  {SCHEDULES.map((sched) => (
                    <Form.Check
                      key={sched}
                      type="radio"
                      id={`sched-${sched}`}
                      label={sched}
                      name="schedule"
                      value={sched}
                      checked={values.schedule === sched}
                      onChange={handleChange}
                      isInvalid={!!errors.schedule}
                    />
                  ))}
                </div>
                {errors.schedule && (
                  <div className="text-danger small mt-1">{errors.schedule}</div>
                )}
              </Form.Group>
            </div>
          )}

          {/* Bước 3: Xác nhận */}
          {step === 2 && (
            <div>
              <h5 className="mb-3">3. Xác nhận thông tin</h5>
              <Table bordered responsive className="mb-3">
                <tbody>
                  <tr>
                    <th style={{ width: '35%' }}>Họ tên</th>
                    <td>{values.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{values.email}</td>
                  </tr>
                  <tr>
                    <th>Số điện thoại</th>
                    <td>{values.phone}</td>
                  </tr>
                  <tr>
                    <th>Khóa học</th>
                    <td>{course?.name}</td>
                  </tr>
                  <tr>
                    <th>Lịch học</th>
                    <td>{values.schedule}</td>
                  </tr>
                  <tr>
                    <th>Học phí</th>
                    <td className="fw-bold text-primary">
                      {course?.fee.toLocaleString('vi-VN')} ₫
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Form.Group className="mb-3" controlId="agreed">
                <Form.Check
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  label="Tôi xác nhận thông tin trên là chính xác"
                  checked={values.agreed}
                  onChange={handleChange}
                  isInvalid={!!errors.agreed}
                  feedback={errors.agreed}
                  feedbackType="invalid"
                />
              </Form.Group>
            </div>
          )}

          {/* Nút điều hướng */}
          <div className="d-flex justify-content-between mt-4">
            {step > 0 ? (
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => dispatch({ type: 'BACK' })}
              >
                ← Quay lại
              </Button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <Button variant="primary" type="submit">
                Tiếp tục →
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Xác nhận đăng ký
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CourseWizard;
