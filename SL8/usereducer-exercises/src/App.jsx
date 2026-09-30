import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bai1_StepCounter from './components/Bai1_StepCounter';
import Bai2_OrderTracker from './components/Bai2_OrderTracker';

function App() {
  // Mặc định mở Bài 1 trước
  const [key, setKey] = useState('bai1');

  return (
    <Container className="py-4" style={{ maxWidth: 800 }}>
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
      </Tabs>
    </Container>
  );
}

export default App;
