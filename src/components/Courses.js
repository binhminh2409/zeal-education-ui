import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Courses.css'; 
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(apiUrl + '/course/all');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleBuy = (courseId) => {
      navigate(`/checkout/${courseId}`);
    };

    const handleDetail = (courseId) => {
      navigate(`/details/${courseId}`)
    }

    if (!courses) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mt-5">
        <h2 className="mb-4" style={{ color: '#4caf50' }}>Courses</h2>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4" onClick={() => handleDetail(course.id)}>
              <div className="card h-100 course-card">
                <img src={`${apiUrl}/course/images/${course.imageName}`} className="card-img-top course-image" alt="Course" />
                <div className="card-body">
                  <h5 className="card-title course-title">{course.name}</h5>
                  <p className="card-text course-description">{course.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">Price: <span className="badge bg-success ms-2 course-price">{course.price}</span></small>
                  <button className="btn btn-primary" onClick={() => handleBuy(course.id)}>Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );      
};

export default Courses;
