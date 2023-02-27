import React, { useState } from 'react'
import SidebarOptions from './SidebarOptions'
import meet from '../../asset/icon/meet.png'
import search from '../../asset/icon/search.png'
import people from '../../asset/icon/people.png'
import subscribe from '../../asset/icon/subscribe.png'
import visitors from '../../asset/icon/visitors.png'
import settings from '../../asset/icon/settings.png'
import arrDown from '../../asset/icon/arr-down.png'
import arrRight from '../../asset/icon/arr-right.png'
import profileImg from '../../asset/icon/profileImg.png'
import verified from '../../asset/icon/verified.png'
import caution from '../../asset/icon/caution.png'
import award from '../../asset/icon/Award.svg'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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
    // {
    //   img: people,
    //   child: 'People near you',
    //   link: 'people'
    // },
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
    // {
    //   img: settings,
    //   child: 'Settings',
    //   link: 'settings'
    // }
  ]

  return (
    <aside className='md:w-[22.3125rem] md:border-r pb-5 h-full'>
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

      <div className='p-3'>
        {openMenu ?
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
          ))
          :
          ''}
      </div>
    </aside>
  )
}

export default Sidebar