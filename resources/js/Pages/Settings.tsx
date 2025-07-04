import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { router, usePage } from '@inertiajs/react'
import BtnComponent from '@/Components/BtnComponent'
import ShowAddCategory from '@/Components/ShowAddCategory'
import ShowAddProduct from '@/Components/ShowAddProduct'
import RupiahFormat from '@/Utils/RupiahFormat'
import ShowEditProduct from '@/Components/ShowEditProduct'
import Swal from 'sweetalert2'
import axios from 'axios'

const Settings = () => {
const page = usePage<any>();
  const [category, setCategory] = useState<categoryProp[]>([]);
  const [product, setProduct] = useState<productProp[]>([]);
  const param = page.url;
  const [showCategory, setShowCategory] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const paramName = new URLSearchParams(page.url.split('?')[1]);
  const newParamName = paramName.get('name');
  const [productId, setProductId] = useState(0);
  const [showEditProduct, setShowEditProduct] = useState(false);

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
        return matchCategory;
      });

      setProduct(filtered);
    }

    fetchCategory();
    fetchProduct(newParamName);
  }, [newParamName]);

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

  const handleShowEditProduct = (id: number) => {
    setShowEditProduct(!showEditProduct);
    setProductId(id);
  }

  const handleDeleteProduct = (id: number, name: string) => {
      try {        
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
            icon: 'question',
            title: `Hapus Produk "${name}"?`,
            confirmButtonText: 'Iya',
            confirmButtonColor: 'red',
            showCancelButton: true,
            cancelButtonColor: 'green',
            cancelButtonText: 'Tidak'
          }).then(async(result) => {
            if (result.isConfirmed) {
              const response = await axios.delete(`/api/pengaturan/menu/${id}`);
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                confirmButtonText: 'Oke',
                confirmButtonColor: 'green'
              });

              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          });
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
        });
      }
  }

  const handleDeleteCategory= (id: number, name: string) => {
      try {        
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
            icon: 'question',
            title: `Hapus Kategori "${name}"?`,
            confirmButtonText: 'Iya',
            confirmButtonColor: 'red',
            showCancelButton: true,
            cancelButtonColor: 'green',
            cancelButtonText: 'Tidak'
          }).then(async(result) => {
            if (result.isConfirmed) {
              const response = await axios.delete(`/api/pengaturan/kategori/${id}`);
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                confirmButtonText: 'Oke',
                confirmButtonColor: 'green'
              });

              setTimeout(() => {
                window.location.href = '/pengaturan';
              }, 2000);
            }
          });
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
        });
      }
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
      <div className={`${showEditProduct == false ? 'hidden' : 'block'}`}>
        <ShowEditProduct
          show={showEditProduct}
          setShow={setShowEditProduct}
          productId={productId}
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
                <div className="flex mt-8 gap-5 items-center overflow-scroll py-2 scrollbar-hide">
                  <div className={`py-4 px-6 rounded-lg cursor-pointer ${param == '/pengaturan' + '' ? 'bg-primary text-white' : param == '/pengaturan?name=' ? 'bg-primary text-white' : 'bg-white'}`} onClick={() => handleCategoryParam('')}>
                    <p className='text-[16px] font-poppins_medium'>Semua</p>
                  </div>
                  {category?.length > 0 ? (
                    category.map((data, index) => (
                      <div className={`py-4 px-6 rounded-lg relative cursor-pointer ${param == '/pengaturan?name=' + encodeURIComponent(data.name) ? 'bg-primary text-white' : 'bg-white'}`} key={index} onClick={() => handleCategoryParam(data.name)}>
                        <div className="scale-75 absolute right-[-12px] top-[-12px]">
                          <BtnComponent
                            icon='delete'
                            paddingX='8'
                            paddingY='8'
                            onClick={() => handleDeleteCategory(data.id, data.name)}
                          />
                        </div>
                        <p className='text-[16px] font-poppins_medium'>{data.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className='font-poppins_medium text-[18px]'>Data Tidak Ditemukan</p>
                  )}
                </div>
              </div>
              <div className="mt-10 flex justify-start items-start flex-wrap gap-8">
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
                                    onClick={() => handleShowEditProduct(data.id)}
                                />
                                <BtnComponent
                                    icon='delete'
                                    paddingX='9'
                                    paddingY='9'
                                    onClick={() => handleDeleteProduct(data.id, data.name)}
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