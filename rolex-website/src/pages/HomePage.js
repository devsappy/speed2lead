import React, { useState } from 'react';
import DarkVeil from '../components/DarkVeil';
import './HomePage.css';

const HomePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceNeeded: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('https://aivctalent.app.n8n.cloud/webhook-test/lead-intake', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Video Background */}
      <section className="hero-section" id="home">
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/bgv.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content">
          <img src="/Vibe Engine AI_Logo-03.png" alt="Vibe Engine AI" className="hero-logo" />
        </div>

        <div className="scroll-indicator" onClick={scrollToForm}>
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section" id="form-section">
        <div className="darkveil-background">
          <DarkVeil speed={0.3} />
        </div>

        {isSubmitted ? (
          <div className="thanks-container">
            <h1 className="thanks-message">Thanks!</h1>
          </div>
        ) : (
          <div className="form-container">
            <h2 className="form-heading">Geo Application</h2>
            <form onSubmit={handleSubmit} className="geo-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceNeeded">Service Needed</label>
                <input
                  type="text"
                  id="serviceNeeded"
                  name="serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
