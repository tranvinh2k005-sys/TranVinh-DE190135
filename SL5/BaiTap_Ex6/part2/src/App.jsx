import React from 'react';
import StudentCard from './components/StudentCard';
import { students } from './data/students';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Thông tin sinh viên</h2>
      <div className="d-flex gap-3 flex-wrap">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
