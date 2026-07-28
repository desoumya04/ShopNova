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


function App() {
  return (
    <>
    <ThemeProvider theme={customTheme}>
      <Navbar/>
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
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
