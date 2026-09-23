import { Navbar, Nav, Container } from 'react-bootstrap';
import { APP_NAME, menuItems } from '../../data/menu';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">
          {APP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {menuItems.map(({ label, href }) => (
              <Nav.Link key={label} href={href} className="fw-semibold">
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
