import React, { useState } from 'react'
import './nav.scss'
import logo from '../../asset/icon/logo.png'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../api/urlAuth';
import Logout from '../Logout/Logout';

interface Proptype {
  action?: React.MouseEventHandler<HTMLElement>;
}

const Navbar = ({ action }: Proptype) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false)

  return (
    <header >
      <nav className='navbar shadow-lg'>
        <Link to='/'><div><img src={logo} alt='logo' /></div></Link>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/terms'>Terms and Conditions</Link></li>
            <li className={isAuthenticated() ? '' : 'hidden'}><Link to='/dashboard'>Dashboard</Link></li>
          </ul>
        </div>
        <div className='flex gap-5 items-center'>
          <p className={`${!isAuthenticated() ? 'signUp-btn' : 'hidden'}`}><Link to='/signup'>Sign Up</Link></p>

          <div onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='login-btn cursor-pointer'>
            <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
            {logout && (<Logout logout={logout} setLogout={setLogout} />)}
          </div>
        </div>
      </nav>

      <nav className='navbar-mobile gap-1 shadow-lg'>
        <div><img src={logo} alt='logo' /></div>
        <div className='flex flex-col gap-2 items-center'>
          <p className={`${!isAuthenticated() ? 'mobile-signUp-btn' : 'hidden'}`}><Link to='/signup'>Sign Up</Link></p>
          <div onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='navbar-mobile-login-btn'>
            <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
            {logout && (<Logout logout={logout} setLogout={setLogout} />)}
          </div>
        </div>
        <button className='navbar-mobile-bars' onClick={() => setIsOpen(!isOpen)}>☰</button>

        <div className={`navbar-mobile-menu shadow-lg ${isOpen ? 'open' : 'closed'}`}>
          <div className='navbar-mobile-menu-close'>
            <button onClick={() => setIsOpen(!isOpen)}>✕</button>
          </div>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              {/* <li><Link to='/pricing'>Pricing</Link></li> */}
              <li><Link to='/terms'>Terms and Conditions</Link></li>
              {/* <li><Link to='/'>Support</Link></li> */}
              <li className={isAuthenticated() ? '' : 'hidden'}><Link to='/dashboard'>Dashboard</Link></li>
              <li className={`${!isAuthenticated() ? 'mobile-signUp-btn' : 'hidden'}`}><Link to='/signup'>Sign Up</Link></li>
              <li onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='navbar-mobile-login-btn'>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</li>
              {logout && (<Logout logout={logout} setLogout={setLogout} />)}
            </ul>
          </div>
        </div>
      </nav >

    </header >
  )
}

export default Navbar