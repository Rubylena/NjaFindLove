import React from 'react'
import iphone from '../../asset/icon/iphone.png'
import googlePlay from '../../asset/icon/google-play-icon.png'
import './footer.scss'

const Footer = (props:any) => {
  return (
    <footer className={`footer shadow-lg ${props.bg}`}>
        <div className='footer-down'>
            <ul>
                <li>About</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Quick links</li>
                <li>Help</li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer