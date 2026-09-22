import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // ES6: Dùng Set và Spread operator (...) để lấy danh sách danh mục duy nhất không trùng lặp
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name))];

  // Lọc sản phẩm theo danh mục đã chọn
  const filteredProducts =
    selectedCategory === 'Tất cả'
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="product-list-container my-4">
      {/* 7. Nâng cao: Thanh nút danh mục */}
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

      {/* 5. Dòng tiêu đề bằng template literal */}
      <h4 className="mb-4 text-muted">
        {`Có ${filteredProducts.length} sản phẩm`}
      </h4>

      {/* 2. Lưới chia cột đáp ứng: 1 cột mobile (xs={1}), 2 cột tablet (md={2}), 4 cột desktop (lg={4}) */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {/* 3. map() và prop key đặt ở thẻ Col ngoài cùng */}
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            {/* 4. Bên trong Col đặt ProductCard */}
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
