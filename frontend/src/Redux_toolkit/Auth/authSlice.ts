import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

const API_URL = "/auth";

export const sendLoginOtp = createAsyncThunk<any, { email: string }>(
  "auth/sendLoginOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/login`, {
        email,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },
);

export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async (credentials: { email: string; otp: string }) => {
    try {
      const response = await fetch(`${API_URL}/verify_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  },
);
