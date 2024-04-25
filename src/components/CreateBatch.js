import React, {useEffect, useState} from 'react';
import '../styles/CreateCourse.css'
import Button from './Button'
import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateBatch = () => {
    const [courses,
        setCourses] = useState([])
    const [formData,
        setFormData] = useState({courseId: '', quantity: '', startDate: '', endDate: ''});

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchData = () => {
        var token = Cookies.get('token');
        axios({
            method: "GET",
            url: apiUrl + "/course/all",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setCourses(res.data);
                console.log(courses);
            }
        }).catch((err) => console.error(err));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        var token = Cookies.get('token');
        axios({
            method: "POST",
            url: apiUrl + "/batch/create",
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 201) {
                window
                    .location
                    .replace("/faculty");
            }
        }).catch((err) => console.error(err));
    };

    if (!courses) {
        return (<div>Loading...</div>)
    }

    return (
        <div>
            <div class='course-container'>
                <h1>Create A New Batch</h1>
            </div>

            <form className='form-control'>
                <select
                    id='courseId'
                    name='courseId'
                    value={formData.courseId}
                    onChange={(event) => handleChange(event)}
                    required>
                        <option value="">-- Select a course --</option>
                        {courses.map((course) => {
                        <option value={course.id}>{course.name}</option>
                        })}
                </select>
                <div>
                    <label htmlFor="title">Start date</label>
                    <input
                      type="datetime-local" // Change type to "datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={(e) => handleChange(e)}
                      required
                      id="startDate"
                      placeholder="Batch start date and time"
                    />
                </div>
                <div>
                    <label htmlFor="title">End date</label>
                    <input
                      type="datetime-local" // Change type to "datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={(e) => handleChange(e)}
                      required
                      id="endDate"
                      placeholder="Batch end date and time"
                    />
                </div>


                <Button onClick={handleFormSubmit}>Create Batch</Button>
            </form>
        </div>
    );
};

export default CreateBatch;
