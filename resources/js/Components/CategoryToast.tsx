import React, { useState } from 'react'
import BtnComponent from './BtnComponent'
import { router } from '@inertiajs/react';

const CategoryToast = ({ show, setShow }: any) => {
    const [name, setName] = useState('');
    const handleSubmit = () => {
        router.post('/transaksi', {
            name: name
        });
        setShow(!show);  
    }

    const handleShowCategory = () => {
      setShow(!show);
    }

  return (
    <div className='bg-[#0000004e] w-full h-screen fixed z-30 justify-center flex items-center'>
        <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center relative">
            <div className="absolute right-[12px] top-[12px]">
                <BtnComponent
                    icon='cancel'
                    paddingX='8'
                    paddingY='7'
                    onClick={handleShowCategory}
                />
            </div>
            <h1 className='font-poppins_semibold text-[28px]'>Tambah Kategori</h1>
            <div className="flex flex-col justify-center items-center gap-4 mt-8">
                <div className="flex flex-col gap-2">
                    <p className='font-poppins_medium text-[14px]'>Nama :</p>
                    <input 
                        type="text" 
                        placeholder='Nama Kategori'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-black focus-within:border-primary outline-none rounded-md px-3 py-2 font-poppins_regular w-[320px] text-[14px]'
                    />
                </div>
            </div>
            <div className="mt-12 w-full">
                <BtnComponent
                    icon='submit'
                    type='submit'
                    text='Kirim'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    </div>
  )
}

export default CategoryToast