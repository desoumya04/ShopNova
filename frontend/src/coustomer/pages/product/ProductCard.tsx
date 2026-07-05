import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Productcard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [hover, setHover] = useState(false)

  const productImages = item.images?.length ? item.images : [
    "https://via.placeholder.com/600x750?text=Product"
  ]

  const title = item.title || item.seller?.businessDetails?.businessDescription || "Product"
  const sellerName = item.seller?.businessDetails?.businessName || "Marketplace"
  const description = item.description || item.seller?.businessDetails?.businessDescription || "Available now"
  const currentPrice = item.price || 2499
  const originalPrice = item.mrp || Math.round(currentPrice * 1.4)
  const discount = Math.max(0, Math.round(((originalPrice - currentPrice) / originalPrice) * 100))
  const categoryId = item.categoryId || "product"
  const productId = item.productId || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "product"


  useEffect(()=>{
    if (!hover || productImages.length <= 1) {
      return;
    }
    const interval = window.setInterval(()=>{
      setCurrentImage((prev) => (prev + 1) % productImages.length)
    },1000)
    return () => window.clearInterval(interval)
  },[hover,productImages.length])

  const navigate = useNavigate()
  const handleClick=()=>{
    navigate(`/product-details/${categoryId}/${encodeURIComponent(sellerName)}/${productId}`)
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
        {productImages.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={title}
            style={{transform:`translateX(${(index - currentImage)*100}%)`}}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        ))}

      </div>
      <div className="space-y-2 rounded-b-3xl px-1 pt-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {title}
          </h1>
          <p className="text-sm font-medium text-slate-600">
            {sellerName}
          </p>
          <p className="text-sm text-slate-500 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-emerald-700">
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
          <span className="font-thin text-slate-400 line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
          <span className="font-semibold text-emerald-700">
            {discount}% off
          </span>

        </div>
      </div>
    </div>
  );
};

export default Productcard;
