import React, { useEffect, useState } from 'react';
import SuggestedItemCard from './cart';
import { api } from '../../../../config/api';

const SuggestedItem = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/product/allProducts');
        const mapped = res.data.data.map((p: any) => ({
          image: p.images?.[0]?.url || "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
          brand: p.brand || "ShopNova",
          title: p.name || "Product Name",
          originalPrice: p.price ? Number(p.price) : 0,
          price: p.discountPrice ? Number(p.discountPrice) : (p.price ? Number(p.price) : 0)
        }));
        setItems(mapped.slice(0, 8)); // Suggest top 5 items
      } catch (error) {
        console.error("Failed to fetch suggested products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center gap-7 flex-wrap">
      {items.map((item, index) => (
        <SuggestedItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default SuggestedItem;
