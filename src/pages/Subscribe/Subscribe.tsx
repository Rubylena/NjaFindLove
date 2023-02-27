import React from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import PriceCarousel from '../../components/PriceCarousel/PriceCarousel'
import girl from '../../asset/images/girlie.svg'
import silver from '../../asset/images/prices.svg'
import subscribe from '../../asset/images/subscribe.svg'

const Subscribe = () => {
  const images = [subscribe, girl, silver, girl]

  return (
    <DashboardLayout>
        <section className='p-5 flex flex-col gap-3 mt-10'>
          <p className='font-medium text-2xl'>Subscription</p>
          <p className='text-p-text'>Get more by subscribing to our monthly plan. </p>
          <PriceCarousel images={images} />
          <p className='text-p-text'>In order to access certain premium features and services on 9ja dating site, users may be required to make payments.</p>
        </section>
    </DashboardLayout>
  )
}

export default Subscribe