import React, { useEffect, useState } from 'react'
import BtnComponent from './BtnComponent'
import axios from 'axios';
import RupiahFormat from '@/Utils/RupiahFormat';
import Swal from 'sweetalert2';

const ShowDetailTransaction = ({ transactionId, setShow, show }: any) => {
  const [transactionData, setTransactionData] = useState<transactionProp | null>(null);  

  interface transactionProp {
    id: number;
    total_price: any;
    status: string;
    created_at: string;
    transaction_body: [
      {
        id: number;
        product: {
          id: number;
          name: string;
          image: string;
          price: number;
        }
        quantity: number;
        total: number;
      }
    ]
  }

  useEffect(() => {
    const fetchTransactionId = async() => {
      try {
        const response = await axios.get(`/api/riwayat/${transactionId}`);
        setTransactionData(response.data.transaction);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchTransactionId();
  }, [transactionId]);

  const handleShow = () => {
    setShow(!show);
  }

  const handleStatusUpdate = () => {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Ubah Status Transaksi?',
        input: 'select',
        inputOptions: {
          success: 'success',
          canceled: 'canceled'
        },
        inputLabel: 'Masukkan status baru',
        showCancelButton: true,
        cancelButtonColor: 'red',
        cancelButtonText: 'Tidak',
        confirmButtonColor: 'green',
        confirmButtonText: 'Iya'
      }).then(async(result) => {
        if (result.isConfirmed) {
          const response = await axios.put(`/api/riwayat/${transactionId}`, {
            status: result.value
          });

          Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: false,
            title: "Please wait...",
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

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-[#0000004e] w-full h-screen fixed z-30 justify-center flex items-center'>
        <div className="bg-white p-8 rounded-lg min-w-[600px] flex flex-col justify-center items-center relative">
            <div className="absolute right-[12px] top-[12px]">
                <BtnComponent
                    icon='cancel'
                    paddingX='8'
                    paddingY='7'
                    onClick={handleShow}
                />
            </div>
            <h1 className='font-poppins_semibold text-[28px]'>Detail Transaksi</h1>
            <div className="mt-6 flex flex-col gap-4 justify-center items-center w-full">
              <hr className='outline-none bg-black h-[2px] w-full'/>
              <div className="flex flex-col gap-2 w-full">
                {transactionData?.transaction_body.map((item: any, index: any) => (
                  <div className="flex justify-between items-center" key={index}>
                    <p className='font-poppins_regular text-[16px]'>{item.product.name}</p>
                    <p className='font-poppins_medium text-[14px]'>{RupiahFormat(item.total)}</p>
                  </div>
                ))}
              </div>
              <hr className='outline-none bg-black h-[2px] w-full mt-2'/>
              <div className="flex justify-between items-center gap-2 w-full">
                <p className='font-poppins_regular text-[16px]'>Total :</p>
                <p className='font-poppins_medium text-[14px]'>{RupiahFormat(transactionData?.total_price)}</p>
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                <p className='font-poppins_regular text-[16px]'>Status :</p>
                <div className="flex justify-center items-center gap-4">
                  <p className={`font-poppins_medium text-[14px] text-white rounded-md p-2 ${transactionData?.status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{transactionData?.status === 'success' ? 'Berhasil' : 'Dibatalkan'}</p>
                  <BtnComponent
                    icon='edit'
                    paddingX='10'
                    paddingY='10'
                    onClick={handleStatusUpdate}
                  />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ShowDetailTransaction