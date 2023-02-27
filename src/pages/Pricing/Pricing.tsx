import React, { useState } from 'react'
import PriceCarousel from '../../components/PriceCarousel/PriceCarousel'
import girl from '../../asset/images/girlie.svg'
import silver from '../../asset/images/prices.svg'
import subscribe from '../../asset/images/subscribe.svg'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import Login from '../Login/Login'

const Pricing = () => {
    const [login, setLogin] = useState(false)
    const images = [subscribe, girl, silver, girl]

  return (
    <div className='landing-page'>
        <Navbar text='LOG IN' action={()=>setLogin(!login)} />
        <div className='h-full pt-20 m-auto'>
          <PriceCarousel images={images} />
        </div>
        <Footer />
        {login && (  
        <Login login={login} setLogin={setLogin} />
      )}
    </div>
  )
}

export default Pricing