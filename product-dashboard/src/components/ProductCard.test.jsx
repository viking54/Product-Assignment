import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from './ProductCard';
import favoritesReducer from '../store/slices/favoritesSlice';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  category: 'electronics',
  price: 99.99,
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 },
};

const renderWithProviders = (component, initialState = {}) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('toggles favorite status when button is clicked', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const favoriteBtn = screen.getByLabelText(/add to favorites/i);
    expect(favoriteBtn).toHaveTextContent('🤍');
    
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveTextContent('❤️');
  });

  it('shows favorite icon when product is in favorites', () => {
    const initialState = {
      favorites: {
        items: [mockProduct],
      },
    };
    
    renderWithProviders(<ProductCard product={mockProduct} />, initialState);
    
    const favoriteBtn = screen.getByLabelText(/remove from favorites/i);
    expect(favoriteBtn).toHaveTextContent('❤️');
  });
});
