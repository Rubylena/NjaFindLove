import React, { useEffect, useState } from 'react'
import SidebarOptions from './SidebarOptions'
import meet from '../../asset/icon/meet.png'
import search from '../../asset/icon/search.png'
import subscribe from '../../asset/icon/subscribe.png'
import visitors from '../../asset/icon/visitors.png'
import arrDown from '../../asset/icon/arr-down.png'
import arrRight from '../../asset/icon/arr-right.png'
import profileImg from '../../asset/icon/profileImg.png'
import verified from '../../asset/icon/verified.png'
import caution from '../../asset/icon/caution.png'
import award from '../../asset/icon/Award.svg'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { axiosBase } from '../../api/api'
import { Local2 } from '../../api/auth'

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [userDetails, setUserDetails] = useState<Local2>();

  const location = useLocation();
  const active = location.pathname.split('/')[2]
  const [path] = useState<string>(active)

  const activeHandle = () => {
    setIsActive(addClass => !addClass);
    setOpenMenu(show => !show);
  }

  const data = [
    {
      img: meet,
      child: 'Meet',
      link: 'meet',
      extra: arrRight
    },
    {
      img: search,
      child: 'Search',
      extra: arrDown
    },
    {
      img: subscribe,
      child: 'Subscription',
      link: 'subscribe'
    },
    {
      img: visitors,
      child: 'Visitors',
      value: 0
    },
  ]

  const [formData, setFormData] = useState({
    session: '',
    email: '',
  })

  const handleSubmit = async ()=>{
    // setIsLoading(!isLoading)
    // event.preventDefault();
    try {
        const response = await axiosBase.get(`/InApp/GetDashboard/${userDetails?.session}/${userDetails?.email}`);
        console.log(response.data);
        // setIsProfileComplete(response.data.profileComplete!)
        // setPixUpload(response.data.pixUpload!)
        // localStorage.setItem('userDetails', JSON.stringify({userId: response.data.userId!, session: response.data.session, email:formLogInData.email}));
        // setResponseMsg(response.data.responseMessage!)
        // setIsLoading(isLoading)
    } catch (err) {
        console.error(err);
    }
}
handleSubmit()

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('userDetails')!);
  if (items) {
      setUserDetails(items);
  }
  if(userDetails){
    setFormData({...formData, session: userDetails.session, email: userDetails.email});
  }
  // console.log(formData);
}, []);

  return (
    <aside className='md:w-[22.3125rem] md:shadow-xl md:border-r md:border-grey md:border-opacity-60 h-full overflow-y-scroll hide-scroll md:pb-10'>
      <nav className='pb-2 md:hidden shadow-lg'>
        <Link to='/dashboard/profile'><section className='flex flex-col justify-center items-center bg-profile-bg text-white py-8 gap-4'>
          <img src={profileImg} alt='profile' />
          <div className='flex items-center gap-3'>
            <p className='font-medium text-2xl'>Full Name</p>
            <img src={verified} alt='verified' />
          </div>
          <div className='flex items-center gap-3'>
            <img src={caution} alt='caution information' />
            <p className='text-xs font-light'>Turn on your verification</p>
          </div>
        </section></Link>

        <div onClick={activeHandle} className={` ${isActive ? 'is-active' : ''}`}>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>

        <section className='flex flex-wrap justify-center text-center gap-8 mt-6 mb-4 px-14'>
          <div className='border border-red rounded p-2'>
            <p className='text-p-text'>Matched</p>
            <p className='text-2xl'>0</p>
          </div>

          <Link to='/dashboard/message' className={`active:bg-tint-pink ${path === 'message' ? 'bg-tint-pink rounded' : null}`}><div className='border border-red rounded p-2'>
            <p>Message</p>
            <p className='text-2xl'>1</p>
          </div></Link>
        </section>
      </nav>

      <div className='hidden md:block'>
        <Link to='/dashboard/profile'><section className='flex flex-col justify-center items-center bg-profile-bg text-white py-6 gap-4'>
          <img src={profileImg} alt='profile' />
          <div className='flex items-center gap-3'>
            <p className='font-medium text-2xl'>Full Name</p>
            <img src={verified} alt='verified' />
          </div>
          <div className='flex items-center gap-3'>
            <img src={caution} alt='caution information' />
            <p className='text-xs font-light'>Turn on your verification</p>
          </div>
        </section></Link>

        <section className='flex justify-between text-center mt-6 mb-4 px-14'>
          <div className='border border-red rounded p-2'>
            <p className='text-p-text'>Matched</p>
            <p className='text-2xl'>0</p>
          </div>

          <Link to='/dashboard/message' className={`active:bg-tint-pink ${path === 'message' ? 'bg-tint-pink rounded' : null}`}><div className='border border-red rounded p-2'>
            <p>Message</p>
            <p className='text-2xl'>1</p>
          </div></Link>
        </section>

        <section className='px-12'>
          {data.map((item, idx) => (
            <SidebarOptions
              key={idx}
              link={item.link}
              image={item.img}
              alt={item.child}
              child={item.child}
              visits={item.value}
              style={item.extra === undefined ? 'hidden' : ''}
              arrow={item.extra}
            />
          ))}
        </section>

        <section
          className='price mt-2 mx-6 p-3 rounded-3xl'
        >
          <Link to='/dashboard/subscribe'><div className='flex justify-between items-center'>
            <p className='text-2xl'>Silver plan</p>
            <div>
              <img src={award} alt='award' />
              <p className='text-xs text-purple font-medium'>Popular</p>
            </div>
          </div>
            <div className='flex justify-between items-center mt-3'>
              <p className='text-xs font-medium'>Subscribe now</p>
              <p className='font-semibold text-[42px]'>N8,000</p>
            </div></Link>
        </section>
      </div>

      <div className='px-3'>
        {openMenu &&
          data.map((item, idx) => (
            <SidebarOptions
              key={idx}
              link={item.link}
              image={item.img}
              alt={item.child}
              child={item.child}
              visits={item.value}
              style={item.extra === undefined ? 'hidden' : ''}
              arrow={item.extra}
            />
          ))}
      </div>
    </aside>
  )
}

export default Sidebar