import React from 'react';

interface SuggestedItemCardProps {
  item?: {
    image: string;
    brand: string;
    title: string;
    originalPrice: number;
    price: number;
  };
}

const SuggestedItemCard: React.FC<SuggestedItemCardProps> = ({ item }) => {
  // Dummy data to match the design if no item is passed
  const displayItem = item || {
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600", // Placeholder matching jeans style
    brand: "WPPMNY",
    title: "Men Boot-Leg Mid Rise Light B...",
    originalPrice: 2499,
    price: 818
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[240px] cursor-pointer group">
      {/* Image container */}
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
        <img 
          src={displayItem.image} 
          alt={displayItem.title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col mt-1 px-1">
        <div className="text-[15px] truncate text-gray-700">
          <span className="font-bold text-gray-900 mr-1.5">{displayItem.brand}</span>
          <span>{displayItem.title}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 line-through text-sm">₹{displayItem.originalPrice.toLocaleString('en-IN')}</span>
          <span className="font-bold text-gray-900 text-base">₹{displayItem.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default SuggestedItemCard;
