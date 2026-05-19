import React, { useState } from 'react'
import { Add, AddShoppingCart, Favorite, Remove, Star} from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import SimilarProduct from './SimilarProduct'



const images=[
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/z/e/i/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrhh34dsxk.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/k/y/u/free-fandy-vivan-fab-unstitched-original-imahgzzhcsgycwqv.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/j/g/e/free-fandy-vivan-fab-unstitched-original-imahgzzh6nca7p72.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/u/g/e/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrzg5wbe4e.jpeg?q=90"
]
const ProductDetails = () => {
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
            {images.map((item,index)=> <img onClick={()=>handleImageChange(index)} src={item} className='lg:w-full w-[50px] cursor-pointer rounded-md'/>)}
          </div>
          <div className='w-full lg:w-[85%]'>
            <img src={images[currentImage]} alt="" />

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
              <span>789 rating</span>
            </div> 
          </div>
          <div className="price flex items-center gap-3 pt-5">
          <span className="font-semibold text-teal-700"> $2499
          </span>
          <span className="font-thin text line line-through text-gray-400"> $3999
          </span>
          <span className="font-semibold text-teal-700">
            38% off
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