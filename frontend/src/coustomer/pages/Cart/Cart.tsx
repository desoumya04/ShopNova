
import CartItemCard from "./CartItemCard";
import Pricing from "./Pricing";
import { Button, Divider } from "@mui/material";
import { Favorite, LocalOffer } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../../Redux_toolkit/store";
import { useEffect } from "react";
import { fetchUserCart } from "../../../Redux_toolkit/cart/cartSlice";
import { api } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleBuyCart = async () => {

    const addressResponse = await api.get("/user/address");
    const addresses = addressResponse.data?.data || [];
    console.log("add", addresses)
    let shippingDetails = {
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingPinCode: 0
    };

    if (addresses && addresses.length > 0) {
      const addr = addresses[0];
      console.log("address", addr)
      shippingDetails = {
        shippingAddress: addr.address || "",
        shippingCity: addr.locality || "",
        shippingState: addr.state || "",
        shippingPinCode: addr.pinCode ? Number(addr.pinCode) : 0
      };
    }

    const res = await api.post("/checkOut/addOrderItem", {
      checkOutMode: "CART",
      shippingDetails: shippingDetails
    })
    console.log("cart items", res)
    const orderId = res?.data?.data?.order?.id;

    navigate(`/checkout/${orderId}`);
  }
  useEffect(() => {
    dispatch(fetchUserCart())
  }, [dispatch])


  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min--screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item: any) => (
              <CartItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="col-span-1 space-y-3 w-full">
          <div className=" border border-gray-300 px-3 py-3 rounded-md">
            <div>
              <div className="flex  items-center gap-2 w-full">
                <LocalOffer color="primary" />
                <span className="font-semibold text-gray-600">
                  Apply Coupon
                </span>
              </div>
              <div className="flex  justify-between items-center gap -3 pt-3">
                <input
                  className="border border-gray-300 rounded-md p-2 w-[70%]"
                  placeholder="Enter coupon code"
                />
                <Button variant="contained" color="primary" size="small">
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 px-3 py-3 rounded-md">
            <section className="grid-cols-1 items-center gap-2" >
              <h1 className="font-semibold text-lg text-gray-600">Price Details</h1>
              <Divider className="my-2" />
              <Pricing item={cartItems ?? []} />

              <div className="py-5">
                <Button onClick={handleBuyCart} variant="contained" color="primary" fullWidth>
                  Buy Now
                </Button>
              </div>
            </section>
          </div>
          <div className="border rounded-md border-gray-300 px-5 py-3 flex justify-between items-center cursor-pointer gap-2">
            <span className="text-sm text-gray-500">
              Add From Whishlist
            </span>
            <Favorite color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
