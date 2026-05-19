import React from 'react'

const homecategoryCard = ({item}: any) => {
  return (
    <div className='flex gap-5 flex-col justify-center items-center group cursor-pointer'>
      <div className='custom-border w-150 lg:w-[249px] h-150 lg:h-[249px] rounded-full bg-teal-400'>
        <img className='group-hover:scale-95 transition-transform duration-700 object-cover object-top w-full h-full rounded-full' src={item.image} alt="" />
      </div>
      <h1 className=' font-medium'>{item.name}</h1>

    </div>
  )
}

export default homecategoryCard