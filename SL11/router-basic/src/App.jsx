import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      {/* AppNavbar đặt ở ngoài Routes để luôn hiển thị ở trên cùng */}
      <AppNavbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;