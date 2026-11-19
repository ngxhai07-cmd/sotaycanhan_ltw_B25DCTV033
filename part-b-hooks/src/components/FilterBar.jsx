const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="filter-section">
      <div className="filter-bar">
        {FILTER_OPTIONS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo nội dung (debounce 400ms)..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
