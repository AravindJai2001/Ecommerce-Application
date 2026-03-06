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
        src={`${process.env.REACT_APP_API_URL}/product/${product.id}/image`}
        alt={product.name}
      />
      <div>
        <h4>{`${product.brand} ${product.name}`}</h4>
      </div>

      <p>₹ {product.price}</p>
    </div>
  );
}
