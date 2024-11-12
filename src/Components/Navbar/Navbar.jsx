import React, { useEffect, useRef, useState } from "react";
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { auth, logout } from "../../firebase"; // Import auth from Firebase

const Navbar = () => {
  const navRef = useRef();
  const [user, setUser] = useState(null);

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAuth = () => {
    if (user) {
      logout(); // Log out if user is logged in
    } else {
      window.location.href = "/login"; // Redirect to login if user is logged out
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Bell Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Caret Icon" />
          <div className="dropdown">
            {/* Conditional Rendering based on user authentication status */}
            <p onClick={handleAuth}>
              {user ? "Sign Out of Netflix" : "Sign In to Netflix"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
