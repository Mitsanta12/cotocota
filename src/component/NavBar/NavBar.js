import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth <= 768) {
        setIsResponsive(true);
      } else {
        setIsResponsive(false);
        setIsMenuOpen(false); // Close the menu on larger screens
      }
    };

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="path_logo.png" alt="Logo" />
      </div>
      {isResponsive && (
        <div className="menu-bars" onClick={toggleMenu}>
          <FaIcons.FaBars />
        </div>
      )}
      <ul className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/clubs">Club</Link>
        </li>
        <li className="nav-item">
          <Link to="/annonces">Annonces</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
