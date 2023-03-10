import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUpPage/SignUpPage';
import Error404 from './components/Error/Error404';
import CreateProfile from './pages/Profile/CreateProfile';
import ProfilePicture from './pages/Profile/ProfilePicture';
import Meet from './pages/Meet/Meet';
import Subscribe from './pages/Subscribe/Subscribe';
import EditProfile from './pages/EditProfile/EditProfile';
import Message from './pages/Message/Message';
import Pricing from './pages/Pricing/Pricing';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import { ProtectedRoute } from './api/urlAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='*' element={<Error404 />} />

        <Route path='/pricing' element={<Pricing />} />
        <Route path='/terms' element={<TermsAndConditions />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard/meet' element={<Meet />} />
          <Route path='/dashboard/subscribe' element={<Subscribe />} />
          <Route path='/dashboard/profile' element={<EditProfile />} />
          <Route path='/dashboard/message' element={<Message />} />
          <Route path='/profile-picture' element={<ProfilePicture />} />
          <Route path='/create-profile' element={<CreateProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
