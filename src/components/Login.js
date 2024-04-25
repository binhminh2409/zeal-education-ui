import React, {useEffect, useState} from 'react'
import {Button} from './Button';
import '../styles/Login.css'
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const [role,
        setRole] = useState("Candidate");
    const [username,
        setUsername] = useState("");
    const [password,
        setPassword] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        validateToken()
    }, []);
    async function validateToken() {
        var token = Cookies.get('token');
        if (token != null) {
            var current = Math.round(Date.now() / 1000);
            if (token.exp < current) {
                Cookies.remove('token');
            } else {
                window
                    .location
                    .replace("/");
            }
        }
    }

    async function login() {
        //console.warn(email, password);
        let item = {
            username,
            password
        };
        let result;
        console.log(item)
        fetch(apiUrl + "/authentication/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        }).then(data => {
            Cookies.set('token', data.token);
            Cookies.set('expiration', data.expiration);
            if (role == "Candidate") {
                Cookies.set('role', 'Candidate');
                window
                    .location
                    .replace("/");
            } else {
                Cookies.set('role', 'Faculty');
                window
                    .location
                    .replace("/faculty");
            }
        }).catch(async(err) => {
            let x = await err.json();
            console.log(x.message);
        });
    }
    return (
        <div>
            <div class='container'>
                <h1>Welcome Back</h1>
                <form action="" className="form-control">
                    <div>
                        <label htmlFor="email">Username*</label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setUsername(e.target.value)}
                            id="email"
                            placeholder="Enter Your Username"/>
                    </div>

                    <div>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="Enter Your Password"/>
                    </div>
                    <span>Log in as</span>
                    <select name='role' onChange={(e) => setRole(e.target.value)}>
                        <option value="Candidate">Candidate</option>
                        <option value="Faculty">Teacher</option>
                    </select>
                    <Button onClick={login} className="btn" type="button">Log In</Button>
                </form>
            </div>
        </div>
    )
}

export default Login