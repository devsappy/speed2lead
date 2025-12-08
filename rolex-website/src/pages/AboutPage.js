import React from 'react';
import DarkVeil from '../components/DarkVeil';
import './PageStyles.css';

const AboutPage = () => {
  return (
    <div className="page-wrapper">
      <div className="darkveil-background">
        <DarkVeil speed={0.2} hueShift={30} />
      </div>
      <div className="section-content">
        <h2 className="section-title">About Us</h2>
        <p className="section-text">
          We are pioneering the future of AI-powered solutions. Our mission is to transform
          how businesses connect with their customers through intelligent automation and
          cutting-edge technology.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">01</div>
            <h3>Innovation</h3>
            <p>Pushing boundaries with advanced AI technology</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">02</div>
            <h3>Speed</h3>
            <p>Lightning-fast response times for your business</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">03</div>
            <h3>Results</h3>
            <p>Measurable outcomes that drive growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
