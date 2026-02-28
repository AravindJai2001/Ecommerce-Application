import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import ProductService from "../services/ProductService";
import NavigationBar from "../components/NavigationBar";
import { Icons } from "../constants/icons";

export default function Home() {
  const [product, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();
  const CartIcon = Icons.Cart;

  useEffect(() => {
    ProductService.getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = product.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <NavigationBar search={search} setSearch={setSearch} />

      <div style={{ padding: "20px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CategoryBar category={category} setCategory={setCategory} />
          <div className="nav-search-cart">
            <SearchBar search={search} setSearch={setSearch} />
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              <CartIcon size={20} />
              <span style={{ marginTop: "3px" }}>Cart</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredProducts.length === 0 ? (
            <h1>No Products Found</h1>
          ) : (
            filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
