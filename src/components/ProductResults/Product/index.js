import React, { useEffect, useRef } from 'react';
import Button from './../../forms/Button';

const Product = ({
  productThumbnail,
  productName,
  productPrice
}) => {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (thumbRef.current) {
      const imgHeight = thumbRef.current.querySelector('img').clientHeight;
      thumbRef.current.style.height = `${imgHeight}px`;
    }
  }, [productThumbnail]);

  if (!productThumbnail || !productName || typeof productPrice === 'undefined') {
    return null;
  }

  const configAddToCartBtn = {
    type: 'button'
  };

  return (
    <div className="product">
      <div ref={thumbRef} className="thumb" style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
        <img src={productThumbnail} alt={productName} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              {productName}
            </span>
          </li>
          <li>
            <span className="price">
              £{productPrice}
            </span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn}>
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
