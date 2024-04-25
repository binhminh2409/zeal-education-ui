import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/Checkout.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_API_URL + "/course/images/"

function Checkout() {
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [course,
        setCourse] = useState(null);
    const [formData,
        setFormData] = useState({amount: '', note: ''});

    useEffect(() => {
        // Fetch course data using courseId
        fetch(`${apiUrl}/course/find/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course:', error));
    }, [courseId]);

    const handleSubmit = async(e) => {
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

            if (response.status === 201) {
                navigate("/my-account");
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
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <div className="item-container">
                <div className="item-image">
                    <img src={imgUrl + course.imageName}/>
                    <div className='mx-auto item-details '>
                        <h2>
                            {course.name}
                        </h2>
                        <p className='item-price'>
                            Price: ${course.price}
                        </p>
                        <p>
                            Total Sessions: {course.totalSessions}
                        </p>
                    </div>
                </div>
            </div>

            <div className="checkout">
                <div className="checkout-container">
                    <form>
                        <h3 className="heading-3">Credit card checkout</h3>
                        <div className="input">
                            <label>Cardholder's name</label>
                            <div className="input-field">
                                <input onChange={(event) => handleChange(event)} type='text' name='name'/>
                            </div>
                        </div>

                        <div className="input">
                            <label>Card Number</label>
                            <div className="input-field">
                                <input onChange={(event) => handleChange(event)} type='number' name='card_number'/>
                                <img src="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="input">
                                    <label>Expiration Date</label>
                                    <div className="input-field">
                                        <input onChange={(event) => handleChange(event)} type='month' name='exp_date'/>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input">
                                    <label>CVV</label>
                                    <div className="input-field">
                                        <input onChange={(event) => handleChange(event)} type='number' name='cvv'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="checkout-btn" onClick={handleSubmit} type="button">Purchase</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
