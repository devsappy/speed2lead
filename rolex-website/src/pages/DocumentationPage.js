import React from 'react';
import DarkVeil from '../components/DarkVeil';
import './PageStyles.css';

const DocumentationPage = () => {
  return (
    <div className="page-wrapper">
      <div className="darkveil-background">
        <DarkVeil speed={0.25} hueShift={60} />
      </div>
      <div className="section-content">
        <h2 className="section-title">Documentation</h2>
        <p className="section-text">
          Everything you need to get started and integrate our solutions.
        </p>
        <div className="docs-grid">
          <div className="doc-card">
            <h3>Getting Started</h3>
            <p>Quick setup guide to launch in minutes</p>
            <span className="doc-link">Read more</span>
          </div>
          <div className="doc-card">
            <h3>API Reference</h3>
            <p>Complete API documentation and endpoints</p>
            <span className="doc-link">Read more</span>
          </div>
          <div className="doc-card">
            <h3>Integration Guide</h3>
            <p>Step-by-step integration tutorials</p>
            <span className="doc-link">Read more</span>
          </div>
          <div className="doc-card">
            <h3>Best Practices</h3>
            <p>Optimize your implementation</p>
            <span className="doc-link">Read more</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
