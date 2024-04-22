import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CandidateMyAccount.css'; // Import custom CSS file

const CandidateMyAccount = () => {
  const [selectedTab, setSelectedTab] = useState('personal-info'); // Initial selected tab

  // Static data for personal information
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    dateOfBirth: "1990-01-01",
  };

  // Static data for courses
  const courses = [
    {
      id: 1,
      name: "Course 1",
      imageName: "image1.jpg",
      description: "Description for Course 1",
      totalSessions: 10,
      price: 100,
    },
    {
      id: 2,
      name: "Course 2",
      imageName: "image2.jpg",
      description: "Description for Course 2",
      totalSessions: 8,
      price: 80,
    },
  ];

  // Static data for batches
  const batches = [
    {
      id: 1,
      name: "Batch 1",
      startDate: "2024-05-01",
      endDate: "2024-06-01",
      batchSessions: [
        {
          id: 1,
          name: "Session 1",
          attendances: [
            {
              id: 1,
              date: "2024-05-01",
              status: "Present",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Batch 2",
      startDate: "2024-06-01",
      endDate: "2024-07-01",
      batchSessions: [
        {
          id: 2,
          name: "Session 2",
          attendances: [
            {
              id: 2,
              date: "2024-06-01",
              status: "Absent",
            },
          ],
        },
      ],
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'personal-info':
        return (
          <div className="personal-info-container">
            <h3 className="personal-info-heading">Personal Information</h3>
            <div className="personal-info-details">
              <p><span className="info-label">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
              <p><span className="info-label">Email:</span> {userInfo.email}</p>
              <p><span className="info-label">Phone number:</span> {userInfo.phoneNumber}</p>
              <p><span className="info-label">Date of Birth:</span> {userInfo.dateOfBirth}</p>
              <Link to={"info/update"}>Update account information</Link>
            </div>
          </div>
        );
      case 'my-courses':
        return (
          <div className="my-courses-container">
            <h3 className="my-courses-heading">My Courses</h3>
            <ul className="course-list">
              {courses.map((course) => (
                <li key={course.id} className="course-item">
                  <div className="course-details">
                    <h4 className="course-name">{course.name}</h4>
                    <p className="course-description">{course.description}</p>
                    <ul className="course-params">
                      <li>
                        <span className="param-label">Image:</span>
                        <span className="param-value">{course.imageName}</span>
                      </li>
                      <li>
                        <span className="param-label">Total Sessions:</span>
                        <span className="param-value">{course.totalSessions}</span>
                      </li>
                      <li>
                        <span className="param-label">Price:</span>
                        <span className="param-value">${course.price}</span>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'my-batches':
        if (!batches || batches.length === 0) {
          return <p>You are not enrolled in any batches yet.</p>;
        }
        return (
          <div className="my-batches-container">
            <h3 className="my-batches-heading">My Batches</h3>
            <ul className="batch-list">
              {batches.map((batch) => (
                <li key={batch.id} className="batch-item">
                  <div className="batch-details">
                    <h4 className="batch-name">{batch.name}</h4>
                    <p>
                      <span className="batch-info-label">Start Date:</span> {batch.startDate}
                      <br />
                      <span className="batch-info-label">End Date:</span> {batch.endDate}
                    </p>
                    {new Date() < new Date(batch.startDate) ? ( 
                      <button disabled="true">
                        Batch haven't started yet
                      </button>
                    ) : (
                      <Link to={`/learn/${batch.id}`}>
                        Learn now
                      </Link>
                    )}                  
                    <div className="batch-sessions">
                      <h5 className="sessions-heading">Sessions</h5>
                      {batch.batchSessions && batch.batchSessions.length > 0 ? (
                        <ul className="session-list">
                          {batch.batchSessions.map((session) => (
                            <li key={session.id} className="session-list-item">
                              <p>{session.name}</p>
                              <p>Date: {session.attendances[0].date}</p>
                              <p>Attendance: {session.attendances[0].status}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No sessions available for this batch yet.</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'exams':
        return (
          <div className="exams-container">
            <h3 className="exams-heading">Exams</h3>
            <p>No exams available.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container my-account-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="menu">
            <ul>
              <li>
                <button
                  className={selectedTab === 'personal-info' ? 'active' : ''}
                  onClick={() => handleTabClick('personal-info')}
                >
                  Personal Information
                </button>
              </li>
              <li>
                <button
                  className={selectedTab === 'my-courses' ? 'active' : ''}
                  onClick={() => handleTabClick('my-courses')}
                >
                  My Courses
                </button>
              </li>
              <li>
                <button
                  className={selectedTab === 'my-batches' ? 'active' : ''}
                  onClick={() => handleTabClick('my-batches')}
                >
                  My Batches
                </button>
              </li>
              <li>
                <button
                  className={selectedTab === 'exams' ? 'active' : ''}
                  onClick={() => handleTabClick('exams')}
                >
                  Exams
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          {/* Content area */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CandidateMyAccount;
