import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux_toolkit/store';
import { getWishlist, addToWishlist } from '../../../Redux_toolkit/wishlist/wishListSlice';
import { addItemToCart } from '../../../Redux_toolkit/cart/cartSlice';
import { Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast } from 'sonner';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlistItems, loading } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = async (productId: string) => {
    try {
      await dispatch(addToWishlist(productId)).unwrap();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading saved items...</div>;
  }

  return (
    <div className="space-y-4">
      {wishlistItems && wishlistItems.length > 0 ? (
        wishlistItems.map((item: any) => {
          const product = item.product;
          const image = product?.images?.[0]?.url || "https://via.placeholder.com/150";

          return (
            <div key={item.id} className="border border-slate-200 rounded-2xl relative bg-white p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition">
              <div className="flex-shrink-0">
                <img
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover ring-1 ring-slate-200"
                  src={image}
                  alt={product?.title || "Product image"}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{product?.title || "Product Name"}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {product?.description?.substring(0, 120)}{product?.description?.length > 120 ? '...' : ''}
                  </p>
                  <p className="mt-3 text-xl font-bold text-slate-900">₹{product?.price}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    onClick={() => handleAddToCart(product.id)}
                    className="!rounded-lg !normal-case"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <IconButton color="default" size="small" onClick={() => handleRemove(product.id)}>
                  <Close fontSize="small" />
                </IconButton>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-300 rounded-2xl bg-slate-50">
          <p className="text-slate-500 font-medium">Your saved items list is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
