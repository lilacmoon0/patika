import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Rick & Morty
        </Link>
        <nav className="nav">
          <Link 
            to="/characters" 
            className={`nav-link ${location.pathname === '/characters' || location.pathname === '/' ? 'active' : ''}`}
          >
            Characters
          </Link>
          <Link 
            to="/episodes" 
            className={`nav-link ${location.pathname === '/episodes' ? 'active' : ''}`}
          >
            Episodes
          </Link>
          <Link 
            to="/locations" 
            className={`nav-link ${location.pathname === '/locations' ? 'active' : ''}`}
          >
            Locations
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
