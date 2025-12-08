import React, { useState, useEffect, useRef } from 'react';
import DarkVeil from '../components/DarkVeil';
import './HomePage.css';

// Validation functions
const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const HomePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceNeeded: '',
    aiAgentCall: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const timeoutRef = useRef(null);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation errors when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear general error
    if (error) setError(null);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!validateEmail(formData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    
    if (!formData.serviceNeeded.trim()) {
      errors.serviceNeeded = 'Service needed is required';
    } else if (formData.serviceNeeded.trim().length < 3) {
      errors.serviceNeeded = 'Please provide more details about the service';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const webhookUrl = process.env.REACT_APP_WEBHOOK_URL || 'https://aivctalent.app.n8n.cloud/webhook-test/lead-intake';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setFormData({
          fullName: '',
          phoneNumber: '',
          emailAddress: '',
          serviceNeeded: '',
          aiAgentCall: false
        });
        setIsSubmitted(false);
        setError(null);
        setValidationErrors({});
        timeoutRef.current = null;
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please check your connection and try again.');
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Video Background */}
      <section className="hero-section" id="home">
        <div className="video-background">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            aria-label="Background video"
          >
            <source src="/bgv.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content">
          <img src="/Vibe Engine AI_Logo-03.png" alt="Vibe Engine AI" className="hero-logo" />
        </div>

        <button 
          className="scroll-indicator" 
          onClick={scrollToForm}
          aria-label="Scroll to form"
          type="button"
        >
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </button>
      </section>

      {/* Form Section */}
      <section className="form-section" id="form-section">
        <div className="darkveil-background">
          <DarkVeil speed={0.3} />
        </div>

        {isSubmitted ? (
          <div className="thanks-container">
            <h1 className="thanks-message">Thanks!</h1>
            <p className="thanks-subtitle">We'll be in touch soon.</p>
            <button 
              className="back-to-form-btn" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  phoneNumber: '',
                  emailAddress: '',
                  serviceNeeded: '',
                  aiAgentCall: false
                });
                setError(null);
                setValidationErrors({});
              }}
              type="button"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-heading">Get Started with GEO</h2>
              <p className="form-subheading">Optimize your brand's visibility in AI-powered search engines</p>
            </div>
            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="geo-form" noValidate>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  aria-label="Full name"
                  aria-required="true"
                  aria-invalid={!!validationErrors.fullName}
                  aria-describedby={validationErrors.fullName ? 'fullName-error' : undefined}
                  maxLength={100}
                />
                {validationErrors.fullName && (
                  <span id="fullName-error" className="error-text" role="alert">
                    {validationErrors.fullName}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  aria-label="Phone number"
                  aria-required="true"
                  aria-invalid={!!validationErrors.phoneNumber}
                  aria-describedby={validationErrors.phoneNumber ? 'phoneNumber-error' : undefined}
                  maxLength={20}
                />
                {validationErrors.phoneNumber && (
                  <span id="phoneNumber-error" className="error-text" role="alert">
                    {validationErrors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  aria-required="true"
                  aria-invalid={!!validationErrors.emailAddress}
                  aria-describedby={validationErrors.emailAddress ? 'emailAddress-error' : undefined}
                  maxLength={100}
                />
                {validationErrors.emailAddress && (
                  <span id="emailAddress-error" className="error-text" role="alert">
                    {validationErrors.emailAddress}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="serviceNeeded">Service Needed</label>
                <input
                  type="text"
                  id="serviceNeeded"
                  name="serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={handleChange}
                  placeholder="What service are you interested in?"
                  required
                  aria-label="Service needed"
                  aria-required="true"
                  aria-invalid={!!validationErrors.serviceNeeded}
                  aria-describedby={validationErrors.serviceNeeded ? 'serviceNeeded-error' : undefined}
                  maxLength={200}
                />
                {validationErrors.serviceNeeded && (
                  <span id="serviceNeeded-error" className="error-text" role="alert">
                    {validationErrors.serviceNeeded}
                  </span>
                )}
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label" htmlFor="aiAgentCall">
                  <input
                    type="checkbox"
                    id="aiAgentCall"
                    name="aiAgentCall"
                    checked={formData.aiAgentCall}
                    onChange={handleChange}
                    className="checkbox-input"
                    aria-label="Do you want our AI agent to call you?"
                  />
                  <span className="checkbox-custom" aria-hidden="true"></span>
                  <span className="checkbox-text">Do you want our AI agent to call you?</span>
                </label>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
                aria-label={isLoading ? 'Submitting form' : 'Submit form'}
              >
                {isLoading ? (
                  <>
                    <span>Submitting...</span>
                    <div className="spinner"></div>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
