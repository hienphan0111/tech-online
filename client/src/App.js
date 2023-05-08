import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Narbar';
import ProductsPage from './pages/products';
import CartPage from './pages/cartpage';
import ProductPage from './pages/productPage';
import Footer from './components/Footer';
import Home from './pages/homepage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
