import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const adminTemplateId = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
  const userTemplateId = process.env.REACT_APP_EMAILJS_USER_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!form.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!form.message.trim()) {
      setError('Please enter your message');
      return false;
    }
    return true;
  };

  const sendAdminNotification = async () => {
    const adminTemplateParams = {
      from_name: form.name,
      from_email: form.email,
      to_email: adminEmail,
      message: form.message,
      sent_time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        serviceId,
        adminTemplateId,
        adminTemplateParams,
        publicKey
      );
      console.log('Admin notification sent successfully');
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      throw new Error('Failed to send admin notification');
    }
  };

  const sendUserAutoReply = async () => {
    const userTemplateParams = {
      to_name: form.name,
      to_email: form.email, 
        from_name: '2xBizz', // Your business name
      from_email: adminEmail,
      user_message: form.message,
      reply_to: adminEmail,
    };

    try {
      await emailjs.send(
        serviceId,
        userTemplateId,
        userTemplateParams,
        publicKey
      );
      console.log('Auto-reply sent successfully');
    } catch (error) {
      console.error('Failed to send auto-reply:', error);
      // Don't throw error here as this is secondary functionality
      console.warn('Auto-reply failed, but admin notification was successful');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey) {
      setError('Email service is not properly configured. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send admin notification (primary)
      await sendAdminNotification();
      
      // Send user auto-reply (secondary)
      await sendUserAutoReply();
      
      // Success
      setSubmitted(true);
      console.log('Form submitted successfully:', form);
      
      // Reset form
      setForm({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError('');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container contact-container">
        <div className="contact-info">
          <p className="contact-subtitle">Business Support</p>
          <h1 className="contact-title">Contact Our Team</h1>
          <p className="contact-description">
            Need help with your business growth strategy? Our team of business experts is here to assist you.
            Whether you're looking for business analysis, growth insights, or strategic guidance, we're
            committed to helping you achieve your business goals. Please use the form below, and our team will respond within 24 hours.
          </p>
          <div className="contact-details">
            <p>
              <strong>Email : </strong>
              <a href="mailto:support@2xbizz.com"> support@2xbizz.com</a>
            </p>
            <p>
              <strong>Phone : </strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address : </strong> 456 Financial District, New York, NY 10004
            </p>
          </div>
        </div>
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="thank-you-message">
              <h3>Thank You!</h3>
              <p>
                Your message has been sent successfully. We've also sent a confirmation 
                email to <strong>{form.email}</strong>. Our team will respond within 24-48 hours.
              </p>
              <button 
                onClick={resetForm} 
                className="submit-btn"
                style={{ marginTop: '20px' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {error && (
                <div className="error-message" style={{
                  color: '#e74c3c',
                  backgroundColor: '#fdf2f2',
                  border: '1px solid #e74c3c',
                  borderRadius: '4px',
                  padding: '12px',
                  marginBottom: '20px',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <label htmlFor="name">Full Name</label>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <label htmlFor="email">Email Address</label>
              </div>
              
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
                style={{
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;