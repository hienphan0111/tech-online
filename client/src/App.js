import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Narbar';
import ProductsPage from './pages/products';
import CartPage from './pages/cartpage';
import ProductPage from './pages/productPage';
import Footer from './components/Footer';
import Home from './pages/homepage';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import YourOrdersPage from './pages/YourOrdersPage';
import AdminConsolePage from './pages/AdminConsolePage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/your-orders' element={<YourOrdersPage />} />
            <Route path='/admin-console' element={<AdminConsolePage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
