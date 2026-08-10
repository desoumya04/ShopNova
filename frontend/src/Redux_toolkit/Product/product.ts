
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/api"

const api_path = "/product"

type category = {
  id:string
  name:string
}

type ProductState = {
  products: {
    name:string
    slug?:string
    description:string
    brand:string
    categoryId?:string
    status: string
    price:string
    discountPrice?:string
    costPrice?:string
    stock:string
  }
  productVariants:{
    color?:string
    size?:string
    storage?:string
    ram?:string
    weight:string
    warranty:string
  }
  categories: category[]


  loading: boolean;
  error: string | null;
}

const initialState : ProductState = {
  products:{
    name:"",
    slug:"",
    description:"",
    brand:"",
    status:"",
    categoryId:"",
    price:"",
    discountPrice:"",
    costPrice:"",
    stock:""
  },
  productVariants:{
    color:"",
    size:"",
    storage:"",
    ram:"",
    weight:"",
    warranty:""
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

export const fetchSellerProducts =  createAsyncThunk(
  "/product/sellerProductDetails",
  async(_,{rejectWithValue}) =>{
    try{
      const response = await api.get(`${api_path}/sellerProductDetails`)
      console.log(response.data)
      return response.data.data
    }catch(error:any){
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchCategory = createAsyncThunk(
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
const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    updateProduct(state,action){
      state.products = {
        ...state.products,
        ...action.payload
      }
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
      .addCase(createProduct.fulfilled, (state, action) => {
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
  }
})
export const { updateProduct, updateProductVariants } = productSlice.actions;
export default productSlice.reducer