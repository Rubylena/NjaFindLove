import React, { useState } from 'react'
import ProfilePic from '../../components/Profile/ProfilePic'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import Logout from '../../components/Logout/Logout'

const ProfilePicture = () => {
    const [logout, setLogout] = useState(false)
  return (
    <div className='landing-page' >
      <Navbar action={()=>setLogout(!logout)} />
      <main className='landing-main bg-tint-pink h-full'>
        <ProfilePic />
      </main>
      <Footer />
      {logout && (<Logout logout={logout} setLogout={setLogout} />)}
    </div>
  )
}

export default ProfilePicture