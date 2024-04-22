import React, { useState } from 'react';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 2147483647,
    sessions: [{ name: '', description: '', resources: [{ name: '', filePath: '', type: '' }] }]
  });

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSessionChange = (sessionIndex, event) => {
    const { name, value } = event.target;
    const sessions = [...formData.sessions];
    sessions[sessionIndex][name] = value;
    setFormData({ ...formData, sessions });
  };

  const handleResourceChange = (sessionIndex, resourceIndex, event) => {
    const { name, value } = event.target;
    const sessions = [...formData.sessions];
    sessions[sessionIndex].resources[resourceIndex][name] = value;
    setFormData({ ...formData, sessions });
  };

  const handleAddSession = () => {
    setFormData({
      ...formData,
      sessions: [...formData.sessions, { name: '', description: '', resources: [{ name: '', filePath: '', type: '' }] }]
    });
  };

  const handleAddResource = (sessionIndex) => {
    const sessions = [...formData.sessions];
    sessions[sessionIndex].resources.push({ name: '', filePath: '', type: '' });
    setFormData({ ...formData, sessions });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleCourseChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleCourseChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleCourseChange} required />
      </div>
      <div className="sessions">
        {formData.sessions.map((session, sessionIndex) => (
          <div key={sessionIndex} className="session">
            <div className="form-group">
              <label htmlFor={`sessionName${sessionIndex}`}>Session Name:</label>
              <input type="text" id={`sessionName${sessionIndex}`} name={`sessionName${sessionIndex}`} value={session.name} onChange={(event) => handleSessionChange(sessionIndex, event)} required />
            </div>
            <div className="form-group">
              <label htmlFor={`sessionDescription${sessionIndex}`}>Session Description:</label>
              <textarea id={`sessionDescription${sessionIndex}`} name={`sessionDescription${sessionIndex}`} value={session.description} onChange={(event) => handleSessionChange(sessionIndex, event)} required />
            </div>
            <div className="resources">
              {session.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="resource">
                  <div className="form-group">
                    <label htmlFor={`resourceName${sessionIndex}_${resourceIndex}`}>Resource Name:</label>
                    <input type="text" id={`resourceName${sessionIndex}_${resourceIndex}`} name={`resourceName${sessionIndex}_${resourceIndex}`} value={resource.name} onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`resourceFilePath${sessionIndex}_${resourceIndex}`}>Resource File Path:</label>
                    <input type="text" id={`resourceFilePath${sessionIndex}_${resourceIndex}`} name={`resourceFilePath${sessionIndex}_${resourceIndex}`} value={resource.filePath} onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`resourceType${sessionIndex}_${resourceIndex}`}>Resource Type:</label>
                    <input type="text" id={`resourceType${sessionIndex}_${resourceIndex}`} name={`resourceType${sessionIndex}_${resourceIndex}`} value={resource.type} onChange={(event) => handleResourceChange(sessionIndex, resourceIndex, event)} required />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => handleAddResource(sessionIndex)}>Add Resource</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddSession}>Add Session</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;

