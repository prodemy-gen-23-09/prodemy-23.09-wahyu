import React from "react";

function ProductCard(props) {
  const { name, description, price, imageUrl } = props;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <p className="product-price">Rp.{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
