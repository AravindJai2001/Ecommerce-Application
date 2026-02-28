import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";

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
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Update Product</h2>

        {/* Existing Image Preview */}
        <div style={styles.imageBox}>
          <img
            src={`http://localhost:8080/product/${id}/image`}
            alt="product"
            style={styles.image}
          />
        </div>

        <form onSubmit={updateProduct} style={styles.form}>
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Appliances">Appliances</option>
          </select>

          <label style={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Available</label>
          <input
            type="checkbox"
            name="productAvailable"
            checked={product.productAvailable}
            onChange={handleChange}
          />

          <br />
          <br />

          <label style={styles.label}>Update Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div style={styles.buttonBox}>
            <button type="submit" style={styles.updateBtn}>
              Update
            </button>

            <button
              type="button"
              style={styles.backBtn}
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

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f2f4f8",
    padding: "20px",
  },

  card: {
    width: "450px",
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  imageBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  updateBtn: {
    background: "#2874f0",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  backBtn: {
    background: "#555",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
