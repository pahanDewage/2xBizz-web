import React, { useEffect } from 'react';
import './CSE.css';

const CSE = () => {
  useEffect(() => {
    // Load CSE market data
    const container = document.getElementById('cse-detailed');
    if (container) {
      container.innerHTML = `
        <div class="cse-market-overview">
          <div class="cse-indices-detailed">
            <h3>CSE Market Indices</h3>
            <div class="cse-indices-grid">
              <div class="cse-index-detailed">
                <span class="cse-index-name">ASPI</span>
                <span class="cse-index-full">All Share Price Index</span>
                <span class="cse-index-value">12,847.32</span>
                <span class="cse-index-change positive">+45.67 (+0.36%)</span>
                <span class="cse-index-time">4:30 PM IST</span>
              </div>
              <div class="cse-index-detailed">
                <span class="cse-index-name">S&P SL20</span>
                <span class="cse-index-full">S&P Sri Lanka 20</span>
                <span class="cse-index-value">3,421.85</span>
                <span class="cse-index-change positive">+12.34 (+0.36%)</span>
                <span class="cse-index-time">4:30 PM IST</span>
              </div>
              <div class="cse-index-detailed">
                <span class="cse-index-name">S&P SL5</span>
                <span class="cse-index-full">S&P Sri Lanka 5</span>
                <span class="cse-index-value">1,156.78</span>
                <span class="cse-index-change negative">-8.92 (-0.77%)</span>
                <span class="cse-index-time">4:30 PM IST</span>
              </div>
            </div>
          </div>

          <div class="cse-market-stats">
            <h3>Market Statistics</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">Total Market Cap</span>
                <span class="stat-value">LKR 3.2T</span>
                <span class="stat-change positive">+LKR 45.2B (+1.43%)</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Volume</span>
                <span class="stat-value">LKR 2.8B</span>
                <span class="stat-change positive">+LKR 125M (+4.67%)</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Trades</span>
                <span class="stat-value">15,847</span>
                <span class="stat-change positive">+1,234 (+8.45%)</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Advancing Stocks</span>
                <span class="stat-value">89</span>
                <span class="stat-change positive">+12 (+15.58%)</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Declining Stocks</span>
                <span class="stat-value">67</span>
                <span class="stat-change negative">-8 (-10.67%)</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Unchanged Stocks</span>
                <span class="stat-value">23</span>
                <span class="stat-change neutral">+2 (+9.52%)</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div className="cse-page">
      <div className="page-header">
        <h1>Colombo Stock Exchange</h1>
        <p>Comprehensive Sri Lankan market data and analysis</p>
      </div>

      <div className="cse-content">
        <div className="cse-summary-section">
          <h2>Market Summary</h2>
          <div className="cse-summary-cards">
            <div className="cse-summary-card">
              <h3>Market Status</h3>
              <p className="cse-market-status open">Market Open</p>
              <p className="cse-market-time">4:30 PM IST</p>
            </div>
            <div className="cse-summary-card">
              <h3>ASPI Performance</h3>
              <p className="cse-aspi-value">12,847.32</p>
              <p className="cse-aspi-change positive">+45.67 (+0.36%)</p>
            </div>
            <div className="cse-summary-card">
              <h3>Market Sentiment</h3>
              <p className="cse-sentiment positive">Bullish</p>
              <p className="cse-sentiment-desc">89 advancing vs 67 declining</p>
            </div>
          </div>
        </div>

        <div className="cse-detailed-section">
          <h2>Detailed Market Data</h2>
          <div id="cse-detailed" className="cse-detailed"></div>
        </div>

        <div className="cse-sectors-section">
          <h2>Sector Performance</h2>
          <div className="cse-sectors-grid">
            <div className="cse-sector-card">
              <h3>Banking & Finance</h3>
              <div className="cse-sector-stocks">
                <div className="cse-sector-stock">
                  <span>Commercial Bank</span>
                  <span className="positive">+3.79%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Hatton National Bank</span>
                  <span className="positive">+3.46%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Sampath Bank</span>
                  <span className="negative">-5.44%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>National Development Bank</span>
                  <span className="negative">-4.76%</span>
                </div>
              </div>
            </div>

            <div className="cse-sector-card">
              <h3>Conglomerates</h3>
              <div className="cse-sector-stocks">
                <div className="cse-sector-stock">
                  <span>John Keells Holdings</span>
                  <span className="positive">+4.66%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Hayleys PLC</span>
                  <span className="positive">+2.15%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Melstacorp PLC</span>
                  <span className="positive">+1.89%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>LOLC Holdings</span>
                  <span className="negative">-1.23%</span>
                </div>
              </div>
            </div>

            <div className="cse-sector-card">
              <h3>Manufacturing</h3>
              <div className="cse-sector-stocks">
                <div className="cse-sector-stock">
                  <span>Diesel & Motor Engineering</span>
                  <span className="negative">-3.47%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Royal Ceramics Lanka</span>
                  <span className="positive">+2.34%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Tokyo Cement Company</span>
                  <span className="positive">+1.67%</span>
                </div>
                <div className="cse-sector-stock">
                  <span>Lanka Walltiles</span>
                  <span className="negative">-0.89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cse-top-stocks-section">
          <h2>Top Performing Stocks</h2>
          <div className="cse-top-stocks-grid">
            <div className="cse-top-gainers">
              <h3>Top Gainers</h3>
              <div className="cse-gainers-list">
                <div className="cse-gainer-item">
                  <span className="cse-gainer-symbol">JOHN</span>
                  <span className="cse-gainer-name">John Keells Holdings</span>
                  <span className="cse-gainer-price">LKR 185.50</span>
                  <span className="cse-gainer-change positive">+LKR 8.25 (+4.66%)</span>
                </div>
                <div className="cse-gainer-item">
                  <span className="cse-gainer-symbol">COMB</span>
                  <span className="cse-gainer-name">Commercial Bank</span>
                  <span className="cse-gainer-price">LKR 95.75</span>
                  <span className="cse-gainer-change positive">+LKR 3.50 (+3.79%)</span>
                </div>
                <div className="cse-gainer-item">
                  <span className="cse-gainer-symbol">HNB</span>
                  <span className="cse-gainer-name">Hatton National Bank</span>
                  <span className="cse-gainer-price">LKR 142.00</span>
                  <span className="cse-gainer-change positive">+LKR 4.75 (+3.46%)</span>
                </div>
                <div className="cse-gainer-item">
                  <span className="cse-gainer-symbol">HAYL</span>
                  <span className="cse-gainer-name">Hayleys PLC</span>
                  <span className="cse-gainer-price">LKR 78.25</span>
                  <span className="cse-gainer-change positive">+LKR 1.65 (+2.15%)</span>
                </div>
              </div>
            </div>

            <div className="cse-top-losers">
              <h3>Top Losers</h3>
              <div className="cse-losers-list">
                <div className="cse-loser-item">
                  <span className="cse-loser-symbol">SAMP</span>
                  <span className="cse-loser-name">Sampath Bank</span>
                  <span className="cse-loser-price">LKR 78.25</span>
                  <span className="cse-loser-change negative">-LKR 4.50 (-5.44%)</span>
                </div>
                <div className="cse-loser-item">
                  <span className="cse-loser-symbol">NDB</span>
                  <span className="cse-loser-name">National Development Bank</span>
                  <span className="cse-loser-price">LKR 65.00</span>
                  <span className="cse-loser-change negative">-LKR 3.25 (-4.76%)</span>
                </div>
                <div className="cse-loser-item">
                  <span className="cse-loser-symbol">DIMO</span>
                  <span className="cse-loser-name">Diesel & Motor Engineering</span>
                  <span className="cse-loser-price">LKR 1,250.00</span>
                  <span className="cse-loser-change negative">-LKR 45.00 (-3.47%)</span>
                </div>
                <div className="cse-loser-item">
                  <span className="cse-loser-symbol">LOLC</span>
                  <span className="cse-loser-name">LOLC Holdings</span>
                  <span className="cse-loser-price">LKR 425.50</span>
                  <span className="cse-loser-change negative">-LKR 5.25 (-1.23%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cse-news-section">
          <h2>CSE Market News</h2>
          <div className="cse-news-grid">
            <div className="cse-news-card featured">
              <div className="cse-news-category">Market Analysis</div>
              <h3>CSE shows strong performance with ASPI gaining 0.36%</h3>
              <p>Daily News • 1 hour ago</p>
            </div>
            <div className="cse-news-card">
              <div className="cse-news-category">Banking</div>
              <h3>Commercial Bank reports strong Q3 earnings</h3>
              <p>Sunday Times • 3 hours ago</p>
            </div>
            <div className="cse-news-card">
              <div className="cse-news-category">Conglomerates</div>
              <h3>John Keells Holdings announces new expansion plans</h3>
              <p>Business Today • 5 hours ago</p>
            </div>
            <div className="cse-news-card">
              <div className="cse-news-category">Economy</div>
              <h3>Central Bank maintains policy rates</h3>
              <p>Financial Times • 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSE;
