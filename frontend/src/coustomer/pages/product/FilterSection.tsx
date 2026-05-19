import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import {colors} from "../../../../../data/filter/color";
import {price} from "../../../../../data/filter/price";
import {discount} from "../../../../../data/filter/discount";
import React, { useState } from "react";
import { PriceChange } from "@mui/icons-material";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandDiscount, setExpandDiscount] = useState(false);

  const handleExpendColor = () => {
    setExpandColor((prev) => !prev);
  }
  const handleExpendPrice = () => {
    setExpandPrice((prev) => !prev);
  }
  const handleExpendDiscount = () => {
    setExpandDiscount((prev) => !prev);
  }

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button variant="text" size="small" color="primary">
          Clear All
        </Button>
        
      </div>
       <Divider />
      <div className="px-9 space-y-5">
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              color
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
             {colors.slice(0, expandColor ? colors.length : 5).map((items)=>(
               <FormControlLabel
                value={items.name}
                control={<Radio />}
                label={items.name}
              />
             )) }
             
            </RadioGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpendColor}>{expandColor ? "hide" : `+ ${colors.length-5} more`}</Button>
          </div>
           <Divider />
        </section>
       
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
             {price.slice(0, expandPrice ? price.length : 5).map((items)=>(
               <FormControlLabel
                value={items.value}
                control={<Radio />}
                label={items.name}
              />
             )) }
             
            </RadioGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpendPrice}>{expandPrice ? "hide" : `+ ${price.length-5} more`}</Button>
          </div>
           <Divider />
        </section>
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
             {discount.slice(0, expandDiscount ? discount.length : 5).map((items)=>(
               <FormControlLabel
                value={items.value}
                control={<Radio />}
                label={items.name}
              />
             )) }
             
            </RadioGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpendDiscount}>{expandDiscount ? "hide" : `+ ${discount.length-5} more`}</Button>
          </div>
           <Divider />
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
