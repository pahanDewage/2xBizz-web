import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteSaveButtons from '../Components/Common/FavoriteSaveButtons';
import './Collections.css';

const Collections = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    // Load favorites and saved items from localStorage
    const favoritesData = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedData = JSON.parse(localStorage.getItem('saved') || '[]');

    setFavorites(favoritesData);
    setSaved(savedData);
  }, []);

  const removeFromFavorites = (contentId, contentType) => {
    const newFavorites = favorites.filter(
      (fav) => !(fav.id === contentId && fav.type === contentType)
    );
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromSaved = (contentId, contentType) => {
    const newSaved = saved.filter((item) => !(item.id === contentId && item.type === contentType));
    setSaved(newSaved);
    localStorage.setItem('saved', JSON.stringify(newSaved));
  };

  const getContentLink = (item) => {
    switch (item.type) {
      case 'blog':
        return `/blogs/${item.id}`;
      case 'vlog':
        return `/vlogs/${item.id}`;
      default:
        return '#';
    }
  };

  const getContentImage = (item) => {
    // In a real app, you would fetch this from your API
    // For now, using placeholder images
    const placeholderImages = {
      blog: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop',
      vlog: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
    };
    return placeholderImages[item.type] || placeholderImages.blog;
  };

  return (
    <div className="collections-page">
      <header className="collections-header">
        <div className="container">
          <h1 className="collections-title">My Collections</h1>
          <p className="collections-subtitle">
            Your curated collection of favorite articles and videos.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="collections-tabs">
          <button
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites ({favorites.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div className="collections-content">
          {activeTab === 'favorites' && (
            <div className="content-grid">
              {favorites.length === 0 ? (
                <div className="empty-state">
                  <h3>No favorites yet</h3>
                  <p>Start exploring our content and add your favorites!</p>
                  <Link to="/blogs" className="explore-btn">
                    Explore Content
                  </Link>
                </div>
              ) : (
                favorites.map((item, index) => (
                  <div key={`${item.type}-${item.id}-${index}`} className="collection-item">
                    <div className="item-image">
                      <FavoriteSaveButtons
                        contentId={item.id}
                        contentType={item.type}
                        title={item.title}
                      />
                      <Link to={getContentLink(item)}>
                        <img src={getContentImage(item)} alt={item.title} />
                      </Link>
                    </div>
                    <div className="item-content">
                      <span className="item-type">{item.type}</span>
                      <h3 className="item-title">
                        <Link to={getContentLink(item)}>{item.title}</Link>
                      </h3>
                      <p className="item-date">
                        Added {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromFavorites(item.id, item.type)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="content-grid">
              {saved.length === 0 ? (
                <div className="empty-state">
                  <h3>No saved items yet</h3>
                  <p>Save interesting content to read later!</p>
                  <Link to="/blogs" className="explore-btn">
                    Explore Content
                  </Link>
                </div>
              ) : (
                saved.map((item, index) => (
                  <div key={`${item.type}-${item.id}-${index}`} className="collection-item">
                    <div className="item-image">
                      <FavoriteSaveButtons
                        contentId={item.id}
                        contentType={item.type}
                        title={item.title}
                      />
                      <Link to={getContentLink(item)}>
                        <img src={getContentImage(item)} alt={item.title} />
                      </Link>
                    </div>
                    <div className="item-content">
                      <span className="item-type">{item.type}</span>
                      <h3 className="item-title">
                        <Link to={getContentLink(item)}>{item.title}</Link>
                      </h3>
                      <p className="item-date">
                        Saved {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromSaved(item.id, item.type)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
