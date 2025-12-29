import { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import CoffeeDrip from './components/CoffeeDrip';
// import PageLoader from './components/PageLoader'; // Removed old loader
import Preloader from './components/Preloader'; // Import new Preloader
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Events from './pages/Events';
import OurStory from './pages/OurStory'; // Updated import
import Contact from './pages/Contact';
import Menu from './pages/Menu';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <div className="noise-overlay"></div>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <CoffeeDrip />
              <CartDrawer />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/about" element={<OurStory />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/menu" element={<Menu />} />
                </Routes>
              </Layout>
            </Router>
          </CartProvider>
        </>
      )}
    </>
  )
}

export default App
