import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

const API_URL = "/auth";

const initialState = {
  jwt: null,
  role: null,
  loading: false,
  error: null,
  otpSent: false
};  

export const sendLoginOtp = createAsyncThunk<any, { name: string; mobile: string; email: string }>(
  "auth/sendLoginOtp",
  async ({ name, mobile, email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signup`, {
        name,
        mobile,
        email
      });

      console.log("sendLoginOtp response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk<any, { email: string; otp: string } >(
  "auth/login",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/verify_otp`, { email, otp });

      console.log("login response:", response.data);
      console.log("JWT:", response.data.data.jwt);
      localStorage.setItem("jwt", response.data.data.jwt);
      return { jwt: response.data.data.jwt, role: response.data.data.role };
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue(error);
    }
  },
);



const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.role = null;
      localStorage.removeItem("jwt");
      state.otpSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role  ;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        
      })
      
  },
});

export default authSlice.reducer;