import React from "react";
import CartItemCard from "./CartItemCard";
import Pricing from "./Pricing";
import { Button, Divider } from "@mui/material";
import { Favorite, LocalOffer } from "@mui/icons-material";

const Cart = () => {
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min--screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {[1, 1, 1, 1, 1].map((item) => (
            <CartItemCard />
          ))}
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
            <section  className="grid-cols-1 items-center gap-2" >
              <h1 className="font-semibold text-lg text-gray-600">Price Details</h1>
              <Divider className="my-2" />
              <Pricing/>

              <div className="py-5">
                <Button variant="contained" color="primary" fullWidth>
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
