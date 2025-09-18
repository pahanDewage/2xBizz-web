import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';
import { auth } from '../../../firebaseConfig';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMobileMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeMobileMenu();
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const navItemsLeft = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/blogs', label: 'Insights', icon: '📊' },
    { path: '/portfolio', label: 'Portfolio', icon: '💼' },
    { path: '/tradingview', label: 'Charts', icon: '📈' },
    { path: '/google-finance', label: 'Markets', icon: '🌍' },
    { path: '/cse', label: 'CSE', icon: '🇱🇰' },
  ];

  const navItemsRight = [
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Support', icon: '💬' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <span className="logo-symbol">2x</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav desktop-nav">
          <div className="nav-group">
            {navItemsLeft.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {location.pathname === item.path && <div className="nav-indicator"></div>}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-actions">
          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search insights, companies..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            {user ? (
              <div className="user-menu">
                <div className="user-avatar">
                  <span>👤</span>
                </div>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </Link>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search insights, companies..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
              </div>
            </form>
          </div>
          
          <div className="mobile-nav-items">
            {navItemsLeft.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
            
            {navItemsRight.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-auth">
            {user ? (
              <>
                <Link to="/profile" className="mobile-nav-item" onClick={closeMobileMenu}>
                  <span className="nav-icon">👤</span>
                  <span className="nav-label">Profile</span>
                </Link>
                <button className="mobile-logout" onClick={handleLogout}>
                  <span className="nav-icon">🚪</span>
                  <span className="nav-label">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary mobile" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary mobile" onClick={closeMobileMenu}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Subtle Branding in Mobile Menu */}
          <div className="mobile-branding">
            <div className="brand-info">
              <span className="brand-name">2xBizz</span>
              <span className="brand-tagline">Double Your Business</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;