import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { usePage } from '@inertiajs/react'
import RupiahFormat from '@/Utils/RupiahFormat';
import ShowDetailTransaction from '@/Components/ShowDetailTransaction';

const History = () => {
  const page = usePage<any>();
  const [transactionData, setTransactionData] = useState<transactionProp[]>([]);
  const [transactionId, setTransactionId] = useState(0);
  const [showTransactiondetail, setShowTransactionDetail] = useState(false);
  const [searchText, setSearchText] = useState('');

  interface transactionProp {
    id: number;
    total_price: number;
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
    const fetchTransaction = () => {
      const transaction = page?.props?.transaction;
      const filteredData = transaction.filter((item: any) => {
        const transaction = searchText ? item.id.toLowerCase().includes(searchText.toLowerCase()) : true;
        return transaction;
      });

      setTransactionData(filteredData);
    } 

    fetchTransaction();
  }, [searchText]);

  const handleTransactionId = (id: number) => {
    setTransactionId(id);
    setShowTransactionDetail(!showTransactiondetail);
  }
  
  return (
    <div>
      <div className={`${showTransactiondetail === false ? 'hidden' : 'block'}`}>
        <ShowDetailTransaction
          transactionId={transactionId}
          setShow={setShowTransactionDetail}
          show={showTransactiondetail}
        />
      </div>
      <Dashboard>
        <div className="m-10 px-8 py-2">
          <div className="flex justify-start gap-10 items-center">
            <h1 className='font-poppins_semibold text-[32px]'>Riwayat Transaksi</h1>
            <input 
              type="text" 
              placeholder='Cari...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='text-[14px] font-poppins_medium w-[360px] px-3 py-2 border-2 outline-none border-[#aeadad] rounded-md focus-within:border-black'
            />
          </div>
          <div className="mt-12 flex gap-6 items-center flex-wrap justify-start">
            {transactionData.length > 0 ? (
              transactionData.map((data, index) => (
                <div className="bg-white duration-200 border-2 border-white hover:-translate-y-2 hover:border-primary flex cursor-pointer flex-col justify-between gap-2 items-center px-6 py-8 rounded-lg w-[320px] text-center" key={index} onClick={() => handleTransactionId(data.id)}>
                  {data.status === 'success' ? (
                    <svg className='bg-[#0e9f6f] w-[70px] h-[70px] fill-white p-4 rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                  ) : (
                    <svg className='bg-[#d52727] w-[70px] h-[70px] fill-white p-4 rounded-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                  )}
                  <h1 className='font-poppins_medium mt-4 text-[14px]'>{`Order-${data.id}`}</h1>
                  <p className='font-poppins_regular text-[12px]'>{data.created_at.slice(0, 10)}</p>
                  <p className='font-poppins_medium text-white bg-primary p-2 rounded-md mt-2 text-[16px]'>{RupiahFormat(data.total_price)}</p>
                </div>
              ))
            ) : (
              <p className='font-poppins_medium text-[18px]'>Data Tidak Ditemukan</p>
            )}
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default History