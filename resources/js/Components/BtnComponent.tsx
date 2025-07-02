import React from 'react'

const BtnComponent = ({ paddingX='12', paddingY='12', icon='', text='', type='', onClick= () => {} }) => {
  return (
    <div className={`${type === 'submit' ? 'w-full' : 'w-auto'}`}>
        <button onClick={onClick} style={{paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px`, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`}} className={`flex justify-center items-center gap-4 cursor-pointer ${icon === 'cancel' ? 'rounded-full' : 'rounded-lg'} ${icon === 'add' ? 'bg-[#0E9F6E]' : icon === 'submit' ? 'bg-[#0E9F6E]' : icon === 'edit' ? 'bg-[#1C64F2]' : 'bg-[#E02424]'} ${type === 'submit' ? 'w-full' : 'w-auto'}`}>
            <p className={`text-white font-poppins_medium text-[14px] ${text == '' ? 'hidden' : 'block'}`}>{text}</p>
            {icon === 'add' ? (
                <svg className='w-[18px] h-auto fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            ) : icon === 'edit' ? (
                <svg className='w-[18px] h-auto fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
            ) : icon === 'delete' ? (
                <svg className='w-[18px] h-auto fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            ) : icon === 'submit' ? (
                ''
            ) : icon === 'cancel' ? (
                <svg className='w-[10px] h-auto fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            ) : ''}
        </button>
    </div>
  )
}

export default BtnComponent