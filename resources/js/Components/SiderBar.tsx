import React from 'react'
import logo from '../../../public/logo/logo.png'
import { usePage, router } from '@inertiajs/react'
import { ToastContainer } from 'react-toastify';
import MessageProps from '@/Utils/MessageProps';

const SiderBar = () => {
  MessageProps();
  const page = usePage<any>();
  const handleRouter = (page: string) => {
    router.visit(page);
  }

  const handleLogout = () => {
    router.post('/beranda', {});
  }

  return (
    <div className='bg-white w-[8%] h-screen rounded-e-lg fixed'>
      <div className="flex flex-col justify-between h-screen py-6 items-center">
        <div className="">
          <img src={logo} alt="" className='w-[52px] mx-auto h-auto' />
          <div className="flex flex-col justify-center items-center mt-6 gap-8">
            <div className={`flex rounded-xl flex-col items-center gap-2 cursor-pointer p-2 ${page.url == '/beranda' ? 'bg-primary p-4' : ''}`} onClick={() => handleRouter('/beranda')}>
              <svg className={`w-[22px] h-auto fill-black ${page.url == '/beranda' ? 'fill-white' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
              <p className={`font-poppins_regular text-[10px] ${page.url == '/beranda' ? 'text-white' : ''}`}>Beranda</p>
            </div>
            <div className={`flex rounded-xl flex-col items-center gap-2 cursor-pointer p-2 ${page.url == '/transaksi' ? 'bg-primary p-4' : ''}`} onClick={() => handleRouter('/transaksi')}>
              <svg className={`w-[22px] h-auto fill-black ${page.url == '/transaksi' ? 'fill-white' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>            
              <p className={`font-poppins_regular text-[10px] ${page.url == '/transaksi' ? 'text-white' : ''}`}>Transaksi</p>
            </div>
            <div className={`flex rounded-xl flex-col items-center gap-2 cursor-pointer p-2 ${page.url == '/riwayat' ? 'bg-primary p-4' : ''}`} onClick={() => handleRouter('/riwayat')}>
              <svg className={`w-[22px] h-auto fill-black ${page.url == '/riwayat' ? 'fill-white' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"/></svg>
              <p className={`font-poppins_regular text-[10px] ${page.url == '/riwayat' ? 'text-white' : ''}`}>Riwayat</p>
            </div>        
          </div>  
        </div>
        <div className="flex flex-col p-2 justify-center items-center gap-2 cursor-pointer" onClick={handleLogout}>
          <svg className='w-[20px] h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
          <p className='font-poppins_regular text-[10px]'>Keluar</p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default SiderBar