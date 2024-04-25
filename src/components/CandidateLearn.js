import React, {useState, useEffect} from 'react';
import {Markup} from 'interweave';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/CourseDetails.css'
import {Button} from './Button';
import Player from 'react-player';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

const CandidateLearn = () => {
    const [attendance, setAttendance] = useState(false);
    const navigate = useNavigate();
    const [courseData,
        setCourseData] = useState(null);
    const {batchId} = useParams();
    const [headerState,
        setHeaderState] = useState(0);

    useEffect(() => {
        const fetchCourseData = async() => {
            try {
                var accessToken = Cookies.get('token');
                const axiosInstance = axios.create({
                    baseURL: apiUrl,
                    headers: { Authorization: `Bearer ${accessToken}` },
                  });

                const response = await axiosInstance.get(`${apiUrl}/candidate/learn/${batchId}`);
                setCourseData(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
    }, [batchId]);

    if (!courseData) {
        return <div>Loading...</div>;
    }

    const changeHeaderState = async(e, state) => {
        e.preventDefault();
        setHeaderState(state);
    }

    const handleAttend = (sessionId) => {
        var accessToken = Cookies.get('token');
                const axiosInstance = axios.create({
                    baseURL: apiUrl,
                    headers: { Authorization: `Bearer ${accessToken}` },
                  });
                  axiosInstance.put(`${apiUrl}/candidate/update/attendance/${sessionId}`).then((res) => {
                    setAttendance(true);
                  });
    }

    function getYouTubeEmbedUrl(videoUrlString) {
        const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(watch\?v=)?([^#&?]+)/;
        const match = youtubeUrlRegex.exec(videoUrlString);

        if (match) {
            return `https://www.youtube.com/embed/${match[2]}`;
        } else {
            // Handle invalid video URL scenario (display error message or placeholder)
            return '';
        }
    }

    return (
        <div className="container border-0">
            <div className="video-details">

                <div className="details-nav">
                    <ul className="details-nav-tabs">
                        {courseData
                            .sessions
                            .map(session => (
                                <li className="details-nav-tab" key={session.id}>
                                    <a
                                        className={headerState === session.id
                                        ? 'details-nav-link active'
                                        : 'details-nav-link'}
                                        onClick={() => changeHeaderState(session.id)}>{session.name}</a>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="nav-tab-info">
                    {courseData
                        .sessions
                        .map((session, index) => (
                            <div
                                key={session.id}
                                className={headerState === session.id
                                ? 'active'
                                : 'inactive'}>
                                {index === 0
                                    ? (
                                        <div>
                                            <h3 className='content-header'>{session.name}</h3>
                                            <p>{session.description}</p>
                                            <div className="sessions content">
                                                {session.resources
                                                    ? (
                                                        <div className="session">
                                                            {session
                                                                .resources
                                                                .map(resource => (
                                                                    <div key={resource.id}>
                                                                        {resource.type === "Video URL" && (
                                                                            <div className="video-section">
                                                                                <Player url={`${apiUrl}/course/resources/${resource.fileName}`} controls width="560px" height="315px" />
                                                                            </div>
                                                                        )}
                                                                        {resource.type === "Text" && (<div
                                                                            dangerouslySetInnerHTML={{
                                                                            __html: resource.fileName
                                                                        }}/>)}
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )
                                                    : (
                                                        <span></span>
                                                    )}
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <h3 className='content-header'>{session.name}</h3>
                                            <p>{session.description}</p>
                                        </div>
                                    )}
                            </div>
                        ))}

                </div>
            </div>
            <div>
                <Button onClick={() => handleAttend(courseData.id)}>Attend</Button>
            </div>
        </div>
    );
};

export default CandidateLearn;
