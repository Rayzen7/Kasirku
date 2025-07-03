import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { router, usePage } from '@inertiajs/react'
import BtnComponent from '@/Components/BtnComponent'
import ShowAddCategory from '@/Components/ShowAddCategory'
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
  const [searchText, setSearchText] = useState('');
  const [userTransaction, setUserTransaction] = useState<productProp[]>([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);

  interface categoryProp {
    id: number;
    name: string;
  }

  interface productProp {
    id: number;
    productId: number;
    name: string;
    category_id: number;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
    [key: string]: any;
  }

  useEffect(() => {
    const fetchCategory = () => {
      setCategory(page.props?.category);
    }

    const fetchProduct = (categoryName: any) => {
      const filtered = page.props?.product?.filter((item: any) => {
        const matchCategory = categoryName ? item.category.name === categoryName : true;
        const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
        return matchSearch && matchCategory;
      });

      setProduct(filtered);
    }

    const fetchTotalTransaction = () => {
      const totalPrice = userTransaction.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalPrice(totalPrice);
    }

    fetchTotalTransaction();
    fetchCategory();
    fetchProduct(newParamName);
  }, [userTransaction, newParamName, searchText]);

  const handleCategoryParam = (name: string) => {
    router.get(`/transaksi?name=${name}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });

    const filtered = page?.props?.product.filter((item: any) => {
      const matchesCategory = name ? item.category.name === name : true;
      return matchesCategory;
    });

    setProduct(filtered);
  };

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  }

  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  }

  const handlePlusQuantity = (productId: number) => {
    const productData = product.find((item) => item.id === productId);
    if (!productData) {
      return;
    }

    setQuantity((prev: any[]) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    setUserTransaction((prev: any) => {
      const existing = prev.find((item: any) => item.productId === productId);
      if (existing) {
        return prev.map((item: any) => {
          if (item.productId === productId) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: Number(productData.price * newQuantity),
            }
          }
          return item;
        });
      } else {
        return [...prev, 
          { 
            productId, 
            name: productData.name,
            image: `/storage/${productData.image}`,
            quantity: 1,
            price: productData.price,
            totalPrice: Number(productData.price) * 1,
          }
        ]
      }
    });
  }

  const handleMinusQuantity = (productId: number) => {
    const productData = product.find((item) => item.id === productId);
    if (!productData) {
      return;
    }

    const newQuantity = (quantity[productId] || 0) - 1;
    setQuantity((prev: any) => ({
      ...prev,
      [productId]: newQuantity > 0 ? newQuantity : 0
    }));

    setUserTransaction((prevTrans: any) => {
      const existing = prevTrans.find((item: any) => item.productId === productId);
      if (existing) {
        if (newQuantity <= 0) {
          return prevTrans.filter((item: any) => item.productId !== productId);
        } else {
          return prevTrans.map((item: any) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: Number(productData.price) * newQuantity
                }
              : item
          );
        }
      }
      return prevTrans;
    });
  };

  const handleSubmit = () => {
    router.post('/transaksi/order', {
      total_price: totalPrice,
      items: userTransaction,
    })
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
          <div className="flex justify-between items-start">
            <div className="w-[54vw] m-10 px-8 py-2">
              <div className="flex justify-start gap-10 items-center">
                <h1 className='font-poppins_semibold text-[32px]'>Menu</h1>
                {/* <div className="flex justify-center items-center gap-6">
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
                </div> */}
                <input 
                  type="text" 
                  placeholder='Cari...'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className='text-[14px] font-poppins_medium w-[360px] px-3 py-2 border-2 outline-none border-[#aeadad] rounded-md focus-within:border-black'
                />
              </div>
              <div className="">
                <div className="flex mt-8 gap-5 items-center overflow-scroll scrollbar-hide">
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
                    <p className='font-poppins_medium text-[18px]'>Data Tidak Ditemukan</p>
                  )}
                </div>
              </div>
              <div className="mt-12 flex justify-start items-start flex-wrap gap-8">
                {product.length > 0 ? (
                  product.map((data, index) => (
                    <div className="flex flex-col" key={index}>
                      <div className="bg-white py-3 px-4 gap-2 text-center w-[200px] min-h-[180px] flex rounded-lg flex-col justify-center items-center">
                        <img className='w-full rounded-md h-[120px] object-cover' src={`/storage/${data.image}`} alt="" />
                        <h1 className='text-[14px] font-poppins_medium'>{data.name}</h1>
                        <p className='text-[16px] font-poppins_medium text-primary'>{RupiahFormat(data.price)}</p>
                        <div className="flex justify-center items-center mt-2 gap-4">
                          <svg onClick={() => handleMinusQuantity(data.id)} className='w-[24px] h-auto fill-[#606060] border-2 border-[#606060] cursor-pointer p-1 rounded-md' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                          <p className='text-[16px] font-poppins_semibold text-primary'>{quantity[data.id] | 0}</p>
                          <svg onClick={() => handlePlusQuantity(data.id)} className='w-[24px] h-auto fill-[#606060] border-2 border-[#606060] cursor-pointer p-1 rounded-md' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>                  </div>
                        </div>
                    </div>
                  ))
                ) : (
                  <p className='font-poppins_medium text-[18px]'>Data Tidak Ditemukan</p>
                )}
              </div>
            </div>
            <div className="w-[34vw] bg-white h-screen px-6 py-12 flex flex-col items-center justify-between right-0 gap-4 fixed">
                <div className="w-full">
                  <div className="">
                    <h1 className='font-poppins_semibold text-[30px] text-center'>Order Menu</h1>
                  </div>
                  <div className="h-[55vh] overflow-scroll scrollbar-hide">
                    <div className="mt-9 w-full flex flex-col gap-10 justify-start items-center">
                      {userTransaction.length > 0 ? (
                        userTransaction.map((data, index) => (
                          <div className="flex justify-between items-center w-full" key={index}>
                            <img src={data.image} alt="" className='w-[60px] h-auto rounded-lg' />
                            <div className="flex flex-col gap-1">
                              <h1 className='text-[14px] font-poppins_medium'>{data.name}</h1>
                              <p className='text-[12px] font-poppins_regular'>{RupiahFormat(data.price)}</p>
                            </div>
                            <p className='font-poppins_medium text-[14px]'>{data.quantity}X</p>
                            <p className='font-poppins_medium text-white bg-primary p-2 rounded-lg text-[14px]'>{RupiahFormat(data.totalPrice)}</p>
                          </div>
                        ))
                      ) : (
                        <p className='text-[16px] font-poppins_regular'>Belum Ada Orderan</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`w-full mt-6 ${userTransaction.length > 0 ? 'block' : 'hidden'}`}>
                  <hr className='w-full h-[2px] bg-[#b0b0b0] outline-none' />
                  <div className="flex justify-between items-center mt-4">
                    <h1 className='font-poppins_medium text-[18px]'>Total :</h1>
                    <p className='font-poppins_medium text-[16px]'>{RupiahFormat(totalPrice)}</p>
                  </div>
                  <div className="mt-6">
                    <BtnComponent
                      icon='submit'
                      type='submit'
                      text='Bayar'
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
            </div>
          </div>
      </Dashboard>
    </div>
  )
}

export default Transaction