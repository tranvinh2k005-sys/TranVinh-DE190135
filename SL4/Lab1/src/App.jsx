import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './Card';

function App() {
  const products = [
    {
      id: 1,
      name: "Pizza Pepperoni",
      price: "15.99",
      tag: "Hot",
      avatar: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80"
    },
    {
      id: 2,
      name: "Pizza Hải Sản",
      price: "18.50",
      tag: "Bestseller",
      avatar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80"
    }
  ];

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Danh sách sản phẩm Pizza</h1>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={5} className="d-flex justify-content-center">
            <ProductCard
              name={product.name}
              price={product.price}
              tag={product.tag}
              avatar={product.avatar}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
