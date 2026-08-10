import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

const API_URL = "/auth";

const initialState = {
  jwt: localStorage.getItem("jwt") || null,
  name: localStorage.getItem("name") || null,
  
  loading: false,
  error: null as string | null,
  otpSent: false,
};

export const sendLoginOtp = createAsyncThunk<any, { name: string; mobile: string; email: string }>(
  "auth/sendLoginOtp",
  async ({ name, mobile, email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signup`, {
        name,
        mobile,
        email,
      });

      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk<any, { email: string }>(
  "auth/login",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login`, { email });

      const data = response.data?.data
      const jwt = data?.jwt ?? null;
      const name = data?.name ?? null;
      
     

      if (jwt) {
        localStorage.setItem("jwt", jwt);
      }
      if (name) {
        localStorage.setItem("name", name);
      }

      return { jwt,  name };
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue(error);
    }
  },
);

export const signup = createAsyncThunk<any, { email: string; otp: string }>(
  "auth/signup",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/verify_otp`, { email, otp });
      const data = response.data?.data ?? response.data;
      const jwt = data?.jwt ?? null;
      const name = data?.name ?? null;
      

      if (jwt) {
        localStorage.setItem("jwt", jwt);
      }
      if (name) {
        localStorage.setItem("name", name);
      }

      return { jwt, name };
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.name = null;

      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      state.otpSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state) => {
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
        state.name = action.payload.name;
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to log in with this email.";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.name = action.payload.name;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to verify the code.";
      });
  },
});

export default authSlice.reducer;