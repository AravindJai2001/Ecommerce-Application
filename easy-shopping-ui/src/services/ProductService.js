import axios from "axios";

const BASE_URL = "http://localhost:8080/product";

class ProductService {
  getAllProducts() {
    return axios.get(`http://localhost:8080/products`);
  }

  getProductById(id) {
    return axios.get(`http://localhost:8080/product/${id}`);
  }

  addProduct(formData) {
    return axios.post(`http://localhost:8080/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateProduct(id, formData) {
    return axios.put(`http://localhost:8080/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }

  placeOrder(order) {
    return axios.post(`http://localhost:8080/order/place`, order);
  }

  getAllOrders() {
    return axios.get(`http://localhost:8080/orders`);
  }
}

const productService = new ProductService();
export default productService;
