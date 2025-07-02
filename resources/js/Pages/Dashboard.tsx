import SiderBar from '@/Components/SiderBar'
import { Head } from '@inertiajs/react'
import React from 'react'

const Dashboard = ({ children }: any) => {
  return (
    <div>
      <Head title='Beranda Kasirku'/>
      <div className="bg-gray w-full min-h-screen flex justify-between items-start">
        <SiderBar/>
        <div className="w-[8%] h-screen"></div>
        <div className="m-10 w-full min-h-screen px-8 py-2 rounded-md">
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dashboard