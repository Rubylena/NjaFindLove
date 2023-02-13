import React, { useState } from 'react'
import ProfilePic from '../../components/Profile/ProfilePic'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'

const ProfilePicture = () => {
    const [logout, setLogout] = useState(false)
  return (
    <div className='landing-page' >
      <Navbar text='LOG IN' action={()=>setLogout(!logout)} />
      <main className='landing-main bg-tint-pink h-full'>
        <ProfilePic />
      </main>
      <Footer />
    </div>
    // <div>

    // </div>
  )
}

export default ProfilePicture