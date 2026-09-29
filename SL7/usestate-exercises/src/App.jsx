import { useState } from 'react';
import Counter from './components/1_Counter';
import ControlledInput from './components/2_ControlledInput';
import ToggleVisibility from './components/3_ToggleVisibility';
import TodoList from './components/4_TodoList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('exercise4');

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
            1. Counter
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'exercise2' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercise2')}
          >
            2. Controlled Input
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'exercise3' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercise3')}
          >
            3. Toggle Visibility
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'exercise4' ? 'active' : ''}`}
            onClick={() => setActiveTab('exercise4')}
          >
            4. Todo List
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
            {activeTab === 'all' && <h3 className="section-title">1. Counter</h3>}
            <Counter />
          </section>
        )}

        {(activeTab === 'exercise2' || activeTab === 'all') && (
          <section className="exercise-section">
            {activeTab === 'all' && <h3 className="section-title">2. Controlled Input</h3>}
            <ControlledInput />
          </section>
        )}

        {(activeTab === 'exercise3' || activeTab === 'all') && (
          <section className="exercise-section">
            {activeTab === 'all' && <h3 className="section-title">3. Toggle Visibility</h3>}
            <ToggleVisibility />
          </section>
        )}

        {(activeTab === 'exercise4' || activeTab === 'all') && (
          <section className="exercise-section">
            {activeTab === 'all' && <h3 className="section-title">4. Todo List</h3>}
            <TodoList />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
