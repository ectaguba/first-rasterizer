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

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/line-rasterizer", element: <LineRasterizer/> },
]);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
