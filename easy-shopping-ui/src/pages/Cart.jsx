import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";
import OrderResponse from "./OrderModal/OrderResponse";

export default function Cart() {
  const [orderResponse, setOrderResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModal]);

  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const submitOrder = async (customerName, email) => {
    const orderRequest = {
      customerName: customerName,
      email: email,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await ProductService.placeOrder(orderRequest);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOrderResponse(res.data);
      console.log(res);
      toast.success("Order Placed");

      clearCart();
      setActiveModal("success");
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          setErrorMessage(error.response.data);
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("Order Failed");
        }
      } else {
        setErrorMessage("Server not responding. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const grandtotal = (cartItems || []).reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const handleClear = () => {
    if (cartItems.length === 0) {
      toast.info("Cart is already Empty");
      return;
    } else {
      clearCart();
      toast.success("Cart cleared successfully!");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-card">
        <div className="cart-title">
          <h2>My Cart</h2>
          <button onClick={handleClear}>
            <span>🗑️ Clear cart</span>
          </button>
        </div>

        <div className="cart-line"></div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h4>Cart is Empty</h4>
            <button className="empty-back-btn" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <p>Product</p>
              <p>Price</p>
              <p className="cart-header-pa">Quantity</p>
              <p>Total</p>
              <p className="cart-header-pa">Action</p>
            </div>
            {cartItems.map((item) => {
              const total = Number(item.price) * (item.quantity || 1);

              return (
                <div className="cart-item" key={item.id}>
                  <div className="cart-product">
                    <img
                      src={`http://localhost:8080/product/${item.id}/image`}
                      alt={item.name}
                    />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.brand}</p>
                    </div>
                  </div>
                  <p>{item.price}</p>
                  <div className="cart-qty">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <p className="cart-item-total">₹ {total}</p>
                  <button
                    className="cart-delete"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              );
            })}

            <div className="cart-summary">
              <h3>Total: ₹ {grandtotal}</h3>

              <div className="btn-action">
                <button className="back-btn" onClick={() => navigate("/")}>
                  Back
                </button>

                <button
                  className="checkout-btn"
                  onClick={() => {
                    setErrorMessage("");
                    setActiveModal("checkout");
                  }}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </>
        )}
        {activeModal === "checkout" && (
          <CheckoutModal
            onClose={() => setActiveModal(null)}
            sendRequest={submitOrder}
            loading={loading}
            errorMessage={errorMessage}
          />
        )}

        {activeModal === "success" && (
          <OrderResponse
            orderResponse={orderResponse}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </div>
  );
}
