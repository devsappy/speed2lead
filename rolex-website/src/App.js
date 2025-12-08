import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import ResourcesPage from './pages/ResourcesPage';
import PillNav from './components/PillNav';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <PillNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
