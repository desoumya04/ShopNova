import React from 'react'
import ElectronicCategoryCard from './ElectronicCatagoryCard'

const electronic=[
  {
    section:"Electronic_Category",
    name:"Laptop",
    image:"https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db16255/media-gallery/non-touch/laptop-dell-plus-db16255nt-ice-bl-fpr-gallery-5.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=979&qlt=100,1&resMode=sharp2&size=979,804&chrss=full", 
    categoryId:'Laptop'
    
  },
    {
    section:"Electronic_Category",
    name:"Mobile",
    image:"https://rukminim2.flixcart.com/image/780/780/xif0q/mobile/f/e/q/-original-imahkur3wtwueumh.jpeg?q=90", 
    categoryId:'Mobile'
    
  },  {
    section:"Electronic_Category",
    name:"TV",
    image:"https://rukminim2.flixcart.com/image/2940/2940/xif0q/television/h/h/2/-original-imahjf6yhzphyzcu.jpeg?q=90", 
    categoryId:'TV'
    
  },  {
    section:"Electronic_Category",
    name:"headphone",
    image:"https://rukminim2.flixcart.com/image/2940/2940/xif0q/headphone/0/q/k/zeb-thunder-zebronics-original-imagxaq2wzqdzdzr.jpeg?q=90", 
    categoryId:'headphone'
    
  },  {
    section:"Electronic_Category",
    name:"Camera",
    image:"https://rukminim2.flixcart.com/image/2940/2940/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=90", 
    categoryId:'Camera'
    
  },
]

const ElectronicCategory = () => {
  return (
    <div className='flex flex-wrap justify-between
     gap-5 py-5 px-5 lg:px-20 border-b'>
      {electronic.map((item)=> <ElectronicCategoryCard item={item}/>)}
    </div>
  )
}

export default ElectronicCategory