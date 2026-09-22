import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import { productA, productB, productC } from './data/products';

function App() {
  const products = [productA, productB, productC];

  return (
    <Container className="py-5">
      <header className="text-center mb-5">
        <h1 className="fw-bold text-primary">Bài 3: ProductCard An Toàn Dữ Liệu</h1>
        <p className="text-muted">
          Ứng dụng ES6: Default Parameters, Optional Chaining (<code>?.</code>) và Nullish Coalescing (<code>??</code>)
        </p>
      </header>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
