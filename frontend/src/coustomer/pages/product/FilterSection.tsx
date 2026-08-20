import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import { colors } from "../../../../data/filter/color";
import { price } from "../../../../data/filter/price";
import { discount } from "../../../../data/filter/discount";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandDiscount, setExpandDiscount] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpendColor = () => {
    setExpandColor((prev) => !prev);
  }
  const handleExpendPrice = () => {
    setExpandPrice((prev) => !prev);
  }
  const handleExpendDiscount = () => {
    setExpandDiscount((prev) => !prev);
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, sectionId: string) => {
    const value = e.target.value;
    if (value) {
      searchParams.set(sectionId, value);
    } else {
      searchParams.delete(sectionId);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-10 px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button variant="text" size="small" color="primary" onClick={clearAllFilters}>
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
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color-radio-buttons-group-label"
              value={searchParams.get("color") || ""}
              name="color"
              onChange={(e) => handleFilterChange(e, "color")}
            >
             {colors.slice(0, expandColor ? colors.length : 5).map((items) => (
               <FormControlLabel
                key={items.name}
                value={items.name}
                control={<Radio />}
                label={items.name}
              />
             ))}
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
              aria-labelledby="price-radio-buttons-group-label"
              value={searchParams.get("price") || ""}
              name="price"
              onChange={(e) => handleFilterChange(e, "price")}
            >
             {price.slice(0, expandPrice ? price.length : 5).map((items) => (
               <FormControlLabel
                key={items.name}
                value={items.value}
                control={<Radio />}
                label={items.name}
              />
             ))}
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
              aria-labelledby="discount-radio-buttons-group-label"
              value={searchParams.get("discount") || ""}
              name="discount"
              onChange={(e) => handleFilterChange(e, "discount")}
            >
             {discount.slice(0, expandDiscount ? discount.length : 5).map((items) => (
               <FormControlLabel
                key={items.name}
                value={items.value}
                control={<Radio />}
                label={items.name}
              />
             ))}
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
