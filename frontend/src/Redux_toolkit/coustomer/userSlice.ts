import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";


const API_URL = "/user";
type UserState = {
  name: string | null;
  email: string | null;
  mobile: string | null;
  joined: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  name: "",
  email: "",
  mobile: "",
  joined: "",
  role: "",
  loading: false,
  error: null as string | null,
}



export const fetchUserData = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      // Cookie is sent automatically via withCredentials
      const response = await api.get(`${API_URL}/profile`);
      if(!response.data || !response.data.data){
        throw new Error("Invalid response data");
      }

      console.log("fetchUserData response:", response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "An error occurred");
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/update",
  async (userData: { name: string; phone: string }, { rejectWithValue }) => {
    try {
      // Cookie is sent automatically via withCredentials
      const response = await api.post(`${API_URL}/profile/update`, userData);

      console.log("updateUserData response:", response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "An error occurred");
    }
  }
);



const userSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{
    updateUser:(state,action)=>{
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
    },
    clearUser: () => initialState,
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUserData.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserData.fulfilled,(state,action)=>{
      state.loading = false;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.joined = action.payload.joined;
      state.role = action.payload.role;
    })
    .addCase(fetchUserData.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(updateUserData.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserData.fulfilled,(state,action)=>{
      state.loading = false;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
     
    })
    .addCase(updateUserData.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
  }
})

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer
