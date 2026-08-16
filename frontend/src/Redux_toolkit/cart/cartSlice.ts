import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";



interface CartState {
  cart: unknown | null;
  cartItems: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      return response.data.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
      }
      return rejectWithValue("Failed to fetch cart");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`/product/${productId}/add-to-cart`, {
        productId,
        quantity,
      });
      // Re-fetch cart after adding item so everything is in sync
      dispatch(fetchUserCart());
      return response.data.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(err.response?.data?.message || "Failed to add item to cart");
      }
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/cart/item/${productId}`, {
        quantity,
      });
      // Re-fetch cart after updating item so everything is in sync
      dispatch(fetchUserCart());
      return response.data.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(err.response?.data?.message || "Failed to update cart item");
      }
      return rejectWithValue("Failed to update cart item");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.cartItems = action.payload?.items || [];
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
        // fetchUserCart is dispatched so state will update automatically
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
        // fetchUserCart is dispatched so state will update automatically
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
