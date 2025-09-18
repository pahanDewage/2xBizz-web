import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter submitted with email:', email);
      setSubmitted(true);
    }
  };

  return (
    <div className="newsletter-page">
      <div
        className="newsletter-hero"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1727080902424-09c0089dacad?w=1600&h=900&fit=crop')`,
        }}
      >
        <div className="container">
          {submitted ? (
            <div className="newsletter-thankyou">
              <h1 className="newsletter-title">Thank You</h1>
              <p className="newsletter-subtitle">
                You are now subscribed to the world of LUXURY. Expect the best of our world,
                straight to your inbox.
              </p>
            </div>
          ) : (
            <div className="newsletter-signup">
              <h1 className="newsletter-title">Join The Club</h1>
              <p className="newsletter-subtitle">
                Subscribe to our newsletter for an exclusive journey into the heart of luxury, from
                the latest in style to undiscovered travel destinations.
              </p>
              <form onSubmit={handleSubmit} className="newsletter-hero-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
