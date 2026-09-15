import React from 'react';
import ProductInfo from './ProductInfo';

function Card({ children, title, name, price, description, tags, avatar, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children ? (
        children
      ) : (
        <ProductInfo
          title={title}
          name={name}
          price={price}
          description={description}
          tags={tags}
          avatar={avatar}
        />
      )}
    </div>
  );
}

export default Card;