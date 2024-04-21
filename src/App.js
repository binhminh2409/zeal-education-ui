import React, {useState} from 'react';
import Courses from './components/Courses';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cookies from 'js-cookie';
import Checkout from './components/Checkout';
import SignUp from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import CandidateMyAccount from './components/CandidateMyAccount';
import CandidateLearn from './components/CandidateLearn';
import CandidateInfoUpdate from './components/CandidateInfoUpdate';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  const handleLogin = () => {
    // Login logic (set token in cookie)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logout logic (remove token from cookie)
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-account" element={<CandidateMyAccount />} />
            
          <Route path="/my-account/info/update" element={<CandidateInfoUpdate />} />
                    
          <Route path="/checkout/:courseId" element={<Checkout />} />
            
          <Route path="/learn/:batchId" element={<CandidateLearn />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
