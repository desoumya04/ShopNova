
import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/api"

const api_path = "/product"



type ProductState = {
  products: {
    name:string
    slug?:string
    description:string
    brand:string
    categoryId?:string
    status: string
  }
  productVariants:{
    color?:string
    size?:string
    storage?:string
    ram?:string
    price:string
    discountPrice?:string
    costPrice?:string
    stock:string
    weight:string
    warranty:string
  }
  category:{
    name:string
  }
  productImages: File[]

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
    categoryId:""
  },
  productVariants:{
    color:"",
    size:"",
    storage:"",
    ram:"",
    price:"",
    discountPrice:"",
    costPrice:"",
    stock:"",
    weight:"",
    warranty:""
  },
  category:{
    name:""
  },
  productImages:[],

  loading: false,
  error: null,
}

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData: { products: ProductState["products"]; productVariants: ProductState["productVariants"]; productImages: [] }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${api_path}/createProduct`, productData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "product/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${api_path}/getCategory`);
      console.log(response.data);
      return response.data;
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
  
    updateProductImages(state,action){
      state.productImages = {
        ...state.productImages,
        ...action.payload
      }
    }
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
      }); 
  }
})
export const { updateProduct, updateProductVariants, updateProductImages } = productSlice.actions;
export default productSlice.reducer