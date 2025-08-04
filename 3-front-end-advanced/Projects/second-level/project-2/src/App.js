import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      setCryptos(response.data);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    return `${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap?.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>Loading cryptocurrency data...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchCryptoData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="header-text">
              <h1>CryptoVault</h1>
              <p>Real-time cryptocurrency market intelligence</p>
            </div>
          </div>
          <div className="market-stats">
            <div className="stat-item">
              <span className="stat-label">Total Cryptos</span>
              <span className="stat-value">{cryptos.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Updated</span>
              <span className="stat-value">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="action-buttons">
            <button onClick={fetchCryptoData} className="refresh-btn">
              Refresh
            </button>
            <button className="filter-btn">
              Filter
            </button>
          </div>
        </div>

        <div className="crypto-grid">
          {filteredCryptos.map((crypto, index) => (
            <div key={crypto.id} className="crypto-card" style={{'--delay': `${index * 0.1}s`}}>
              <div className="crypto-header">
                <div className="crypto-logo-container">
                  <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
                  <div className="crypto-rank">#{crypto.market_cap_rank}</div>
                </div>
                <div className="crypto-info">
                  <h3>{crypto.name}</h3>
                  <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                </div>
                <div className="favorite-btn">⭐</div>
              </div>
              
              <div className="crypto-price">
                <div className="current-price">{formatPrice(crypto.current_price)}</div>
                <div className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  <span className="change-arrow">{crypto.price_change_percentage_24h >= 0 ? '↗' : '↘'}</span>
                  <span>{formatPercentage(crypto.price_change_percentage_24h)}</span>
                </div>
              </div>
              
              <div className="price-chart">
                <div className="mini-chart">
                  {Array.from({length: 7}, (_, i) => (
                    <div 
                      key={i} 
                      className="chart-bar" 
                      style={{
                        height: `${Math.random() * 40 + 10}px`,
                        backgroundColor: crypto.price_change_percentage_24h >= 0 ? '#00d4aa' : '#ff6b6b'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="crypto-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">📊</span>
                    <div className="detail-content">
                      <span className="detail-label">Market Cap</span>
                      <span className="detail-value">{formatMarketCap(crypto.market_cap)}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <div className="detail-content">
                      <span className="detail-label">Volume 24h</span>
                      <span className="detail-value">{formatMarketCap(crypto.total_volume)}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">📈</span>
                    <div className="detail-content">
                      <span className="detail-label">24h High</span>
                      <span className="detail-value">{formatPrice(crypto.high_24h)}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📉</span>
                    <div className="detail-content">
                      <span className="detail-label">24h Low</span>
                      <span className="detail-value">{formatPrice(crypto.low_24h)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="action-btn primary">Buy</button>
                <button className="action-btn secondary">Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredCryptos.length === 0 && searchTerm && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No cryptocurrencies found</h3>
            <p>Try searching for a different cryptocurrency name or symbol.</p>
            <button onClick={() => setSearchTerm('')} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        )}
        
        {!searchTerm && (
          <div className="footer-info">
            <p>Data provided by CoinGecko API • Updated every 5 minutes</p>
            <div className="crypto-marquee">
              <div className="marquee-content">
                {cryptos.slice(0, 10).map(crypto => (
                  <span key={crypto.id} className="marquee-item">
                    {crypto.symbol.toUpperCase()}: {formatPrice(crypto.current_price)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
