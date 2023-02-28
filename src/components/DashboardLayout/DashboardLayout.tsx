import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

interface Proptypes {
    children: React.ReactNode;
}
const DashboardLayout = ({children}: Proptypes) => {
  return (
    <section className='flex flex-col md:flex-row '>
      <div>
        <Sidebar />
      </div>
      <div className=' xl:h-screen flex flex-col justify-between md:w-full'>
        <main className='h-full xl:h-[92.9%]'>{children}</main>
        <div>
          <Footer />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout