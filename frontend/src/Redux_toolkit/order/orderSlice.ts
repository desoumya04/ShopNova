import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: {
    title: string;
    description: string;
    price: number;
    images: { url: string }[];
    seller: { shopName: string };
    variants: any[];
  };
}

interface Order {
  id: string;
  paymentStatus: string;
  items: OrderItem[];
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchSuccessOrder = createAsyncThunk(
  'order/fetchSuccessOrder',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/fetchSuccessOrder');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuccessOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSuccessOrder.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchSuccessOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
