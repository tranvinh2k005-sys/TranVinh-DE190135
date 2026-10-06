import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loginReducer, initialLoginState, validateLogin } from '../reducers/loginReducer';

export const DEMO_ACCOUNT = { email: 'admin@fpt.edu.vn', password: '12345678' };

// Giả lập gọi API mất 1 giây
export const fakeLoginApi = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) resolve(email);
      else reject(new Error('Email hoặc mật khẩu không đúng'));
    }, 1000);
  });

export const LoginForm = ({ onLoginSuccess }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const { values, errors, touched, status, message } = state;
  const isSubmitting = status === 'submitting';

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    dispatch({
      type: 'CHANGE_FIELD',
      payload: { name, value: type === 'checkbox' ? checked : value },
    });
  };

  const handleBlur = (event) => dispatch({ type: 'BLUR_FIELD', payload: event.target.name });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });
    // state chưa đổi ngay sau dispatch → tự kiểm tra lại bằng values hiện tại
    if (Object.keys(validateLogin(values)).length > 0) return;

    try {
      const email = await fakeLoginApi(values);
      dispatch({ type: 'LOGIN_SUCCESS', payload: email });
      onLoginSuccess?.(email);
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  if (status === 'success') {
    return (
      <Alert variant="success" style={{ maxWidth: 420 }} className="mx-auto shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <span>{message}</span>
          <Button size="sm" variant="outline-success" onClick={() => dispatch({ type: 'RESET' })}>
            Đăng nhập lại
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <Card style={{ maxWidth: 420 }} className="mx-auto shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="mb-3 text-primary fw-bold">Đăng nhập</Card.Title>
        {status === 'error' && <Alert variant="danger">{message}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && Boolean(errors.email)}
              isValid={touched.email && !errors.email}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && Boolean(errors.password)}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="mb-3"
            id="login-remember"
            name="remember"
            label="Ghi nhớ đăng nhập"
            checked={values.remember}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="me-2" /> Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
          <Form.Text muted className="d-block mt-2 text-center small">
            {`Tài khoản thử: ${DEMO_ACCOUNT.email} / ${DEMO_ACCOUNT.password}`}
          </Form.Text>
        </Form>
      </Card.Body>
    </Card>
  );
};

const Bai8 = ({ onLoginSuccess }) => {
  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </Col>
    </Row>
  );
};

export default Bai8;
