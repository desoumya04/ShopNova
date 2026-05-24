import React from 'react'

const AddressCard = () => {
  return (
    <div >
      <div className='border rounded-lg p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold text-lg'>Home</h3>
          <span className='text-sm text-gray-500'>John Doe, 9876543210</span>
        </div>
        <p className='text-gray-600 text-sm'>123, Main Street, City, State - 123456</p>
      </div>
     <div className='border rounded-lg p-4 mt-3'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold text-lg'>Office</h3>
          <span className='text-sm text-gray-500'>John Doe, 9876543210</span>
        </div>
        <p className='text-gray-600 text-sm'>456, Business Park, City, State - 654321</p> 
      </div>  
  
    </div>
  )
}

export default AddressCard