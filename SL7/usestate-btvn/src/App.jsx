import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FaqAccordion from './components/1_FaqAccordion';
import ReviewForm from './components/2_ReviewForm';
import BmiCalculator from './components/3_BmiCalculator';
import StudentManager from './components/4_StudentManager';
import QuizApp from './components/5_QuizApp';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('bai5');

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
            className={`tab-btn ${activeTab === 'bai3' ? 'active' : ''}`}
            onClick={() => setActiveTab('bai3')}
          >
            Bài 3: Máy tính BMI
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'bai4' ? 'active' : ''}`}
            onClick={() => setActiveTab('bai4')}
          >
            Bài 4: Quản lý điểm SV
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'bai5' ? 'active' : ''}`}
            onClick={() => setActiveTab('bai5')}
          >
            Bài 5: Quiz trắc nghiệm
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Xem tất cả
          </button>
        </nav>
      </header>

      <main className="app-main">
        {(activeTab === 'bai1' || activeTab === 'all') && <FaqAccordion />}
        {(activeTab === 'bai2' || activeTab === 'all') && <ReviewForm />}
        {(activeTab === 'bai3' || activeTab === 'all') && <BmiCalculator />}
        {(activeTab === 'bai4' || activeTab === 'all') && <StudentManager />}
        {(activeTab === 'bai5' || activeTab === 'all') && <QuizApp />}
      </main>

      <footer className="app-footer">
        FER202 - Frontend Engineering with React | BTVN useState
      </footer>
    </div>
  );
}

export default App;
