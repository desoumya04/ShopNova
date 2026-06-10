import React, { useEffect, useState } from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router";

const Productcard = ({ item }: any) => {
  const[currentImage, setCurrentImage] = useState(3)
  const [hover, setHover] = useState(false)


  useEffect(()=>{
    let interval :any
    if(hover){
      interval = setInterval(()=>{
        setCurrentImage((prev) => (prev+1)%item.images.length)
      },1000)
    }else if(interval){
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  },[hover,item.images.length])

  const navigate = useNavigate()
  const handleClick=()=>{
    navigate(`/product-details/${item.categoryId}/${item.seller?.businessDetails?.businessName}/${item.productId}`)
  }
 
  return (
    <div onClick={handleClick} className="group px-4 relative">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative w-[250px] sm:w-full h-[300px] overflow-hidden"
      >
        {item.images?.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt="Product"
            style={{transform:`translateX(${(index - currentImage)*100}%)`}}
            className="card-media object-top"
          />
        ))}

      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name space-y">
          <h1 className="font-semibold text-lg">
            {item.seller?.businessDetails?.businessName}
          </h1>
          <p className="text-sm text-gray-500">
            {item.seller?.businessDetails?.businessDescription}
          </p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-teal-700"> $2499
          </span>
          <span className="font-thin text line line-through text-gray-400"> $3999
          </span>
          <span className="font-semibold text-teal-700">
            38% off
          </span>

        </div>
      </div>
    </div>
  );
};

export default Productcard;
