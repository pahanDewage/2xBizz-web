/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sectorsApi } from '../../api/portfolioApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../Components/portfolio/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/portfolio/ui/table';
import { Loader2, TrendingUp } from '../../Components/portfolio/ui/icons';
import PortfolioNav from '../../Components/portfolio/PortfolioNav';
import './Portfolio.css';

const SectorsPage = () => {
  const [sectors, setSectors] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    growthLevel: 'all',
    sortBy: 'name'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        const data = await sectorsApi.getAll();
        setSectors(data);
        setFilteredSectors(data);
      } catch (err) {
        setError('Failed to fetch sectors');
        console.error('Error fetching sectors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  // Filter and sort sectors based on current filters
  useEffect(() => {
    let filtered = [...sectors];

    // Apply growth level filter
    if (filters.growthLevel !== 'all') {
      switch (filters.growthLevel) {
        case 'high':
          filtered = filtered.filter(sector => sector.growth >= 5.0);
          break;
        case 'moderate':
          filtered = filtered.filter(sector => sector.growth >= 3.5 && sector.growth < 5.0);
          break;
        case 'stable':
          filtered = filtered.filter(sector => sector.growth < 3.5);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'growth':
        filtered.sort((a, b) => b.growth - a.growth);
        break;
      default:
        break;
    }

    setFilteredSectors(filtered);
  }, [sectors, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      growthLevel: 'all',
      sortBy: 'name'
    });
  };

  const handleRowClick = (sectorId) => {
    navigate(`/portfolio/sectors/${sectorId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="portfolio-page">
      <PortfolioNav />
      
      {/* Enhanced Header Section */}
      <div className="portfolio-header">
        <div className="container mx-auto px-4">
          <div className="header-content">
            <div className="header-text">
              <h1 className="portfolio-title">Investment Sectors</h1>
              <p className="portfolio-subtitle">
                Analyze sector performance and growth trends across your investment portfolio
              </p>
            </div>
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-value">{filteredSectors.length}</span>
                <span className="stat-label">Showing Sectors</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredSectors.length > 0 ? (filteredSectors.reduce((sum, s) => sum + s.growth, 0) / filteredSectors.length).toFixed(1) : 0}%
                </span>
                <span className="stat-label">Avg Growth Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredSectors.filter(s => s.growth >= 5.0).length}
                </span>
                <span className="stat-label">High Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="portfolio-content">
        <div className="container mx-auto px-4 py-8">
          

          <div className="filter-section">
            <div className="filter-header">
              <h3 className="filter-title">Filter & Sort Sectors</h3>
              <button onClick={clearFilters} className="clear-filters-btn">
                🔄 Clear Filters
              </button>
            </div>
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">Growth Level</label>
                <select 
                  value={filters.growthLevel} 
                  onChange={(e) => handleFilterChange('growthLevel', e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Growth Levels</option>
                  <option value="high">High Growth (5%+)</option>
                  <option value="moderate">Moderate Growth (3.5-5%)</option>
                  <option value="stable">Stable Growth (&lt;3.5%)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  value={filters.sortBy} 
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Sector Name</option>
                  <option value="growth">Growth Rate</option>
                </select>
              </div>
            </div>
          </div>

          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              <div className="card-header-content">
                <div>
                  <CardTitle className="card-title-enhanced">Sector Analysis</CardTitle>
                  <CardDescription className="card-description-enhanced">
                    Click on any sector to view companies and detailed performance metrics
                  </CardDescription>
                </div>
                <div className="portfolio-actions">
                  <button className="action-btn primary">
                    📊 Sector Trends
                  </button>
                  <button className="action-btn secondary">
                    📈 Growth Analysis
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="portfolio-card-content">
              <div className="table-container">
                <Table className="portfolio-table">
                  <TableHeader>
                    <TableRow className="table-header-row">
                      <TableHead className="table-head-enhanced">Sector</TableHead>
                      <TableHead className="table-head-enhanced">Growth Rate</TableHead>
                      <TableHead className="table-head-enhanced">Growth Trend</TableHead>
                      <TableHead className="table-head-enhanced">Performance</TableHead>
                      <TableHead className="table-head-enhanced">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSectors.map((sector, index) => (
                      <TableRow
                        key={sector.id}
                        className="portfolio-row"
                        onClick={() => handleRowClick(sector.id)}
                      >
                        <TableCell className="company-cell">
                          <div className="company-info">
                            <div className="sector-avatar">
                              {getSectorIcon(sector.name)}
                            </div>
                            <div className="company-details">
                              <span className="company-name">{sector.name}</span>
                              <span className="company-sector">Investment Sector</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="return-cell">
                          <span className={`return-value ${sector.growth >= 0 ? 'positive' : 'negative'}`}>
                            {sector.growth >= 0 ? '+' : ''}{sector.growth.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="risk-cell">
                          <div className="trend-indicator">
                            <TrendingUp className={`trend-icon ${getTrendClass(sector.growth)}`} />
                            <span className={`trend-text ${getTrendClass(sector.growth)}`}>
                              {sector.growth >= 5.0 ? 'High Growth' : 
                               sector.growth >= 3.5 ? 'Moderate Growth' : 'Stable Growth'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="probability-cell">
                          <div className="probability-container">
                            <span className="probability-value">{sector.growth.toFixed(1)}%</span>
                            <div className="probability-bar">
                              <div 
                                className="probability-fill" 
                                style={{ width: `${Math.min(sector.growth * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="actions-cell">
                          <div className="row-actions">
                            <button className="action-icon" title="View Sector Details">
                              👁️
                            </button>
                            <button className="action-icon" title="Track Sector">
                              📊
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getSectorIcon = (sectorName) => {
  const icons = {
    'Technology': '💻',
    'Healthcare': '🏥',
    'Finance': '💰',
    'Energy': '⚡',
    'Manufacturing': '🏭',
    'Retail': '🛍️',
    'Real Estate': '🏢',
    'Telecommunications': '📡'
  };
  return icons[sectorName] || '🏢';
};

const getTrendClass = (growth) => {
  if (growth >= 5.0) return 'high-growth';
  if (growth >= 3.5) return 'moderate-growth';
  return 'stable-growth';
};

export default SectorsPage;
