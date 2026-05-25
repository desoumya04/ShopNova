import {  ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { customTheme } from './utils/theme';
import Home from './coustomer/pages/home/home';
import ProductDetails from './coustomer/pages/product/ProductDetails/ProductDetails';
import Cart from './coustomer/pages/Cart/Cart';
import Checkout from './coustomer/pages/Address/Checkout';
import Navbar from './coustomer/Navbar/Navbar';


function App() {
  

  return (
    <>
    <ThemeProvider theme={customTheme}>
      <Navbar/>
      {/* <Home/> */}
      {/* <ProductDetails/> */ }
      {/* <Cart/> */  }
      <Checkout/>
    </ThemeProvider>
    </>
  )
}

export default App
