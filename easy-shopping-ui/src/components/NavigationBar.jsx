import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #072359, #2e18a9, #5953ca)",
        padding: "15px",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        display: "flex",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <h2 style={{ margin: 0 }}>Easy Shopping</h2>
        <p
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <p
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/add")}
        >
          Add Products
        </p>
        <p
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/orders")}
        >
          Orders
        </p>
      </div>
      <button onClick={() => navigate("/profile")} className="profile-btn">
        <img src="/user.png" alt="Profile" />
      </button>
    </div>
  );
}
