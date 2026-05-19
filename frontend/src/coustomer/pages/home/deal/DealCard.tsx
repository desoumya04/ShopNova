import React from 'react'

const DealCard = ({deal}: any) => {
  return (
    <div className='w-full cursor-pointer p-2'>
      <img className="border-x-[7px] border-t-[7px] border-pink-500 w-full h-[12rem] object-cover object-top " src={deal.image} alt="" />

      <div className='border-4 border-black bg-black text-white p-2 text-center'>
        <p className='text-2xl font-bold'>{deal.discount}</p>
        <p className='text-lg'>shop now</p>
      </div>
    </div>
  )
}

export default DealCard