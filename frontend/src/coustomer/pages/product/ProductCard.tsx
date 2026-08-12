import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Redux_toolkit/store";

const Productcard = ({item}:{item:any}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [hover, setHover] = useState(false)

  const images = item.images??[]
  
  

  useEffect(()=>{
    if (!hover || images.length <= 1) {
      return;
    }
    const interval = window.setInterval(()=>{
      setCurrentImage((prev) => (prev + 1) % images.length)
    },1000)
    return () => window.clearInterval(interval)
  },[hover,images.length])

  const navigate = useNavigate()
  const handleClick=()=>{
    navigate(`/product-details/${item.categoryId}/${item.id}`)
  }
 
  return (
    <div onClick={handleClick} className="group relative cursor-pointer">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
      >
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {item.categoryId || "Featured"}
        </div>
        {images.map((image:any,index:number) => (
          <img
            key={index}
            src={image?.url}
            alt={item.name}
            style={{transform:`translateX(${(index - currentImage)*100}%)`}}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        ))}

      </div>
      <div className="space-y-2 rounded-b-3xl px-1 pt-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {item.name}
          </h1>
          
          <p className="text-sm text-slate-500 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-emerald-700">
            ₹{Number(item.costPrice)?.toLocaleString("en-IN")}
          </span>
          <span className="font-thin text-slate-400 line-through">
            ₹{Number(item.price)?.toLocaleString("en-IN")}
          </span>
          <span className="font-semibold text-emerald-700">
            {Number(item.discountPrice)}% off
          </span>

        </div>
      </div>
    </div>
  );
};

export default Productcard;
