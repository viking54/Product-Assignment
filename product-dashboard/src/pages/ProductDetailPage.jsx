import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../store/slices/favoritesSlice';
import axios from 'axios';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFavorite = useSelector(state => selectIsFavorite(state, parseInt(id)));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <div className="error">Error loading product: {error}</div>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-rating">
            ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
          </div>
          
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <p className="product-detail-description">{product.description}</p>
          
          <button
            onClick={handleFavoriteToggle}
            className={`favorite-toggle-btn ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
