import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="shopEasy-product-card">
      <div className="shopEasy-product-badge">{product.category}</div>
      
      <Link to={`/product/${product.id}`} className="shopEasy-product-link">
        <div className="shopEasy-product-img-container">
          <img
            src={product.image}
            alt={product.title}
            className="shopEasy-product-img"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
              e.target.onerror = null;
            }}
          />
        </div>
      </Link>

      <div className="shopEasy-product-details">
        <Link to={`/product/${product.id}`} className="shopEasy-product-title-link">
          <h3 className="shopEasy-product-name" title={product.title}>
            {product.title.length > 50 
              ? `${product.title.substring(0, 50)}...` 
              : product.title}
          </h3>
        </Link>

        <div className="shopEasy-product-meta">
          <div className="shopEasy-product-price">${product.price.toFixed(2)}</div>
          <div className="shopEasy-rating-wrapper">
            <div className="shopEasy-rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  viewBox="0 0 24 24" 
                  fill={star <= Math.round(product.rating?.rate || 0) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shopEasy-star-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="shopEasy-rating-count">({product.rating?.count || 0})</span>
          </div>
        </div>

        <button 
          className="shopEasy-add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="shopEasy-cart-icon">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;