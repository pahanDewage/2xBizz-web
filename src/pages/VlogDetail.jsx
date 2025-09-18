import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import FavoriteSaveButtons from '../Components/Common/FavoriteSaveButtons';
import './VlogDetail.css';
import { fetchBlogById } from '../api/blogs';

const VlogDetail = () => {
  /* eslint-disable */
  const { id } = useParams();
  const [vlog, setVlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  useEffect(() => {
    const getVlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogById(id);
        console.log("Vlog response:", response);
        setVlog(response);
      } catch (error) {
        console.error("Error fetching vlog details:", error);
        setError(error.message || 'Failed to load vlog');
      } finally {
        setLoading(false);
      }
    };
    getVlogDetails();
  }, [id]);

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    if (url.includes('embed')) return url;
    
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }

    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  //? Format vlog content from API response
  const formatVlogContent = (vlogData) => {
    if (!vlogData) return '';
    
    let html = '';
    

    if (vlogData.description && vlogData.description.length > 0) {
      vlogData.description.forEach(paragraph => {
        html += `<p>${paragraph}</p>`;
      });
    }
    
    //? Add variations with subtitles
    if (vlogData.variations && vlogData.variations.length > 0) {
      vlogData.variations.forEach(variation => {
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
      <div className="vlog-detail-page">
        <div className="container">
          <VlogDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vlog-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Error Loading Vlog</h1>
            <p>{error}</p>
            <Link to="/vlogs" className="back-btn">
              ← Back to Vlogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!vlog) {
    return (
      <div className="vlog-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Vlog Not Found</h1>
            <p>The vlog you're looking for doesn't exist.</p>
            <Link to="/vlogs" className="back-btn">
              ← Back to Vlogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vlog-detail-page">
      <div className="container">
        <div className="vlog-header">
          <div className="vlog-meta">
            <span className="vlog-category">/ {vlog.categoryName}</span>
            <h1 className="vlog-title">{vlog.title}</h1>
            <div className="vlog-info">
              <span className="vlog-author">By {vlog.author}</span>
              <span className="vlog-date">
                {vlog.date || new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="vlog-actions">
            <FavoriteSaveButtons contentId={vlog.id} contentType={vlog.type} title={vlog.title} />
          </div>
        </div>

        <div className="vlog-video" ref={videoRef}>
          <div className="video-container">
            <iframe
              src={getEmbedUrl(vlog.videoURL)}
              title={vlog.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="vlog-content">
          <div dangerouslySetInnerHTML={{ __html: formatVlogContent(vlog) }} />
        </div>

        <div className="vlog-footer">
          <Link to="/blogs" className="back-btn">
            ← Back to All Vlogs
          </Link>
          <div className="share-buttons">
            <span>Share this vlog:</span>
            <button
              className="share-btn"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: vlog.title,
                    text: vlog.description?.[0] || '',
                    url: window.location.href
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  // Fallback for browsers without Web Share API
                  const shareUrl = `mailto:?subject=${encodeURIComponent(vlog.title)}&body=${encodeURIComponent(`${vlog.description?.[0] || ''}\n\nWatch here: ${window.location.href}`)}`;
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

// Skeleton Loading Component for Vlogs
const VlogDetailSkeleton = () => {
  return (
    <>
      <div className="vlog-header skeleton">
        <div className="vlog-meta">
          <div className="skeleton-line category" style={{ width: '30%', height: '1.5rem' }}></div>
          <div className="skeleton-line title" style={{ width: '80%', height: '3rem', margin: '1rem 0' }}></div>
          <div className="vlog-info">
            <div className="skeleton-line" style={{ width: '40%', height: '1.2rem' }}></div>
            <div className="skeleton-line" style={{ width: '30%', height: '1.2rem', marginLeft: '1rem' }}></div>
          </div>
        </div>
      </div>

      <div className="vlog-video skeleton">
        <div className="skeleton-video" style={{ height: '500px', width: '100%' }}></div>
      </div>

      <div className="vlog-content skeleton">
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

      <div className="vlog-footer skeleton">
        <div className="skeleton-line" style={{ width: '150px', height: '2.5rem' }}></div>
        <div className="share-buttons">
          <div className="skeleton-line" style={{ width: '100px', height: '1.2rem' }}></div>
          <div className="skeleton-line" style={{ width: '80px', height: '2.5rem', marginLeft: '1rem' }}></div>
        </div>
      </div>
    </>
  );
};

export default VlogDetail;