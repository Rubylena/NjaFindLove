import React from 'react'
import iphone from '../../asset/icon/iphone.png'
import googlePlay from '../../asset/icon/google-play-icon.png'
import './footer.scss'
import { Link } from 'react-router-dom'

const Footer = (props:any) => {
  return (
    <footer className={`footer shadow-lg ${props.bg}`}>
        <div className='footer-down'>
            <ul>
                {/* <li>About</li> */}
                {/* <li>Privacy</li> */}
                <Link to='/terms'><li>Terms and conditions</li></Link>
                {/* <li>Quick links</li>
                <li>Help</li> */}
            </ul>
        </div>
    </footer>
  )
}

export default Footer