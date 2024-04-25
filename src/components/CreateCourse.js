import React, {useState} from 'react';
import '../styles/CreateCourse.css'
import Button from './Button'
import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

const CourseForm = () => {
    const [formDataImage,
        setFormDataImage] = useState(new FormData())
    const [formData,
        setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        sessions: [
            {
                name: '',
                description: '',
                resources: [
                    {
                        name: '',
                        filePath: '',
                        type: ''
                    }
                ]
            }
        ]
    });

    const handleCourseChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSessionChange = (sessionIndex, event) => {
        const {name, value} = event.target;
        const fieldName = name.split('-')[1];
        const sessions = [...formData.sessions];
        sessions[sessionIndex] = {
            ...sessions[sessionIndex],
            [fieldName]: value
        };
        setFormData({
            ...formData,
            sessions
        });

    };

    const handleResourceChange = (sessionIndex, resourceIndex, event) => {
        const {name, value} = event.target;
        const fieldName = name.split('-')[1];
        const sessions = [...formData.sessions];
        sessions[sessionIndex].resources[resourceIndex][fieldName] = value;
        setFormData({
            ...formData,
            sessions
        });
    };

    const handleAddSession = () => {
        setFormData({
            ...formData,
            sessions: [
                ...formData.sessions, {
                    name: '',
                    description: '',
                    resources: [
                        {
                            name: '',
                            filePath: '',
                            type: ''
                        }
                    ]
                }
            ]
        });
    };

    const handleAddResource = (sessionIndex) => {
        const sessions = [...formData.sessions];
        sessions[sessionIndex]
            .resources
            .push({name: '', filePath: '', type: ''});
        setFormData({
            ...formData,
            sessions
        });
    };

    const handleRemoveSession = (sessionIndex) => {
        const sessions = [...formData.sessions];
        sessions.splice(sessionIndex, 1);
        setFormData({
            ...formData,
            sessions
        });
    };

    const handleRemoveResource = (sessionIndex, resourceIndex) => {
        const sessions = [...formData.sessions];
        sessions[sessionIndex]
            .resources
            .splice(resourceIndex, 1);
        setFormData({
            ...formData,
            sessions
        });
    };

    const handleFileChange = (event) => {
        const {files} = event.target;
        if (files.length > 0) {
            formDataImage.append('imageFile', files[0]);
            console.log(formDataImage);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Prepare the form data to be sent to the server
        const formDataToSend = {
            ...formData,
            imageFile: formDataImage.get('imageFile')
        };

        var token = Cookies.get('token');
        axios({
            method: "POST",
            url: apiUrl + "/course/create",
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 201) {
                axios({
                    method: "PUT",
                    url: `${apiUrl}/course/update/image/${res.data.id}`,
                    data: formDataToSend,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    console.log(response.data); 
                }).catch((error) => {
                    console.error("Resource Update Error:", error);
                });
            }
            window
                .location
                .replace("/");
        }).catch((err) => console.error(err));
    };

    return (
        <div>
            <div class='course-container'>
                <h1>Create Your Course</h1>
            </div>

            <form className='form-control'>
                <h2>Course</h2>
                <div>
                    <label htmlFor="title">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleCourseChange}
                        required
                        id="name"
                        placeholder="Course name"/>
                </div>

                <div>
                    <label htmlFor="title">Description</label>
                    <textarea
                    rows={5} cols={150}
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleCourseChange}
                        required
                        id="description"
                        placeholder="Course description"/>
                </div>

                <div>
                    <label htmlFor="title">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleCourseChange}
                        required
                        id="price"
                        placeholder="100"/>
                </div>
                <div>
                    <label htmlFor="courseImage">Course Image</label>
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event)}
                        accept=".png,.jpg,.jpeg"/>
                </div>
                <div className="sessions">
                    <h3>Sessions</h3>
                    {formData
                        .sessions
                        .map((session, sessionIndex) => (
                            <div key={sessionIndex} className="session">
                                <div >
                                    <label htmlFor={`session-name-${sessionIndex}`}>Session Name:</label>
                                    <input
                                        type="text"
                                        id={`session-name-${sessionIndex}`}
                                        name={`session-name-${sessionIndex}`}
                                        value={session.name}
                                        onChange={(event) => handleSessionChange(sessionIndex, event)}
                                        required
                                        placeholder="Session name"/>
                                </div>
                                <div >
                                    <label htmlFor={`session-description-${sessionIndex}`}>Session Description:</label>
                                    <textarea
                                    rows={5} cols={100}
                                        id={`session-description-${sessionIndex}`}
                                        name={`session-description-${sessionIndex}`}
                                        value={session.description}
                                        onChange={(event) => handleSessionChange(sessionIndex, event)}
                                        required
                                        placeholder="Session description"/>
                                </div>
                                <div className="resources">
                                    <h3>Session Resources</h3>
                                    {session
                                        .resources
                                        .map((resource, resourceIndex) => (
                                            <div key={resourceIndex} className="resource">
                                                <div >
                                                    <label htmlFor={`resource-name-${sessionIndex}_${resourceIndex}`}>Resource Name:</label>
                                                    <input
                                                        type="text"
                                                        id={`resource-name-${sessionIndex}_${resourceIndex}`}
                                                        name={`resource-name-${sessionIndex}_${resourceIndex}`}
                                                        value={resource.name}
                                                        onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)}
                                                        required
                                                        placeholder="Resource name"/>
                                                </div>
                                                <div >
                                                    <label htmlFor={`resource-filePath-${sessionIndex}_${resourceIndex}`}>Resource Content:</label>
                                                    <textarea
                                                    rows='5' cols='100'
                                                        id={`resource-filePath-${sessionIndex}_${resourceIndex}`}
                                                        name={`resource-filePath-${sessionIndex}_${resourceIndex}`}
                                                        value={resource.filePath}
                                                        onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)}
                                                        placeholder="Resource file path"/>
                                                </div>
                                                <div >
                                                    <label htmlFor={`resource-type-${sessionIndex}_${resourceIndex}`}>Resource Type:</label>
                                                    <select
                                                        id={`resource-type-${sessionIndex}_${resourceIndex}`}
                                                        name={`resource-type-${sessionIndex}_${resourceIndex}`}
                                                        value={resource.type}
                                                        onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)}
                                                        required>
                                                        <option value="">-- Select Type --</option>
                                                        <option value="Text">Text</option>
                                                        <option value="Video URL">Video Tutorial</option>
                                                        <option value="Ebook">Ebook</option>
                                                    </select>
                                                </div>
                                                <Button onClick={() => handleRemoveResource(sessionIndex, resourceIndex)}>Remove Resource</Button>
                                            </div>

                                        ))}
                                    <div>
                                        <Button onClick={() => handleAddResource(sessionIndex)}>Add New Resource</Button>
                                    </div>
                                </div>
                                <Button className='btn-red' onClick={() => handleRemoveSession(sessionIndex)}>Remove Session</Button>
                            </div>
                        ))}
                    <div>
                        <Button onClick={() => handleAddSession()}>Add New Session</Button>
                    </div>
                </div>
                <Button onClick={handleFormSubmit}>Create Course</Button>
            </form>
        </div>
    );
};

export default CourseForm;
