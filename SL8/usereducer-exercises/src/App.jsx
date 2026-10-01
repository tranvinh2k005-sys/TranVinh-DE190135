import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bai1_StepCounter from './components/Bai1_StepCounter';
import Bai2_OrderTracker from './components/Bai2_OrderTracker';
import Bai3_KanbanBoard from './components/Bai3_KanbanBoard';
import Bai4_CourseWizard from './components/Bai4_CourseWizard';

function App() {
  const [key, setKey] = useState('bai1');

  return (
    <Container className="py-4" style={{ maxWidth: 880 }}>
      <h2 className="mb-4 text-center fw-bold">Bài tập useReducer - Slot 8</h2>
      <Tabs
        id="exercises-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 justify-content-center"
      >
        <Tab eventKey="bai1" title="1. Bài 1: StepCounter">
          <div className="d-flex justify-content-center">
            <Bai1_StepCounter />
          </div>
        </Tab>
        <Tab eventKey="bai2" title="2. Bài 2: OrderTracker">
          <div className="d-flex justify-content-center">
            <Bai2_OrderTracker />
          </div>
        </Tab>
        <Tab eventKey="bai3" title="3. Bài 3: KanbanBoard">
          <div className="d-flex justify-content-center">
            <Bai3_KanbanBoard />
          </div>
        </Tab>
        <Tab eventKey="bai4" title="4. Bài 4: CourseWizard">
          <div className="d-flex justify-content-center">
            <Bai4_CourseWizard initialCourseId="react" />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
