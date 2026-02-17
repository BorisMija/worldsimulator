import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorldExplorerPage from './pages/WorldExplorerPage';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/world" element={<WorldExplorerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
