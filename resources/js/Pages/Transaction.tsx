import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { router, usePage } from '@inertiajs/react'
import BtnComponent from '@/Components/BtnComponent'
import ShowAddCategory from '@/Components/showAddCategory'
import ShowAddProduct from '@/Components/ShowAddProduct'
import RupiahFormat from '@/Utils/RupiahFormat'

const Transaction = () => {
  const page = usePage<any>();
  const [category, setCategory] = useState<categoryProp[]>([]);
  const [product, setProduct] = useState<productProp[]>([]);
  const param = page.url;
  const [showCategory, setShowCategory] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const paramName = new URLSearchParams(page.url.split('?')[1]);
  const newParamName = paramName.get('name');
  const [quantity, setQuantity] = useState<any>({});

  interface categoryProp {
    id: number;
    name: string;
  }

  interface productProp {
    id: number;
    name: string;
    category_id: number;
    image: string;
    description: string;
    price: number;
  }

  useEffect(() => {
    const fetchCategory = () => {
      setCategory(page.props?.category);
    }

    const fetchProduct = (categoryName: any) => {
      if (categoryName) {
        setProduct(page.props?.product?.filter((item: any) => item.category.name === categoryName));
      } else {
        setProduct(page.props?.product);
      }
    }

    fetchCategory();
    fetchProduct(newParamName);
  }, []);

  const handleCategoryParam = (name: string) => {
    router.visit(`/transaksi?name=${name}`);
  }

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  }

  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  }

  const handlePlusQuantity = (productId: number) => {
    setQuantity((prev: any[]) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }

  const handleMinusQuantity = (productId: number) => {
    setQuantity((prev: any[]) => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0
    }));
  }

  return (
    <div>
      <div className={`${showCategory == false ? 'hidden' : 'block'}`}>
        <ShowAddCategory
          show={showCategory}
          setShow={setShowCategory}
        />
      </div>
      <div className={`${showProduct == false ? 'hidden' : 'block'}`}>
        <ShowAddProduct
          show={showProduct}
          setShow={setShowProduct}
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
                  onClick={handleShowProduct}
                />
                <BtnComponent
                  icon='add'
                  text='Kategori'
                  paddingX='14'
                  onClick={handleShowCategory}
                />
              </div>
            </div>
            <div className="flex mt-6 gap-5 items-center flex-wrap">
              <div className={`py-4 px-6 rounded-lg cursor-pointer ${param == '/transaksi' + '' ? 'bg-primary text-white' : param == '/transaksi?name=' ? 'bg-primary text-white' : 'bg-white'}`} onClick={() => handleCategoryParam('')}>
                  <p className='text-[16px] font-poppins_medium'>Semua</p>
                </div>
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
            <div className="mt-12 flex justify-start items-start flex-wrap gap-8">
              {product.map((data, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="bg-white py-3 px-4 gap-2 text-center w-[160px] min-h-[180px] flex rounded-lg flex-col justify-center items-center">
                    <img className='w-full rounded-md h-[120px] object-cover' src={`/storage/${data.image}`} alt="" />
                    <h1 className='text-[14px] font-poppins_medium'>{data.name}</h1>
                    <p className='text-[16px] font-poppins_medium text-primary'>{RupiahFormat(data.price)}</p>
                    <div className="flex justify-center items-center mt-2 gap-4">
                      <svg onClick={() => handleMinusQuantity(data.id)} className='w-[24px] h-auto fill-[#606060] border-2 border-[#606060] cursor-pointer p-1 rounded-md' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                      <p className='text-[16px] font-poppins_semibold text-primary'>{quantity[data.id] | 0}</p>
                      <svg onClick={() => handlePlusQuantity(data.id)} className='w-[24px] h-auto fill-[#606060] border-2 border-[#606060] cursor-pointer p-1 rounded-md' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>                  </div>
                    </div>
                </div>
              ))}
            </div>
          </div>            
      </Dashboard>
    </div>
  )
}

export default Transaction