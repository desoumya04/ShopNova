import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

const API_URL= "/seller"


type SellerState = {
  seller: {
    role: string;
    password:string;
  };

  sellerAddress: {
    address: string;
    locality: string;
    state: string;
    pinCode: string;
  
  };

  business: {
    name: string;
    email: string;
    mobile: string;
	  category: string;
    gstIn: string;
  };

  businessAddress: {
    address: string;
    locality: string;
    state: string;
    pinCode: string;
  
  };

  bank: {
    accountHolder: string;
    accountNumber: string;
    ifcCode: string;
    bankName: string;
  };

  loading: boolean;
  error: string | null;
};

const initialState: SellerState = {
  seller:{
    role: "",
    password:"", 
  },
  sellerAddress: {
    address: "",
    locality: "",
    state: "",
    pinCode: "",
  
  },
  business: {
    name: "",
    category: "",
    email: "",
    mobile: "",
    gstIn: "",
  },
  businessAddress: {
    address: "",
    locality: "",
    state: "",
    pinCode: "",
   
  },
  bank: {
    accountHolder: "",
    accountNumber: "",
    ifcCode: "",
    bankName: "",
  },
  loading: false,
  error: null,  
}

export const sellerDetails = createAsyncThunk(
  "seller/register",
  async( seller: any, { rejectWithValue }) => { 
   
    try {
      // Cookie is sent automatically via withCredentials
      const response = await api.post(`${API_URL}/register`, seller);

      console.log("sellerDetails response:", response.data);
     
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const loginSeller = createAsyncThunk(
  "seller/login",
  async( email:string, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login`, { email });

      console.log("loginSeller response:", response.data);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)




const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {
    updateSeller:(state,action)=>{
      state.seller = {
        ...state.seller,
        ...action.payload};
    },
    updateSellerAddress:(state,action)=>{
      state.sellerAddress = {
        ...state.sellerAddress,
        ...action.payload};
    },
    updateBusiness:(state,action)=>{
      state.business = {
        ...state.business,
        ...action.payload};
    },
    updateBusinessAddress:(state,action)=>{
      state.businessAddress = {
        ...state.businessAddress,
        ...action.payload};
    },
    updateBank:(state,action)=>{
      state.bank = {
        ...state.bank,
        ...action.payload};
    },
    resetSeller() {
      return initialState;
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(sellerDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sellerDetails.fulfilled, (state, action) => {
      state.seller = action.payload.seller;
      state.sellerAddress = action.payload.sellerAddress; 
      state.business = action.payload.business;
      state.businessAddress = action.payload.businessAddress;

      state.bank = action.payload.bank;
      state.loading = false;
      state.error = null;
    })
    .addCase(sellerDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(loginSeller.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginSeller.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(loginSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    

  }
})

export const{updateSeller,updateSellerAddress,updateBusiness,updateBusinessAddress,updateBank,resetSeller} = sellerSlice.actions
export default sellerSlice.reducer;