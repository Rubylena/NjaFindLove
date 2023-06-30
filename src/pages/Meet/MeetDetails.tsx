import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import MeetImageCarousel from '../../components/MeetImageCarousel/MeetImageCarousel'
import blackClose from '../../asset/icon/blackClose.svg'
import { Link, useParams } from 'react-router-dom'
import { axiosBase } from '../../api/api'
import { encryptStorage } from '../../encrypt/encrypt'

const MeetDetails = () => {
  const param = useParams()
  const [isClose, setIsClose] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState<boolean>();
  const [userDets, setUserDets] = useState<any>()
  const [returnedImages, setReturnedImages] = useState<any>()

  const handleUsers = async (session: string, email: string) => {
    setDetailsLoading(true)
    try {
      const response = await axiosBase.post(`${import.meta.env.VITE_DISCOVERUSER_URL}`, { session: session, email: email, userRef: param.user });
      setUserDets(response.data)
      setReturnedImages(response.data.pix.map((individual: any) => (`data:image/jpg;base64,${individual.imageBase64}`)));
    } catch (err) {
      console.error(err);
    } finally {
      setDetailsLoading(false)
    }
  }

  useEffect(() => {
    const items = encryptStorage.getItem('userDetails')!;
    if (items) {
      handleUsers(items.session, items.email)
    }
  }, []);
  return (
    <DashboardLayout>
      <section className='p-8 bg-tint-pink h-full'>
        <Link to='/dashboard' className='text-md font-medium'>{"< "}Back home</Link>
        <div>
          {returnedImages ? <MeetImageCarousel images={returnedImages} details={userDets} /> : detailsLoading ? 'loading...' : 'No details'}
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

export default MeetDetails