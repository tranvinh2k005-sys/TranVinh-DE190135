import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FaqAccordion from './components/1_FaqAccordion';
import ReviewForm from './components/2_ReviewForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('bai2');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bài Tập Về Nhà: React Hook (useState)</h1>
        <p className="app-subtitle">
          FER202 - Quản lý trạng thái Component với <code>useState</code>
        </p>

        <nav className="tab-navigation">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'bai1' ? 'active' : ''}`}
            onClick={() => setActiveTab('bai1')}
          >
            Bài 1: FAQ Accordion
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'bai2' ? 'active' : ''}`}
            onClick={() => setActiveTab('bai2')}
          >
            Bài 2: Đánh giá sao
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Xem cả hai bài
          </button>
        </nav>
      </header>

      <main className="app-main">
        {(activeTab === 'bai1' || activeTab === 'all') && <FaqAccordion />}
        {(activeTab === 'bai2' || activeTab === 'all') && <ReviewForm />}
      </main>

      <footer className="app-footer">
        FER202 - Frontend Engineering with React | BTVN useState
      </footer>
    </div>
  );
}

export default App;
