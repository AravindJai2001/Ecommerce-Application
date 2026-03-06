import api from "./api";

class ProductService {
  getAllProducts() {
    return api.get("/products");
  }

  getProductById(id) {
    return api.get(`/product/${id}`);
  }

  addProduct(formData) {
    return api.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateProduct(id, formData) {
    return api.put(`/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteProduct(id) {
    return api.delete(`/product/${id}`);
  }

  placeOrder(order) {
    return api.post("/order/place", order);
  }

  getAllOrders() {
    return api.get("/orders");
  }
}

const productService = new ProductService();
export default productService;
