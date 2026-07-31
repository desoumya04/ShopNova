import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './utils/theme';
import Navbar from './coustomer/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './coustomer/pages/home/home';
import Product from './coustomer/pages/product/Product';
import ProductDetails from './coustomer/pages/product/ProductDetails/ProductDetails';
import UserDetails from './coustomer/pages/account/UserDetails';
import Ordercard from './coustomer/pages/Order/Ordercard';
import ProfileDetails from './coustomer/pages/Order/profile';
import Signup from './coustomer/pages/Signup/signup';
import Login from './coustomer/pages/Login/login';
import { useState } from 'react';
import SellerNavbar from './seller/Navbar';
import AddProductForm from './seller/AddProduct/addProductForm';
import SellerProduct from './seller/product/product';
import SellerDashboard from './seller/Dashboard/dashboard';
import SellerOrders from './seller/Orders/order';
import SellerPayouts from './seller/Payout/payout';
import SellerProfile from './seller/Profile/profile';

function App() {
  
  return (
    <>
    <ThemeProvider theme={customTheme}>
      {/*<Navbar/>
      <Routes>  
        
        <Route path="/products/:CategoryId" element={<Product />} />

        <Route path="/electronics" element={<Product />} />
        <Route path="/fashion" element={<Product />} />
        <Route path="/grocery" element={<Product />} />
        <Route path="/account/*" element={<ProfileDetails />} />

        <Route path="/product-details/:CategoryId/:name/:productId" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>*/}
      
      <SellerNavbar />
      <Routes>
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProduct />} />
        <Route path="/seller/orders" element={<SellerOrders/>} />
        <Route path="/seller/profile" element={<SellerProfile/>} />
        <Route path="/seller/analytics" element={<div>Seller Analytics</div>} />
        <Route path="/seller/payouts" element={<SellerPayouts/>} />
        <Route path="/seller/products/new" element={<AddProductForm />} />
      </Routes>
    </ThemeProvider>
    </>
  );
}

    

export default App
