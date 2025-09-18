import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { fetchBlogs, getRandomBlogs } from '../api/blogs';
import { companiesApi } from '../api/portfolioApi';
/* eslint-disable */

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Portfolio data from backend
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch blogs data
        const blogsResponse = await fetchBlogs();
        setBlogs(blogsResponse);
        
        // Fetch random blogs for insights section
        const randomResponse = await getRandomBlogs();
        if (randomResponse.success) {
          setRandomBlogs(randomResponse.blogs);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await companiesApi.getAll();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);


  return (
    <div className="home-page">
      <TradingViewWidget/>
      <TopStoriesSection blogs={blogs} isLoading={loading} />
      <MarketInsightsSection randomBlogs={randomBlogs} navigate={navigate} isLoading={loading} />
      <InvestmentToolsSection />
      <CSEMarketIndices/>
      <CSETopGainersLosers />
      <CSEMostActive />
      <GoogleFinanceMarketData />
      <GoogleFinanceMostActive />
      <GoogleFinanceGainersLosers />
      <TradingViewMarketOverview />
      <NewsletterSection />
    </div>
  );
};

const TradingViewWidget = () => {
  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "description": "S&P 500",
          "proName": "SPX"
        },
        {
          "description": "NASDAQ",
          "proName": "NASDAQ:NDX"
        },
        {
          "description": "DOW",
          "proName": "DJI"
        },
        {
          "description": "Bitcoin",
          "proName": "BINANCE:BTCUSDT"
        },
        {
          "description": "Ethereum",
          "proName": "BINANCE:ETHUSDT"
        },
        {
          "description": "Gold",
          "proName": "TVC:GOLD"
        },
        {
          "description": "Apple",
          "proName": "NASDAQ:AAPL"
        },
        {
          "description": "Tesla",
          "proName": "NASDAQ:TSLA"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    
    const tickerContainer = document.getElementById('tradingview-ticker');
    if (tickerContainer) {
      tickerContainer.appendChild(script);
    }

    return () => {
      if (tickerContainer && script.parentNode) {
        tickerContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="tradingview-widget-section">
      <div className="container">
        <div className="widget-header">
          <h2 className="section-title">Live Market Data</h2>
          <p className="widget-subtitle">Real-time market prices and trends</p>
        </div>
        <div className="tradingview-widget-container">
          <div id="tradingview-ticker" className="tradingview-ticker"></div>
        </div>
      </div>
    </section>
  );
};

const CSEMarketIndices = () => {
  useEffect(() => {
    const container = document.getElementById('cse-market-indices');
    if (container) {
      container.innerHTML = `
        <div class="cse-indices">
          <div class="cse-index-item">
            <span class="cse-index-name">ASPI</span>
            <span class="cse-index-full-name">All Share Price Index</span>
            <span class="cse-index-value">12,847.32</span>
            <span class="cse-index-change positive">+45.67 (+0.36%)</span>
          </div>
          <div class="cse-index-item">
            <span class="cse-index-name">S&P SL20</span>
            <span class="cse-index-full-name">S&P Sri Lanka 20</span>
            <span class="cse-index-value">3,421.85</span>
            <span class="cse-index-change positive">+12.34 (+0.36%)</span>
          </div>
          <div class="cse-index-item">
            <span class="cse-index-name">S&P SL5</span>
            <span class="cse-index-full-name">S&P Sri Lanka 5</span>
            <span class="cse-index-value">1,156.78</span>
            <span class="cse-index-change negative">-8.92 (-0.77%)</span>
          </div>
          <div class="cse-index-item">
            <span class="cse-index-name">Market Cap</span>
            <span class="cse-index-full-name">Total Market Capitalization</span>
            <span class="cse-index-value">LKR 3.2T</span>
            <span class="cse-index-change positive">+LKR 45.2B (+1.43%)</span>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="cse-section">
      <div className="widget-header">
        <h2>Colombo Stock Exchange</h2>
        <p className="widget-subtitle">Sri Lankan market performance indicators</p>
      </div>
      <div className="cse-widget-container">
        <div id="cse-market-indices" className="cse-market-indices"></div>
      </div>
    </section>
  );
};

const CSETopGainersLosers = () => {
  useEffect(() => {
    const container = document.getElementById('cse-gainers-losers');
    if (container) {
      container.innerHTML = `
        <div class="cse-gainers-losers-grid">
          <div class="cse-gainers-section">
            <h3>Top Gainers</h3>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">JOHN</span>
              <span class="cse-stock-name">John Keells Holdings</span>
              <span class="cse-stock-price">LKR 185.50</span>
              <span class="cse-stock-change positive">+LKR 8.25 (+4.66%)</span>
            </div>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">COMB</span>
              <span class="cse-stock-name">Commercial Bank</span>
              <span class="cse-stock-price">LKR 95.75</span>
              <span class="cse-stock-change positive">+LKR 3.50 (+3.79%)</span>
            </div>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">HNB</span>
              <span class="cse-stock-name">Hatton National Bank</span>
              <span class="cse-stock-price">LKR 142.00</span>
              <span class="cse-stock-change positive">+LKR 4.75 (+3.46%)</span>
            </div>
          </div>
          <div class="cse-losers-section">
            <h3>Top Losers</h3>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">SAMP</span>
              <span class="cse-stock-name">Sampath Bank</span>
              <span class="cse-stock-price">LKR 78.25</span>
              <span class="cse-stock-change negative">-LKR 4.50 (-5.44%)</span>
            </div>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">NDB</span>
              <span class="cse-stock-name">National Development Bank</span>
              <span class="cse-stock-price">LKR 65.00</span>
              <span class="cse-stock-change negative">-LKR 3.25 (-4.76%)</span>
            </div>
            <div class="cse-stock-item">
              <span class="cse-stock-symbol">DIMO</span>
              <span class="cse-stock-name">Diesel & Motor Engineering</span>
              <span class="cse-stock-price">LKR 1,250.00</span>
              <span class="cse-stock-change negative">-LKR 45.00 (-3.47%)</span>
            </div>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="cse-section">
      <div className="widget-header">
        <h2>CSE Market Movers</h2>
        <p className="widget-subtitle">Top gainers and losers on Colombo Stock Exchange</p>
      </div>
      <div className="cse-widget-container">
        <div id="cse-gainers-losers" className="cse-gainers-losers"></div>
      </div>
    </section>
  );
};

const CSEMostActive = () => {
  useEffect(() => {
    const container = document.getElementById('cse-most-active');
    if (container) {
      container.innerHTML = `
        <div class="cse-most-active-stocks">
          <div class="cse-stock-item">
            <span class="cse-stock-symbol">JOHN</span>
            <span class="cse-stock-name">John Keells Holdings</span>
            <span class="cse-stock-volume">2.5M</span>
            <span class="cse-stock-price">LKR 185.50</span>
            <span class="cse-stock-change positive">+4.66%</span>
          </div>
          <div class="cse-stock-item">
            <span class="cse-stock-symbol">COMB</span>
            <span class="cse-stock-name">Commercial Bank</span>
            <span class="cse-stock-volume">1.8M</span>
            <span class="cse-stock-price">LKR 95.75</span>
            <span class="cse-stock-change positive">+3.79%</span>
          </div>
          <div class="cse-stock-item">
            <span class="cse-stock-symbol">HNB</span>
            <span class="cse-stock-name">Hatton National Bank</span>
            <span class="cse-stock-volume">1.2M</span>
            <span class="cse-stock-price">LKR 142.00</span>
            <span class="cse-stock-change positive">+3.46%</span>
          </div>
          <div class="cse-stock-item">
            <span class="cse-stock-symbol">SAMP</span>
            <span class="cse-stock-name">Sampath Bank</span>
            <span class="cse-stock-volume">950K</span>
            <span class="cse-stock-price">LKR 78.25</span>
            <span class="cse-stock-change negative">-5.44%</span>
          </div>
          <div class="cse-stock-item">
            <span class="cse-stock-symbol">NDB</span>
            <span class="cse-stock-name">National Development Bank</span>
            <span class="cse-stock-volume">750K</span>
            <span class="cse-stock-price">LKR 65.00</span>
            <span class="cse-stock-change negative">-4.76%</span>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="cse-section">
      <div className="widget-header">
        <h2>CSE Most Active</h2>
        <p className="widget-subtitle">Highest volume stocks on Colombo Stock Exchange</p>
      </div>
      <div className="cse-widget-container">
        <div id="cse-most-active" className="cse-most-active"></div>
      </div>
    </section>
  );
};

const GoogleFinanceMarketData = () => {
  useEffect(() => {
    const container = document.getElementById('google-finance-market-data');
    if (container) {
      container.innerHTML = `
        <div class="market-indices">
          <div class="index-item">
            <span class="index-name">S&P 500</span>
            <span class="index-value">6,610.87</span>
            <span class="index-change negative">-4.41 (-0.067%)</span>
          </div>
          <div class="index-item">
            <span class="index-name">Dow Jones</span>
            <span class="index-value">45,748.62</span>
            <span class="index-change negative">-134.83 (-0.29%)</span>
          </div>
          <div class="index-item">
            <span class="index-name">Nasdaq</span>
            <span class="index-value">22,351.62</span>
            <span class="index-change positive">+2.87 (+0.013%)</span>
          </div>
          <div class="index-item">
            <span class="index-name">VIX</span>
            <span class="index-value">16.08</span>
            <span class="index-change positive">+0.39 (+2.49%)</span>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="google-finance-section">
      <div className="widget-header">
        <h2>Market Indices</h2>
        <p className="widget-subtitle">Major market performance indicators</p>
      </div>
      <div className="google-finance-widget-container">
        <div id="google-finance-market-data" className="google-finance-market-data"></div>
      </div>
    </section>
  );
};

const GoogleFinanceMostActive = () => {
  useEffect(() => {
    const container = document.getElementById('google-finance-most-active');
    if (container) {
      container.innerHTML = `
        <div class="most-active-stocks">
          <div class="stock-item">
            <span class="stock-symbol">AAPL</span>
            <span class="stock-name">Apple Inc</span>
            <span class="stock-price">$240.79</span>
            <span class="stock-change positive">+$4.09 (+1.73%)</span>
          </div>
          <div class="stock-item">
            <span class="stock-symbol">AMZN</span>
            <span class="stock-name">Amazon.com Inc</span>
            <span class="stock-price">$235.31</span>
            <span class="stock-change positive">+$3.88 (+1.68%)</span>
          </div>
          <div class="stock-item">
            <span class="stock-symbol">TSLA</span>
            <span class="stock-name">Tesla Inc</span>
            <span class="stock-price">$414.11</span>
            <span class="stock-change positive">+$4.07 (+0.99%)</span>
          </div>
          <div class="stock-item">
            <span class="stock-symbol">MSFT</span>
            <span class="stock-name">Microsoft Corp</span>
            <span class="stock-price">$513.38</span>
            <span class="stock-change positive">+$1.95 (+0.38%)</span>
          </div>
          <div class="stock-item">
            <span class="stock-symbol">GOOGL</span>
            <span class="stock-name">Alphabet Inc</span>
            <span class="stock-price">$185.42</span>
            <span class="stock-change positive">+$0.70 (+0.38%)</span>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="google-finance-section">
      <div className="widget-header">
        <h2>Most Active Stocks</h2>
        <p className="widget-subtitle">Top performing stocks by volume</p>
      </div>
      <div className="google-finance-widget-container">
        <div id="google-finance-most-active" className="google-finance-most-active"></div>
      </div>
    </section>
  );
};

const GoogleFinanceGainersLosers = () => {
  useEffect(() => {
    const container = document.getElementById('google-finance-gainers-losers');
    if (container) {
      container.innerHTML = `
        <div class="gainers-losers-grid">
          <div class="gainers-section">
            <h3>Top Gainers</h3>
            <div class="stock-item">
              <span class="stock-symbol">BABA</span>
              <span class="stock-name">Alibaba Group</span>
              <span class="stock-price">$159.03</span>
              <span class="stock-change positive">+$0.99 (+0.63%)</span>
            </div>
            <div class="stock-item">
              <span class="stock-symbol">UAL</span>
              <span class="stock-name">United Airlines</span>
              <span class="stock-price">$103.30</span>
              <span class="stock-change positive">+$1.22 (+1.20%)</span>
            </div>
            <div class="stock-item">
              <span class="stock-symbol">NXST</span>
              <span class="stock-name">Nexstar Media</span>
              <span class="stock-price">$202.73</span>
              <span class="stock-change positive">+$1.82 (+0.91%)</span>
            </div>
          </div>
          <div class="losers-section">
            <h3>Top Losers</h3>
            <div class="stock-item">
              <span class="stock-symbol">WBD</span>
              <span class="stock-name">Warner Bros Discovery</span>
              <span class="stock-price">$8.45</span>
              <span class="stock-change negative">-$0.70 (-7.63%)</span>
            </div>
            <div class="stock-item">
              <span class="stock-symbol">OPEN</span>
              <span class="stock-name">Opendoor Technologies</span>
              <span class="stock-price">$2.15</span>
              <span class="stock-change negative">-$0.12 (-5.27%)</span>
            </div>
            <div class="stock-item">
              <span class="stock-symbol">NIO</span>
              <span class="stock-name">Nio Inc</span>
              <span class="stock-price">$4.28</span>
              <span class="stock-change positive">+$0.10 (+2.39%)</span>
            </div>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <section className="google-finance-section">
      <div className="widget-header">
        <h2>Market Movers</h2>
        <p className="widget-subtitle">Top gainers and losers today</p>
      </div>
      <div className="google-finance-widget-container">
        <div id="google-finance-gainers-losers" className="google-finance-gainers-losers"></div>
    </div>
  </section>
);
};

const TradingViewMarketOverview = () => {
  useEffect(() => {
    // Load TradingView market overview widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "400",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
      "plotLineColorFalling": "rgba(41, 98, 255, 1)",
      "gridLineColor": "rgba(240, 243, 250, 0)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
      "tabs": [
        {
          "title": "Indices",
          "symbols": [
            {
              "s": "SPX",
              "d": "S&P 500"
            },
            {
              "s": "NASDAQ:NDX",
              "d": "NASDAQ 100"
            },
            {
              "s": "DJI",
              "d": "Dow Jones"
            },
            {
              "s": "TVC:UKX",
              "d": "FTSE 100"
            }
          ],
          "originalTitle": "Indices"
        },
        {
          "title": "Crypto",
          "symbols": [
            {
              "s": "BINANCE:BTCUSDT",
              "d": "Bitcoin"
            },
            {
              "s": "BINANCE:ETHUSDT",
              "d": "Ethereum"
            },
            {
              "s": "BINANCE:ADAUSDT",
              "d": "Cardano"
            },
            {
              "s": "BINANCE:SOLUSDT",
              "d": "Solana"
            }
          ],
          "originalTitle": "Crypto"
        },
        {
          "title": "Commodities",
          "symbols": [
            {
              "s": "TVC:GOLD",
              "d": "Gold"
            },
            {
              "s": "TVC:SILVER",
              "d": "Silver"
            },
            {
              "s": "TVC:CRUDE",
              "d": "Crude Oil"
            },
            {
              "s": "TVC:NATURAL_GAS",
              "d": "Natural Gas"
            }
          ],
          "originalTitle": "Commodities"
        }
      ]
    });
    
    const overviewContainer = document.getElementById('tradingview-market-overview');
    if (overviewContainer) {
      overviewContainer.appendChild(script);
    }

    return () => {
      if (overviewContainer && script.parentNode) {
        overviewContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="tradingview-overview-section">
      <div className="container">
        <div className="widget-header">
          <h2 className="section-title">Market Overview</h2>
          <p className="widget-subtitle">Comprehensive market analysis and trends</p>
        </div>
        <div className="tradingview-overview-container">
          <div id="tradingview-market-overview" className="tradingview-market-overview"></div>
        </div>
      </div>
    </section>
  );
};


const TopStoriesSection = ({ blogs, isLoading }) => {
  const mainStory = blogs && blogs.length > 0 ? blogs[0] : null;
  const sideStories = blogs && blogs.length > 1 ? blogs.slice(1, 4) : [];

  return (
    <section className="top-stories-section container">
      <div className="stories-header">
        <h2 className="section-title">Top Business Stories</h2>
        <p className="section-subtitle">Stay ahead with the latest business insights and market trends</p>
        <Link to="/blogs" className="view-all-btn">View All Stories</Link>
      </div>
      <div className="stories-grid">
        {isLoading ? (
          <div className="stories-loading">Loading stories...</div>
        ) : mainStory ? (
          <>
            <div className="main-story">
              <img src={mainStory.images} alt={mainStory.title} />
              <div className="story-content">
                <span className="story-category">{mainStory.categoryName}</span>
                <h3 className="story-title">{mainStory.title}</h3>
                <p className="story-excerpt">{mainStory.excerpt || 'Read more about this market insight...'}</p>
                <span className="story-time">
                  {new Date(mainStory.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="side-stories">
              {sideStories.map((story) => (
                <div key={story.id} className="story-item">
                  <img src={story.images} alt={story.title} />
                  <div className="story-content">
                    <span className="story-category">{story.categoryName}</span>
                    <h4 className="story-title">{story.title}</h4>
                    <span className="story-time">
                      {new Date(story.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="stories-no-data">No stories available</div>
        )}
      </div>
    </section>
  );
};



const LatestSection = () => (
  <section className="latest-section container">
    <h2 className="section-title">Latest</h2>
    <div className="latest-grid">
      <div className="main-article">
        <img
          src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?w=800&h=600&fit=crop"
          alt="Article"
        />
        <div className="article-content">
          <p className="article-category">Beauty</p>
          <h3 className="article-title">The cult British beauty brand you need to know about</h3>
          <p className="article-meta">By Luxury London | 12th July 2024</p>
        </div>
      </div>
      <div className="side-articles">
        <SideArticle
          imgSrc="https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=400&h=300&fit=crop"
          category="Travel"
          title="How to spend a weekend in Chicago, America's most exciting city"
        />
        <SideArticle
          imgSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop"
          category="Interiors"
          title="The best luxury homeware brands to have on your radar"
        />
      </div>
    </div>
  </section>
);

const SideArticle = ({ imgSrc, category, title, navigate, id }) => (
  <div className="side-article">
    <img src={imgSrc} alt={title} onClick={() => { navigate(`/blogs/${id}`) }} />
    <div className="article-content">
      <p className="article-category">{category}</p>
      <h3 className="article-title">{title}</h3>
    </div>
  </div>
);


const InvestmentToolsSection = () => (
  <section className="investment-tools-section container">
    <h2 className="section-title">Investment Tools</h2>
    <div className="tools-grid">
      <div className="tool-card">
        <h3>Portfolio Analyzer</h3>
        <p>Analyze your portfolio performance and risk metrics</p>
        <Link to="/portfolio" className="tool-link">View Analysis</Link>
      </div>
      <div className="tool-card">
        <h3>Market Scanner</h3>
        <p>Discover new investment opportunities</p>
        <Link to="/blogs" className="tool-link">Scan Markets</Link>
      </div>
      <div className="tool-card">
        <h3>Risk Calculator</h3>
        <p>Calculate portfolio risk and diversification</p>
        <Link to="/portfolio" className="tool-link">Calculate Risk</Link>
      </div>
    </div>
  </section>
);


const NewsletterSection = () => (
  <section className="newsletter-section">
    <div className="newsletter-container">
      <h2 className="section-title">Investment Newsletter</h2>
      <p className="newsletter-description">
        Get weekly market insights, portfolio tips, and investment opportunities — straight to your inbox.
      </p>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
      <small className="newsletter-note">
        We respect your privacy. Unsubscribe anytime.
      </small>
    </div>
  </section>
);


const MarketInsightsSection = ({ randomBlogs, navigate, isLoading }) => (
  <section id="market-insights-section" className="market-insights-section container">
    <div className="market-insights-header">
      <h2 id="market-insights-title" className="section-title">
        Market Insights
      </h2>
      <p id="market-insights-description" className="section-subtitle">
        Stay informed with the latest market analysis and investment opportunities
      </p>
    </div>

    <div id="market-insights-grid" className="market-insights-grid">
      {isLoading ? (
        <>
          <InsightCardSkeleton />
          <InsightCardSkeleton />
          <InsightCardSkeleton />
        </>
      ) : (
        randomBlogs.map((blog) => (
          <InsightCard
            key={blog.id}
            imgSrc={blog.images}
            title={blog.title}
            category={blog.categoryName}
            id={blog.id}
            navigate={navigate}
          />
        ))
      )}
    </div>
  </section>
);


const InsightCard = ({ imgSrc, category, title, id, navigate }) => (
  <div className="insight-card">
    <img src={imgSrc} alt={title} onClick={() => { navigate(`/blogs/${id}`) }} />
    <p className="article-category">{category}</p>
    <h3 className="article-title">{title}</h3>
  </div>
);

const InsightCardSkeleton = () => (
  <div className="insight-card skeleton">
    <div className="skeleton-image" />
    <div className="skeleton-text category" />
    <div className="skeleton-text title" />
  </div>
);

const FullWidthFeature = () => (
  <section
    className="hero-section"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1540202404-1b927b587954?w=1600&h=700&fit=crop')`,
    }}
  >
    <div className="hero-content">
      <p className="hero-supertitle">Style</p>
      <h1 className="hero-title">The best adults-only hotels in the Maldives</h1>
      <Link to="/read" className="hero-link">
        Read More
      </Link>
    </div>
  </section>
);

const ShoppingEditSection = () => (
  <section className="shopping-section container">
    <h2 className="section-title">The Shopping Edit</h2>
    <p>Your guide to the best new-season buys</p>
    <div className="shopping-grid">
      <ProductCard
        imgSrc="https://images.unsplash.com/photo-1593030103057-04b3a469145a?w=400&h=500&fit=crop"
        name="Polo Ralph Lauren"
        price="£125"
      />
      <ProductCard
        imgSrc="https://images.unsplash.com/photo-1579722827299-34e8a491561d?w=400&h=500&fit=crop"
        name="Gucci"
        price="£450"
      />
      <ProductCard
        imgSrc="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop"
        name="Prada"
        price="£650"
      />
    </div>
  </section>
);

const ProductCard = ({ imgSrc, name, price }) => (
  <div className="product-card">
    <img src={imgSrc} alt={name} />
    <h3 className="product-name">{name}</h3>
    <p className="product-price">{price}</p>
    <button className="shop-now-btn">Shop Now</button>
  </div>
);

const InspiringReadsSection = () => (
  <section className="reads-section container">
    <h2 className="section-title" id='latest-title' >Inspiring Reads</h2>
    <div className="reads-grid">
      <ReadCard
        imgSrc="https://images.unsplash.com/photo-1506792006435-0a62a6c46975?w=500&h=600&fit=crop"
        title="In Conversation With..."
      />
      <ReadCard
        imgSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop"
        title="Beauty on the Go"
      />
      <ReadCard
        imgSrc="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop"
        title="Summer Style"
      />
      <ReadCard
        imgSrc="https://images.unsplash.com/photo-1516797254885-33779d3563d4?w=500&h=600&fit=crop"
        title="Escape to the Country"
      />
    </div>
  </section>
);

const ReadCard = ({ imgSrc, title }) => (
  <div className="read-card" style={{ backgroundImage: `url(${imgSrc})` }}>
    <h3 className="read-title">{title}</h3>
  </div>
);

const StyleSection = ({ randomBlogs, navigate, isLoading }) => {
  // Separate first blog and the rest
  const [mainBlog, ...sideBlogs] = randomBlogs || [];

  return (
    <section className="style-section container" id='style-section-container'>
      <div className="section-header" id='style-section-header'>
        <h2 className="section-title">Style</h2>
        <Link to="/blogs" className="view-all-link">
          View All
        </Link>
      </div>
      <div className="style-grid">
        <div className="style-main-article">
          {mainBlog ? (
            <>
              <img src={mainBlog.images} alt={mainBlog.title} />
              <p className="article-category">{mainBlog.categoryName}</p>
              <h3 className="article-title">{mainBlog.title}</h3>
              <p className="article-meta">
                By {mainBlog.author || "Ceylon Luxury Living"} |{" "}
                {mainBlog.date || "11th July 2024"}
              </p>
            </>
          ) : (
            <PresentCardSkeleton />
          )}
        </div>

        <div className="style-side-articles">
          {isLoading ? (
            <>
              <PresentCardSkeleton />
              <PresentCardSkeleton />
              <PresentCardSkeleton />
            </>
          ) : (
            sideBlogs.map((blog) => (
              <SideArticle
                key={blog.id}
                imgSrc={blog.images}
                category={blog.categoryName}
                title={blog.title}
                id={blog.id}
                navigate={navigate}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};


export default Home;
