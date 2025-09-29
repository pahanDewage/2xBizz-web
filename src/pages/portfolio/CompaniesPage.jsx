/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { companiesApi } from '../../api/portfolioApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../Components/portfolio/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/portfolio/ui/table';
import { Badge } from '../../Components/portfolio/ui/badge';
import { Loader2 } from '../../Components/portfolio/ui/icons';
import PortfolioNav from '../../Components/portfolio/PortfolioNav';
import './Portfolio.css';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    growthRange: 'all',
    successRate: 'all',
    sortBy: 'name'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await companiesApi.getAll();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter and sort 
  useEffect(() => {
    let filtered = [...companies];

    // risk level filter
    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter(company => 
        company.type.toLowerCase() === filters.riskLevel.toLowerCase()
      );
    }

    // Apply growth range filter
    if (filters.growthRange !== 'all') {
      switch (filters.growthRange) {
        case 'high':
          filtered = filtered.filter(company => company.expectedGrowth >= 10);
          break;
        case 'medium':
          filtered = filtered.filter(company => company.expectedGrowth >= 5 && company.expectedGrowth < 10);
          break;
        case 'low':
          filtered = filtered.filter(company => company.expectedGrowth < 5);
          break;
        default:
          break;
      }
    }

    // Apply success rate filter
    if (filters.successRate !== 'all') {
      switch (filters.successRate) {
        case 'high':
          filtered = filtered.filter(company => company.probability >= 70);
          break;
        case 'medium':
          filtered = filtered.filter(company => company.probability >= 40 && company.probability < 70);
          break;
        case 'low':
          filtered = filtered.filter(company => company.probability < 40);
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
        filtered.sort((a, b) => b.expectedGrowth - a.expectedGrowth);
        break;
      case 'probability':
        filtered.sort((a, b) => b.probability - a.probability);
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    setFilteredCompanies(filtered);
  }, [companies, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      riskLevel: 'all',
      growthRange: 'all',
      successRate: 'all',
      sortBy: 'name'
    });
  };

  const handleRowClick = (companyId) => {
    navigate(`/portfolio/companies/${companyId}`);
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
              <h1 className="portfolio-title">Investment Portfolio</h1>
              <p className="portfolio-subtitle">
                Comprehensive analysis of your investment holdings and performance metrics
              </p>
            </div>
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-value">{filteredCompanies.length}</span>
                <span className="stat-label">Showing Holdings</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredCompanies.length > 0 ? (filteredCompanies.reduce((sum, c) => sum + c.expectedGrowth, 0) / filteredCompanies.length).toFixed(1) : 0}%
                </span>
                <span className="stat-label">Avg Expected Return</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredCompanies.length > 0 ? (filteredCompanies.reduce((sum, c) => sum + c.probability, 0) / filteredCompanies.length).toFixed(1) : 0}%
                </span>
                <span className="stat-label">Avg Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Portfolio Content */}
      <div className="portfolio-content">
        <div className="container mx-auto px-4 py-8">
          
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-header">
              <h3 className="filter-title">Filter & Sort</h3>
              <button onClick={clearFilters} className="clear-filters-btn">
                🔄 Clear Filters
              </button>
            </div>
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">Risk Level</label>
                <select 
                  value={filters.riskLevel} 
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="skewed">Skewed</option>
                  <option value="balanced">Balanced</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Expected Growth</label>
                <select 
                  value={filters.growthRange} 
                  onChange={(e) => handleFilterChange('growthRange', e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Growth Rates</option>
                  <option value="high">High (10%+)</option>
                  <option value="medium">Medium (5-10%)</option>
                  <option value="low">Low (&lt;5%)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Success Rate</label>
                <select 
                  value={filters.successRate} 
                  onChange={(e) => handleFilterChange('successRate', e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Success Rates</option>
                  <option value="high">High (70%+)</option>
                  <option value="medium">Medium (40-70%)</option>
                  <option value="low">Low (&lt;40%)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  value={filters.sortBy} 
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Company Name</option>
                  <option value="growth">Expected Growth</option>
                  <option value="probability">Success Rate</option>
                  <option value="year">Entry Year</option>
                </select>
              </div>
            </div>
          </div>

          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              <div className="card-header-content">
                <div>
                  <CardTitle className="card-title-enhanced">Investment Holdings</CardTitle>
                  <CardDescription className="card-description-enhanced">
                    Click on any investment to view detailed analysis and performance metrics
          </CardDescription>
                </div>
                <div className="portfolio-actions">
                  <button className="action-btn primary">
                    📊 Analytics
                  </button>
                  <button className="action-btn secondary">
                    📈 Performance
                  </button>
                </div>
              </div>
        </CardHeader>
            <CardContent className="portfolio-card-content">
              <div className="table-container">
                <Table className="portfolio-table">
            <TableHeader>
                    <TableRow className="table-header-row">
                      <TableHead className="table-head-enhanced">Investment</TableHead>
                      <TableHead className="table-head-enhanced">Entry Year</TableHead>
                      <TableHead className="table-head-enhanced">Risk Level</TableHead>
                      <TableHead className="table-head-enhanced">Expected Return</TableHead>
                      <TableHead className="table-head-enhanced">Success Rate</TableHead>
                      <TableHead className="table-head-enhanced">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                    {filteredCompanies.map((company, index) => (
                <TableRow
                  key={company.id}
                        className="portfolio-row"
                  onClick={() => handleRowClick(company.id)}
                >
                        <TableCell className="company-cell">
                          <div className="company-info">
                            <div className="company-avatar">
                              {company.name.charAt(0)}
                            </div>
                            <div className="company-details">
                              <span className="company-name">{company.name}</span>
                              <span className="company-sector">Technology</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="year-cell">{company.year}</TableCell>
                        <TableCell className="risk-cell">
                          <Badge 
                            variant={company.type === 'Balanced' ? 'default' : 'secondary'}
                            className={`risk-badge ${company.type.toLowerCase()}`}
                          >
                      {company.type}
                    </Badge>
                  </TableCell>
                        <TableCell className="return-cell">
                          <span className={`return-value ${company.expectedGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {company.expectedGrowth >= 0 ? '+' : ''}{company.expectedGrowth.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell className="probability-cell">
                          <div className="probability-container">
                            <span className="probability-value">{company.probability.toFixed(1)}%</span>
                            <div className="probability-bar">
                              <div 
                                className="probability-fill" 
                                style={{ width: `${company.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="actions-cell">
                          <div className="row-actions">
                            <button className="action-icon" title="View Details">
                              👁️
                            </button>
                            <button className="action-icon" title="Add to Watchlist">
                              ⭐
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

export default CompaniesPage;
