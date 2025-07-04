import React, { useEffect, useState } from 'react'
import BtnComponent from './BtnComponent'
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ShowEditProduct = ({ show, setShow, productId }: any) => {
    const [category, setCategory] = useState<categoryProp[]>([]);
    const page = usePage<any>();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<any>(null);
    const [categoryId, setCategoryId] = useState('');

    interface categoryProp {
        id: number;
        name: string;
    }

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const response = await axios.get(`/api/pengaturan/menu/${productId}`);
                const dataById = response.data.product;

                setName(dataById.name);
                setPrice(dataById.price);
                setCategoryId(dataById.category_id);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    }, [productId]);

    const handleSubmit = async() => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', name);
            formData.append('price', price);
            formData.append('image', image);
            formData.append('category_id', categoryId);

            const response = await axios.post(`/api/pengaturan/menu/${productId}`, formData);
            Swal.fire({
              didOpen: () => {
                Swal.showLoading();
              },
              allowOutsideClick: false,
              title: "Tunggu Sebentar...",
              timer: 1000,
              timerProgressBar: true
            }).then(() => {
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                confirmButtonText: 'Oke',
                confirmButtonColor: 'green'
              });
            });

            setShow(!show);  
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } catch (error: any) {
            Swal.fire({
              didOpen: () => {
                Swal.showLoading();
              },
              allowOutsideClick: false,
              title: "Tunggu Sebentar...",
              timer: 1000,
              timerProgressBar: true
            }).then(() => {
              Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                confirmButtonText: 'Gagal',
                confirmButtonColor: 'red'
              });
            });
        }        
    }

    const handleShowCategory = () => {
      setShow(!show);
    }

    useEffect(() => {
        const fetchCategory = () => {
            setCategory(page.props?.category);
        }

        fetchCategory();
    }, []);

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
            <h1 className='font-poppins_semibold text-[28px]'>Ubah Produk</h1>
            <div className="flex justify-center items-start gap-12">
                <div className="flex flex-col justify-center items-center gap-6 mt-8">
                    <div className="flex flex-col gap-2">
                        <p className='font-poppins_medium text-[14px]'>Nama :</p>
                        <input 
                            type="text" 
                            placeholder='Nama Produk'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border-2 border-black focus-within:border-primary outline-none rounded-md px-3 py-2 font-poppins_regular w-[320px] text-[14px]'
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className='font-poppins_medium text-[14px]'>Harga :</p>
                        <input 
                            type="number" 
                            placeholder='Harga Produk'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='border-2 border-black focus-within:border-primary outline-none rounded-md px-3 py-2 font-poppins_regular w-[320px] text-[14px]'
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-6 mt-8">
                    <div className="flex flex-col gap-2">
                        <p className='font-poppins_medium text-[14px]'>Gambar :</p>
                        <input 
                            type="file" 
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImage(e.target.files[0])
                                }
                            }}
                            className='outline-none rounded-md py-2 font-poppins_regular w-[320px] text-[14px]'
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className='font-poppins_medium text-[14px]'>Kategori :</p>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className='border-2 border-black focus-within:border-primary outline-none rounded-md px-3 py-2 font-poppins_regular w-[320px] text-[14px]'>
                            <option value="" disabled selected>Pilih Kategori</option>
                            {category.map((data, index) => (
                                <option value={data.id} key={index}>{data.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-12 w-full">
                <BtnComponent
                    icon='submit'
                    type='submit'
                    text='Ubah'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    </div>
  )
}

export default ShowEditProduct