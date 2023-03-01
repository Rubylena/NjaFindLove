import React, { useState } from 'react'
import './nav.scss'
import logo from '../../asset/icon/logo.png'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../api/urlAuth';

interface Proptype {
  action?: (event: React.MouseEvent<HTMLElement>)=>void;
}

const Navbar = ({action}: Proptype) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header >
      <nav className='navbar shadow-lg'>
        <Link to='/'><div><img src={logo} alt='logo' /></div></Link>
        <div>
          <ul>
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/terms'>Terms and Conditions</Link></li>
            <li><Link to='/'>Support</Link></li>
          </ul>
        </div>
        <div onClick={action} className='login-btn cursor-pointer'>
          <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
        </div>
      </nav>

      <nav className='navbar-mobile shadow-lg'>
        <div><img src={logo} alt='logo' /></div>
        <div onClick={action} className='navbar-mobile-login-btn'>
          <p>{isAuthenticated() ? 'LOG OUT' : 'LOG IN'}</p>
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
                <li onClick={action} className='navbar-mobile-login-btn'>{isAuthenticated() ? 'LOG IN' : 'LOG IN'}</li>
              </ul>
            </div>
        </div>
      </nav>

    </header>
  )
}

export default Navbar