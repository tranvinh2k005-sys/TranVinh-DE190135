import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="py-5 text-center">
      <h2>Trang Chủ</h2>
      <p className="text-secondary mt-2 mb-3">
        Chào mừng bạn đến với bài tập của tôi
      </p>
      <Button as={Link} to="/projects" variant="primary">
        Xem dự án của mình
      </Button>
    </Container>
  );
}

export default HomePage;