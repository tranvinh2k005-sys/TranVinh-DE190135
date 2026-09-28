import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function HeaderNav({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <Navbar expand="lg" variant="dark" className="custom-navbar sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="brand-text">
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="pizza-navbar-nav" />
        <Navbar.Collapse id="pizza-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link href="#home" className="nav-link-custom active">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">
              About Us
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex search-form" onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input bg-white text-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
