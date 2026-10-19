import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosDemo from './components/AxiosDemo';

function App() {
  return (
    <React.StrictMode>
      <div className="container mt-4">
        <AxiosDemo />
      </div>
    </React.StrictMode>
  );
}

export default App;