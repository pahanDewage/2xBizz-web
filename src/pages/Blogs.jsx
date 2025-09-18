/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteSaveButtons from '../Components/Common/FavoriteSaveButtons';
import './Blogs.css';
import { fetchBlogs } from '../api/blogs';
import { getAuth } from 'firebase/auth';


const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [mainContent, setMainContent] = useState(null);
  const [otherContents, setOtherContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCardHeight, setFeaturedCardHeight] = useState(0);
  const featuredCardRef = useRef(null);

  useEffect(() => {

    // window.scrollTo(0, 0);

    // Optional: Smooth scroll alternative
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  //   const allContent = [
  //   {
  //     id: 1,
  //     type: 'blog',
  //     category: 'Lifestyle',
  //     title: 'The best celebrity looks from Royal Ascot 2025',
  //     author: 'Ceylon Luxury Living',
  //     date: '2025-06-19',
  //     updated: '2025-06-20',
  //     excerpt:
  //       'Head inside the Royal Enclosure and see all the most fabulous fashion at Royal Ascot 2025.',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1588859988126-d6a4c0a5a3a4?w=800&h=1200&fit=crop',
  //   },
  //   {
  //     id: 2,
  //     type: 'blog',
  //     category: 'Lifestyle',
  //     title: 'The Interiors Edit: The best new buys for an instant home makeover',
  //     author: 'Zoe Gunn',
  //     date: '2025-06-18',
  //     imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=600&fit=crop',
  //   },
  //   {
  //     id: 3,
  //     type: 'vlog',
  //     category: 'Lifestyle',
  //     title: "The designers' guide to creating a stylish summer dinner table",
  //     author: 'Annie Lewis',
  //     date: '2025-06-18',
  //     imageUrl: 'https://images.unsplash.com/photo-1617028155132-1b6c33525286?w=500&h=600&fit=crop',
  //   },
  //   {
  //     id: 4,
  //     type: 'blog',
  //     category: 'Lifestyle',
  //     title: 'Skin + Me to launch first London pop-up at Battersea Power Station',
  //     author: 'Annie Lewis',
  //     date: '2025-06-18',
  //     imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f168a2d0c1?w=500&h=600&fit=crop',
  //   },
  //   {
  //     id: 5,
  //     type: 'vlog',
  //     category: 'Lifestyle',
  //     title: "Introducing Supporters' House: Inside The National Gallery's new members' club",
  //     author: 'Cordelia Aspinall',
  //     date: '2025-06-16',
  //     imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=600&fit=crop',
  //   },
  //   {
  //     id: 6,
  //     type: 'blog',
  //     category: 'Lifestyle',
  //     title: "The best private members' clubs in Mayfair",
  //     author: 'Ceylon Luxury Living',
  //     date: '2025-06-17',
  //     updated: '2025-06-20',
  //     imageUrl: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=500&h=600&fit=crop',
  //   },
  // ].sort((a, b) => new Date(b.date) - new Date(a.date));


  useEffect(() => {
    const FetchAllBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();

        const main = response.find(blog => blog.position === "1");
        const others = response.filter(blog => blog.position !== "1");

        setBlogs(response);
        setMainContent(main);
        setOtherContents(others);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    FetchAllBlogs();
  }, []);

  // Update featured card height when it loads
  useEffect(() => {
    if (featuredCardRef.current && !loading) {
      setFeaturedCardHeight(featuredCardRef.current.offsetHeight);
    }
  }, [loading, mainContent]);

  const FavoriteToggle = (id) => {
    

    if (!user) {
      alert('You must be logged in.');
      return;
    }



  }

  return (
    <div className="market-insights-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Market Insights</h1>
          <p className="page-subtitle">Stay informed with the latest market analysis and investment opportunities</p>
        </div>
        <div className="insights-grid">
          {loading ? (
            <>
              <FeaturedCardSkeleton ref={featuredCardRef} />
              <div className="content-list" style={{ maxHeight: '800px' }}> {/* Fallback height */}
                {[...Array(5)].map((_, index) => (
                  <ContentCardSkeleton key={index} />
                ))}
              </div>
            </>
          ) : (
            <>
              {mainContent && (
                <FeaturedCard
                  item={mainContent}
                  ref={featuredCardRef}
                />
              )}
              <div
                className="content-list"
                style={{ maxHeight: featuredCardHeight || '800px' }}
              >
                {otherContents.map((item) => (
                  <ContentCard key={`${item.type}-${item.id}`} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Featured Card Component
const FeaturedCard = React.forwardRef(({ item }, ref) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const link = item.type == "blog" ? `/blogs/${item.id}` : `/vlogs/${item.id}`;
  return (
    <div
      className="featured-card"
      style={{ backgroundImage: `url(${item.images})` }}
      ref={ref}
    >
      <FavoriteSaveButtons contentId={item.id} contentType="blogs" title={item.title} userId={user?.uid} />
      <div className="card-overlay">
        <p className="card-category">/ {item.categoryName}</p>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-meta">
          {new Date(item.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          {item.updated &&
            ` / Updated on: ${new Date(item.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
          <br />
          By {item.author}
        </p>
        <p className="card-excerpt">{item.excerpt}</p>
        <Link to={link} className="read-more-btn">
          View Analysis
        </Link>
      </div>
    </div>
  );
});

// Content Card Component 
const ContentCard = ({ item }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const link = item.type === 'blog' ? `/blogs/${item.id}` : `/vlogs/${item.id}`;
  return (
    <div className="content-card">
      <div className="card-image">
        <FavoriteSaveButtons contentId={item.id} contentType='blogs' title={item.title} userId={user?.uid}/>
        <Link to={link}>
          {item.type === 'blog' ? (
            <img src={item.images} alt={item.title} />
          ) : (
            <div className="video-preview">
              {/* <video muted playsInline>
                <source src={item.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <img src={item.images} alt={item.title} />
              <div className="play-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white" />
                </svg>
              </div>
            </div>
          )}
        </Link>
      </div>
      <div className="card-content">
        <p className="card-category"> {item.categoryName}</p>
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

// Skeleton Components
const FeaturedCardSkeleton = () => (
  <div className="featured-card skeleton">
    <div className="card-overlay">
      <div className="skeleton-line category" style={{ width: '30%' }}></div>
      <div className="skeleton-line title" style={{ width: '80%', height: '2.5rem' }}></div>
      <div className="skeleton-line meta" style={{ width: '60%' }}></div>
      <div className="skeleton-line excerpt" style={{ width: '90%' }}></div>
      <div className="skeleton-line excerpt" style={{ width: '80%' }}></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

const ContentCardSkeleton = () => (
  <div className="content-card skeleton">
    <div className="card-image">
      <div className="skeleton-image"></div>
    </div>
    <div className="card-content">
      <div className="skeleton-line category" style={{ width: '40%' }}></div>
      <div className="skeleton-line title" style={{ width: '90%' }}></div>
      <div className="skeleton-line meta" style={{ width: '70%' }}></div>
    </div>
  </div>
);

export default Blogs;
