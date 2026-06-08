import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { customTheme } from './utils/theme';
import Checkout from './coustomer/pages/Address/Checkout';
import Order from './coustomer/pages/Order/Order';
import Profile from './coustomer/pages/Order/profile';
import Navbar from './coustomer/Navbar/Navbar';
import { Route, Routes } from 'react-router';
import Home from './coustomer/pages/home/home';
import Product from './coustomer/pages/product/Product';
import ProductDetails from './coustomer/pages/product/ProductDetails/ProductDetails';


function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  

  return (
    <>
    <ThemeProvider theme={customTheme}>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/products/:CategoryId" element={<Product />} />
         <Route path="/product-details/:CategoryId/:name/:productId" element={<ProductDetails />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout/address" element={<Checkout />} />
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
