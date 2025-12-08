import React from 'react';
import DarkVeil from '../components/DarkVeil';
import './PageStyles.css';

const ResourcesPage = () => {
  return (
    <div className="page-wrapper">
      <div className="darkveil-background">
        <DarkVeil speed={0.15} hueShift={90} />
      </div>
      <div className="section-content">
        <h2 className="section-title">Resources</h2>
        <p className="section-text">
          Tools, guides, and materials to help you succeed.
        </p>
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-type">Guide</div>
            <h3>Speed to Lead Playbook</h3>
            <p>Master the art of rapid customer engagement</p>
          </div>
          <div className="resource-card">
            <div className="resource-type">Template</div>
            <h3>Response Templates</h3>
            <p>Pre-built templates for common scenarios</p>
          </div>
          <div className="resource-card">
            <div className="resource-type">Video</div>
            <h3>Training Series</h3>
            <p>In-depth video tutorials and walkthroughs</p>
          </div>
          <div className="resource-card">
            <div className="resource-type">Tool</div>
            <h3>ROI Calculator</h3>
            <p>Calculate your potential returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
