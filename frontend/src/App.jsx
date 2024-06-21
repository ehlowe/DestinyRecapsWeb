import React, { Profiler } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './apps/about';
import Metas from './apps/metas';
import Details from './apps/details';

// import './App.css';


import "./app_button.css"


{/* <Profiler id="App" onRender={onRender}>
  <App />
</Profiler> */}

function App() {
  return (
    // <Profiler id="App" onRender={onRender}>
    // <React.StrictMode strictMode={false}>
      <Router>
        <div>
          <div className="base-button-div">
            <button className="home-button" onClick={() => window.location.href = `/`}>Homepage</button>
            <button className="about-button" onClick={() => window.location.href = `/about`}>About</button>
            {/* <div className="header-title-div">
              <t className="header-title">Destiny Recaps</t>
            </div> */}
          </div>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Metas />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </Router>
    // </React.StrictMode>
    // </Profiler>
  );
}

export default App;
