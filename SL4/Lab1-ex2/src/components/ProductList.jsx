import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductInfo from './ProductInfo';

const initialPizzas = [
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
  },
  {
    id: 3,
    name: "Pizza Phô Mai",
    price: "14.00",
    tag: "New",
    avatar: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80"
  },
  {
    id: 4,
    name: "Pizza Thập Cẩm",
    price: "17.00",
    tag: "Classic",
    avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80"
  }
];

function ProductList({ products = initialPizzas }) {
  const pizzaList = products && products.length > 0 ? products : initialPizzas;

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Danh sách sản phẩm Pizza</h1>
      <Row className="justify-content-center">
        {pizzaList.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-3">
            <ProductInfo
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

export default ProductList;
