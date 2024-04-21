import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Courses.css'; 
import { useNavigate } from 'react-router-dom';
import TestImage from '../images/test.jpg';


const Courses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      name: "Web Development Fundamentals",
      imageName: "web-dev.jpg",  // Image names should match actual files
      description: "Learn the basics of building websites with HTML, CSS, and JavaScript.",
      price: 49.99,
    },
    {
      id: 2,
      name: "Data Science with Python",
      imageName: "data-science.jpg",
      description: "Master the tools and techniques for data analysis and machine learning with Python.",
      price: 79.99,
    },
    {
      id: 3,
      name: "Digital Marketing Essentials",
      imageName: "digital-marketing.jpg",
      description: "Develop your marketing skills and strategies for reaching your target audience online.",
      price: 59.99,
    },
  ];

  const handleBuy = () => {
    navigate(`/checkout/`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#4caf50' }}>Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 course-card">
            <img src={TestImage} className="card-img-top course-image" alt="Course" />
              <div className="card-body">
                <h5 className="card-title course-title">{course.name}</h5>
                <p className="card-text course-description">{course.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">Price: <span className="badge bg-success ms-2 course-price">{course.price}</span></small>
                <button className="btn btn-primary" onClick={() => handleBuy()}>Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
