import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import userReducer from './coustomer/userSlice';
import sellerReducer from './seller/seller';
import productReducer from './Product/product';
import cartReducer from './cart/cartSlice';
import wishListReducer from './wishlist/wishListSlice';
import orderReducer from './order/orderSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  user: userReducer,
  seller: sellerReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishListReducer,
  order: orderReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;