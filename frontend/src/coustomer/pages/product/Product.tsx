import React, { useState } from "react";
import FilterSection from "./FilterSection";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import Productcard from "./ProductCard";

const Products = {
  images:[
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/z/e/i/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrhh34dsxk.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/k/y/u/free-fandy-vivan-fab-unstitched-original-imahgzzhcsgycwqv.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/j/g/e/free-fandy-vivan-fab-unstitched-original-imahgzzh6nca7p72.jpeg?q=90",
    "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/u/g/e/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrzg5wbe4e.jpeg?q=90"

  ],
  seller:{
    businessDetails:{
      businessName:"Pablo Fashions",
      businessDescription:"Pink Floral Patterned Saree"
    }
  }
}
  


const Product = () => {
  const [sort, setSort] = useState("Price-low");
  const handleChange = (e: any) => {
    setSort(e.target.value);
  };
  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pd-5 px-9 uppercase space-x-2">
          women saree
        </h1>
      </div>
      <div className="lg:flex">
        <section className=" hidden lg:block w-[20%] min-h-screen border-gray-200">
          <FilterSection />
        </section>

        <section className="w-full lg-[80%] space-y-1">
          <div className="flex justify-between items-center px-9 h-[40]">
            <div >
            </div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="sort"
                value={sort}
                label="sort"
                onChange={handleChange}
              >
                <MenuItem value={"Price-low"}>price : Low - High</MenuItem>
                <MenuItem value={"price-high"}>price : High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center mt-5">
            {[1,1,1,1,1].map((item,index) => <div key={index*3}><Productcard item={Products} /></div> 
            )}
          </div>
          <div className="flex justify-center my-10">
            <Pagination count={10} color="primary" />
          </div>
        
        </section>
        
      </div>
    </div>
  );
};

export default Product;
