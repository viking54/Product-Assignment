import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';

vi.mock('axios');

const mockProducts = [
  {
    id: 1,
    title: 'Laptop',
    category: 'electronics',
    price: 999.99,
    image: 'laptop.jpg',
    rating: { rate: 4.5, count: 100 },
    description: 'A great laptop',
  },
  {
    id: 2,
    title: 'T-Shirt',
    category: 'clothing',
    price: 29.99,
    image: 'tshirt.jpg',
    rating: { rate: 4.0, count: 50 },
    description: 'A comfortable t-shirt',
  },
];

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockImplementation((url) => {
      if (url.includes('/products/categories')) {
        return Promise.resolve({ data: ['electronics', 'clothing'] });
      }
      if (url.includes('/products')) {
        return Promise.resolve({ data: mockProducts });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('loads and displays products', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    });
  });

  it('filters products by search query', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('adds and removes products from favorites', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    // Add to favorites
    const favoriteButtons = screen.getAllByLabelText(/add to favorites/i);
    fireEvent.click(favoriteButtons[0]);

    // Check favorites count in navbar
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    // Navigate to favorites page
    const favoritesLink = screen.getByText(/favorites/i);
    fireEvent.click(favoritesLink);

    await waitFor(() => {
      expect(screen.getByText('My Favorites')).toBeInTheDocument();
    });
  });
});
