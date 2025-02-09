import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Home';

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<div className="container"><Home /></div>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;