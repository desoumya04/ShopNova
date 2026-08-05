import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import reducer from "../Auth/authSlice";


const API_URL = "/user";

const initialState = {
  name: null,
  email: null,
  phone: null,
  role: null,
  joined: null,
  loading: false,
  error: null,
}



export const fetchUserData = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("JWT not found in localStorage");
      }

      const response = await api.get(`${API_URL}/profile`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetchUserData response:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/update",
  async (userData: { name: string; phone: string }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("JWT not found in localStorage");
      }

      const response = await api.post(`${API_URL}/profile/update`, userData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("updateUserData response:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{},
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
      state.phone = action.payload.phone;
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
      state.phone = action.payload.phone;
     
    })
    .addCase(updateUserData.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
  }
})

export default userSlice.reducer
