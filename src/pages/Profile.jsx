/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut, updatePassword, updateProfile } from 'firebase/auth';
import './Profile.css';
import { fetchFavoriteBlogs } from '../api/blogs';

  
  function formatFirestoreDate(timestamp) {
    if (!timestamp || typeof timestamp._seconds !== "number") {
      return null;
    }
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    return date.toISOString().split("T")[0];
  }

const Profile = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [user, setUser] = useState(null);
  const [favoriteBlogs, setFavoriteBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(
          JSON.stringify(currentUser, null, 2)
        );

        const getFavoriteBlogs = async () => {
          try {
            const data = await fetchFavoriteBlogs(currentUser.uid);
            // console.log("Favorite blogs", JSON.stringify(data.favouriteBlogs, null, 2));
            setFavoriteBlogs(data.favouriteBlogs);
          } catch (error) {
            console.error(`Error fetching Favorite blog `, error);
          }
        }

        getFavoriteBlogs();

      } else {

        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {

  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }





  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="container">
          <div className="profile-avatar">
            <div className="profile-initial">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="profile-name">{user.displayName || 'User'}</h1>
          <p className="profile-email">{user.email}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <div className="container">
        <div className="profile-tabs">
          <button
            onClick={() => setActiveTab('details')}
            className={activeTab === 'details' ? 'active' : ''}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={activeTab === 'favorites' ? 'active' : ''}
          >
            Favorite Articles
          </button>
        </div>
        <div className="profile-content">
          {activeTab === 'details' && <ProfileDetails user={user} />}
          {activeTab === 'favorites' && <FavoriteArticles articles={favoriteBlogs} />}
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.displayName || '',
    email: user.email || '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Update display name if changed
      if (formData.name !== user.displayName) {
        await updateProfile(user, {
          displayName: formData.name
        });
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        await updatePassword(user, formData.newPassword);
        setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      }

      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-details-tab">
      <h2 className="tab-title">Manage Your Information</h2>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name"></label>
            <p>Full Name</p>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"></label>
            <p>Email Address</p>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              title="Email cannot be changed"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="newPassword"></label>
            <p>New Password</p>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password (leave blank to keep current)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword"></label>
            <p>Confirm New Password</p>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              disabled={!formData.newPassword}
            />
          </div>
        </div>
        <button type="submit" className="profile-save-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

const FavoriteArticles = ({ articles }) => (
  <div className="favorite-articles-tab">
    <h2 className="tab-title">Your Favorite Articles</h2>
    {articles?.length === 0 ? (
      <div className="empty-state">
        <p>You haven't saved any articles yet.</p>
        <Link to="/blogs" className="browse-link">Browse Articles</Link>
      </div>
    ) : (
      <div className="favorites-grid">
        {articles?.map((item) => (
          <div key={`${item.type}-${item.id}`} className="favorite-card">
            <Link to={item.type === 'blog' ? `/blogs/${item.id}` : `/vlogs/${item.id}`}>
              <img src={item.images} alt={item.title} />
              <div className="favorite-card-info">
                <p className="card-category">/ {item.categoryName}</p>
                <h3 className="card-title">{item.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
);


export default Profile;