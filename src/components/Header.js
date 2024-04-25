import {React, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

function Header({isLoggedIn, handleLogout}) {
    const navigate = useNavigate();
    const [click,
        setClick] = useState(false);
    const [button,
        setButton] = useState(true);
    const [isFaculty, setIsFaculty] = useState(false);

    useEffect(() => {
        const role = Cookies.get('role');
        if (role == 'Faculty') {setIsFaculty(true)};
    })

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }


    const myFunction = () => {
        document
            .getElementById("myDropdown")
            .classList
            .toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.circle') || event.target.parentNode.matches('.circle')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown
                        .classList
                        .remove('show');
                }
            }
        }
    }

    window.addEventListener('resize', showButton);
    return ( 
    <> 
    <nav className="navbar">
        <div class="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
                <i
                    className={click
                    ? 'fas fa-times'
                    : 'fas fa-bars'}/>
            </div>
            <Link to="/" className="navbar-logo">
                ZealEducation
            </Link>
            <ul
                className={click
                ? 'nav-menu active'
                : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        {!button && <i class="fas fa-home"></i>}Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/courses' className='nav-links' onClick={closeMobileMenu}>
                        {!button && <i class="fas fa-book"></i>}Courses
                    </Link>
                </li>
            </ul>
            <div class='nav-menu-right'>
                <Link to='/login' className='login-link'>
                    {button && !isLoggedIn && <Button buttonStyle="btn--secondary" to="/login">Login</Button>}
                </Link>
                <Link to='/signup' className='signup-link'>
                    {button && !isLoggedIn && <Button >Signup</Button>}
                </Link>
                <div class="dropdown">
                    {isLoggedIn && <button class="circle" onClick={myFunction}><i className='fa fa-user'></i></button>}
                    {!isLoggedIn && !button && <button class="circle" onClick={myFunction}>
                        <i class="fas fa-user"></i>
                    </button>}
                    <div id="myDropdown" class="dropdown-content">
                        {!isLoggedIn && <Link to='/login' className='login-link'>Login</Link>}
                        {!isLoggedIn && <Link to='/signup' className='login-link'>Sign Up</Link>}
                        {isLoggedIn && isFaculty && <Link to='/faculty' className='login-link'>Faculty dashboard</Link>}
                        {isLoggedIn && !isFaculty && <Link to='/my-account' className='login-link'>My Account</Link>}
                        {isLoggedIn && <Link to='/logout' className='login-link'>Logout</Link>}
                    </div>
                </div>
            </div>
        </div>
    </nav> 
    </>
);
}

export default Header;