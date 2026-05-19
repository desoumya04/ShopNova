import React from 'react'

const Pricing = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-600'>Price (5 items)</span>
        <span className='font-semibold text-lg'>₹6,499</span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-600'>Discount</span>
        <span className='font-semibold text-lg text-green-600'>-₹1,200</span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-600'>Delivery Charges</span>
        <span className='font-semibold text-lg text-green-600'>Free</span>
      </div>
      <hr className='my-3'/>
      <div className='flex justify-between items-center'>
        <span className='text-gray-600 font-semibold text-lg'>Total Amount</span>
        <span className='font-semibold text-xl text-teal-700'>₹5,299</span>
      </div>
      <p className='text-xs text-gray-400 mt-3'>You will save ₹1,200 on this order</p>  
    </div>
  )
}

export default Pricing