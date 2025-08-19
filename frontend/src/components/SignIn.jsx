import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "doctor") navigate("/doctor-dashboard");
      else if (data.role === "reporter") navigate("/reporter-dashboard");
      else navigate("/user-dashboard");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/signup" onClick={toggleSidebar}>Sign Up</Link>
        <Link to="/signin" onClick={toggleSidebar}>Sign In</Link>
        <Link to="/about" onClick={toggleSidebar}>About</Link>
        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      </div>

      <div className="menu-icon" onClick={toggleSidebar}>&#9776;</div>

      <div className="form-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
