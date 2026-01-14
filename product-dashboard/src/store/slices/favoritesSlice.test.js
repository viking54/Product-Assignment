import { describe, it, expect } from 'vitest';
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from './favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    items: [],
  };

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
  };

  it('should add product to favorites', () => {
    const state = favoritesReducer(initialState, addToFavorites(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockProduct);
  });

  it('should not add duplicate products', () => {
    let state = favoritesReducer(initialState, addToFavorites(mockProduct));
    state = favoritesReducer(state, addToFavorites(mockProduct));
    expect(state.items).toHaveLength(1);
  });

  it('should remove product from favorites', () => {
    let state = favoritesReducer(initialState, addToFavorites(mockProduct));
    state = favoritesReducer(state, removeFromFavorites(mockProduct.id));
    expect(state.items).toHaveLength(0);
  });

  it('should correctly identify favorite products', () => {
    const state = {
      favorites: {
        items: [mockProduct],
      },
    };
    expect(selectIsFavorite(state, 1)).toBe(true);
    expect(selectIsFavorite(state, 2)).toBe(false);
  });
});
