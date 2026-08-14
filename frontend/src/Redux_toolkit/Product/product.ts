
import {  createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/api"

const api_path = "/product"

type ProductImage = {
  url: string;
}
type category = {
  id:string
  name:string
}

type Product = {
    id:string
    name:string
    slug?:string
    description:string
    brand:string
    categoryId?:string
    category?:category
    status: string
    price:string
    discountPrice?:string
    costPrice?:string
    stock:string
    images: ProductImage[]

  }
type ProductVariant = {
    color?:string
    size?:string
    storage?:string
    ram?:string
    weight:string
    warranty:string
  }
type ProductState = {
  products: Product[]
  product:Product
  productVariants: ProductVariant
  categories: category[]


  loading: boolean;
  error: string | null;
}

const initialState : ProductState = {
  product: {
    id: "",
    name: "",
    slug: "",
    description: "",
    brand: "",
    categoryId: "",
    category: {
      id: "",
      name: ""
    },
    status: "DRAFT",
    price: "",
    discountPrice: "",
    costPrice: "",
    stock: "",
    images: [],
  },

  products: [],

  productVariants: {
    color: "",
    size: "",
    storage: "",
    ram: "",
    weight: "",
    warranty: "",
  },

  categories: [],

  loading: false,
  error: null,
}

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${api_path}/createProduct`, productData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSellerProducts =  createAsyncThunk<Product[]>(
  "/product/sellerProductDetails",
  async(_,{rejectWithValue}) =>{
    try{
      const response = await api.get(`${api_path}/sellerProductDetails`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("jwt")}`
        }
      })
      console.log(response.data)
      return response.data.data.products
    }catch(error:any){
      return rejectWithValue(error.response.data)
    }
  }
)
export const fetchCategoryProducts = createAsyncThunk(
  "product/categoryProducts",
  async(category:string,{rejectWithValue}) =>{
    try {
       console.log("THUNK CATEGORY:", category);
      const response = await api.post(`${api_path}/categoryProducts`,{
          category
      })
      console.log("Response:", response.data);

      return response.data.data.products
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const fetchCategory = createAsyncThunk<category[]>(
  "product/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${api_path}/getCategory`);
      console.log(response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const getProductByProductId = createAsyncThunk(
  "/product/getProductByProductId",
  async(productId:string,{rejectWithValue})=>{
    try {
      const response = await api.get(`${api_path}/getProductByProductId`,{
        params:{
          productId
        }
      })
      console.log(response.data)
      return response.data.data
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
)









const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    updateProduct(state, action) {
      state.products = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload }
          : item
      );
    },

    updateProductVariants(state,action){
      state.productVariants = {
        ...state.productVariants,
        ...action.payload
      }
    },
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        // Handle the successful creation of the product here if needed
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategory.pending , (state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategory.fulfilled,(state,action) =>{
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchSellerProducts.fulfilled,(state,action) =>{
        state.products = action.payload
        
      })
      .addCase(fetchSellerProducts.rejected,(state,action) =>{
        state.error = action.payload as string
      })
      .addCase(fetchCategoryProducts.fulfilled,(state,action) =>{
        state.products = action.payload

      })
      .addCase(fetchCategoryProducts.rejected,(state,action) =>{
        state.error = action.payload as string
        
      })
      .addCase(getProductByProductId.fulfilled,(state,action) =>{
        state.products = action.payload

      })
      .addCase(getProductByProductId.rejected,(state,action) =>{
        state.error = action.payload as string
        
      })
  }
})
export const { updateProduct, updateProductVariants } = productSlice.actions;
export default productSlice.reducer