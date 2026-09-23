import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

// ES6: Arrow function, default parameters, map array method
const ProductList = ({ products = [] }) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
