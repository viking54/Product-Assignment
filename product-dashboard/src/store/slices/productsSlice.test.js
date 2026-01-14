import { describe, it, expect } from 'vitest';
import productsReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  selectFilteredProducts,
} from './productsSlice';

describe('productsSlice', () => {
  const initialState = {
    items: [
      { id: 1, title: 'Product A', category: 'electronics', price: 100 },
      { id: 2, title: 'Product B', category: 'clothing', price: 50 },
      { id: 3, title: 'Product C', category: 'electronics', price: 150 },
    ],
    categories: ['electronics', 'clothing'],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'default',
  };

  it('should handle setSearchQuery', () => {
    const state = productsReducer(initialState, setSearchQuery('Product A'));
    expect(state.searchQuery).toBe('Product A');
  });

  it('should handle setSelectedCategory', () => {
    const state = productsReducer(initialState, setSelectedCategory('electronics'));
    expect(state.selectedCategory).toBe('electronics');
  });

  it('should handle setSortBy', () => {
    const state = productsReducer(initialState, setSortBy('price-asc'));
    expect(state.sortBy).toBe('price-asc');
  });

  it('should filter products by search query', () => {
    const state = {
      products: { ...initialState, searchQuery: 'Product A' },
      favorites: { items: [] },
    };
    const filtered = selectFilteredProducts(state);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Product A');
  });

  it('should filter products by category', () => {
    const state = {
      products: { ...initialState, selectedCategory: 'electronics' },
      favorites: { items: [] },
    };
    const filtered = selectFilteredProducts(state);
    expect(filtered).toHaveLength(2);
    expect(filtered.every(p => p.category === 'electronics')).toBe(true);
  });

  it('should sort products by price ascending', () => {
    const state = {
      products: { ...initialState, sortBy: 'price-asc' },
      favorites: { items: [] },
    };
    const filtered = selectFilteredProducts(state);
    expect(filtered[0].price).toBe(50);
    expect(filtered[2].price).toBe(150);
  });

  it('should sort products by price descending', () => {
    const state = {
      products: { ...initialState, sortBy: 'price-desc' },
      favorites: { items: [] },
    };
    const filtered = selectFilteredProducts(state);
    expect(filtered[0].price).toBe(150);
    expect(filtered[2].price).toBe(50);
  });
});
