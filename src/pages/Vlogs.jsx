import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteSaveButtons from '../Components/Common/FavoriteSaveButtons';
import './Vlogs.css';

const Vlogs = () => {
  // In a real app, this data would come from a CMS
  const vlogList = [
    {
      id: 1,
      type: 'vlog',
      category: 'Lifestyle',
      title: "The designers' guide to creating a stylish summer dinner table",
      author: 'Annie Lewis',
      date: '2025-06-18',
      excerpt:
        'Discover the art of creating an elegant summer dinner table that will impress your guests and elevate your entertaining experience.',
      imageUrl: 'https://images.unsplash.com/photo-1617028155132-1b6c33525286?w=500&h=600&fit=crop',
    },
    {
      id: 2,
      type: 'vlog',
      category: 'Culture',
      title: "Introducing Supporters' House: Inside The National Gallery's new members' club",
      author: 'Cordelia Aspinall',
      date: '2025-06-16',
      excerpt:
        "Step inside the exclusive Supporters' House, the National Gallery's newest members' club that combines art, culture, and luxury.",
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=600&fit=crop',
    },
    {
      id: 3,
      type: 'vlog',
      category: 'Behind the Scenes',
      title: 'Behind the Scenes: Creating Our Latest Business Content',
      author: 'Ceylon Luxury Living',
      date: '2025-06-15',
      excerpt:
        'Go behind the scenes with our editorial team as we create our latest business content. From initial concept development to final publication.',
      imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=600&fit=crop',
    },
    {
      id: 4,
      type: 'vlog',
      category: 'Travel',
      title: "A Day in the Life: Exploring London's Hidden Luxury Spots",
      author: 'Zoe Gunn',
      date: '2025-06-14',
      excerpt:
        "Join us as we explore London's most exclusive and hidden luxury destinations, from private clubs to secret gardens.",
      imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&h=600&fit=crop',
    },
    {
      id: 5,
      type: 'vlog',
      category: 'Fashion',
      title: 'The Making of a Fashion Editorial: From Concept to Publication',
      author: 'Annie Lewis',
      date: '2025-06-13',
      excerpt:
        'Follow the complete process of creating a fashion editorial, from initial concept and mood boards to final publication.',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop',
    },
    {
      id: 6,
      type: 'vlog',
      category: 'Interiors',
      title: 'Designer Home Tour: Inside a Luxury London Apartment',
      author: 'Ceylon Luxury Living',
      date: '2025-06-12',
      excerpt:
        "Take an exclusive tour of a stunning luxury apartment in London, designed by one of the city's most sought-after interior designers.",
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=600&fit=crop',
    },
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredVlog = vlogList[0];
  const otherVlogs = vlogList.slice(1);

  return (
    <div className="vlogs-page">
      <div className="container">
        <div className="vlogs-grid">
          <FeaturedVlogCard item={featuredVlog} />
          <div className="content-list">
            {otherVlogs.map((item) => (
              <VlogCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedVlogCard = ({ item }) => {
  const link = `/vlogs/${item.id}`;
  return (
    <div className="featured-vlog-card" style={{ backgroundImage: `url(${item.imageUrl})` }}>
      <FavoriteSaveButtons contentId={item.id} contentType={item.type} title={item.title} />
      <div className="card-overlay">
        <p className="card-category">/ {item.category}</p>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-meta">
          {new Date(item.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          <br />
          By {item.author}
        </p>
        <p className="card-excerpt">{item.excerpt}</p>
        <Link to={link} className="watch-more-btn">
          Watch Video
        </Link>
      </div>
    </div>
  );
};

const VlogCard = ({ item }) => {
  const link = `/vlogs/${item.id}`;
  return (
    <div className="vlog-card">
      <div className="card-image">
        <FavoriteSaveButtons contentId={item.id} contentType={item.type} title={item.title} />
        <Link to={link}>
          <img src={item.imageUrl} alt={item.title} />
          <div className="play-overlay">
            <span className="play-icon">▶</span>
          </div>
        </Link>
      </div>
      <div className="card-content">
        <p className="card-category">/ {item.category}</p>
        <h3 className="card-title">
          <Link to={link}>{item.title}</Link>
        </h3>
        <p className="card-meta">
          {new Date(item.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          <br />
          By {item.author}
        </p>
      </div>
    </div>
  );
};

export default Vlogs;
