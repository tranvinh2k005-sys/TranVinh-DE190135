import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Exercise 1: Simple Counter</h1>
        <p className="app-subtitle">
          React Hook (<code>useState</code>) with Increment, Decrement &amp; Reset
        </p>
      </header>

      <main className="app-main">
        <Counter />
      </main>
    </div>
  );
}

export default App;
