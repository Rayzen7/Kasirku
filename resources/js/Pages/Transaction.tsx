import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { router, usePage } from '@inertiajs/react'
import BtnComponent from '@/Components/BtnComponent'
import CategoryToast from '@/Components/CategoryToast'

const Transaction = () => {
  const page = usePage<any>();
  const [category, setCategory] = useState<CategoryProp[]>([]);
  const param = page.url;
  const [showCategory, setShowCategory] = useState(false);

  interface CategoryProp {
    id: number;
    name: string;
  }

  useEffect(() => {
    const fetchCategory = () => {
      setCategory(page.props?.category);
    }

    fetchCategory();
  }, []);

  const handleCategoryParam = (name: string) => {
    router.visit(`/transaksi?name=${name}`);
  }

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  }

  return (
    <div>
      <div className={`${showCategory == false ? 'hidden' : 'block'}`}>
        <CategoryToast
          show={showCategory}
          setShow={setShowCategory}
        />
      </div>
      <Dashboard>
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className='font-poppins_semibold text-[32px]'>Menu</h1>
              <div className="flex justify-center items-center gap-6">
                <BtnComponent
                  icon='add'
                  text='Produk'
                  paddingX='14'
                />
                <BtnComponent
                  icon='add'
                  text='Kategori'
                  paddingX='14'
                  onClick={handleShowCategory}
                />
              </div>
            </div>
            <div className="flex mt-6 gap-5 items-center">
              {category?.length > 0 ? (
                category.map((data, index) => (
                  <div className={`py-4 px-6 rounded-lg cursor-pointer ${param == '/transaksi?name=' + data.name ? 'bg-primary text-white' : 'bg-white'}`} key={index} onClick={() => handleCategoryParam(data.name)}>
                    <p className='text-[16px] font-poppins_medium'>{data.name}</p>
                  </div>
                ))
              ) : (
                <p>Data Tidak Ditemukan</p>
              )}
            </div>
          </div>            
      </Dashboard>
    </div>
  )
}

export default Transaction