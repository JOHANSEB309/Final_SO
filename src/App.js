import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Home';
import FCFS from './FCFS';

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
                <Link to="/src/FCFS.js">FCFS</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<div className="container"><Home /></div>} />
            <Route path="./FCFS.js" element={<div className="container"><FCFS /></div>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;