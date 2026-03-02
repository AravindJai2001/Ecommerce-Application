import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductService from "../../services/ProductService";
import NavigationBar from "../../components/Navbar/NavigationBar";
import "./Home.css";

export default function Home() {
  const [product, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = product.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      p.brand.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <NavigationBar search={search} setSearch={setSearch} />

      <div className="home-container">
        <div className="home-cat-bar">
          <CategoryBar category={category} setCategory={setCategory} />
          <div className="nav-search-cart">
            <SearchBar search={search} setSearch={setSearch} />
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              <img src="./cart.png" alt="cartIcon" />
              <span>Cart</span>
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-home">
            <h2>No Products Found</h2>
          </div>
        ) : (
          <>
            <div className="home-item-details">
              {filteredProducts.map((p) => {
                return <ProductCard key={p.id} product={p} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
