import { useEffect, useMemo, useState } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import { getProductSection } from "./productData";
import {  useAppDispatch,useAppSelector } from "../../../Redux_toolkit/store";
import { fetchCategoryProducts } from "../../../Redux_toolkit/Product/product";

const Product = () => {
  const dispatch = useAppDispatch()
  
  const { CategoryId } = useParams();

  
  const section = getProductSection(CategoryId)
  const location = useLocation();
  const [sort, setSort] = useState("price-low");
  const handleChange = (e: any) => {
    setSort(e.target.value);
  };

  const routeKey = (CategoryId || location.pathname.split("/").filter(Boolean).pop() || "fashion").toLowerCase() as  string;
  console.log("routeKey", routeKey)
  
  const products = useAppSelector((state) => state.product.products)
  useEffect(() =>{
      dispatch(fetchCategoryProducts(routeKey))
  },[dispatch,routeKey])


  
  const sortedProducts = useMemo(() => {
    const list = [...products]
    return list.sort((left:any, right:any) => {
      if (sort === "price-high") {
        return right.price - left.price;
      }
      return left.price - right.price;
    });
  }, [products, sort]);

  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">
            Curated shopping
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            {section.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            {section.subtitle}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-6">
        <section className="hidden min-h-screen rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
          <FilterSection />
        </section>

        <section className="w-full space-y-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {products.length} products found
              </p>
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
                <MenuItem value={"price-low"}>price : Low - High</MenuItem>
                <MenuItem value={"price-high"}>price : High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className="grid grid-cols-1 gap-6 px-1 sm:grid-cols-2 xl:grid-cols-3">
            {sortedProducts.map((product) => (
              <Productcard key={product.id} item={product} />
            ))}
          </div>
          <div className="flex justify-center my-10">
            <Pagination count={10} color="primary" />
          </div>
        
        </section>
        
      </div>
      </div>
    </div>
  );
};

export default Product;
