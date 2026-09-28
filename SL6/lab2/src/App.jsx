import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HeaderNav from './components/HeaderNav';
import HeroSlider from './components/HeroSlider';
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function App() {
  const [filterQuery, setFilterQuery] = useState('');
  const [cartToast, setCartToast] = useState({ show: false, item: '' });

  const handleSearch = (query) => {
    setFilterQuery(query);
  };

  const handleBuyItem = (itemTitle) => {
    setCartToast({ show: true, item: itemTitle });
  };

  return (
    <div className="pizza-app d-flex flex-column min-vh-100">
      <HeaderNav onSearch={handleSearch} />
      <main className="flex-grow-1">
        <HeroSlider />
        <MenuSection onBuyItem={handleBuyItem} filterQuery={filterQuery} />
        <BookingSection />
      </main>
      <Footer />

      {/* Cart Feedback Toast */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          bg="dark"
          show={cartToast.show}
          onClose={() => setCartToast({ show: false, item: '' })}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto text-warning">Pizza House</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Added <strong>{cartToast.item}</strong> to your order!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
