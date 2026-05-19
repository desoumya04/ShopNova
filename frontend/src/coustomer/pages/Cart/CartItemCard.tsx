import React from "react";
import { Button } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const CartItemCard = () => {
  return (
    <div className="border border-gray-400 rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            src="https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90"
            alt=""
          />
        </div>
        <div>
          <h1>Josh Bager</h1>
          <p className="text-gray-600 font-medium text-sm">
            Pink Floral Patterned Saree
          </p>
          <p className="text-gray-400 text-xs">
            <strong>sold by :</strong> Jio Mart Private Limited
          </p>
          <p className="text-xs text-gray-400">
            <strong>7 days replacement </strong> Available
          </p>
          <p className="text-xs text-gray-400">
            <strong>quantity: </strong>2
          </p>
        </div>
      </div>
      <div className="flex  px-5 py-2 justify-between items-center">
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button size="small">
            <Remove/>
          </Button>
          <span className="font-semibold px-3">{2}</span>
          <Button size="small">
            <Add/>
          </Button>
        </div>
        <div>
          <p className="font-semibold">₹1,299</p>
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
