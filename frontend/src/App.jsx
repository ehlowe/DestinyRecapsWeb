// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './apps/about/about';
import Metas from './apps/recaps/recaps';
import Details from './apps/details/details';
import Recap from './apps/info-tab-test/recap';
import Navigation from './apps/nav-buttons/app_buttons';

import { initGA, logPageView } from './analytics';
import usePageTracking from './usePageTracking';

// // Component for navigation buttons
// function Navigation() {
//   const navigate = useNavigate();

//   return (
//     <div className="base-button-div">
//       <button className="home-button" onClick={() => navigate(`/`)}>Homepage</button>
//       <button className="about-button" onClick={() => navigate(`/about`)}>About</button>
//     </div>
//   );
// }

// Main app component
function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <PageContent />
    </Router>
  );
}

// Component to include routing and page tracking
function PageContent() {
  usePageTracking();
  const location = useLocation();

  useEffect(() => {
    logPageView();
  },  [location]);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/recap" element={<Recap />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Metas />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
