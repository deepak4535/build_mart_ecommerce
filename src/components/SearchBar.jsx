
function SearchBar({ search, setSearch, category, setCategory, categories }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search construction materials..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="All">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;