import React, { useEffect, useState } from 'react'
import { Button } from './Button';
import '../styles/Login.css'
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

const Logout = () => {

    useEffect(() => {
        validateToken()
    }, []);
    async function validateToken() {
        var token = Cookies.get('token');
        var exp = Cookies.get('expiration');
        if (token != null) {
            var current = Math.round(Date.now() / 1000);
            if (exp < current) {
                Cookies.remove('token');
                Cookies.remove('expiration');
                Cookies.remove('role');
                window.location.replace("/");
            }
            else{
                Cookies.remove('token');
                Cookies.remove('expiration');
                Cookies.remove('role');
                window.location.replace("/");
            }
        }
        else{
            window.location.replace("/");
        }
    }

    
    return (
        <>
        
        </>
    )
}

export default Logout
