import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/Courses.css';
import Cookies from 'js-cookie'

const apiUrl = process.env.REACT_APP_API_URL;

const FacultyCourseEdit = () => {
    const navigate = useNavigate();
    const [courseData,
        setCourseData] = useState(null);
    const [formData,
        setFormData] = useState({
        name: '', description: '', totalSessions: 0, price: 0
        // Add more fields if needed
    });
    const {courseId} = useParams();
    const accessToken = Cookies.get('token');

    // Add Authorization header th token
    const axiosInstance = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    useEffect(() => {
        const fetchCourseData = async() => {
            try {
                
                const response = await axiosInstance.get(`${apiUrl}/course/find/${courseId}`);
                setCourseData(response.data);
                setFormData({
                    name: response.data.name, description: response.data.description, totalSessions: response.data.totalSessions, price: response.data.price
                    // Initialize more fields if needed
                });
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`${apiUrl}/course/update/${courseId}`, formData);
            navigate(`/faculty/course-details/${courseId}`);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    if (!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-edit">
            <h2>Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="totalSessions">Total Sessions:</label>
                    <input
                        type="number"
                        id="totalSessions"
                        name="totalSessions"
                        value={formData.totalSessions}
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required/>
                </div>
                {/* Add more fields as needed */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FacultyCourseEdit;
