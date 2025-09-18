import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import FavoriteSaveButtons from '../Components/Common/FavoriteSaveButtons';
import './BlogDetail.css';
import { fetchBlogById } from '../api/blogs';

const BlogDetail = () => {
  /* eslint-disable */
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {

    // window.scrollTo(0, 0);

    // Optional: Smooth scroll alternative
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogById(id);
        setBlog(response);
      } catch (error) {
        console.error("Error in fetch blog details", error);
        setError(error.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    getBlogDetails();
  }, [id]);

  // Convert the API response to HTML content
  const formatBlogContent = (blogData) => {
    if (!blogData) return '';

    let html = '';

    // Add main description
    if (blogData.description && blogData.description.length > 0) {
      blogData.description.forEach(paragraph => {
        html += `<p>${paragraph}</p>`;
      });
    }

    // Add variations with subtitles
    if (blogData.variations && blogData.variations.length > 0) {
      blogData.variations.forEach(variation => {
        if (variation.subtitle) {
          html += `<h2>${variation.subtitle}</h2>`;
        }
        if (variation.description && variation.description.length > 0) {
          variation.description.forEach(paragraph => {
            html += `<p>${paragraph}</p>`;
          });
        }
      });
    }

    return html;
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <BlogDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Error Loading Blog</h1>
            <p>{error}</p>
            <Link to="/blogs" className="back-btn">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Blog Not Found</h1>
            <p>The blog you're looking for doesn't exist.</p>
            <Link to="/blogs" className="back-btn">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <div className="blog-header">
          <div className="blog-meta">
            <span className="blog-category">/ {blog.categoryName}</span>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-info">
              <span className="blog-author">By {blog.author}</span>
              <span className="blog-date">
                {blog.date || new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="blog-actions">
            <FavoriteSaveButtons contentId={blog.id} contentType={blog.type} title={blog.title} />
          </div>
        </div>

        {blog.images && blog.images.length > 0 && (
          <div className="blog-image">
            <img src={blog.images[0]} alt={blog.title} />
          </div>
        )}

        <div className="blog-content" ref={contentRef}>
          <div dangerouslySetInnerHTML={{ __html: formatBlogContent(blog) }} />
        </div>

        <div className="blog-footer">
          <Link to="/blogs" className="back-btn">
            ← Back to All Blogs
          </Link>
          <div className="share-buttons">
            <span>Share this article:</span>
            <button
              className="share-btn"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  // Fallback for browsers that don't support Web Share API
                  const shareUrl = `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`${blog.excerpt}\n\nRead more: ${window.location.href}`)}`;
                  window.location.href = shareUrl;
                }
              }}
            >
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loading Component
const BlogDetailSkeleton = () => {
  return (
    <>
      <div className="blog-header skeleton">
        <div className="blog-meta">
          <div className="skeleton-line category" style={{ width: '30%', height: '1.5rem' }}></div>
          <div className="skeleton-line title" style={{ width: '80%', height: '3rem', margin: '1rem 0' }}></div>
          <div className="blog-info">
            <div className="skeleton-line" style={{ width: '40%', height: '1.2rem' }}></div>
            <div className="skeleton-line" style={{ width: '30%', height: '1.2rem', marginLeft: '1rem' }}></div>
          </div>
        </div>
      </div>

      <div className="blog-image skeleton">
        <div className="skeleton-image" style={{ height: '400px', width: '100%' }}></div>
      </div>

      <div className="blog-content skeleton">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-line" style={{
            width: i % 3 === 0 ? '90%' : i % 3 === 1 ? '95%' : '85%',
            height: '1.2rem',
            marginBottom: '1rem'
          }}></div>
        ))}
        <div className="skeleton-line" style={{
          width: '50%',
          height: '2rem',
          margin: '2rem 0 1rem'
        }}></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-line" style={{
            width: i % 2 === 0 ? '85%' : '90%',
            height: '1.2rem',
            marginBottom: '1rem'
          }}></div>
        ))}
      </div>

      <div className="blog-footer skeleton">
        <div className="skeleton-line" style={{ width: '150px', height: '2.5rem' }}></div>
        <div className="share-buttons">
          <div className="skeleton-line" style={{ width: '100px', height: '1.2rem' }}></div>
          <div className="skeleton-line" style={{ width: '80px', height: '2.5rem', marginLeft: '1rem' }}></div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;