/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectorsApi } from '../../api/portfolioApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../Components/portfolio/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/portfolio/ui/table';
import { Badge } from '../../Components/portfolio/ui/badge';
import { Button } from '../../Components/portfolio/ui/button';
import { Loader2, ArrowLeft, TrendingUp, Building2 } from '../../Components/portfolio/ui/icons';
import { SimpleBarChart } from '../../Components/portfolio/ui/SimpleChart';
import PortfolioNav from '../../Components/portfolio/PortfolioNav';
import './Portfolio.css';

const SectorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sector, setSector] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [sectorData, companiesData] = await Promise.all([
          sectorsApi.getById(id),
          sectorsApi.getCompanies(id)
        ]);
        
        setSector(sectorData);
        setCompanies(companiesData);
      } catch (err) {
        setError('Failed to fetch sector details');
        console.error('Error fetching sector:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSectorData();
  }, [id]);

  const handleCompanyClick = (companyId) => {
    navigate(`/portfolio/companies/${companyId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !sector) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/portfolio/sectors')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sectors
        </Button>
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">{error || 'Sector not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for bar chart
  const chartData = companies.map(company => ({
    name: company.name.length > 15 ? company.name.substring(0, 15) + '...' : company.name,
    fullName: company.name,
    allocation: company.percent,
    expectedGrowth: company.expectedGrowth,
    probability: company.probability
  }));

  // Sort companies by allocation percentage for better visualization
  const sortedCompanies = [...companies].sort((a, b) => b.percent - a.percent);

  return (
    <div className="portfolio-page">
      <PortfolioNav />
      
      {/* Enhanced Sector Header */}
      <div className="portfolio-header">
        <div className="container mx-auto px-4">
          <div className="header-content">
            <div className="header-text">
              <div className="breadcrumb-nav">
                <Button variant="outline" onClick={() => navigate('/portfolio/sectors')} className="back-btn">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sectors
                </Button>
              </div>
              <h1 className="portfolio-title">{sector.name} Sector</h1>
              <p className="portfolio-subtitle">
                Detailed analysis of companies and performance metrics in this sector
              </p>
            </div>
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-value">{sector.growth.toFixed(1)}%</span>
                <span className="stat-label">Growth Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{companies.length}</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {companies.length > 0 ? (companies.reduce((sum, c) => sum + c.percent, 0) / companies.length).toFixed(1) : 0}%
                </span>
                <span className="stat-label">Avg Allocation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">

      {/* Enhanced Sector Overview */}
      <div className="company-overview-grid">
        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon growth">
              <TrendingUp className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <div className={`overview-value ${sector.growth >= 0 ? 'positive' : 'negative'}`}>
              {sector.growth >= 0 ? '+' : ''}{sector.growth.toFixed(1)}%
            </div>
            <p className="overview-meta">
              {sector.growth >= 5.0 ? 'High Growth Sector' : 
               sector.growth >= 3.5 ? 'Moderate Growth Sector' : 'Stable Growth Sector'}
            </p>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon">
              <Building2 className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Total Companies</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <div className="overview-value">{companies.length}</div>
            <p className="overview-meta">
              Active investments in this sector
            </p>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon success">
              <TrendingUp className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Average Allocation</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <div className="overview-value">
              {companies.length > 0 ? (companies.reduce((sum, c) => sum + c.percent, 0) / companies.length).toFixed(1) : 0}%
            </div>
            <div className="probability-bar-large">
              <div 
                className="probability-fill-large" 
                style={{ width: `${companies.length > 0 ? (companies.reduce((sum, c) => sum + c.percent, 0) / companies.length) : 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="detail-grid">
        {/* Enhanced Companies Table */}
        <Card className="portfolio-card detail-card">
          <CardHeader className="portfolio-card-header">
            <div className="card-header-content">
              <div>
                <CardTitle className="card-title-enhanced">Companies in {sector.name}</CardTitle>
                <CardDescription className="card-description-enhanced">
                  All companies with investments in this sector
                </CardDescription>
              </div>
              <div className="portfolio-actions">
                <button className="action-btn primary">
                  📊 Compare
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="portfolio-card-content">
            <div className="table-container">
              <Table className="portfolio-table">
                <TableHeader>
                  <TableRow className="table-header-row">
                    <TableHead className="table-head-enhanced">Company</TableHead>
                    <TableHead className="table-head-enhanced">Allocation</TableHead>
                    <TableHead className="table-head-enhanced">Expected Growth</TableHead>
                    <TableHead className="table-head-enhanced">Success Rate</TableHead>
                    <TableHead className="table-head-enhanced">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCompanies.map((company, index) => (
                    <TableRow
                      key={company.id}
                      className="portfolio-row"
                      onClick={() => handleCompanyClick(company.id)}
                    >
                      <TableCell className="company-cell">
                        <div className="company-info">
                          <div className="company-avatar">
                            {company.name.charAt(0)}
                          </div>
                          <div className="company-details">
                            <span className="company-name">{company.name}</span>
                            <span className="company-sector">{sector.name} Sector</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="return-cell">
                        <span className="allocation-value">{company.percent.toFixed(1)}%</span>
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
                          <button className="action-icon" title="View Company Details">
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

        {/* Enhanced Bar Chart */}
        <Card className="portfolio-card chart-card">
          <CardHeader className="portfolio-card-header">
            <CardTitle className="card-title-enhanced">Allocation Distribution</CardTitle>
            <CardDescription className="card-description-enhanced">
              Investment allocation across companies in {sector.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="chart-content">
            <div className="chart-container">
              <SimpleBarChart data={chartData} />
            </div>
            <div className="chart-stats">
              <div className="chart-stat">
                <span className="chart-stat-label">Highest Allocation</span>
                <span className="chart-stat-value">
                  {companies.length > 0 ? Math.max(...companies.map(c => c.percent)).toFixed(1) : 0}%
                </span>
              </div>
              <div className="chart-stat">
                <span className="chart-stat-label">Total Companies</span>
                <span className="chart-stat-value">{companies.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Sector Statistics */}
      <Card className="portfolio-card stats-card">
        <CardHeader className="portfolio-card-header">
          <CardTitle className="card-title-enhanced">{sector.name} Sector Performance</CardTitle>
          <CardDescription className="card-description-enhanced">
            Comprehensive performance metrics and key indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="stats-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon high">📈</div>
              <div className="stat-info">
                <div className="stat-value positive">
                  {companies.length > 0 ? Math.max(...companies.map(c => c.percent)).toFixed(1) : 0}%
                </div>
                <div className="stat-label">Highest Allocation</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon low">📉</div>
              <div className="stat-info">
                <div className="stat-value">
                  {companies.length > 0 ? Math.min(...companies.map(c => c.percent)).toFixed(1) : 0}%
                </div>
                <div className="stat-label">Lowest Allocation</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon growth">💹</div>
              <div className="stat-info">
                <div className="stat-value positive">
                  {companies.length > 0 ? (companies.reduce((sum, c) => sum + c.expectedGrowth, 0) / companies.length).toFixed(2) : 0}%
                </div>
                <div className="stat-label">Avg Expected Growth</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">🎯</div>
              <div className="stat-info">
                <div className="stat-value">
                  {companies.length > 0 ? (companies.reduce((sum, c) => sum + c.probability, 0) / companies.length).toFixed(1) : 0}%
                </div>
                <div className="stat-label">Avg Success Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDetailPage;
