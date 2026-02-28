export default function CategoryBar({ category, setCategory }) {
  const categories = ["All", "Fashion", "Electronics", "Mobiles", "Appliances"];

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "0px" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`cat-btn ${category === cat ? "active" : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
