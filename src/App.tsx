import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUpPage/SignUpPage';
import Error404 from './components/Error/Error404';
import CreateProfile from './pages/Profile/CreateProfile';
import ProfilePicture from './pages/Profile/ProfilePicture';
import Meet from './pages/Meet/Meet';
import People from './pages/People/People';
import Subscribe from './pages/Subscribe/Subscribe';
import Settings from './pages/Settings/Settings';
import EditProfile from './pages/EditProfile/EditProfile';
import Message from './pages/Message/Message';

function App() {

  if (!localStorage.getItem("isLoggedIn")) {
    window.location.replace("/sign-up");
  }

  window.addEventListener("popstate", function(event) {
    event.preventDefault();
    window.history.pushState(null, document.title, window.location.pathname);
  });

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/profile-picture' element={<ProfilePicture />} />
        <Route path='/dashboard/meet' element={<Meet />} />
        <Route path='/dashboard/people' element={<People />} />
        <Route path='/dashboard/subscribe' element={<Subscribe />} />
        <Route path='/dashboard/settings' element={<Settings />} />
        <Route path='/dashboard/profile' element={<EditProfile />} />
        <Route path='/dashboard/message' element={<Message />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
