import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import blackClose from '../../asset/icon/blackClose.svg'
import { axiosBase } from '../../api/api'
import { Link } from 'react-router-dom'

const Meet = () => {
  const [isClose, setIsClose] = useState(false);
  const [manyUserProfiles, setManyUserProfiles] = useState<any>()

  const handleProfiles = async (session: string, email: string, id: number) => {
    try {
      const response = await axiosBase.post('/InApp/DiscoverPeople', { session: session, email: email, id: id, pageSize: 10, pageNumber: 1 });
      setManyUserProfiles(response.data.users)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userDetails')!);
    if (items) {
      handleProfiles(items.session, items.email, items.userId)
    }
  }, []);

  return (
    <DashboardLayout>
      <section className='p-8 bg-tint-pink h-full'>
        <p className='text-3xl font-medium mb-5'>Meet</p>
        <div className='flex flex-wrap gap-5 justify-center'>
          {manyUserProfiles ?
            manyUserProfiles.map((user: any, index: number) => (
              <div key={index} className='border-4 max-w-[130px] flex flex-col items-center'>
                <div><img src={`data:image/jpg;base64,${user.image.imagebase64}`} alt='profile' className='border' /></div>
                <div className='flex justify-between'>
                  {user.name}
                  <div className='flex flex-wrap justify-end gap-2'>
                    <Link to={`/dashboard/meet/${user.userRef}`} >Chat</Link>
                    <p>view</p>
                    <p>Like</p>
                    <p>delete</p>
                  </div>
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
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

export default Meet