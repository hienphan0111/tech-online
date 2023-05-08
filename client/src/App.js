import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Narbar';
import ProductsPage from './pages/products';
import CartPage from './pages/cartpage';
import ProductPage from './pages/productPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
