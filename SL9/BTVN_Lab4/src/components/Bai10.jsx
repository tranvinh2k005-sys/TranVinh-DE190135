import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { APP_NAME } from '../data/menu';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider, useCart } from '../context/CartContext';
import ShopPage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { LoginForm } from './Bai8';

const menuItems = [
  { key: 'shop', label: 'Cửa hàng' },
  { key: 'cart', label: 'Giỏ hàng' },
  { key: 'checkout', label: 'Thanh toán' },
];

export const Header = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { totalQuantity } = useCart();

  const handleNavClick = (event, key) => {
    event.preventDefault(); // chặn nhảy trang của thẻ <a>
    onNavigate(key);
  };

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark" expand="md" className="rounded mb-3 px-3">
      <Container fluid>
        <Navbar.Brand href="#" onClick={(e) => handleNavClick(e, 'shop')}>
          {APP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {menuItems.map(({ key, label }) => (
              <Nav.Link
                key={key}
                href={`#${key}`}
                active={currentPage === key}
                onClick={(e) => handleNavClick(e, key)}
              >
                {label}
                {key === 'cart' && totalQuantity > 0 && (
                  <Badge bg="warning" text="dark" className="ms-1">
                    {totalQuantity}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-flex align-items-center gap-2">
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
              <Button size="sm" variant="light" onClick={() => onNavigate('login')}>
                Đăng nhập
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const Layout = ({ children, title = 'Trang chủ', currentPage, onNavigate }) => {
  const { theme } = useTheme();

  return (
    <div data-bs-theme={theme} className="bg-body text-body rounded p-3 pb-5">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <Container fluid>
        <h3 className="my-4 text-primary fw-bold">{title}</h3>
        {children}
      </Container>
    </div>
  );
};

const TITLES = { shop: 'Cửa hàng', cart: 'Giỏ hàng', checkout: 'Thanh toán', login: 'Đăng nhập' };

const AppContent = () => {
  const [page, setPage] = useState('shop');
  const { login } = useAuth();

  const handleLoginSuccess = (email) => {
    login(email);
    setPage('shop');
  };

  return (
    <Layout title={TITLES[page]} currentPage={page} onNavigate={setPage}>
      {page === 'shop' && <ShopPage />}
      {page === 'cart' && <CartPage onNavigate={setPage} />}
      {page === 'checkout' && <CheckoutPage onNavigate={setPage} />}
      {page === 'login' && <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </Layout>
  );
};

const Bai10 = () => {
  return (
    <div className="card shadow-sm p-3">
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default Bai10;
