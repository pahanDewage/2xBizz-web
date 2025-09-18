import React from 'react';
import './About.css';
/* eslint-disable */
const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="container">
          <p className="about-subtitle">About 2xBizz</p>
          <h1 className="about-title">Doubling Your Business Potential</h1>
          <p className="about-intro">
            2xBizz is a comprehensive business growth platform designed to help entrepreneurs and businesses
            double their potential through innovative solutions, strategic insights, and growth management tools.
            We combine cutting-edge technology with expert analysis to provide you with the tools you need
            to scale and grow your business successfully.
          </p>
        </div>
      </header>

      <section className="mission-section">
        <div className="container mission-container">
          <div className="mission-image">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7FEB511?w=800&h=600&fit=crop"
              alt="Luxurious Interior"
            />
          </div>
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p>
              We believe that successful investing is built on data-driven decisions, comprehensive analysis,
              and continuous learning. Our mission is to democratize access to professional-grade investment
              tools and insights, empowering both novice and experienced investors to make informed decisions
              that align with their financial goals.
            </p>
            <p>
              At InvestorPro, we combine advanced analytics with human expertise to provide you with
              actionable insights, risk assessments, and portfolio optimization strategies. Our platform
              is designed to help you navigate the complexities of modern markets with confidence and clarity.
            </p>
            <p>
              Our team consists of experienced financial analysts, data scientists, and investment professionals
              who are committed to providing accurate, timely, and actionable market intelligence. We leverage
              cutting-edge technology to deliver insights that were previously available only to institutional investors.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Investment Team</h2>
          <div className="team-grid">
            <TeamMember
              imgSrc="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop"
              name="Sarah Chen"
              title="Chief Investment Officer"
            />
            <TeamMember
              imgSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
              name="Michael Rodriguez"
              title="Head of Analytics"
            />
            <TeamMember
              imgSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
              name="Dr. Emily Watson"
              title="Risk Management Director"
            />
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Join Our Investment Community</h2>
          <p className="values-intro">
            Become part of a community of informed investors who value data-driven decisions and
            continuous learning. Subscribe to our newsletter for exclusive market insights, portfolio
            strategies, and investment opportunities.
          </p>
          <form className="newsletter-form-about">
            <input type="email" placeholder="Your email address" />
            <button type="submit">→</button>
          </form>
        </div>
      </section>
    </div>
  );
};

const TeamMember = ({ imgSrc, name, title }) => (
  <div className="team-member">
    <img src={imgSrc} alt={name} />
    <h3 className="member-name">{name}</h3>
    <p className="member-title">{title}</p>
  </div>
);

export default About;
