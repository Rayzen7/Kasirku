import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { router, usePage } from '@inertiajs/react'
import BtnComponent from '@/Components/BtnComponent'
import ShowAddCategory from '@/Components/ShowAddCategory'
import ShowAddProduct from '@/Components/ShowAddProduct'
import RupiahFormat from '@/Utils/RupiahFormat'

const Settings = () => {
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
    router.get(`/pengaturan?name=${name}`, {}, {
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
            <div className="w-full m-10 px-8 py-2">
              <div className="flex justify-start gap-10 items-center">
                <h1 className='font-poppins_semibold text-[32px]'>Pengaturan Menu</h1>
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
              <div className="">
                <div className="flex mt-8 gap-5 items-center overflow-scroll scrollbar-hide">
                  <div className={`py-4 px-6 rounded-lg cursor-pointer ${param == '/pengaturan' + '' ? 'bg-primary text-white' : param == '/pengaturan?name=' ? 'bg-primary text-white' : 'bg-white'}`} onClick={() => handleCategoryParam('')}>
                    <p className='text-[16px] font-poppins_medium'>Semua</p>
                  </div>
                  {category?.length > 0 ? (
                    category.map((data, index) => (
                      <div className={`py-4 px-6 rounded-lg cursor-pointer ${param == '/pengaturan?name=' + encodeURIComponent(data.name) ? 'bg-primary text-white' : 'bg-white'}`} key={index} onClick={() => handleCategoryParam(data.name)}>
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
                        <div className="bg-white py-3 px-4 gap-2 text-center w-[190px] min-h-[180px] flex rounded-lg flex-col justify-center items-center">
                          <img className='w-full rounded-md h-[120px] object-cover' src={`/storage/${data.image}`} alt="" />
                          <h1 className='text-[14px] font-poppins_medium'>{data.name}</h1>
                          <p className='text-[16px] font-poppins_medium text-primary'>{RupiahFormat(data.price)}</p>
                            <div className="mt-4 flex justify-center items-center gap-2">
                                <BtnComponent
                                    icon='edit'
                                    paddingX='9'
                                    paddingY='9'
                                />
                                <BtnComponent
                                    icon='delete'
                                    paddingX='9'
                                    paddingY='9'
                                />
                            </div>
                        </div>
                    </div>
                  ))
                ) : (
                  <p className='font-poppins_medium text-[18px]'>Data Tidak Ditemukan</p>
                )}
              </div>
            </div>
          </div>
      </Dashboard>
    </div>
  )
}

export default Settings