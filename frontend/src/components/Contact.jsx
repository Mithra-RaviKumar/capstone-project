import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../pic1.png";

export default function Contact() {
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
        <img src={logo} alt="Clinic Logo" className="logo" />
        <h1>Contact Us</h1>
        <div className="clinic-info">
          <p>Email: contact@truheal.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Health St, Wellness City</p>
        </div>
      </div>
    </div>
  );
}
