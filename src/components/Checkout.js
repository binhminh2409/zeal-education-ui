import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Checkout.css'

const apiUrl = process.env.REACT_APP_API_URL;

function Checkout()  {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    note: ''
  });

  useEffect(() => {
    // Fetch course data using courseId
    // Example:
    fetch(`${apiUrl}/course/find/${courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course:', error));
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/candidate/create/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price,
          status: 'paid',
          note: formData.note,
        }),
      });
      if (response.ok) {
        // Payment successful
        // Redirect or show success message
      } else {
        console.error('Payment failed');
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
        <img src={`${apiUrl}/course/images/${course.imageName}`} className="card-img-top course-image" alt="Course" />
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
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Checkout;
