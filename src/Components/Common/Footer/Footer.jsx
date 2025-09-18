import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { label: 'About', path: '/about' },
    { label: 'Support', path: '/contact' },
    { label: 'Market Insights', path: '/blogs' },
    { label: 'Portfolio', path: '/portfolio' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'YouTube', icon: 'youtube', url: '#' },
    { name: 'GitHub', icon: 'github', url: '#' },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">2xBizz</Link>
        </div>

        <div className="footer-links-wrapper">
          <nav className="footer-links">
            {mainLinks.map((link) => (
              <Link key={link.path} to={link.path} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="social-link"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} 2xBizz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
