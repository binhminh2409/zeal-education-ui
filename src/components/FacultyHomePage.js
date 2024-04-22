import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FacultyHomePage.css';
import {Link, useNavigate} from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const FacultyHomePage = () => {
    const navigate = useNavigate();
    const [userEnquiries,
        setUserEnquiries] = useState([]);
    const [batchEnquiries,
        setBatchEnquiries] = useState([]);
    const [courseEnquiries,
        setCourseEnquiries] = useState([]);
    const [courses,
        setCourses] = useState([]);
    const [batches,
        setBatches] = useState([]);
    const [enrollments,
        setEnrollments] = useState([]);
    const [selectedMenu,
        setSelectedMenu] = useState('user');

    useEffect(() => {
        const fetchEnquiries = async() => {
            const accessToken = Cookies.get('token');

            // Add Authorization header th token
            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            try {
                // Fetch user enquiries
                const userEnquiriesResponse = await axiosInstance.get('/admin/user-enquiry');
                setUserEnquiries(userEnquiriesResponse.data);

                // Fetch batch enquiries
                const batchEnquiriesResponse = await axiosInstance.get('/admin/batch-enquiry');
                setBatchEnquiries(batchEnquiriesResponse.data);

                // Fetch course enquiries
                const courseEnquiriesResponse = await axiosInstance.get('/admin/course-enquiry');
                setCourseEnquiries(courseEnquiriesResponse.data);

                // Fetch enrollments
                const enrollmentResponse = await axiosInstance.get('/admin/enrollment/all');
                setEnrollments(enrollmentResponse.data);

                // Fetch batches
                const batchesResponse = await axiosInstance.get('/admin/batch');
                setBatches(batchesResponse.data);

                // Fetch courses
                const coursesResponse = await axiosInstance.get('/course/full/all');
                setCourses(coursesResponse.data);

            } catch (error) {
                console.error('Error fetching enquiries:', error);
            }
        };

        fetchEnquiries();
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const onClickNavigate = (url) => {
        navigate(url);
    }

    const renderEnquiries = () => {
        switch (selectedMenu) {
            case 'user-enquiry':
                return (
                    <div className="enquiries-section">
                        <h2>User Enquiries</h2>
                        <ul>
                            {userEnquiries.map(enquiry => (
                                <li key={enquiry.id}>
                                    Event: {enquiry.description}
                                    <Link to={`user-details/${enquiry.userId}`}>See new user details</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'batch-enquiry':
                return (
                    <div className="enquiries-section">
                        <h2>Batch Enquiries</h2>
                        <ul>
                            {batchEnquiries.map(enquiry => (
                                <li key={enquiry.id}>
                                    Batch id: {enquiry.batchId}
                                    <br></br>
                                    Event: {enquiry.description}
                                    <Link to={`batch-details/${enquiry.batchId}`}>See batch details</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'course-enquiry':
                return (
                    <div className="enquiries-section">
                        <h2>Course Enquiries</h2>
                        <ul>
                            {courseEnquiries.map(enquiry => (
                                <li key={enquiry.id}>
                                    Course id: {enquiry.CourseId}
                                    <br></br>
                                    Event: {enquiry.description}
                                    <button onClick={() => onClickNavigate(`course-details/${enquiry.CourseId}`)}>See course details</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            case 'enrollment':
                return (
                    <div className="enquiries-section">
                        <h2>Enrollments</h2>
                        <ul>
                            {enrollments.map(enrollment => (
                                <li key={enrollment.id}>
                                    Amount: {enrollment.amount}
                                    <br></br>
                                    at {enrollment.createdDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            case 'course':
                return (
                    <div className="enquiries-section">
                        <h2>Courses</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>
                                            <button onClick={() => onClickNavigate(`course-details/${course.id}`)}>See course details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            case 'batch':
                return (
                    <div className="enquiries-section">
                        <h2>Batches</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map(batch => (
                                    <tr key={batch.id}>
                                        <td>{batch.course.name}</td>
                                        <td>{batch.startDate}</td>
                                        <td>{batch.endDate}</td>
                                        <td>
                                            <button onClick={() => onClickNavigate(`batch-details/${batch.id}`)}>See batch details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="admin-home-page">

                <div className="side-menu">
                    <ul>
                        <li
                            className={selectedMenu === 'user-enquiry'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('user-enquiry')}>User Enquiries</li>
                        <li
                            className={selectedMenu === 'batch-enquiry'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('batch-enquiry')}>Batch Enquiries</li>
                        <li
                            className={selectedMenu === 'course-enquiry'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('course-enquiry')}>Course Enquiries</li>
                        <li
                            className={selectedMenu === 'enrollment'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('enrollment')}>Enrollments</li>
                        <li
                            className={selectedMenu === 'course'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('course')}>Courses</li>
                        <li
                            className={selectedMenu === 'batch'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('batch')}>Batches</li>
                    </ul>
                </div>

                <div className="enquiries">
                    {renderEnquiries()}
                </div>
            </div>
        </div>
    );
};

export default FacultyHomePage;
