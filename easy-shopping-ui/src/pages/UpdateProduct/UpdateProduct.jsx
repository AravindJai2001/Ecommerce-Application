import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";
import "./UpdateProduct.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    stockQuantity: "",
    productAvailable: true,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    ProductService.getProductById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleImageChange(e) {
    setImageFile(e.target.files[0]);
  }

  function updateProduct(e) {
    e.preventDefault();

    const formData = new FormData();

    // sending product object as JSON
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );

    // sending image file
    if (imageFile) {
      formData.append("image", imageFile);
    }

    ProductService.updateProduct(id, formData)
      .then(() => {
        toast.info("Product Updated Successfully!");
        navigate(`/product/${id}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Update Product</h2>

        {/* Existing Image Preview */}
        <div className="imageBox">
          <img
            src={`${process.env.REACT_APP_API_URL}/product/${id}/image`}
            alt="product"
            className="image"
          />
        </div>

        <form onSubmit={updateProduct}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Appliances">Appliances</option>
          </select>

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />

          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
          />

          <label>Available</label>
          <input
            type="checkbox"
            name="productAvailable"
            checked={product.productAvailable}
            onChange={handleChange}
          />

          <br />
          <br />

          <label>Update Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="buttonBox">
            <button type="submit" className="updateBtn">
              Update
            </button>

            <button
              type="button"
              className="backBtn"
              onClick={() => navigate(`/product/${id}`)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
