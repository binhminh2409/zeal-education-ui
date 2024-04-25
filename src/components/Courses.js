import '../styles/Cards.css';
import CardItem from './CardItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + "/course/all";
const imgUrl = process.env.REACT_APP_API_URL + "/course/images/"

function Courses() {
    const [searchTerm,
        setSearchTerm] = useState('');

    const [courseData,
        setCourseData] = useState([]);
    const [loading,
        setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            const response = await axios.get(apiUrl);
            setCourseData(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching course data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="cards">Loading...</div>;
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div className="cards">
            <h1>All Courses</h1>
            <br></br>
            {/* Search Bar */}
            <input
                className='mb-4'
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}/>
            <br></br>
            <div className="carddeck">
                {courseData.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (<CardItem
                    key={course.id}
                    src={imgUrl + course.imageName}
                    text={course.name}
                    path={'/course-details/' + course.id}/>))}
                {courseData.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && <p>No courses found</p>}
            </div>
        </div>
    );
}

export default Courses;