import React, { useEffect, useState } from 'react'
import { Add, AddShoppingCart, Favorite, Remove, Star} from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import SimilarProduct from './SimilarProduct'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../../Redux_toolkit/store'
import {getProductByProductId} from '../../../../Redux_toolkit/Product/product'



const ProductDetails = () => {
  const dispatch = useAppDispatch()

  const location = useLocation() 

  const routeKey = location.pathname.split("/").filter(Boolean).pop() as string
  const product:any = useAppSelector((state)=>state.product.products)

  

  useEffect(()=>{
    dispatch(getProductByProductId(routeKey))
  },[dispatch,routeKey])
  const images = product.images??[]

  const[currentImage, setCurrentImage] = useState(0)
  const[quantity, setQuantity] = useState(1)

  
  const handleQuantity = (value:number) =>{if(quantity+value > 0){
    setQuantity(quantity+value)
  }}
  const handleImageChange = (index:number) => {
    setCurrentImage(index)
  }
  return (
    <div className='min-h-screen px-5 lg:px-20 pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col lg:flex-row gap-3'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {images.map((image:any,index:number)=> <img onClick={()=>handleImageChange(index)} src={image.url} className='lg:w-full w-[50px] cursor-pointer rounded-md'/>)}
          </div>
          <div className='w-full lg:w-[85%]'>
            <img src={images[currentImage]?.url} alt="" />

          </div>
        </section>
        <section>
          <h1 className='text-2xl font-semibold'>Satin Fandy Vivan Fab Unstitched Saree Material (Free Size)</h1>
          <p className='text-lg font-semibold mt-3'>₹ 1,099</p>
          <div className='flex justify-between items-center  py-2 border w-[180px] mt-5 px-3'>
            <div className='flex items-center gap-1'>
              <span>4</span>
              <Star color='primary'/>
            </div>
            <div>
              <Divider orientation='vertical' items-center/>
              <span>{product.averageRating} ratings</span>
            </div> 
          </div>
          <div className="price flex items-center gap-3 pt-5">
          <span className="font-semibold text-teal-700"> ₹{product.costPrice}
          </span>
          <span className="font-thin text line line-through text-gray-400">₹{product.price}
          </span>
          <span className="font-semibold text-teal-700">
            {product.discountPrice}
          </span>
        </div>
        <div className='mt-7 space-y-2'>
          <h1 className='text-lg font-semibold mt-5'>Quantity</h1>

          <div className='flex justify-between items-center w-[140px] '>
            <Button variant='outlined' onClick={() => handleQuantity(-1)}><Remove/></Button>
            <span className='p-3'>{quantity}</span>
            <Button variant='outlined' onClick={() => handleQuantity(1)}><Add/></Button>
          </div>
        </div>
        <div className='mt-12 flex gap-5 items-center'>
          <Button startIcon={<AddShoppingCart/>} variant='contained' color='primary' >Add to Cart</Button>
          <Button startIcon={<Favorite/>} variant='outlined' color='primary'>Wishlist</Button>
        </div>
        </section>
      </div>
      <section className='pt-10'>
        <h1 className='text-2xl font-semibold mt-10 mb-5'>Similar Products</h1>
        <div>
          <SimilarProduct/>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails