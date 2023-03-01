import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import profileImg from '../../asset/images/profileImg.svg'
import verified from '../../asset/icon/verified.png'
import caution from '../../asset/icon/caution.png'
import logoutImg from '../../asset/icon/logout.svg'
import edit from '../../asset/icon/edit.svg'
import profilePix from '../../asset/images/demoPix.svg'
import Logout from '../../components/Logout/Logout';

const EditProfile = () => {
  const [logout, setLogout] = useState(false)

  return (
    <DashboardLayout>
      <section className='px-6 pt-10 md:pr-20'>

        <div className='flex flex-wrap justify-center md:justify-between items-center mb-5 gap-5'>
          <div className='flex flex-wrap justify-center items-center gap-6'>
            <div className='md:w-32'>
              <img src={profileImg} alt='profile picture' className='w-full' />
            </div>
            <div>
              <div className='flex items-center gap-3'>
                <p className='font-bold text-4xl md:text-[42px]'>FullName</p>
                <img src={verified} alt='verified' />
              </div>
              <div className='flex items-center gap-1 mt-3'>
                <img src={caution} alt='caution information' />
                <p className='text-xl font-light'>Turn on your verification</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={()=>setLogout(!logout)}>
            <img src={logoutImg} alt='logout' />
            <p className='text-red font-medium'>Log out</p>
            {logout && (<Logout  logout={logout} setLogout={setLogout} />)}
          </div>
        </div>

        <section>

          <div className='flex flex-wrap gap-3 items-center'>
            <h2 className='font-bold text-[33px] leading-8'>Personal information</h2>
            <div className='flex items-center gap-1 w-5 cursor-pointer'>
              <img src={edit} alt='edit' className='w-full' />
              <p className='text-blue text-2xl text-medium'>Edit</p>
            </div>
          </div>

          <div className='flex flex-col gap-10 md:gap-0 md:flex-row mt-3 mb-8'>
            <div className='md:w-3/4 flex flex-col gap-3'>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>About:</p>
                <p>Living life</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Appearance:</p>
                <p>103 cm, black hair and brown eyes</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Relationship:</p>
                <p>I'm single</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Sexuality:</p>
                <p> I'm straight</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Languages:</p>
                <p className='text-blue font-medium'>Add info</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Children:</p>
                <p className='text-blue font-medium'>Add info</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Smoking:</p>
                <p className='text-blue font-medium'>Add info</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Location</p>
                <p>Lagos</p>
              </div>
              <div className='flex flex-wrap gap-2 items-center'>
                <p className='lg:w-2/6 font-semibold text-xl'>Interest:</p>
                <div className='flex gap-2 items-center'>
                  <p>Travels, Football, Reading</p>
                  <div className='flex w-4 items-center gap-1 cursor-pointer'>
                    <img src={edit} alt='edit' className='w-full' />
                    <p className='text-blue font-medium'>Edit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='md:w-1/4 flex flex-col items-center'>
              <img src={profilePix} alt='profile picture' />
              <p className='bg-tint-pink py-2 px-6 rounded-2xl text-center text-blue font-medium mt-1'>Add more pictures</p>
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  )
}

export default EditProfile