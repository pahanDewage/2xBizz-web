/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './FavoriteSaveButtons.css';
import api from '../../api/axios';
import { getAuth } from 'firebase/auth';

const FavoriteSaveButtons = ({ contentId, contentType, title, userId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const auth = getAuth();
    const user = auth.currentUser;

  useEffect(() => {
    if( contentType != 'blogs' ) return;
    if (!user?.uid) return;
    const fetchFavoriteStatus = async () => {
      try {
        const res = await api.post(
          `/${contentType}/is-favorited?blogId=${contentId}&userId=${user?.uid}`
        );
        setIsFavorited(res.data.isFavorited);
      } catch (err) {
        console.error('Error fetching favorite status:', err.message);
      }
    };

    fetchFavoriteStatus();
  }, [contentId, user]);

  useEffect(() => {
    if( contentType == 'blogs' ) return;
    if (!user?.uid) return;
    const fetchSavedStatus = async () => {
      try {
        const res = await api.post(
          `/${contentType}/is-saved?contentId=${contentId}&userId=${user?.uid}`
        );
        setIsSaved(res.data.isSaved);
      } catch (err) {
        console.error('Error fetching saved status:', err.message);
      }
    };

    fetchSavedStatus();
  }, [contentId, user]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await api.post(`/${contentType}/${contentId}/favorite`, {
        userId,
      });

      if (response.data?.isFavorited !== undefined) {
        setIsFavorited(response.data.isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);

    try {
      const response = await api.post(`/${contentType}/${contentId}/save`, {
        userId,
      });

      if (response.data?.isSaved !== undefined) {
        setIsSaved(response.data.isSaved);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  return (
    <div className="favorite-save-buttons">
      {contentType == 'blogs' ? (
        <>
          <button
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavorite}
            title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <span className="icon">♥</span>
          </button>
        </>
      ) : (
        <>
          <button
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleSave}
            title={isSaved ? 'Remove from Saved' : 'Save for Later'}
          >
            <span className="icon">🔖</span>
          </button>
        </>
      )}


    </div>
  );
};

export default FavoriteSaveButtons;
