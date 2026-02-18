import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorldExplorerPage from './pages/WorldExplorerPage';
import WarSimulatorPage from './pages/WarSimulatorPage';
import { LoginPage } from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/world" element={<WorldExplorerPage />} />
        <Route path="/war" element={<RequireAuth><WarSimulatorPage /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
