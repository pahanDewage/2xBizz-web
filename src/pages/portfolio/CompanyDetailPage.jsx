/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companiesApi } from '../../api/portfolioApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../Components/portfolio/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/portfolio/ui/table';
import { Badge } from '../../Components/portfolio/ui/badge';
import { Button } from '../../Components/portfolio/ui/button';
import { Loader2, ArrowLeft, TrendingUp, Target } from '../../Components/portfolio/ui/icons';
import { SimplePieChart } from '../../Components/portfolio/ui/SimpleChart';
import PortfolioNav from '../../Components/portfolio/PortfolioNav';
import './Portfolio.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await companiesApi.getById(id);
        setCompany(data);
      } catch (err) {
        setError('Failed to fetch company details');
        console.error('Error fetching company:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/portfolio/companies')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">{error || 'Company not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for pie chart
  const pieData = company.allocations.map((allocation, index) => ({
    name: allocation.sector.name,
    value: allocation.percent,
    growth: allocation.growth,
    contribution: (allocation.percent * allocation.growth / 100).toFixed(2),
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="portfolio-page">
      <PortfolioNav />
      
      {/* Enhanced Company Header */}
      <div className="portfolio-header">
        <div className="container mx-auto px-4">
          <div className="header-content">
            <div className="header-text">
              <div className="breadcrumb-nav">
                <Button variant="outline" onClick={() => navigate('/portfolio/companies')} className="back-btn">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
                </Button>
              </div>
              <h1 className="portfolio-title">{company.name}</h1>
              <p className="portfolio-subtitle">
                Comprehensive investment analysis and performance metrics
              </p>
            </div>
            <div className="portfolio-stats">
              <div className="stat-item">
                <span className="stat-value">{company.expectedGrowth.toFixed(1)}%</span>
                <span className="stat-label">Expected Return</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{company.probability.toFixed(1)}%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{company.year}</span>
                <span className="stat-label">Entry Year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">

      {/* Enhanced Company Overview */}
      <div className="company-overview-grid">
        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon">
              <Target className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Investment Type</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <Badge 
              variant={company.type === 'Balanced' ? 'default' : 'secondary'}
              className={`type-badge ${company.type.toLowerCase()}`}
            >
              {company.type}
            </Badge>
            <p className="overview-meta">
              Entry Year: {company.year}
            </p>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon growth">
              <TrendingUp className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Expected Return</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <div className="overview-value positive">{company.expectedGrowth.toFixed(2)}%</div>
            <p className="overview-meta">
              Based on sector allocations
            </p>
          </CardContent>
        </Card>

        <Card className="overview-card">
          <CardHeader className="overview-card-header">
            <div className="overview-icon success">
              <Target className="overview-icon-svg" />
            </div>
            <CardTitle className="overview-card-title">Success Probability</CardTitle>
          </CardHeader>
          <CardContent className="overview-card-content">
            <div className="overview-value">{company.probability.toFixed(1)}%</div>
            <div className="probability-bar-large">
              <div 
                className="probability-fill-large" 
                style={{ width: `${company.probability}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="detail-grid">
        {/* Enhanced Allocations Table */}
        <Card className="portfolio-card detail-card">
          <CardHeader className="portfolio-card-header">
            <div className="card-header-content">
              <div>
                <CardTitle className="card-title-enhanced">Sector Allocations</CardTitle>
                <CardDescription className="card-description-enhanced">
                  Breakdown of investment distribution across sectors
                </CardDescription>
              </div>
              <div className="portfolio-actions">
                <button className="action-btn primary">
                  📊 Export Data
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
                    <TableHead className="table-head-enhanced">Allocation</TableHead>
                    <TableHead className="table-head-enhanced">Growth Rate</TableHead>
                    <TableHead className="table-head-enhanced">Contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company.allocations.map((allocation, index) => (
                    <TableRow key={allocation.sector.id} className="portfolio-row">
                      <TableCell className="company-cell">
                        <div className="company-info">
                          <div 
                            className="sector-indicator"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="company-name">{allocation.sector.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="return-cell">
                        <span className="allocation-value">{allocation.percent.toFixed(1)}%</span>
                      </TableCell>
                      <TableCell className="return-cell">
                        <span className={`return-value ${allocation.growth >= 0 ? 'positive' : 'negative'}`}>
                          {allocation.growth >= 0 ? '+' : ''}{allocation.growth.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="return-cell">
                        <span className="contribution-value">
                          {(allocation.percent * allocation.growth / 100).toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Pie Chart */}
        <Card className="portfolio-card chart-card">
          <CardHeader className="portfolio-card-header">
            <CardTitle className="card-title-enhanced">Allocation Distribution</CardTitle>
            <CardDescription className="card-description-enhanced">
              Visual breakdown of sector investments
            </CardDescription>
          </CardHeader>
          <CardContent className="chart-content">
            <div className="chart-container">
              <SimplePieChart data={pieData} />
            </div>
            <div className="chart-legend">
              {pieData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color"
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Contributions by Sector</CardTitle>
          <CardDescription>
            How much each sector contributes to the overall expected growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {company.allocations.map((allocation) => {
              const contribution = allocation.percent * allocation.growth / 100;
              const percentage = (contribution / company.expectedGrowth) * 100;
              
              return (
                <div key={allocation.sector.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: COLORS[company.allocations.indexOf(allocation) % COLORS.length] 
                      }}
                    />
                    <span className="font-medium">{allocation.sector.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{contribution.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}% of total growth
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
