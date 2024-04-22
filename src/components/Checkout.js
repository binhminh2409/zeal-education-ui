import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Checkout.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function Checkout() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({ amount: '', note: '' });

    useEffect(() => {
        // Fetch course data using courseId
        fetch(`${apiUrl}/course/find/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course:', error));
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = Cookies.get('token');

            // Add Authorization header with token
            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const response = await axiosInstance.post(`${apiUrl}/candidate/create/enrollment`, {
                courseId: courseId,
                amount: course.price,
                status: 'proccessing',
                note: formData.note
            });

            if (response.status === 200) {
                navigate("my-account");
            } else {
                console.error(response);
                // Handle payment failure
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-checkout">
            <h2>Checkout</h2>
            <div>
                <h3>{course.name}</h3>
                <img
                    src={`${apiUrl}/course/images/${course.imageName}`}
                    className="card-img-top course-image"
                    alt="Course" />
                <p>{course.description}</p>
                <p>Price: {course.price}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Amount: {course.price}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Checkout;
