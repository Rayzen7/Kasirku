import SiderBar from '@/Components/SiderBar'
import MessageProps from '@/Utils/MessageProps'
import { Head } from '@inertiajs/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const Dashboard = ({ children }: any) => {
  MessageProps();
  return (
    <div>
      <Head title='Beranda Kasirku'/>
      <div className="bg-gray w-full min-h-screen flex justify-between items-start">
        <SiderBar/>
        <div className="w-[8%] h-screen"></div>
        <div className="w-full min-h-screen rounded-md">
          {/* Content */}
          {children}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard