import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="py-4 text-center text-secondary border-top border-dark mt-auto" style={{ backgroundColor: '#212529' }}>
      <Container>
        <p className="mb-0 text-white-50">
          &copy; {new Date().getFullYear()} Pizza House. All rights reserved. Built with React & Bootstrap 5.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
