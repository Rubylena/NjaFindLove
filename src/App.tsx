import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUpPage/SignUpPage';
import Home from './pages/Home/Dashboard';
import Error404 from './components/Error/Error404';
import CreateProfile from './pages/Profile/CreateProfile';
import Dashboard from './pages/Home/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
