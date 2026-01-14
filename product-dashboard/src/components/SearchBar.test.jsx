import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from './SearchBar';
import productsReducer from '../store/slices/productsSlice';

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        items: [],
        categories: ['electronics', 'clothing'],
        loading: false,
        error: null,
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'default',
      },
    },
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('SearchBar', () => {
  it('renders search input and filters', () => {
    renderWithProviders(<SearchBar />);
    
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort products/i)).toBeInTheDocument();
  });

  it('updates search input value', () => {
    renderWithProviders(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(searchInput.value).toBe('test');
  });

  it('shows clear button when search has value', () => {
    renderWithProviders(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    const clearBtn = screen.getByLabelText(/clear search/i);
    expect(clearBtn).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    renderWithProviders(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    const clearBtn = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearBtn);
    
    expect(searchInput.value).toBe('');
  });
});
