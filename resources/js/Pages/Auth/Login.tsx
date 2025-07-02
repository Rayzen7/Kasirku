import MessageProps from '@/Utils/MessageProps';
import { Head, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  MessageProps();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/', {
      email: email,
      password: password
    });
  }

  return (
    <div className='bg-gray w-full h-screen flex justify-center items-center flex-col'>
      <Head title='Kasirku Masuk'/>
        <div className="lg:w-[420px] w-[290px] h-[450px] bg-white rounded-lg flex flex-col justify-center items-center gap-10 lg:p-12 p-8">
          <div className="text-center mb-4">
            <h1 className='font-poppins_semibold text-primary lg:text-[32px] text-[28px]'>Masuk</h1>
            <p className='font-poppins_medium text-[11px] lg:text-[13px] w-auto lg:w-[300px] mt-1'>Masukkan Email dan Kata Sandi Anda dengan Benar!</p>
          </div>
          <div className="flex flex-col gap-10 w-full">
            <div className="group">
              <div className="flex justify-center items-center gap-4 px-[6px]">
                <svg className='w-[20px] h-auto fill-black group-focus-within:fill-primary' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                <input 
                  type="email" 
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='font-poppins_regular outline-none border-0 border-none text-[14px] w-full' />
              </div>
              <hr className='mt-3 h-[2px] bg-black group-focus-within:bg-primary outline-none border-none' />
            </div>
            <div className="group">
              <div className="flex justify-center items-center gap-4 px-[6px]">
                <svg className='w-[20px] h-auto fill-black group-focus-within:fill-primary' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>                
                <input 
                  type="password" 
                  placeholder='Kata Sandi'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='font-poppins_regular outline-none border-0 border-none text-[14px] w-full' />
              </div>
              <hr className='mt-3 h-[2px] bg-black group-focus-within:bg-primary outline-none border-none' />
            </div>
          </div>
          <button onClick={handleLogin} className='font-poppins_medium w-full py-3 mt-6 text-[14px] bg-primary text-white rounded-full hover:bg-white hover:border-primary border-2 hover:text-primary duration-200'>Masuk</button>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login