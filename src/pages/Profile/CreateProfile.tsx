import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Nav/Navbar'
import Profile from '../../components/Profile/Profile'
import Logout from '../../components/Logout/Logout'

const CreateProfile = () => {
    const [logout, setLogout] = useState(false)

  return (
    <div className='landing-page' >
      <Navbar action={()=>setLogout(!logout)} />
      <div>

        <main className='landing-main bg-tint-pink'>
        {logout && (<Logout logout={logout} setLogout={setLogout} />)}
          <Profile />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default CreateProfile