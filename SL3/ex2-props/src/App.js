import React from 'react';
import Card from './Card';
import ProductInfo from './ProductInfo';
import './App.css';

function App() {
  const pizzaProducts = [
    {
      id: 1,
      title: "Pizza Pepperoni Deluxe",
      price: 14.99,
      description: "Bánh Pizza vị xúc xích Ý Pepperoni giòn rụm, kết hợp xốt cà chua truyền thống và phô mai Mozzarella béo ngậy.",
      tags: ["Pepperoni", "Spicy", "Bán chạy"],
      avatar: "/images/1.jpg"
    },
    {
      id: 2,
      title: "Pizza Hải Sản Tươi Ngon",
      price: 18.50,
      description: "Pizza hải sản cao cấp với tôm tươi, mực, ớt chuông cùng xốt kem bơ béo ngậy chuẩn vị nhà hàng.",
      tags: ["Hải sản", "Đặc biệt", "Chef Special"],
      avatar: "/images/2.jpg"
    }
  ];

  return (
    <div className="container">
      <header className="app-header">
        <h1>🍕 Danh Sách Sản Phẩm Pizza</h1>
      
      </header>
      <div className="product-grid">
        {pizzaProducts.map((pizza) => (
          <Card key={pizza.id}>
            <ProductInfo
              title={pizza.title}
              price={pizza.price}
              description={pizza.description}
              tags={pizza.tags}
              avatar={pizza.avatar}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;