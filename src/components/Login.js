import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation

import '../styles/Login.css'; // Import custom CSS file

const apiUrl = process.env.REACT_APP_API_URL;
const loginUrl = `${apiUrl}/authentication/login`;

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null); // State to hold error message


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const expiration = data.expiration; // Retrieve expiration from API response
        document.cookie = `token=${token}; max-age=${expiration}; path=/`; // Set token and expiration in cookie
        onLogin(); // Call the onLogin function passed as a prop
        navigate('/'); // Navigate to homepage
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred'); // Set error message
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
          {error && <p className="error-message">{error}</p>} {/* Render error message if error state is not null */}
        </button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;
