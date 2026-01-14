import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(`${API_BASE}/products/categories`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'default',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy } = productsSlice.actions;

// Selectors
export const selectFilteredProducts = (state) => {
  let filtered = [...state.products.items];
  
  // Filter by search query
  if (state.products.searchQuery) {
    const query = state.products.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (state.products.selectedCategory) {
    filtered = filtered.filter(
      product => product.category === state.products.selectedCategory
    );
  }
  
  // Sort
  if (state.products.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.products.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }
  
  return filtered;
};

export default productsSlice.reducer;
