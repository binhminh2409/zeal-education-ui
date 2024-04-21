import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/CandidateMyAccount.css'; // Import custom CSS file

const apiUrl = process.env.REACT_APP_API_URL;

const CandidateMyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [courses, setCourses] = useState(null);
  const [batches, setBatches] = useState(null);
  const [selectedTab, setSelectedTab] = useState('personal-info'); // Initial selected tab

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('token'); 

        // Add Authorization header with token
        const axiosInstance = axios.create({
            baseURL: apiUrl,
            headers: { Authorization: `Bearer ${accessToken}` },
          });

        const userInfoResponse = await axiosInstance.get('/candidate/user-info');
        const batchesResponse = await axiosInstance.get(`${apiUrl}/candidate/find/batch/all`);

        setUserInfo(userInfoResponse.data);
        setBatches(batchesResponse.data);
        setCourses(batchesResponse.data.map(batch => {
            return {
              id: batch.course.id,
              name: batch.course.name,
              imageName: batch.course.imageName,
              description: batch.course.description,
              totalSessions: batch.course.totalSessions,
              price: batch.course.price,
            };
          }));        

        // Set selected tab based on URL path (optional for initial selection)
        // const urlPath = location.pathname.split('/').pop();
        // setSelectedTab(urlPath || 'personal-info'); // Default to personal-info
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location]); // Re-fetch data on route change (optional)

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
  switch (selectedTab) {
    case 'personal-info':
      return (
        <div className="personal-info-container">
          <h3 className="personal-info-heading">Personal Information</h3>
          {userInfo && (
            <div className="personal-info-details">
              <p><span className="info-label">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
              <p><span className="info-label">Email:</span> {userInfo.email}</p>
              <p><span className="info-label">Phone number:</span> {userInfo.phoneNumber}</p>
              <p><span className="info-label">Date of Birth:</span> {userInfo.dateOfBirth}</p>
              <Link to={"info/update"}>Update account information</Link>
            </div>
          )}
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
          {batches && batches.map((batch) => (
            <div key={batch.id} className="batch-exams">
              <div>Course: {batch.course.name}</div>
              <div className="exams-list">
                {batch.exams && batch.exams.map((exam) => (
                  <div key={exam.id} className="exam-item">
                    <p>{exam.name}</p>
                    <p>Start Date: {exam.startDate}</p>
                    <p>End Date: {exam.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

