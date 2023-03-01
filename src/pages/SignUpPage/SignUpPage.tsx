import './SignupPage.scss'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import SignUp from '../../components/SignUp/SignUp'
import { useState } from 'react'
import Login from '../Login/Login'
import { isAuthenticated } from '../../api/urlAuth'
import Logout from '../../components/Logout/Logout'

const SignUpPage = () => {
  const [login, setLogin] = useState(false)

  return (
    <div className='landing-page'>
      <Navbar action={() => setLogin(!login)} />
      <main className=' bg-tint-pink h-full'>
        <SignUp />
      </main>
      <Footer bg='bg-tint-pink' />
      {isAuthenticated() ?
        login && (
          <Logout logout={login} setLogout={setLogin} />
        )
        :
        login && (
          <Login login={login} setLogin={setLogin} />
        )
      }
    </div>
  )
}

export default SignUpPage