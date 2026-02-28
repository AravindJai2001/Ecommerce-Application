import { useNavigate } from "react-router-dom";

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
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
          borderRadius: "10px",
        }}
      />
      <h4>{`${product.brand} ${product.name}`}</h4>
      <p>₹ {product.price}</p>
      {/* <p>Description : {product.description}</p> */}
    </div>
  );
}
