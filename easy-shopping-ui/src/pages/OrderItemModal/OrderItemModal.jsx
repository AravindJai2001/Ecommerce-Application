// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderItemModal.css";
import { useEffect } from "react";

export default function OrderItemModal({ onClose, orderItem }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="orderItem-modal">
        <div className="orderDetails">
          <img src="./order.png" alt="orders" />
          <h2>Order Items Details</h2>
        </div>
        <div className="modal-content-scroll">
          {orderItem.map((item) => {
            return (
              <div
                key={item.id}
                className="orderItem-list"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                <div className="product-details">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/product/${item.productId}/image`}
                    alt={item.productName}
                  />
                  <div className="productItem-details">
                    <h2>{item.productName}</h2>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>

                <p className="item-price">₹{item.totalPrice}</p>
              </div>
            );
          })}
          <button
            className="order-close-btn"
            onClick={() => {
              navigate(`/orders`);
              onClose();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
