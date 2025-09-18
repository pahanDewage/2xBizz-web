import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAll, getSearchSuggestions } from '../api/search';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState({ blogs: [], companies: [], total: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const searchResults = await searchAll(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults({ blogs: [], companies: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const getFilteredResults = () => {
    switch (activeFilter) {
      case 'blogs':
        return { blogs: results.blogs, companies: [], total: results.blogs.length };
      case 'companies':
        return { blogs: [], companies: results.companies, total: results.companies.length };
      default:
        return results;
    }
  };

  const filteredResults = getFilteredResults();

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1>Search Results</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for insights, companies, market data..."
                className="search-input-main"
              />
              <button type="submit" className="search-button">
                🔍 Search
              </button>
            </div>
          </form>
          
          {query && (
            <div className="search-info">
              <p>
                {loading ? 'Searching...' : `Found ${filteredResults.total} results for "${query}"`}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="search-content">
        <div className="container">
          {query && (
            <div className="search-filters">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All ({results.total})
              </button>
              <button
                className={`filter-btn ${activeFilter === 'blogs' ? 'active' : ''}`}
                onClick={() => setActiveFilter('blogs')}
              >
                Insights ({results.blogs.length})
              </button>
              <button
                className={`filter-btn ${activeFilter === 'companies' ? 'active' : ''}`}
                onClick={() => setActiveFilter('companies')}
              >
                Companies ({results.companies.length})
              </button>
            </div>
          )}

          {loading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching for results...</p>
            </div>
          ) : (
            <div className="search-results">
              {query && filteredResults.total === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or browse our categories:</p>
                  <div className="suggestion-links">
                    <Link to="/blogs" className="suggestion-link">Market Insights</Link>
                    <Link to="/portfolio" className="suggestion-link">Portfolio Analysis</Link>
                    <Link to="/tradingview" className="suggestion-link">Trading Charts</Link>
                  </div>
                </div>
              ) : (
                <>
                  {(activeFilter === 'all' || activeFilter === 'blogs') && filteredResults.blogs.length > 0 && (
                    <div className="results-section">
                      <h2>Market Insights</h2>
                      <div className="results-grid">
                        {filteredResults.blogs.map((blog) => (
                          <div key={blog.id} className="result-card">
                            <Link to={`/blogs/${blog.id}`}>
                              <div className="result-image">
                                <img src={blog.images || '/placeholder.jpg'} alt={blog.title} />
                              </div>
                              <div className="result-content">
                                <span className="result-category">{blog.categoryName || 'Business'}</span>
                                <h3 className="result-title">{blog.title}</h3>
                                <p className="result-excerpt">{blog.excerpt || blog.description}</p>
                                <div className="result-meta">
                                  <span className="result-date">
                                    {new Date(blog.date).toLocaleDateString()}
                                  </span>
                                  <span className="result-type">Article</span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeFilter === 'all' || activeFilter === 'companies') && filteredResults.companies.length > 0 && (
                    <div className="results-section">
                      <h2>Investment Opportunities</h2>
                      <div className="results-grid">
                        {filteredResults.companies.map((company) => (
                          <div key={company.id} className="result-card">
                            <Link to={`/portfolio/companies/${company.id}`}>
                              <div className="result-content">
                                <span className="result-category">Investment</span>
                                <h3 className="result-title">{company.name}</h3>
                                <p className="result-excerpt">{company.description}</p>
                                <div className="result-meta">
                                  <span className="result-metric">
                                    Expected Return: {company.expectedGrowth}%
                                  </span>
                                  <span className="result-type">Company</span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {!query && (
            <div className="search-suggestions">
              <h2>Popular Searches</h2>
              <div className="suggestions-grid">
                <div className="suggestion-item" onClick={() => handleSuggestionClick('market analysis')}>
                  <span className="suggestion-icon">📊</span>
                  <span>Market Analysis</span>
                </div>
                <div className="suggestion-item" onClick={() => handleSuggestionClick('investment strategy')}>
                  <span className="suggestion-icon">💼</span>
                  <span>Investment Strategy</span>
                </div>
                <div className="suggestion-item" onClick={() => handleSuggestionClick('business growth')}>
                  <span className="suggestion-icon">📈</span>
                  <span>Business Growth</span>
                </div>
                <div className="suggestion-item" onClick={() => handleSuggestionClick('financial planning')}>
                  <span className="suggestion-icon">💰</span>
                  <span>Financial Planning</span>
                </div>
                <div className="suggestion-item" onClick={() => handleSuggestionClick('portfolio management')}>
                  <span className="suggestion-icon">📋</span>
                  <span>Portfolio Management</span>
                </div>
                <div className="suggestion-item" onClick={() => handleSuggestionClick('stock performance')}>
                  <span className="suggestion-icon">📉</span>
                  <span>Stock Performance</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
