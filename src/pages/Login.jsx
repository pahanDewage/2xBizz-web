import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../firebaseConfig';
/* eslint-disable */
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setSuccessMessage('Login successful! Redirecting...');
      
      // Brief delay to show success message before redirect
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      let errorMessage = 'Invalid email or password.';
      
      // More specific error messages
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Account temporarily locked due to many failed attempts. Try again later or reset your password.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage('Google login successful! Redirecting...');
      
      // Brief delay to show success message before redirect
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      let errorMessage = 'Google Sign-In failed.';
      
      // More specific Google auth errors
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Google sign-in was canceled.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email. Try another sign-in method.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className="auth-page login-page"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1600&h=900&fit=crop')`,
      }}
    >
      <div className="auth-form-container">
        <p className="auth-subtitle">Welcome Back</p>
        <h1 className="auth-title">Log In to Your Account</h1>

        {/* Success Message */}
        {successMessage && (
          <div className="auth-alert auth-alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="auth-alert auth-alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email Address</label>
          </div>
          <div className="auth-form-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="auth-spinner" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button 
          className="auth-google-btn" 
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <>
              <svg className="auth-spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
              Signing In...
            </>
          ) : (
            <>
              <svg className="auth-google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="auth-forgot">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;