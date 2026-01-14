import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const favoritesCount = useSelector(state => state.favorites.items.length);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ Product Dashboard
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/favorites" className="nav-link favorites-link">
            Favorites
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
