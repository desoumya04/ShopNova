import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { customTheme } from './utils/theme';
import Checkout from './coustomer/pages/Address/Checkout';
import Order from './coustomer/pages/Order/Order';
import Profile from './coustomer/pages/Order/profile';
import Navbar from './coustomer/Navbar/Navbar';


function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isProfilePage = path === '/profile';
  const isOrderPage = path === '/order';

  return (
    <>
    <ThemeProvider theme={customTheme}>
      <Navbar/>
      {isProfilePage ? <Profile /> : isOrderPage ? <Order /> : <Checkout />}
    </ThemeProvider>
    </>
  )
}

export default App
