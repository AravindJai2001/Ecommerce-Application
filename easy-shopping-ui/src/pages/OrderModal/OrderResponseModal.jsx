import { useNavigate } from "react-router-dom";
import "./OrderResponseModal.css";

export default function OrderResponse({ orderResponse, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <div className="success-icon">
          <div className="checkmark"></div>
        </div>
        <h2>Order Placed</h2>
        <div className="order-details">
          <p>
            <strong>Order ID : </strong>
            {orderResponse.orderId}
          </p>
          <p>
            <strong>Name : </strong>
            {orderResponse.customerName}
          </p>
          <p>
            <strong>Email ID : </strong>
            {orderResponse.email}
          </p>
          <p>
            <strong>Total Price : Rs. </strong>
            {orderResponse.total}
          </p>
        </div>
        <button
          className="close-btn"
          onClick={() => {
            navigate(`/`);
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
