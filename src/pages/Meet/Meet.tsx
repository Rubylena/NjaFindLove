import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import blackClose from '../../asset/icon/blackClose.svg'
import msg from '../../asset/icon/mesg-chat.png'
import love from '../../asset/icon/love.svg'
import search from '../../asset/icon/search.png'
import { axiosBase } from '../../api/api'
import { Link } from 'react-router-dom'
import AdsComponent from '../../components/Ads/AdsComponent'
import SIdebarSearch from '../../components/Sidebar/SIdebarSearch'

const Meet = () => {
  const [isClose, setIsClose] = useState(false);
  const [manyUserProfiles, setManyUserProfiles] = useState<any>()
  const [openDown, setOpenDown] = useState(false)

  // Callback function that receives data from child
  const handleChildData = (childData: any) => {
    if (childData.users.length !== 0) {
      setManyUserProfiles(childData.users)
      console.log(manyUserProfiles)
    }
  };

  useEffect(() => {
    const handleProfiles = async (session: string, email: string, id: number) => {
      try {
        const response = await axiosBase.post('/InApp/DiscoverPeople', { session: session, email: email, id: id, pageSize: 10, pageNumber: 1 });
        setManyUserProfiles(response.data.users)
        if (response.data.users === null) {
          localStorage.removeItem('userDetails')
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    }
    const items = JSON.parse(localStorage.getItem('userDetails')!);
    if (items) {
      handleProfiles(items.session, items.email, items.userId)
    }
  }, []);

  return (
    <DashboardLayout>
      <div className={`flex gap-3 items-center justify-end pt-5 mr-16 cursor-pointer hover:font-medium ${openDown ? 'bg-tint-pink rounded-t-[50px]' : null}`} onClick={() => setOpenDown(!openDown)}>
        <img src={search} alt='search' />
        <p>Search</p>
      </div>
      {openDown && (
        <div className='w-1/2 ml-auto border border-purple mt-2 mr-16 rounded-lg'>
          <SIdebarSearch searched={handleChildData} />
        </div>
      )}
      <section className='p-8 bg-tint-pink h-full'>
        <p className='text-3xl font-medium mb-5 text-center'>Meet people around you</p>
        <div className='flex flex-wrap gap-5 justify-center'>
          {manyUserProfiles ?
            manyUserProfiles.map((user: any, index: number) => (
              <div key={index} className='max-w-[8rem] drop-shadow-lg shadow-lg rounded-xl flex flex-col items-center'>
                <div className='relative w-full max-h-[7.5rem]'>
                  <Link to={`/dashboard/meet/${user.userRef}`}>
                    <img src={`data:image/jpg;base64,${user.image.imagebase64}`} alt='profile' className='rounded-t-xl w-full h-full object-cover' />
                    <div className='flex justify-between px-2 text-lg absolute bottom-0 text-white font-semibold ' style={{ width: '100%' }}>
                      <p style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>{user.name}</p>
                      <p style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>{user.age}</p>
                    </div>
                  </Link>
                </div>

                <div className=' w-full px-5 py-1.5 flex justify-between items-center bg-[#F5FFF6] rounded-b-xl'>
                  <Link to={`/dashboard/message`} ><img src={msg} alt='chat' className='w-6' /></Link>
                  <p className='opacity-20 text-3xl'>|</p>
                  <img src={love} alt='chat' className='w-6' />
                </div>
              </div>
            ))
            :
            <div>Loading...</div>}
        </div>

        <div className={`shadow-ads absolute rounded-lg bottom-6 md:top-20 right-10 p-2 w-72 h-[480px] bg-white text-center ${isClose ? 'hidden' : ''}`}>
          <div className="flex justify-end cursor-pointer" onClick={() => setIsClose(!isClose)}>
            <img src={blackClose} alt='close' />
          </div>
          <div className="flex justify-center items-center h-full text-[#866060] text-2xl">
            Google Ads
            <AdsComponent className='ad1' />
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

export default Meet