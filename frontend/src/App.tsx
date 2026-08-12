import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './utils/theme';
import { Route, Routes } from 'react-router-dom';

import CoustomerLayout from './Layouts/coustomerLayout';
import SellerLayout from './Layouts/sellerLayout';

import Home from './coustomer/pages/home/home';
import Product from './coustomer/pages/product/Product';
import ProductDetails from './coustomer/pages/product/ProductDetails/ProductDetails';
import ProfileDetails from './coustomer/pages/Order/profile';
import Signup from './coustomer/pages/Signup/signup';
import Login from './coustomer/pages/Login/login';



import AddProductForm from './seller/AddProduct/addProductForm';
import SellerProduct from './seller/product/product';
import SellerDashboard from './seller/Dashboard/dashboard';
import SellerOrders from './seller/Orders/order';
import SellerPayouts from './seller/Payout/payout';
import SellerProfile from './seller/Profile/profile';


import SellerSignup from './seller/SellerSignup';
import SellerBussiness from './seller/SellerBussiness';
import SellerAccount from './seller/SellerAccount';
import SellerLogin from './seller/SellerLogin';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  
  return (
    
    <ThemeProvider theme={customTheme}>

      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        {/* Customer Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<CoustomerLayout />}>
            <Route path="/products/:CategoryId" element={<Product />} />

            <Route path="/electronics" element={<Product />} />
            <Route path="/fashion" element={<Product />} />
            <Route path="/grocery" element={<Product />} />
            <Route path="/account/*" element={<ProfileDetails />} />

            <Route path="/product-details/:CategoryId/:productId" element={<ProductDetails />} />
            <Route path="/" element={<Home />} />
          
          </Route>
        </Route>
        
        
        
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/seller/onboarding/business" element={<SellerBussiness />} />
        <Route path="/seller/onboarding/account" element={<SellerAccount />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        {/* Seller Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SellerLayout />} >      
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/seller/products" element={<SellerProduct />} />
            <Route path="/seller/orders" element={<SellerOrders/>} />
            <Route path="/seller/profile" element={<SellerProfile/>} />
            <Route path="/seller/analytics" element={<div>Seller Analytics</div>} />
            <Route path="/seller/payouts" element={<SellerPayouts/>} />
            <Route path="/seller/products/new" element={<AddProductForm />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
    
  )

}    

export default App
