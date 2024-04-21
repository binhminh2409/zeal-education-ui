import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'; // Import custom CSS file

const apiUrl = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/authentication/signup/candidate`, formData);
      if (response.status === 201) {
        setSuccessMessage('Sign up successful! Please login.');
        setFormData({
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          phoneNumber: '',
        });
      } else {
        setError('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="signup-container"> {/* Unique className for SignUp component */}
      <h2 className="signup-title">Sign Up</h2>
      {successMessage && <div className="signup-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="username" className="signup-label">Username</label>
          <input type="text" className="signup-input" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-label">Email address</label>
          <input type="email" className="signup-input" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password" className="signup-label">Password</label>
          <input type="password" className="signup-input" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="firstName" className="signup-label">First Name</label>
          <input type="text" className="signup-input" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="lastName" className="signup-label">Last Name</label>
          <input type="text" className="signup-input" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="dateOfBirth" className="signup-label">Date of Birth</label>
          <input type="date" className="signup-input" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div className="signup-form-group">
          <label htmlFor="phoneNumber" className="signup-label">Phone Number</label>
          <input type="text" className="signup-input" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
        {error && <div className="signup-error">{error}</div>}
      </form>
      <p className="signup-login-link">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default SignUp;
