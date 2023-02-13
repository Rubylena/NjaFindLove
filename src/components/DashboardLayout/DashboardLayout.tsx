import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

interface Proptypes {
    children: React.ReactNode;
}
const DashboardLayout = ({children}: Proptypes) => {
  return (
    <section className='flex flex-col md:flex-row h-screen'>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col h-full justify-between md:w-full'>
        <main className='h-full'>{children}</main>
        <div>
          <Footer />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout