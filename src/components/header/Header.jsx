import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = ({ isAuth }) => {  // Fixed prop destructuring
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-gradient">E-learning</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/about" className="nav-link">About</Link>
          {isAuth ? (
            <Link to="/account" className="nav-link account-link">Account</Link>
          ) : (
            <Link to="/login" className="nav-link login-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;