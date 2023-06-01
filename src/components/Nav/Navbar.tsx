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
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/terms'>Terms and Conditions</Link></li>
            <li><Link to='/'>Support</Link></li>
            <li className={isAuthenticated() ? '' : 'hidden'}><Link to='/dashboard/meet'>Dashboard</Link></li>
          </ul>
        </div>
        <div onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='login-btn cursor-pointer'>
          <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
          {logout && (<Logout logout={logout} setLogout={setLogout} />)}
        </div>
      </nav>

      <nav className='navbar-mobile shadow-lg'>
        <div><img src={logo} alt='logo' /></div>
        <div onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='navbar-mobile-login-btn'>
          <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
          {logout && (<Logout logout={logout} setLogout={setLogout} />)}
        </div>
        <button className='navbar-mobile-bars' onClick={() => setIsOpen(!isOpen)}>☰</button>

        <div className={`navbar-mobile-menu shadow-lg ${isOpen ? 'open' : 'closed'}`}>
          <div className='navbar-mobile-menu-close'>
            <button onClick={() => setIsOpen(!isOpen)}>✕</button>
          </div>
          <div>
            <ul>
              <li><Link to='/pricing'>Pricing</Link></li>
              <li><Link to='/terms'>Terms and Conditions</Link></li>
              <li><Link to='/'>Support</Link></li>
              <li className={isAuthenticated() ? '' : 'hidden'}><Link to='/dashboard/meet'>Dashboard</Link></li>
              <li onClick={!isAuthenticated() ? action : () => setLogout(!logout)} className='navbar-mobile-login-btn'>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</li>
              {logout && (<Logout logout={logout} setLogout={setLogout} />)}
            </ul>
          </div>
        </div>
      </nav>

    </header>
  )
}

export default Navbar