import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 
import logo from "../pic1.png";

export default function About() {
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
        <h1>About TruHeal Clinic</h1>
        <p>
          At TruHeal, we are committed to providing compassionate, personalized
          healthcare for every patient. Our team of expert doctors specialize in
          a wide range of medical services to ensure your well-being.
        </p>
        <p>
          We integrate technology with healthcare to provide seamless appointment
          booking, quick medical assistance, and continuous support.
        </p>
      </div>
    </div>
  );
}
