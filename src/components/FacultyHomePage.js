import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FacultyHomePage.css';
import {Link, useNavigate} from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const FacultyHomePage = () => {
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
    const [selectedMenu,
        setSelectedMenu] = useState('user');
const navigate = useNavigate();
    useEffect(() => {
        fetchEnquiries();
    }, []);

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

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        dateObject.setHours(dateObject.getHours() + 7);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const calculateDaysLeft = (startDate, endDate) => {
        const now = new Date(); // Current date

        // If now is before the start date, return "Batch not started"
        if (now < new Date(startDate)) {
            return "Batch not started";
        }

        // If now is after the end date, return "Batch ended"
        if (now > new Date(endDate)) {
            return "Batch ended";
        }

        // Calculate the difference in days between now and the end date
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - now.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        // Return the difference in days
        return differenceInDays;
    };

    const handleNavigate = (url) => {
        navigate(url)
    }

    const editCourse = (courseId) => {
        navigate(`course-details/${courseId}/edit`);
    }

    const removeCourse = (courseId) => {
        const accessToken = Cookies.get('token');

            // Add Authorization header th token
            const axiosInstance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            axiosInstance.delete(`${apiUrl}/course/delete/${courseId}`).then(() => {
                fetchEnquiries();
            });
    }

    const renderEnquiries = () => {
        switch (selectedMenu) {
            case 'user-enquiry':
                return (
                    <div className="enquiries-section">
                        <h2>User Activities</h2>
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEnquiries.map(enquiry => (
                                    <tr key={enquiry.id}>
                                        <td>{enquiry.description}</td>
                                        <td>
                                            <Link to={`user-details/${enquiry.userId}`}>See New User Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                );
            case 'batch-enquiry':
                return (
                    <div className="enquiries-section">
                        <h2>Batch Activities</h2>
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>Batch ID</th>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batchEnquiries.map(enquiry => (
                                    <tr key={enquiry.id}>
                                        <td>{enquiry.batchId}</td>
                                        <td>{enquiry.description}</td>
                                        <td>{formatDate(enquiry.createdDate)}</td>
                                        <td>
                                            <Link to={`batch-details/${enquiry.batchId}`}>See Batch Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                );
           
            case 'enrollment':
                return (
                    <div className="enquiries-section">
                        <h2>Enrollments Activities</h2>
                        <table className='faculty-table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>See course details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (course.enrollments
                                    ?.map(enrollment => (
                                        <tr key={enrollment.id}>
                                            <td>{formatDate(enrollment.createdDate)}</td>
                                            <td>{enrollment.amount}</td>
                                            <td>{course.name}</td>
                                            <td>{enrollment.status}</td>
                                            <td>
                                                <Link to={`course-details/${course.id}`}>{course.id}</Link>
                                            </td>
                                        </tr>
                                    ))))}
                            </tbody>
                        </table>

                    </div>
                )
            case 'course':
                return (
                    <div className="enquiries-section">
                        <h2>Courses</h2>
                        <table className='faculty-table'>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Description</th>
                                    <th>Total Sessions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>{course.totalSessions}</td>
                                        <td><button className='btn btn-warning' onClick={() => editCourse(course.id)}>Edit course</button></td>
                                        <td><button className='btn btn-danger' onClick={() => removeCourse(course.id)}>Remove course</button></td>
                                        <td>
                                            <Link to={`course-details/${course.id}`}>See course details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='btn btn-primary' onClick={() => handleNavigate("/faculty/course/create")}>Create new course</button>
                    </div>
                )
            case 'batch':
                return (
                    <div className="enquiries-section">
                        <h2>Batches</h2>
                        <table className='faculty-table'>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Days left</th>
                                    <th>Max quantity</th>
                                    <th>Total Candidates</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map(batch => (
                                    <tr key={batch.id}>
                                        <td>{batch.course.name}</td>
                                        <td>{formatDate(batch.startDate)}</td>
                                        <td>{formatDate(batch.endDate)}</td>
                                        <td>{calculateDaysLeft(batch.startDate, batch.endDate)}</td>
                                        <td>{batch.quantity}</td>
                                        <td>{batch.batchSessions[0]
                                                ?.attendances.length}</td>
                                        <td>
                                            <Link to={`batch-details/${batch.id}`}>See batch details</Link>
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
                            onClick={() => handleMenuClick('user-enquiry')}>User Activities</li>
                        <li
                            className={selectedMenu === 'batch-enquiry'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('batch-enquiry')}>Batch Activities</li>
                        
                        <li
                            className={selectedMenu === 'enrollment'
                            ? 'active'
                            : ''}
                            onClick={() => handleMenuClick('enrollment')}>Enrollments Activities</li>
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
