import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../pic1.png";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="home-container">
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/signup" onClick={toggleSidebar}>Sign Up</Link>
        <Link to="/signin" onClick={toggleSidebar}>Sign In</Link>
        <Link to="/about" onClick={toggleSidebar}>About</Link>
        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      </div>

      <div className="menu-icon" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="glass-box">
        <img src={logo} alt="TruHeal Logo" className="logo" />
        <h1>Welcome to TruHeal Clinic</h1>
        <div className="clinic-info">
          <p>Personalized care for every patient.</p>
          <p>Expert doctors in multiple specializations.</p>
          <p>Seamless appointment booking system.</p>
          <p>Focus on holistic health and wellness.</p>
          <p>Reliable and timely medical guidance.</p>
        </div>
        <div className="home-links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
