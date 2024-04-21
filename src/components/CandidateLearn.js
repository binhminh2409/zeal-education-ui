import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CandidateLearn.css';

const CandidateLearn = () => {
  const { batchId } = useParams();

  // Define static course data
  const staticCourseData = {
    name: 'Java Full Semester',
    sessions: [
      {
        id: '1',
        name: 'Session 1: Introduction to Java',
        resources: [
          { id: '1', name: 'Video 1', filePath: '/path/to/video1' },
          { id: '2', name: 'PDF 1', filePath: '/path/to/pdf1' },
        ],
      },
      {
        id: '2',
        name: 'Session 2: Data Types and Variables',
        resources: [
          { id: '3', name: 'Video 2', filePath: '/path/to/video2' },
          { id: '4', name: 'PDF 2', filePath: '/path/to/pdf2' },
        ],
      },
      // Add more sessions as needed
    ],
  };

  // State to keep track of selected session
  const [selectedSession, setSelectedSession] = useState(null);

  // Function to handle session click
  const handleSessionClick = (sessionId) => {
    setSelectedSession(sessionId);
  };

  return (
    <div className="learning-container">
      <h2>{staticCourseData.name}</h2>
      <div className="learning-content">
        <div className="learning-menu">
          <h3>Sessions</h3>
          <ul>
            {staticCourseData.sessions.map((session) => (
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
              {staticCourseData.sessions
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
