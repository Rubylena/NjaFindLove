import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Nav/Navbar'
import Profile from '../../components/Profile/Profile'

const CreateProfile = () => {
    const [login, setLogin] = useState(false)

  return (
    <div className='landing-page' >
      <Navbar text='LOG IN' action={()=>setLogin(!login)} />
      <main className='landing-main bg-tint-pink'>
        <Profile />
      </main>
      <Footer />
    </div>
  )
}

export default CreateProfile