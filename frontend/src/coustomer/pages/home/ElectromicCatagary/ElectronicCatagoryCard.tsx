import React from 'react'
import { useNavigate } from 'react-router'



const ElectronicCategoryCard = ({item}:any) => {
  const navigate = useNavigate()
  const handleClick=()=>{
    navigate(`/products/${item.categoryId}`)
  }
  return (
    <div onClick={handleClick} className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
      <img className="object-contain h-10"src={item.image} alt="" />
      <h2 className="font-semibold text-sm">{item.name}</h2>

    </div>
  )
}

export default ElectronicCategoryCard