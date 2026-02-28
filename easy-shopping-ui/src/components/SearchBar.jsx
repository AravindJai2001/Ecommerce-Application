export default function SearchBar({ search, setSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      />
    </div>
  );
}
