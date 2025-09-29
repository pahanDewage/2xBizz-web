import React, { useEffect } from 'react';
import './TradingView.css';

const TradingView = () => {
  // useEffect(() => {
  //   // Load TradingView advanced chart widget
  //   const script = document.createElement('script');
  //   script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  //   script.async = true;
  //   script.innerHTML = JSON.stringify({
  //     "autosize": true,
  //     "symbol": "NASDAQ:AAPL",
  //     "interval": "D",
  //     "timezone": "Etc/UTC",
  //     "theme": "light",
  //     "style": "1",
  //     "locale": "en",
  //     "toolbar_bg": "#f1f3f6",
  //     "enable_publishing": false,
  //     "hide_top_toolbar": false,
  //     "hide_legend": false,
  //     "save_image": false,
  //     "container_id": "tradingview_advanced_chart"
  //   });
    
  //   const container = document.getElementById('tradingview-advanced-chart');
  //   if (container) {
  //     container.appendChild(script);
  //   }
    
  //   return () => {
  //     if (container && container.contains(script)) {
  //       container.removeChild(script);
  //     }
  //   };
  // }, []);

  return (
    <div className="tradingview-page">
      <div className="page-header">
        <h1>TradingView Advanced Charts</h1>
        <p>Professional trading charts and technical analysis tools</p>
      </div>

      <div className="tradingview-content">
        <div className="chart-section">
          <div className="chart-header">
            <h2>Advanced Chart Analysis</h2>
            <div className="chart-controls">
              <select className="symbol-selector">
                <option value="NASDAQ:AAPL">Apple Inc (AAPL)</option>
                <option value="NASDAQ:GOOGL">Alphabet Inc (GOOGL)</option>
                <option value="NASDAQ:MSFT">Microsoft Corp (MSFT)</option>
                <option value="NASDAQ:TSLA">Tesla Inc (TSLA)</option>
                <option value="NASDAQ:AMZN">Amazon.com Inc (AMZN)</option>
              </select>
              <select className="timeframe-selector">
                <option value="1">1 Minute</option>
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="D">Daily</option>
                <option value="W">Weekly</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <div id="tradingview-advanced-chart" className="tradingview-advanced-chart"></div>
          </div>
        </div>

        <div className="market-overview-section">
          <h2>Market Overview</h2>
          <div className="market-overview-grid">
            <div className="overview-widget">
              <h3>US Indices</h3>
              <div className="indices-list">
                <div className="index-item">
                  <span className="index-name">S&P 500</span>
                  <span className="index-value">4,567.89</span>
                  <span className="index-change positive">+12.34 (+0.27%)</span>
                </div>
                <div className="index-item">
                  <span className="index-name">Dow Jones</span>
                  <span className="index-value">35,123.45</span>
                  <span className="index-change positive">+89.12 (+0.25%)</span>
                </div>
                <div className="index-item">
                  <span className="index-name">NASDAQ</span>
                  <span className="index-value">14,567.89</span>
                  <span className="index-change negative">-23.45 (-0.16%)</span>
                </div>
              </div>
            </div>

            <div className="overview-widget">
              <h3>Top Movers</h3>
              <div className="movers-list">
                <div className="mover-item">
                  <span className="mover-symbol">AAPL</span>
                  <span className="mover-name">Apple Inc</span>
                  <span className="mover-change positive">+2.45%</span>
                </div>
                <div className="mover-item">
                  <span className="mover-symbol">TSLA</span>
                  <span className="mover-name">Tesla Inc</span>
                  <span className="mover-change positive">+1.89%</span>
                </div>
                <div className="mover-item">
                  <span className="mover-symbol">NVDA</span>
                  <span className="mover-name">NVIDIA Corp</span>
                  <span className="mover-change negative">-1.23%</span>
                </div>
              </div>
            </div>

            <div className="overview-widget">
              <h3>Forex</h3>
              <div className="forex-list">
                <div className="forex-item">
                  <span className="forex-pair">EUR/USD</span>
                  <span className="forex-rate">1.0845</span>
                  <span className="forex-change positive">+0.0012</span>
                </div>
                <div className="forex-item">
                  <span className="forex-pair">GBP/USD</span>
                  <span className="forex-rate">1.2678</span>
                  <span className="forex-change negative">-0.0023</span>
                </div>
                <div className="forex-item">
                  <span className="forex-pair">USD/JPY</span>
                  <span className="forex-rate">149.23</span>
                  <span className="forex-change positive">+0.45</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="technical-analysis-section">
          <h2>Technical Analysis Tools</h2>
          <div className="analysis-tools">
            <div className="tool-card">
              <h3>Moving Averages</h3>
              <p>Track price trends with various moving average periods</p>
              <button className="tool-btn">Add to Chart</button>
            </div>
            <div className="tool-card">
              <h3>RSI Indicator</h3>
              <p>Relative Strength Index for momentum analysis</p>
              <button className="tool-btn">Add to Chart</button>
            </div>
            <div className="tool-card">
              <h3>MACD</h3>
              <p>Moving Average Convergence Divergence</p>
              <button className="tool-btn">Add to Chart</button>
            </div>
            <div className="tool-card">
              <h3>Bollinger Bands</h3>
              <p>Volatility and support/resistance levels</p>
              <button className="tool-btn">Add to Chart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingView;
