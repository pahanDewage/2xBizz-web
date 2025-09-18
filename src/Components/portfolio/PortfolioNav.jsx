/* eslint-disable */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, BarChart3 } from './ui/icons';

const PortfolioNav = () => {
  const location = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center space-x-8">
            <Link 
              to="/portfolio/companies" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/portfolio' || location.pathname === '/portfolio/companies' || location.pathname.startsWith('/portfolio/companies/')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Companies</span>
            </Link>
            
            <Link 
              to="/portfolio/sectors" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname.startsWith('/portfolio/sectors')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Sectors</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PortfolioNav;
