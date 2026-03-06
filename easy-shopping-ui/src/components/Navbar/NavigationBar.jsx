import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavigationBar.css";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <div className="nav-details">
        <div className="logo">
          <img src="./shopping.png" alt="Logo" />
          <h2>Easy Shopping</h2>
        </div>

        <div className={`nav-link ${menuOpen ? "active" : ""}`}>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/add")}>Add Products</p>
          <p onClick={() => navigate("/orders")}>Orders</p>
        </div>
      </div>

      <button onClick={() => navigate("/profile")} className="profile-btn">
        <img src="/user.png" alt="Profile" />
      </button>
    </div>
  );
}
