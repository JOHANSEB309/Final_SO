import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Home';
import FCFS from './FCFS.js';


function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/fcfs">FCFS</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<div className="container"><Home /></div>} />
            <Route path="/fcfs" element={<div className="container"><FCFS /></div>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;