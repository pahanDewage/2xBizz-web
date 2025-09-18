import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import ProductPage from './components/productpage';
import App from './App';
import FeedBack from './components/feedback';
import ScrollToTop from './components/ScrollToTop';
import CommonPage from './components/CommonPage';

function HomeInside() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/ProductPage" element={<ProductPage />} />
      <Route exact path="/Feedback" element={<FeedBack />} />
      <Route exact path="/CommonPage" element={<CommonPage />} />
    </Routes>
  );
}

export default HomeInside;
