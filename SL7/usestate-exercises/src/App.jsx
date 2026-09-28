import { useState } from 'react';
import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('exercise2');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Exercise 12: React Hook (useState)</h1>
        <p className="app-subtitle">
          Practice exercises with React <code>useState</code>
        </p>

        <nav className="tab-navigation">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'exercise1' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercise1')}
          >
            1. Simple Counter
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'exercise2' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercise2')}
          >
            2. Controlled Input Field
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            View All
          </button>
        </nav>
      </header>

      <main className="app-main">
        {(activeTab === 'exercise1' || activeTab === 'all') && (
          <section className="exercise-section">
            {activeTab === 'all' && <h3 className="section-title">Exercise 1: Simple Counter</h3>}
            <Counter />
          </section>
        )}

        {(activeTab === 'exercise2' || activeTab === 'all') && (
          <section className="exercise-section">
            {activeTab === 'all' && <h3 className="section-title">Exercise 2: Controlled Input Field</h3>}
            <ControlledInput />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
