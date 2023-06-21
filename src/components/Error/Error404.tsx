import React from 'react'
import err from '../../asset/images/404.jpg'
import './error404.scss'

const Error404 = () => {
  return (
    <div className='error-img'>
      <img src={err} alt='error display' />
    </div>
  )
}

export default Error404