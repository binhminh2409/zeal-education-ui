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
import CourseDetails from './components/CourseDetails';
import FacultyHomePage from './components/FacultyHomePage';
import FacultyCourseDetails from './components/FacultyCourseDetails';
import FacultyCourseEdit from './components/FacultyCourseEdit';
import CreateCourse from './components/CreateCourse';
import Logout from './components/Logout';
import CreateBatch from './components/CreateBatch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/course-details/:courseId" element={<CourseDetails />} />
          
          <Route path="/create" element={<CreateCourse />} />

          <Route path="/faculty" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyHomePage />
            </PrivateRoute>}
          />

          <Route path="/faculty/course-details/:courseId" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyCourseDetails />
            </PrivateRoute>}
          />
          <Route path="/faculty/course-details/:courseId/edit" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyCourseEdit />
            </PrivateRoute>}
          />
          <Route path="/faculty/course/create" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <CreateCourse />
            </PrivateRoute>}
          />

          <Route path="/faculty/batch-details" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyHomePage />
            </PrivateRoute>}
          />
          <Route path="/faculty/batch-details/:batchId" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyHomePage />
            </PrivateRoute>}
          />
          <Route path="/faculty/batch-details/:batchId/edit" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyHomePage />
            </PrivateRoute>}
          />
          <Route path="/faculty/batch/create" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <CreateBatch />
            </PrivateRoute>}
          />

          <Route path="/user-details" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <FacultyHomePage />
            </PrivateRoute>}
          />

          <Route path="/my-account" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <CandidateMyAccount />
            </PrivateRoute>}
          />

          <Route path="/my-account/info/update" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <CandidateInfoUpdate />
            </PrivateRoute>}
          />
          
          <Route path="/checkout/:courseId" element={<PrivateRoute isLoggedIn={isLoggedIn}>  
              <Checkout />
            </PrivateRoute>}
          />

          <Route path="/learn/:batchId" element={<PrivateRoute isLoggedIn={isLoggedIn}> 
              <CandidateLearn />
            </PrivateRoute>}
          />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
