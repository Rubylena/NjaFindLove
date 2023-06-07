import React, { useState } from 'react'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer/Footer'
import { isAuthenticated } from '../../api/urlAuth'
import Logout from '../../components/Logout/Logout'
import Login from '../Login/Login'

const Home = () => {
    const [login, setLogin] = useState(false)
    return (
        <div className='landing-page'>
            <Navbar action={() => setLogin(!login)} />
            <main className=' bg-tint-pink h-full flex items-center justify-center'>
                <h1 className='font-black text-3xl md:text-7xl  md:w-3/4 text-center'>Find love around you,
                    sign up with 9jafindlove.</h1>
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

export default Home