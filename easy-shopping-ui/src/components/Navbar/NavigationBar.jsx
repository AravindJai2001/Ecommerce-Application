import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <div className="nav-bar-details">
        <h2>Easy Shopping</h2>
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/add")}>Add Products</p>
        <p onClick={() => navigate("/orders")}>Orders</p>
      </div>
      <button onClick={() => navigate("/profile")} className="profile-btn">
        <img src="/user.png" alt="Profile" />
      </button>
    </div>
  );
}
