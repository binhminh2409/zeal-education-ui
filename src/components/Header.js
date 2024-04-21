import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate to home page on click
  };

  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="header-title" onClick={handleClick}>Welcome to Zeal Education</h1>
        <nav>
          {isLoggedIn ? (
             <div>
             <Link to="/my-account" className="btn btn-primary me-2">
               <i className="fas fa-user"></i> My Account
             </Link>
             <button className="btn btn-danger" onClick={handleLogout}>
               Logout
             </button>
           </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

