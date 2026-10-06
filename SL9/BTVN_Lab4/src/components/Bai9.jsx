import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { APP_NAME } from '../data/menu';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { LoginForm } from './Bai8';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="lg" className="rounded mb-3 px-3">
      <Container fluid>
        <Navbar.Brand href="#">{APP_NAME}</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <Button size="sm" variant="outline-light" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </Button>
          {isLoggedIn ? (
            <>
              <Navbar.Text className="text-white">{`Xin chào, ${user.name}`}</Navbar.Text>
              <Button size="sm" variant="light" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Navbar.Text className="text-white">Chưa đăng nhập</Navbar.Text>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export const Layout = ({ children, title = 'Trang chủ' }) => {
  const { theme } = useTheme();

  return (
    <div data-bs-theme={theme} className="bg-body text-body p-3 rounded">
      <Header />
      <Container className="py-2">
        <h4 className="mb-4 text-primary fw-bold">{title}</h4>
        {children}
      </Container>
    </div>
  );
};

export const HomeContent = () => {
  const { isLoggedIn, user, login } = useAuth();

  return isLoggedIn ? (
    <Alert variant="info" className="shadow-sm">
      <Alert.Heading as="h5">{`Xin chào, ${user.name}!`}</Alert.Heading>
      <p className="mb-0">
        {`Bạn đang đăng nhập bằng ${user.email}. Thử bấm nút 🌙 Tối / ☀️ Sáng trên Header để đổi theme toàn trang.`}
      </p>
    </Alert>
  ) : (
    <LoginForm onLoginSuccess={login} />
  );
};

const Bai9 = () => {
  return (
    <div className="card shadow-sm p-4">
      <ThemeProvider>
        <AuthProvider>
          <Layout title="Bài 9: Theme sáng/tối và đăng nhập với useContext">
            <HomeContent />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default Bai9;
