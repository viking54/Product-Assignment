import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory, setSortBy } from '../store/slices/productsSlice';
import { useDebounce } from '../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, sortBy } = useSelector(state => state.products);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
        {searchInput && (
          <button
            className="clear-btn"
            onClick={() => setSearchInput('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
        className="filter-select"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="filter-select"
        aria-label="Sort products"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SearchBar;
