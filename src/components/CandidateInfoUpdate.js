import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/CandidateInfoUpdate.css'

const apiUrl = process.env.REACT_APP_API_URL;

const CandidateInfoUpdate = () => {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  });

  const accessToken = Cookies.get('token'); 
      
  // Add Authorization header with token
  const axiosInstance = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
  });  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await axiosInstance.get('/candidate/user-info');
        setUserInfo(userInfoResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [accessToken]);

  // Prefill form data only after userInfo is available
  useEffect(() => {
    if (userInfo) {
      const dateOfBirth = userInfo.dateOfBirth ? userInfo.dateOfBirth.split('T')[0] : '';

      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        dateOfBirth: dateOfBirth || '',
      });
    }
  }, [userInfo]);

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
      // Make API call to update user information
      const response = await axiosInstance.put(`${apiUrl}/candidate/update/user-info`, formData);
    } catch (error) {
      console.error('Error updating personal information:', error);
      setError(error.response.data.message); // Set error message
    }
  };

  return (
    <div className="personal-info-update">
      <h3>Update Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
        {error && <p className="error-message">{error}</p>} {/* Render error message if error state is not null */}
      </form>
      <Link to="/my-account">Cancel</Link>
    </div>
  );
};

export default CandidateInfoUpdate;
