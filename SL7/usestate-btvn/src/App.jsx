import 'bootstrap/dist/css/bootstrap.min.css';
import FaqAccordion from './components/1_FaqAccordion';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bài 1: FAQ Accordion</h1>
        <p className="app-subtitle">
          React Hook (<code>useState</code>, boolean, toggle, nâng state lên cha)
        </p>
      </header>

      <main className="app-main">
        <FaqAccordion />
      </main>

      <footer className="app-footer">
        FER202 - Frontend Engineering with React | Bài tập useState
      </footer>
    </div>
  );
}

export default App;
