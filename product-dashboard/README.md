# Product Dashboard

A modern, responsive product dashboard built with React, Redux Toolkit, and Vite. This application demonstrates best practices in state management, component architecture, and testing.

## Features

- **Product Listing**: Browse products in a responsive grid layout
- **Search & Filter**: Real-time search with debouncing, category filtering, and price sorting
- **Product Details**: View detailed product information
- **Favorites Management**: Add/remove products to favorites with persistent state
- **Responsive Design**: Mobile-first approach with clean, accessible UI
- **Comprehensive Testing**: Unit and integration tests with Vitest

## Tech Stack

- **React 19** - UI library with functional components and hooks
- **Redux Toolkit** - State management with slices and async thunks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing utilities
- **Fake Store API** - Product data source

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd product-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── SearchBar.jsx
├── pages/              # Page components
│   ├── ProductListingPage.jsx
│   ├── ProductDetailPage.jsx
│   └── FavoritesPage.jsx
├── store/              # Redux store configuration
│   ├── store.js
│   └── slices/
│       ├── productsSlice.js
│       └── favoritesSlice.js
├── hooks/              # Custom React hooks
│   └── useDebounce.js
├── test/               # Test configuration
│   └── setup.js
└── App.jsx             # Root component
```

## Key Features Implementation

### State Management
- Redux Toolkit for centralized state management
- Separate slices for products and favorites
- Async thunks for API calls
- Memoized selectors for filtered data

### Search & Filter
- Debounced search input (500ms delay)
- Category filtering
- Price sorting (ascending/descending)
- Combined filters work together seamlessly

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly UI elements
- Accessible components with ARIA labels

### Testing
- Unit tests for Redux slices
- Component tests with React Testing Library
- Integration tests for user workflows
- Test coverage for critical paths

## API Integration

This app uses the [Fake Store API](https://fakestoreapi.com) for product data:
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch categories

