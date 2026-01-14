import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, selectFilteredProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="page-container">
      <h1 className="page-title">Discover Products</h1>
      <SearchBar />
      
      {loading ? (
        <div className="products-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error">Error: {error}</div>
        </div>
      ) : products.length === 0 ? (
        <div className="no-results-container">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <>
          <p className="results-count">{products.length} products found</p>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListingPage;
