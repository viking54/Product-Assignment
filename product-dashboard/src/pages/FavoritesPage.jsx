import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import './ProductListingPage.css';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites.items);

  return (
    <div className="page-container">
      <h1 className="page-title">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="no-results-container">
          <div className="empty-favorites">
            <span className="empty-icon">❤️</span>
            <h2>No favorites yet</h2>
            <p>Browse products and click the heart icon to save your favorites!</p>
          </div>
        </div>
      ) : (
        <>
          <p className="results-count">{favorites.length} favorite products</p>
          <div className="products-grid">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
