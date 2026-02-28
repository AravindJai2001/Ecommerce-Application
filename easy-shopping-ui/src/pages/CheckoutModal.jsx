import { useEffect, useState } from "react";
import "./Cart.css";

export default function CheckoutModal({
  onClose,
  sendRequest,
  loading,
  errorMessage,
}) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleConfirm = () => {
    let error = {
      customerName: "",
      email: "",
    };

    if (!customerName.trim()) {
      error.customerName = "Please enter your Name!";
    }

    if (!email.trim()) {
      error.email = "Please enter your email!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error.email = "Invalid email format! Example: abc@gmail.com";
      }
    }

    setValidationError(error);
    if (!error.customerName && !error.email) {
      sendRequest(customerName, email);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <h2>Checkout</h2>

        <label>Name</label>
        <input
          type="text"
          placeholder="Please enter your name"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
            setValidationError((prev) => ({
              ...prev,
              customerName: "",
            }));
          }}
          className={validationError.customerName ? "input-error" : ""}
        />

        {validationError.customerName && (
          <p className="error-text">{validationError.customerName}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidationError((prev) => ({
              ...prev,
              email: "",
            }));
          }}
          className={validationError.email ? "input-error" : ""}
        />

        {validationError.email && (
          <p className="error-text">{validationError.email}</p>
        )}

        {errorMessage && <p className="api-error">{errorMessage}</p>}

        <div className="modal-buttons">
          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && <span className="spinner"></span>}
            {loading ? "Processing..." : "Confirm Order"}
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
