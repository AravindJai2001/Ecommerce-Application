import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="home-product-card"
    >
      <img
        src={`http://localhost:8080/product/${product.id}/image`}
        alt={product.name}
      />
      <h4>{`${product.brand} ${product.name}`}</h4>
      <p>₹ {product.price}</p>
    </div>
  );
}
