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

export const sendLoginOtp = createAsyncThunk<any, { email: string }>(
  "auth/sendLoginOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login`, {
        email,
      });

      console.log("sendLoginOtp response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk<any, { otp: string } >(
  "auth/login",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/verify_otp`, { otp });

      console.log("login response:", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      
      return response.data;
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