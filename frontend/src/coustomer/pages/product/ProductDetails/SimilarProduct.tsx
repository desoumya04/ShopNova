import React from 'react'
import Productcard from '../ProductCard'

const Products = {
  images:[
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/z/e/i/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrhh34dsxk.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/k/y/u/free-fandy-vivan-fab-unstitched-original-imahgzzhcsgycwqv.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/j/g/e/free-fandy-vivan-fab-unstitched-original-imahgzzh6nca7p72.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/u/g/e/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrzg5wbe4e.jpeg?q=90"

  ],
  seller:{
    businessDetails:{
      businessName:"Pablo Fashions",
      businessDescription:"Pink Floral Patterned Saree"
    }
  }
}

const SimilarProduct = () => {
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 grid-cols-1  justify-between gap-4 gap-y-4'>
      {[1,1,1,1,1,1].map((item) =><Productcard item={Products}/>)}

    </div>
  )
}

export default SimilarProduct