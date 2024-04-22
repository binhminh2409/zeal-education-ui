import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CourseDetails.css';
import Cookies from 'js-cookie'

const apiUrl = process.env.REACT_APP_API_URL;

const FacultyCourseDetails = () => {
    const navigate = useNavigate();
    const [courseData,
        setCourseData] = useState(null);
    const {courseId} = useParams();

    useEffect(() => {
        const fetchCourseData = async() => {
            try {
                const response = await axios.get(`${apiUrl}/course/find/${courseId}`);
                setCourseData(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleEdit = () => {
        navigate(`edit`)
    };

    const handleRemove = async() => {
        try {
            const accessToken = Cookies.get('token');

            // Add Authorization header th token
            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            await axiosInstance.delete(`${apiUrl}/course/delete/${courseId}`);
            // Navigate to the desired page after successful deletion
            navigate('/faculty')
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };
    
    const handleSeeSessions = () => {
      navigate('sessions')
    }

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-details">
            <h2>{courseData.name}</h2>
            <p>
                <strong>Image</strong>
            </p>
            <img
                src={`${apiUrl}/course/images/${courseData.imageName}`}
                className="card-img-top course-image"
                alt="Course"/>
            <p>
                <strong>Description:</strong>
                {courseData.description}</p>
            <p></p>
            <p>
                <strong>Total Sessions:</strong>
                {courseData.totalSessions}</p>
            <p>
                <strong>Price:</strong>
                ${courseData.price}</p>
            <div>
                <h3>Sessions</h3>
                <ul>
                    {courseData
                        .sessions
                        .map(session => (
                            <li key={session.id}>
                                <strong>{session.name}</strong>
                                <p>{session.description}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="buttons">
                <button className='m-1' onClick={handleEdit}>Edit</button>
                <button className='m-1' onClick={handleRemove}>Remove</button>
                <button className='m-1' onClick={handleSeeSessions}>See Course sessions</button>
            </div>
        </div>
    );
};

export default FacultyCourseDetails;
