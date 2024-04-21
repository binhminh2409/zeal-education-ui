import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/CandidateLearn.css'

const apiUrl = process.env.REACT_APP_API_URL;

const CandidateLearn = () => {
  const { batchId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null);

  const handleSessionClick = (sessionId) => {
    setSelectedSession(sessionId);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const accessToken = Cookies.get('token'); 
    
            // Add Authorization header with token
            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: { Authorization: `Bearer ${accessToken}` },
              });
    
            const courseDataResponse = await axiosInstance.get(`/candidate/learn/${batchId}`);
            setCourseData(courseDataResponse.data);       
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    }, [batchId]);

    if(!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="learning-container">
          <h2>{courseData.name}</h2>
          <div className="learning-content">
            <div className="learning-menu">
              <h3>Sessions</h3>
              <ul>
                {courseData.sessions.map((session) => (
                  <li key={session.id} onClick={() => handleSessionClick(session.id)}>
                    {session.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="learning-main">
              <h3>Resources</h3>
              {selectedSession && (
                <ul>
                  {courseData.sessions
                    .find((session) => session.id === selectedSession)
                    .resources.map((resource) => (
                      <li key={resource.id}>
                        <a href={resource.filePath} target="_blank" rel="noreferrer">
                          {resource.name}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
    );
};

export default CandidateLearn;
