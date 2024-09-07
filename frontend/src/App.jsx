// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './apps/about/about';
import StreamRecaps from './apps/recaps/stream_recaps';
import Recaps from './apps/recaps/recaps';
import Details from './apps/details/details';
import Recap from './apps/info-tab-test/recap';
import Backend from './apps/backend/backend';

import CustomGraph from './apps/test/test';

import Navigation from './apps/nav/nav';

import { initGA, logPageView } from './usage-analytics/analytics';
import usePageTracking from './usage-analytics/usePageTracking';
import StreamPlot from './apps/fast_recaps/sp_and_loader';

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
        <Route path="/" element={<StreamPlot />} />
        <Route path="/stream_recaps" element={<StreamRecaps />} />
        <Route path="/stream_recaps/Destiny" element={<Recaps />} />
        <Route path="/details" element={<Details />} />
        <Route path="/test" element={<CustomGraph />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/stream_plot" element={<StreamPlot />} />
      </Routes>
    </div>
  );
}

export default App;
