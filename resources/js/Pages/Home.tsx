import React from 'react'
import Dashboard from './Dashboard'
import Chart from '@/Components/Chart'

const Home = () => {
  return (
    <div>
        <Dashboard>
            <div className=" m-10 px-8 py-2">
                <h1 className='font-poppins_semibold text-[32px]'>Beranda</h1>
                <div className="flex justify-start items-center gap-8 mt-6">
                    <div className="bg-white px-6 py-5 rounded-lg w-[260px] h-[140px] flex flex-col justify-between">
                        <div className="flex gap-3 items-center">
                            <svg className='w-[4px] h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                            <p className='text-[16px] font-poppins_medium'>Total Makanan</p>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <p className='font-poppins_medium text-[30px]'>10</p>
                            <svg className='w-[20px] h-auto fill-[#f6b317]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-5 rounded-lg w-[260px] h-[140px] flex flex-col justify-between">
                        <div className="flex gap-3 items-center">
                            <svg className='w-[4px] h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                            <p className='text-[16px] font-poppins_medium'>Total Transaksi</p>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <p className='font-poppins_medium text-[30px]'>10</p>
                            <svg className='w-[20px] h-auto fill-[#f63117]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/></svg>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-5 rounded-lg w-[260px] h-[140px] flex flex-col justify-between">
                        <div className="flex gap-3 items-center">
                            <svg className='w-[4px] h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                            <p className='text-[16px] font-poppins_medium'>Total Penjualan (Rp)</p>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <p className='font-poppins_medium text-[22px]'>Rp. 1.000.000</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-[24px] h-auto fill-[#17f670]' viewBox="0 0 24 24"><path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"/></svg>
                        </div>
                    </div>
                </div>
                <Chart/>
            </div>
        </Dashboard>
    </div>
  )
}

export default Home