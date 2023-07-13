import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import blackClose from '../../asset/icon/blackClose.svg'
import msg from '../../asset/icon/msg-chat.png'
import love from '../../asset/icon/love.svg'
import search from '../../asset/icon/search.png'
import { axiosBase } from '../../api/api'
import { Link } from 'react-router-dom'
// import AdsComponent from '../../components/Ads/AdsComponent'
import SIdebarSearch from '../../components/Sidebar/SIdebarSearch'
import { encryptStorage } from '../../encrypt/encrypt'
import Pagination from './Pagination'
import dummyImg from '../../asset/images/girlie.svg'

const Meet = () => {
  const [isClose, setIsClose] = useState(false);
  const [manyUserProfiles, setManyUserProfiles] = useState([])
  const [displayedProfiles, setDisplayedProfiles] = useState([])
  const [pageNumberFromPaginate, setPageNumberFromPaginate] = useState<any>()
  const [pageSizeFromPaginate, setPageSizeFromPaginate] = useState<number>()
  const [allProfiles, setAllProfiles] = useState<number>()
  const [openDown, setOpenDown] = useState(false)
  const [loadUsers, setLoadUsers] = useState<boolean>()
  const [userStoredData, setUserStoredData] = useState<any>()
  const [profileFromLocal, setProfileFromLocal] = useState<boolean>(false)
  const [like, setLike] = useState(false)
  const [likedResponse, setLikedResponse] = useState('')
  const [likeAlert, setLikeAlert] = useState(false)

  const cancelButtonRef = useRef<HTMLDivElement>(null)

  // Callback function that receives data from child
  const handleChildData = (childData: any) => {
    setManyUserProfiles(childData.users)
    encryptStorage.setItem('userProfiles', childData.users);
  }

  const handleLikes = async (session: string, email: string, id: number) => {
    try {
      setLike(!like)
      const response = await axiosBase.post(`${import.meta.env.VITE_LIKEUSER_URL}`, { session: session, email: email, id: id, like: like });
      if (response.data.success) {
        setLikeAlert(true)
        setLikedResponse('user liked')
      }
    } catch (err) {
      console.error(err);
    }
  }

  const paginatePageSizeData = (childData: any) => {
    console.log(childData)
    setPageSizeFromPaginate(childData)
  }
  const paginateData = (childData: any) => {
    console.log(childData)
    setPageNumberFromPaginate(childData)
  }
  const handleProfiles = async (session: string, email: string, id: number, size: number = 10, page: number = 1) => {
    try {
      setLoadUsers(true)
      encryptStorage.removeItem('userProfiles')
      const response = await axiosBase.post(`${import.meta.env.VITE_DISCOVERPEOPLE_URL}`, { session: session, email: email, id: id, pageSize: size, pageNumber: page });
      setManyUserProfiles(response.data.users)
      setAllProfiles(response.data.totalUsers)
      if (response.data.users === null) {
        encryptStorage.setItem('isLoggedIn', false)
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadUsers(false)
    }
  }

  useEffect(() => {
    const items = encryptStorage.getItem('userDetails')!;
    if (items) {
      setUserStoredData(items)
      const storedUserProfiles = encryptStorage.getItem('userProfiles')!; // Retrieve the user profiles from local storage
      if (storedUserProfiles) {
        setManyUserProfiles(storedUserProfiles);
      } else {
        handleProfiles(items.session, items.email, items.userId, pageSizeFromPaginate, pageNumberFromPaginate);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const searchComponent = document.querySelector('.searching');

      if (cancelButtonRef.current && !cancelButtonRef.current.contains(event.target as Node)
        && searchComponent && !searchComponent.contains(event.target as Node)) {
        setOpenDown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [pageNumberFromPaginate, pageSizeFromPaginate]);

  useEffect(() => {
    let intervalId: number;

    if (likeAlert) {
      intervalId = setTimeout(() => {
        setLikeAlert(false);
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [likeAlert]);

  return (
    <DashboardLayout>
      <div className={`relative flex gap-3 items-center justify-end pb-2 pt-5 pr-16 cursor-pointer hover:font-medium ${openDown ? 'bg-tint-pink transition-all' : null}`}
        onClick={() => { setOpenDown(!openDown), setProfileFromLocal(true) }} ref={cancelButtonRef} >
        <img src={search} alt='search' />
        <p>Search</p>
      </div>
      {openDown && (
        <div className={`absolute z-10 right-10 md:w-1/4 ml-auto transition-all border-purple rounded-lg searching`} onClick={() => setOpenDown(true)} >
          <SIdebarSearch searched={handleChildData} />
        </div>
      )}
      <section className='p-9 bg-tint-pink h-full' >
        {likeAlert && (
          <div
            className="transition-opacity duration-300 fixed top-30 right-5 z-10 w-56 flex justify-between items-center rounded-lg bg-green bg-opacity-60 px-6 py-3 text-white cursor-pointer"
            role="alert">
            <div className='inline-flex items-center'>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {likedResponse}
            </div>
            <span onClick={() => setLikeAlert(false)}>x</span>
          </div>
        )}
        <p className='text-3xl font-medium mb-6 text-center'>Meet people around you</p>
        <p className={`text-blue underline cursor-pointer ${profileFromLocal ? 'inline-flex' : 'hidden'}`}
          onClick={() => {
            handleProfiles(userStoredData.session, userStoredData.email, userStoredData.userId, 1),
              setProfileFromLocal(false)
          }}
        >all users</p>

        <div className='flex flex-wrap gap-5 justify-center py-2'>
          {manyUserProfiles.length !== 0 && !loadUsers ? displayedProfiles.map((user: any, index: number) => (
            <div key={index} className='max-w-[8rem] drop-shadow-lg shadow-lg rounded-xl flex flex-col items-center'>
              <div className='relative w-full max-h-[7.5rem]'>
                <Link to={`/dashboard/${user.userRef}`}>

                  {user.image === null ?
                    <img src={dummyImg} alt='profile' className='rounded-t-xl w-full h-full object-cover' />
                    :
                    <img src={`data:image/jpg;base64,${user.image.imagebase64}`} alt='profile' className='rounded-t-xl w-full h-full object-cover' />
                  }
                  <div className='flex justify-between px-2 text-lg absolute bottom-0 text-white font-semibold ' style={{ width: '100%' }}>
                    <p style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>{user.name}</p>
                    <p style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>{user.age}</p>
                  </div>
                </Link>
              </div>

              <div className=' w-full px-5 py-1.5 flex justify-between items-center bg-[#F5FFF6] rounded-b-xl'>
                <Link to={`/dashboard/message`} ><img src={msg} alt='chat' className='w-6' /></Link>
                <p className='opacity-20 text-3xl'>|</p>
                <img src={love} alt='chat' className='w-6 cursor-pointer'
                  onClick={() => handleLikes(userStoredData.session, userStoredData.email, userStoredData.userId)} />
              </div>
            </div>
          ))
            :
            loadUsers ?
              <p className='p-5'>Loading...</p>
              :
              <p>No searched users now for the age range selected, check back soon</p>}
        </div>
        {manyUserProfiles &&
          <div className='fix'>

            < Pagination
              setDisplayUsers={setDisplayedProfiles}
              usersStored={manyUserProfiles}
              total={allProfiles}
              pageSize={paginatePageSizeData}
              pageNumber={paginateData}
            />
          </div>
        }

        <div className={`shadow-ads absolute rounded-lg bottom-6 md:top-20 right-10 p-2 w-72 h-[480px] bg-white text-center ${isClose ? 'hidden' : ''}`}>
          <div className="flex justify-end cursor-pointer" onClick={() => setIsClose(!isClose)}>
            <img src={blackClose} alt='close' />
          </div>
          <div className="flex justify-center items-center h-full text-[#866060] text-2xl">
            Google Ads
            {/* <AdsComponent className='ad1' /> */}
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

export default Meet