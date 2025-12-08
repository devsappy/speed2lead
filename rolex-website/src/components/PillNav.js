import React from 'react';
import { NavLink } from 'react-router-dom';
import './PillNav.css';

const PillNav = () => {
  return (
    <nav className="pill-nav">
      <div className="pill-nav-container">
        <NavLink
          to="/"
          className={({ isActive }) => `pill-nav-item ${isActive ? 'active' : ''}`}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `pill-nav-item ${isActive ? 'active' : ''}`}
        >
          About Us
        </NavLink>
        <NavLink
          to="/documentation"
          className={({ isActive }) => `pill-nav-item ${isActive ? 'active' : ''}`}
        >
          Documentation
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) => `pill-nav-item ${isActive ? 'active' : ''}`}
        >
          Resources
        </NavLink>
      </div>
    </nav>
  );
};

export default PillNav;
