import React from 'react';
import './Navbar.css';

const Navbar = ({ transparent, logo = "/Vibe Engine AI_Logo-03.png" }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${transparent ? 'transparent' : ''}`}>
      <div className="nav-center" style={{ margin: '0 auto' }}>
        <div onClick={scrollToTop} className="logo" style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Vibe Engine AI" style={{ height: '50px', width: 'auto' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
