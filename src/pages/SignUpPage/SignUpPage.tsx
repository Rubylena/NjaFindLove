import './SignupPage.scss'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import SignUp from '../../components/SignUp/SignUp'
import { useState } from 'react'
import Login from '../Login/Login'
// import { Dialog, Transition } from '@headlessui/react'
// import LogIn from '../../components/LogIn/LogIn'

const SignUpPage = () => {
  const [login, setLogin] = useState(false)

  return (
    <div className='landing-page'>
      <Navbar text='LOG IN' action={()=>setLogin(!login)}  />
      <main className=' bg-tint-pink h-full'>
        <SignUp />
      </main>
      <Footer />
      {login && (  
        <Login login={login} setLogin={setLogin} />
      )}
    </div>
  )
}

export default SignUpPage