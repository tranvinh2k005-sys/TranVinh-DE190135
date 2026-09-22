import React from 'react';
import { Container } from 'react-bootstrap';
import { products } from './data/products';
import ProductList from './components/ProductList';

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center fw-bold">Bài 4: Lưới Card sản phẩm (map & key)</h1>
      <ProductList products={products} />
    </Container>
  );
}

export default App;
