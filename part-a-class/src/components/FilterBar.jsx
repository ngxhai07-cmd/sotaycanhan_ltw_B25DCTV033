import { Component } from 'react';

const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class FilterBar extends Component {
  render() {
    const { selectedCategory, onSelectCategory } = this.props;
    return (
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
    );
  }
}

export default FilterBar;
