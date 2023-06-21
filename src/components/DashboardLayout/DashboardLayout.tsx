import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

interface DashboardProptypes {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardProptypes) => {
  return (
    <section className={`flex flex-col md:flex-row sm:min-h-screen `}>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col justify-between w-full sm:min-h-screen'>
        <main className='h-full'>{children}</main>
        <div>
          <Footer />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout