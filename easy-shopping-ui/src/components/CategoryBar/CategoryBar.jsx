import "./CategoryBar.css";
export default function CategoryBar({ category, setCategory }) {
  const categories = ["All", "Fashion", "Electronics", "Mobiles", "Appliances"];

  return (
    <div className="cat-bar">
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
