import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-ze0w.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Signed up successfully!");
        navigate("/signin");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Cannot connect to server");
    } finally {
      setLoading(false);
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <select style={{ color: 'black' }} name="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="reporter">Reporter</option>
            <option value="user">User</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
