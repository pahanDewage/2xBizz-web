import React, { useEffect } from 'react';
import './GoogleFinance.css';

const GoogleFinance = () => {
  useEffect(() => {
    // Load Google Finance market data
    const container = document.getElementById('google-finance-detailed');
    if (container) {
      container.innerHTML = `
        <div class="market-data-grid">
          <div class="market-indices-detailed">
            <h3>Major Indices</h3>
            <div class="indices-detailed">
              <div class="index-detailed">
                <span class="index-name">S&P 500</span>
                <span class="index-value">6,610.87</span>
                <span class="index-change negative">-4.41 (-0.067%)</span>
                <span class="index-time">4:00 PM EST</span>
              </div>
              <div class="index-detailed">
                <span class="index-name">Dow Jones</span>
                <span class="index-value">45,748.62</span>
                <span class="index-change negative">-134.83 (-0.29%)</span>
                <span class="index-time">4:00 PM EST</span>
              </div>
              <div class="index-detailed">
                <span class="index-name">Nasdaq</span>
                <span class="index-value">22,351.62</span>
                <span class="index-change positive">+2.87 (+0.013%)</span>
                <span class="index-time">4:00 PM EST</span>
              </div>
              <div class="index-detailed">
                <span class="index-name">Russell 2000</span>
                <span class="index-value">2,393.72</span>
                <span class="index-change negative">-11.41 (-0.47%)</span>
                <span class="index-time">4:00 PM EST</span>
              </div>
            </div>
          </div>

          <div class="top-stocks-detailed">
            <h3>Most Followed Stocks</h3>
            <div class="stocks-detailed">
              <div class="stock-detailed">
                <span class="stock-symbol">AAPL</span>
                <span class="stock-name">Apple Inc</span>
                <span class="stock-price">$240.79</span>
                <span class="stock-change positive">+$4.09 (+1.73%)</span>
                <span class="stock-followers">3.71M following</span>
              </div>
              <div class="stock-detailed">
                <span class="stock-symbol">GOOGL</span>
                <span class="stock-name">Alphabet Inc</span>
                <span class="stock-price">$185.42</span>
                <span class="stock-change positive">+$0.70 (+0.38%)</span>
                <span class="stock-followers">2.16M following</span>
              </div>
              <div class="stock-detailed">
                <span class="stock-symbol">MSFT</span>
                <span class="stock-name">Microsoft Corp</span>
                <span class="stock-price">$513.38</span>
                <span class="stock-change positive">+$1.95 (+0.38%)</span>
                <span class="stock-followers">1.84M following</span>
              </div>
              <div class="stock-detailed">
                <span class="stock-symbol">AMZN</span>
                <span class="stock-name">Amazon.com Inc</span>
                <span class="stock-price">$235.31</span>
                <span class="stock-change positive">+$3.88 (+1.68%)</span>
                <span class="stock-followers">1.74M following</span>
              </div>
              <div class="stock-detailed">
                <span class="stock-symbol">TSLA</span>
                <span class="stock-name">Tesla Inc</span>
                <span class="stock-price">$414.11</span>
                <span class="stock-change positive">+$4.07 (+0.99%)</span>
                <span class="stock-followers">1.49M following</span>
              </div>
            </div>
          </div>

          <div class="market-trends-detailed">
            <h3>Market Trends</h3>
            <div class="trends-detailed">
              <div class="trend-item">
                <span class="trend-category">Technology</span>
                <span class="trend-performance positive">+1.2%</span>
                <span class="trend-volume">High Volume</span>
              </div>
              <div class="trend-item">
                <span class="trend-category">Healthcare</span>
                <span class="trend-performance positive">+0.8%</span>
                <span class="trend-volume">Medium Volume</span>
              </div>
              <div class="trend-item">
                <span class="trend-category">Financial</span>
                <span class="trend-performance negative">-0.5%</span>
                <span class="trend-volume">Low Volume</span>
              </div>
              <div class="trend-item">
                <span class="trend-category">Energy</span>
                <span class="trend-performance negative">-1.1%</span>
                <span class="trend-volume">Medium Volume</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div className="google-finance-page">
      <div className="page-header">
        <h1>Google Finance Market Data</h1>
        <p>Comprehensive market analysis and real-time financial data</p>
      </div>

      <div className="google-finance-content">
        <div className="market-summary-section">
          <h2>Market Summary</h2>
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Market Status</h3>
              <p className="market-status open">Market Open</p>
              <p className="market-time">4:00 PM EST</p>
            </div>
            <div className="summary-card">
              <h3>Total Market Cap</h3>
              <p className="market-cap">$45.2T</p>
              <p className="market-change positive">+$1.2T (+2.7%)</p>
            </div>
            <div className="summary-card">
              <h3>VIX (Fear Index)</h3>
              <p className="vix-value">16.08</p>
              <p className="vix-change positive">+0.39 (+2.49%)</p>
            </div>
          </div>
        </div>

        <div className="detailed-data-section">
          <h2>Detailed Market Data</h2>
          <div id="google-finance-detailed" className="google-finance-detailed"></div>
        </div>

        <div className="sector-performance-section">
          <h2>Sector Performance</h2>
          <div className="sector-grid">
            <div className="sector-card">
              <h3>Technology</h3>
              <div className="sector-stocks">
                <div className="sector-stock">
                  <span>Apple Inc</span>
                  <span className="positive">+1.73%</span>
                </div>
                <div className="sector-stock">
                  <span>Microsoft Corp</span>
                  <span className="positive">+0.38%</span>
                </div>
                <div className="sector-stock">
                  <span>Alphabet Inc</span>
                  <span className="positive">+0.38%</span>
                </div>
              </div>
            </div>

            <div className="sector-card">
              <h3>Healthcare</h3>
              <div className="sector-stocks">
                <div className="sector-stock">
                  <span>Johnson & Johnson</span>
                  <span className="positive">+0.45%</span>
                </div>
                <div className="sector-stock">
                  <span>Pfizer Inc</span>
                  <span className="negative">-0.48%</span>
                </div>
                <div className="sector-stock">
                  <span>UnitedHealth Group</span>
                  <span className="positive">+0.32%</span>
                </div>
              </div>
            </div>

            <div className="sector-card">
              <h3>Financial</h3>
              <div className="sector-stocks">
                <div className="sector-stock">
                  <span>JPMorgan Chase</span>
                  <span className="negative">-0.25%</span>
                </div>
                <div className="sector-stock">
                  <span>Bank of America</span>
                  <span className="negative">-0.18%</span>
                </div>
                <div className="sector-stock">
                  <span>Wells Fargo</span>
                  <span className="positive">+0.12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="news-section">
          <h2>Market News</h2>
          <div className="news-grid">
            <div className="news-card featured">
              <div className="news-category">Market Analysis</div>
              <h3>Market track record is flawless when the Fed cuts rates with S&P 500 near record high</h3>
              <p>CNBC • 52 minutes ago</p>
            </div>
            <div className="news-card">
              <div className="news-category">Earnings</div>
              <h3>Apple reports strong Q4 earnings, beats expectations</h3>
              <p>Reuters • 2 hours ago</p>
            </div>
            <div className="news-card">
              <div className="news-category">Technology</div>
              <h3>Microsoft announces new AI initiatives</h3>
              <p>TechCrunch • 3 hours ago</p>
            </div>
            <div className="news-card">
              <div className="news-category">Economy</div>
              <h3>Federal Reserve maintains current interest rates</h3>
              <p>Bloomberg • 4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleFinance;
