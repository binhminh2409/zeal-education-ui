import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CourseDetails.css'

const apiUrl = process.env.REACT_APP_API_URL;

const CourseDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const {courseId} = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/course/find/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details">
      <h2>{courseData.name}</h2>
      <p><strong>Description:</strong> {courseData.description}</p>
      <p><strong>Total Sessions:</strong> {courseData.totalSessions}</p>
      <p><strong>Price:</strong> ${courseData.price}</p>
      <div>
        <h3>Sessions</h3>
        <ul>
          {courseData.sessions.map(session => (
            <li key={session.id}>
              <strong>{session.name}</strong>
              <p>{session.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
