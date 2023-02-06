import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUpPage/SignUpPage';
import Error404 from './components/Error/Error404';
import Dashboard from './pages/Home/Dashboard';
import CreateProfile from './pages/Profile/CreateProfile';
import ProfilePicture from './pages/Profile/ProfilePicture';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/profile-picture' element={<ProfilePicture />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
