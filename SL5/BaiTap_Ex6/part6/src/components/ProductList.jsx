import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // ES6: Dùng Set và Spread operator (...) để lấy danh sách danh mục duy nhất không trùng lặp
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  // Lọc sản phẩm theo danh mục đã chọn
  const filteredProducts =
    selectedCategory === 'Tất cả'
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="product-list-container my-3">
      {/* Nút lọc danh mục */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <h5 className="mb-3 text-muted">
        {`Có ${filteredProducts.length} sản phẩm`}
      </h5>

      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
