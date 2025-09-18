/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { signup } from '../api/authApi';

const Signup = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const body = {
        firstname: form.fullName,
        email: form.email,
        password: form.password
      };

      const response = await signup(body);

      if (!response.status) {
        setErrors({ apiError: response.message || 'Signup failed. Please try again.' });
        return;
      }

      // Show success message
      setSuccessMessage('Account created successfully! Redirecting to login...');
      
      // Clear form
      setForm({ fullName: '', email: '', password: '' });
      
      // Set submitted state after a delay
      setTimeout(() => {
        setSubmitted(true);
      }, 2000);

    } catch (err) {
      console.error('Unexpected error:', err.message);
      setErrors({ apiError: err.message || 'Something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="auth-page signup-page"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1600&h=900&fit=crop')`,
      }}
    >
      <div className="auth-form-container">
        {submitted ? (
          <div className="auth-thankyou">
            <h1 className="auth-title">Welcome</h1>
            <p>
              Thank you for signing up. Please <Link to="/login">login</Link> to continue.
            </p>
          </div>
        ) : (
          <>
            <p className="auth-subtitle">Become a Member</p>
            <h1 className="auth-title">Create Your Account</h1>
            
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
            
            {/* API Error Message */}
            {errors.apiError && (
              <div className="auth-alert auth-alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{errors.apiError}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className={`auth-form-group ${errors.fullName ? 'has-error' : ''}`}>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="fullName">Full Name</label>
                {errors.fullName && <span className="auth-error-message">{errors.fullName}</span>}
              </div>
              
              <div className={`auth-form-group ${errors.email ? 'has-error' : ''}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <span className="auth-error-message">{errors.email}</span>}
              </div>
              
              <div className={`auth-form-group ${errors.password ? 'has-error' : ''}`}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
                {errors.password && <span className="auth-error-message">{errors.password}</span>}
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
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <p className="auth-switch">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;