
import { Button } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { updateCartItem } from "../../../Redux_toolkit/cart/cartSlice";
import { useAppDispatch } from "../../../Redux_toolkit/store";
import { toast } from "sonner";

const CartItemCard = ({ item }: { item?: any }) => {
  const dispatch = useAppDispatch();
  const product = item?.product;
  const image = product?.images?.[0]?.url || "https://via.placeholder.com/150";

  const [quantity, setQuantity] = useState(item?.quantity);
  
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0) return;
    if (newQuantity > product.stock ) {
      toast.error(`Only ${product.stock} more available in stock`);
      return;
    }
    setQuantity(newQuantity);
    // Call the cart API to update the quantity
      try {
        await dispatch(updateCartItem({ productId: item?.productId, quantity: newQuantity })).unwrap();
      } catch (error) {
        console.log("update error", error);
        return;
      }
    };

  return (
    <div className="border border-gray-400 rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-22.5 h-22.5 rounded-md"
            src={image}
            alt={product?.name || "Product image"}
          />
        </div>
        <div>
          <h1>{product?.brand || "Brand"}</h1>
          <p className="text-gray-600 font-medium text-sm">
            {product?.name || "Product Name"}
          </p>
          <p className="text-gray-400 text-xs">
            <strong>sold by :</strong> {product?.seller?.name || "Seller"}
          </p>
          <p className="text-xs text-gray-400">
            <strong>7 days replacement </strong> Available
          </p>
          <p className="text-xs text-gray-400">
            <strong>quantity: </strong>{item?.quantity}
          </p>
        </div>
      </div>
      <div className="flex  px-5 py-2 justify-between items-center">
        <div className="flex items-center gap-2 w-35 justify-between">
          <Button size="small" onClick={() => handleQuantityChange(quantity - 1)}>
            <Remove />
          </Button>
          <span className="font-semibold px-3">{quantity}</span>
          <Button size="small" onClick={() => handleQuantityChange(quantity + 1)}>
            <Add />
          </Button>
        </div>
        <div>
          <p className="font-semibold">₹{product?.price}</p>
        </div>
      </div>
      <div className="absolute top-2 right-3">
        <IconButton color="primary">
          <Close/>
        </IconButton>
      </div>
    </div>
  );
}
      
export default CartItemCard;
