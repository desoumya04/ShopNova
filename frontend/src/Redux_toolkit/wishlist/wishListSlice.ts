import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/api";


interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  addedAt: string;
}

interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
}

interface WishlistState {
  wishlist: Wishlist | null;
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  wishlistItems: [],
  loading: false,
  error: null,
};

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/wishlist');
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        return rejectWithValue(message);
      }
      return rejectWithValue('Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async (productId: string, { rejectWithValue,dispatch}) => {
        try {
            const response = await api.post(`/wishlist/${productId}`);
            console.log(response.data)
            dispatch(getWishlist())
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                return rejectWithValue(message);
            }
            return rejectWithValue('Failed to add to wishlist');
        }
    }   
)

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload;
                state.wishlistItems = action.payload.items;
                state.loading = false;
                state.error = null;
            })
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addToWishlist.fulfilled, (state) => {
                state.loading = false;

                state.error = null;
            })
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default  wishListSlice.reducer;



