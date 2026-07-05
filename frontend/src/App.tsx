import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './utils/theme';
import Navbar from './coustomer/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './coustomer/pages/home/home';
import Product from './coustomer/pages/product/Product';
import ProductDetails from './coustomer/pages/product/ProductDetails/ProductDetails';


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
        <Route path="/product-details/:CategoryId/:name/:productId" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
