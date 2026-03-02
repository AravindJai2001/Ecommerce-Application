import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductService.getProductById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = () => {
    ProductService.deleteProduct(id).then(() => {
      toast.warn("Product Deleted!");
      navigate("/");
    });
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        <div className="product-image-box">
          <img
            src={`http://localhost:8080/product/${product.id}/image`}
            alt={product.name}
          />
        </div>

        <div className="product-info-box">
          <h1 className="product-brand">{product.brand}</h1>
          <h2 className="product-name">{product.name}</h2>

          <p className="product-price">₹ {product.price}</p>

          <p className="product-meta">
            <span>Category:</span> {product.category}
          </p>

          <p className="product-meta">
            <span>Description:</span> {product.description}
          </p>

          <p
            className={`product-status ${product.productAvailable ? "in-stock" : "out-stock"}`}
          >
            {product.productAvailable ? "Available" : "Out of Stock"}
          </p>

          <p className="product-meta">
            <span>Stock Quantity:</span> {product.stockQuantity}
          </p>

          <div className="product-actions">
            <button
              className="btn-cart"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to Cart
            </button>

            <button
              className="btn-update"
              onClick={() => navigate(`/update/${product.id}`)}
            >
              Update
            </button>

            <button className="btn-delete" onClick={deleteProduct}>
              Delete
            </button>

            <button className="backBtn" onClick={() => navigate(`/`)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
