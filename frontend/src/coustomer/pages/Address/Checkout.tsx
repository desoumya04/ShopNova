import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const Checkout = () => {
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-3 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h2>Select Delivery Address </h2>
          <Button variant="outlined" color="primary" size="small">
            Add New Address
          </Button>
          </div>
          <div className="">

          </div>


        </div>
        <div className="col-span-1 space-y-3 w-full">
        </div>
      </div>
    </div>
  );
};

export default Checkout;
