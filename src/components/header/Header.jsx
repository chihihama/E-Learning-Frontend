import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import IconHome from '../../assets/reshot-icon-home-page-TF3B9VCGWY.svg';
import IconCourses from '../../assets/reshot-icon-video-learning-JFESTMBXPA.svg';
import IconAbout from '../../assets/reshot-icon-about-NXKPGA5CMW.svg';
import IconAccount from '../../assets/student-svgrepo-com.svg';
import IconLuma from '../../assets/reshot-icon-light-bulbs-8XWYSCLGB6.svg';

const Header = ({ isAuth }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={IconLuma} alt="LUMA logo" className="logo-icon" />
          <span className="logo-gradient">LUMA</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <img src={IconHome} alt="Home" className="nav-icon" />
            Home
          </Link>
          <Link to="/courses" className="nav-link">
            <img src={IconCourses} alt="Courses" className="nav-icon" />
            Courses
          </Link>
          <Link to="/about" className="nav-link">
            <img src={IconAbout} alt="About" className="nav-icon" />
            About
          </Link>
          {isAuth ? (
            <Link to="/account" className="nav-link account-link">
              <img src={IconAccount} alt="Account" className="nav-icon" />
              Account
            </Link>
          ) : (
            <Link to="/login" className="nav-link login-link">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
