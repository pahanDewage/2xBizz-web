import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ForgotPassword = () => {
/* eslint-disable */
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (err) {
            setError('Could not send reset email.');
        }
    };

    return (
        <div className="auth-page login-page">
            <div className="auth-form-container">
                <h1 className="auth-title">Forgot Password</h1>
                {sent ? (
                    <p>Please check your email for reset instructions.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email Address</label>
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="auth-submit-btn">
                            Send Reset Email
                        </button>
                    </form>
                )}
                <p className="auth-switch">
                    <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
