import React from 'react';

function ProductInfo({ title, name, price, description, tags = [], avatar }) {
  const productName = title || name || 'Product Name';

  return (
    <div className="product-info">
      {avatar && (
        <div className="avatar-wrapper">
          <img src={avatar} alt={productName} className="product-avatar" />
        </div>
      )}
      <h2 className="product-title">{productName}</h2>
      <div className="product-price-badge">
        <span className="price-label">Giá: </span>
        <span className="price-value">${price}</span>
      </div>
      {description && <p className="product-description">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="product-tags">
          <span className="tags-label">Tags:</span>
          <div className="tags-container">
            {Array.isArray(tags) ? (
              tags.map((tag, index) => (
                <span key={index} className="tag-chip">
                  {tag}
                </span>
              ))
            ) : (
              <span className="tag-chip">{tags}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;