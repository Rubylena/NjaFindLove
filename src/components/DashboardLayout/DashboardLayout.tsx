import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import './dashboardLayout.scss'

interface DashboardProptypes {
    children: React.ReactNode;
    style?: string;
}
const DashboardLayout = ({children, style}: DashboardProptypes) => {
  return (
    <section className={`flex flex-col md:flex-row h-screen dash tall ${style}`}>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col justify-between md:w-full dash-screen'>
        <main className='h-full xl:h-[92.9%]'>{children}</main>
        <div>
          <Footer  />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout