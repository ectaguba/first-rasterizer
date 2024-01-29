import React from 'react';
import { 
  BrowserRouter as Router, 
  createBrowserRouter,
  RouterProvider,
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';

import HomePage from './components/HomePage.tsx';
import LineRasterizer from './components/rasterizers/Lines/LineRasterizer.tsx';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lines">Line Rasterizer</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/lines" element={<LineRasterizer />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
