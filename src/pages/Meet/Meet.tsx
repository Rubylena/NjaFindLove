import React from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import MeetImageCarousel from '../../components/MeetImageCarousel/MeetImageCarousel'
import girl from '../../asset/images/girlie.svg'
import silver from '../../asset/images/prices.svg'

const Meet = () => {
  const images = [girl, silver, girl]

  return (
    <DashboardLayout>
        <section className='p-8'>
          <p className='text-2xl font-medium mb-5'>Meet</p>
          <div>
            <MeetImageCarousel images={images} />
          </div>
        </section>
    </DashboardLayout>
  )
}

export default Meet