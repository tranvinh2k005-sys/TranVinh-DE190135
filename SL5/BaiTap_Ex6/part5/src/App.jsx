import { Container } from 'react-bootstrap';
import { products } from './data/products';
import ProductList from './components/ProductList';

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center fw-bold">
        Bài 5: Badge trạng thái và giảm giá (toán tử 3 ngôi, &&)
      </h1>
      <ProductList products={products} />
    </Container>
  );
}

export default App;
