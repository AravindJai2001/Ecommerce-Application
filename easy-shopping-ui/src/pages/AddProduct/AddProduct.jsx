import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";
import "./AddProduct.css";

export default function AddProduct() {
  const [product, setProduct] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    setImageFile(e.target.files[0]);
  }

  function addProduct(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" }),
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    ProductService.addProduct(formData)
      .then(() => {
        toast.success("Product Added Succesfully..!");
        navigate(`/`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Add Product</h2>

        <form onSubmit={addProduct} className="form">
          <label className="label">Product Name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <label className="label">Brand</label>
          <input
            className="input"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />

          <label className="label">Price</label>
          <input
            className="input"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <label className="label">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="input"
          >
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Appliances">Appliances</option>
          </select>

          <label className="label">Description</label>
          <input
            className="input"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <label className="label">Stock Quantity</label>
          <input
            className="input"
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label className="label">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="buttonBox">
            <button type="submit" className="updateBtn">
              Add Product
            </button>
            <button
              type="button"
              className="backBtn"
              onClick={() => navigate(`/`)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
