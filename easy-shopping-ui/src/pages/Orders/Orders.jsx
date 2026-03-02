import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import "./Orders.css";
import OrderItemModal from "../OrderItemModal/OrderItemModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderItemModal, setOrderItemModal] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (orderItemModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [orderItemModal]);

  return (
    <div className="order-page">
      <div className="order-card">
        <div className="order-title">
          <h2>Orders</h2>
          <button onClick={() => navigate(`/`)}>Close</button>
        </div>

        <div className="order-line"></div>
        {orders.length === 0 ? (
          <div className="empty-order">
            <h2>Order is Empty</h2>
            <img src="./no-order.png" alt="No orders" />
          </div>
        ) : (
          <>
            <div className="order-header">
              <p>Order ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Order Date</p>
              <p>Status</p>
              <p>Total Price</p>
            </div>
            {orders.map((item) => {
              return (
                <div
                  key={item.orderId}
                  className="order-items"
                  onClick={() => {
                    setOrderItemModal(true);
                    setOrderItem(item.items);
                    console.log(item);
                  }}
                >
                  <h4>{item.orderId}</h4>
                  <p>{item.customerName}</p>
                  <p>{item.email}</p>
                  <p>{item.orderDate}</p>
                  <p className="order-status">{item.status}</p>
                  <p className="order-item-total">₹{item.total}</p>
                </div>
              );
            })}
          </>
        )}
        {orderItemModal && (
          <OrderItemModal
            orderItem={orderItem}
            onClose={() => setOrderItemModal(false)}
          />
        )}
      </div>
    </div>
  );
}
