import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Vlogs from './pages/Vlogs';
import VlogDetail from './pages/VlogDetail';
import CompaniesPage from './pages/portfolio/CompaniesPage';
import CompanyDetailPage from './pages/portfolio/CompanyDetailPage';
import SectorsPage from './pages/portfolio/SectorsPage';
import SectorDetailPage from './pages/portfolio/SectorDetailPage';
import TradingView from './pages/TradingView';
import GoogleFinance from './pages/GoogleFinance';
import CSE from './pages/CSE';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Newsletter from './pages/Newsletter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import Navbar from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';
import ErrorBoundary from './Components/Common/ErrorBoundary/ErrorBoundary';
import ForgotPassword from './pages/ForgotPassword';
/* eslint-disable */
const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blogs/:id" element={<BlogDetail />} />
                      <Route path="/vlogs" element={<Vlogs />} />
                      <Route path="/vlogs/:id" element={<VlogDetail />} />
                      <Route path="/portfolio" element={<CompaniesPage />} />
                      <Route path="/portfolio/companies" element={<CompaniesPage />} />
                      <Route path="/portfolio/companies/:id" element={<CompanyDetailPage />} />
                      <Route path="/portfolio/sectors" element={<SectorsPage />} />
                      <Route path="/portfolio/sectors/:id" element={<SectorDetailPage />} />
                      <Route path="/tradingview" element={<TradingView />} />
                      <Route path="/google-finance" element={<GoogleFinance />} />
                      <Route path="/cse" element={<CSE />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/newsletter" element={<Newsletter />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
